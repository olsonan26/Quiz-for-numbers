import type { Confidence, ConfidenceLabel } from "../domain";

export interface ConfidenceInput {
  scoredCount: number;
  answeredCount: number;
  requiredCount: number;
  consistency: number;
  contextStability: number;
  contradictionSeverity: "none" | "minor" | "moderate" | "strong";
  currentStress: boolean;
  observerQuality?: "low" | "moderate" | "high";
}

const clamp = (value: number) => Math.max(0, Math.min(1, value));

export function calculateConfidence(input: ConfidenceInput): Confidence {
  const coverage = clamp(input.scoredCount / input.requiredCount);
  const responseQuality = input.answeredCount
    ? clamp(input.scoredCount / input.answeredCount)
    : 0;
  const missingPenalty = Math.max(0, input.answeredCount - input.scoredCount) * 0.12;
  const contradictionPenalty =
    input.contradictionSeverity === "strong"
      ? 0.32
      : input.contradictionSeverity === "moderate"
        ? 0.18
        : input.contradictionSeverity === "minor"
          ? 0.08
          : 0;
  const stateContaminationPenalty = input.currentStress ? 0.08 : 0;
  const observerAdjustment =
    input.observerQuality === "low" ? -0.12 : input.observerQuality === "moderate" ? -0.05 : 0;
  const internalScore = clamp(
    coverage * 0.35 +
      input.consistency * 0.25 +
      input.contextStability * 0.15 +
      responseQuality * 0.25 -
      contradictionPenalty -
      stateContaminationPenalty +
      observerAdjustment -
      missingPenalty
  );

  let label: ConfidenceLabel;
  if (input.scoredCount < input.requiredCount) label = "insufficient";
  else if (input.contradictionSeverity === "strong") label = "conflicting";
  else if (internalScore >= 0.82 && responseQuality >= 0.85) label = "strong";
  else if (internalScore >= 0.62) label = "moderate";
  else label = "tentative";

  const reasons: string[] = [];
  if (coverage >= 1) reasons.push("Minimum behavioral coverage reached.");
  else reasons.push("Minimum behavioral coverage was not reached.");
  if (input.consistency >= 0.75) reasons.push("Answers were reasonably consistent.");
  else reasons.push("Answers varied across items or contexts.");
  if (responseQuality < 0.75) reasons.push("Uncertain or skipped answers limit confidence.");
  if (input.currentStress) reasons.push("Current high stress may affect ordinary-pattern estimates.");
  if (input.observerQuality === "low") reasons.push("The observer reported limited familiarity.");
  if (contradictionPenalty > 0) reasons.push("A meaningful contradiction limits certainty.");

  return {
    label,
    internalScore,
    reasons,
    coverage,
    consistency: clamp(input.consistency),
    contextStability: clamp(input.contextStability),
    responseQuality,
    contradictionPenalty,
    stateContaminationPenalty
  };
}
