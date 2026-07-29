import type { AssessmentSession, ConstructResult, ExpressionBand } from "../domain";
import { constructs } from "../data/constructs";
import { evidenceFromSession } from "./evidence";
import { calculateConfidence } from "./confidence";

const mean = (values: number[]): number =>
  values.length ? values.reduce((total, value) => total + value, 0) / values.length : 0;

const consistency = (values: number[]): number => {
  if (values.length < 2) return values.length ? 0.65 : 0;
  const average = mean(values);
  const variance = mean(values.map((value) => (value - average) ** 2));
  return Math.max(0, 1 - Math.sqrt(variance) / 2);
};

export function bandFor(value: number, count: number): ExpressionBand {
  if (!count) return "insufficient";
  if (value <= -0.55) return "lower";
  if (value >= 0.55) return "higher";
  return "moderate";
}

function directionFor(baseline: number, stress: number, baselineCount: number, stressCount: number) {
  if (!baselineCount || !stressCount) return "unknown" as const;
  const difference = stress - baseline;
  if (difference >= 0.55) return "higher" as const;
  if (difference <= -0.55) return "lower" as const;
  return "stable" as const;
}

const language = {
  lower: "shows this pattern less often than the other available expressions",
  moderate: "uses this pattern selectively rather than at one consistent extreme",
  higher: "shows this pattern often across the situations described",
  insufficient: "does not yet have enough observed evidence",
  "context-dependent": "changes meaningfully by context",
  conflicting: "contains credible evidence in opposing directions"
} satisfies Record<ExpressionBand, string>;

export function scoreAssessment(session: AssessmentSession): ConstructResult[] {
  const evidence = evidenceFromSession(session);

  return constructs.map((construct) => {
    const constructEvidence = evidence.filter((entry) => entry.item.constructId === construct.id);
    const scored = constructEvidence.filter((entry) => entry.value !== null);
    const values = scored.map((entry) => entry.value as number);
    const baselineValues = scored
      .filter((entry) => entry.item.context === "baseline" || entry.item.context === "general")
      .map((entry) => entry.value as number);
    const stressValues = scored
      .filter((entry) => entry.item.context === "stress")
      .map((entry) => entry.value as number);
    const overall = mean(values);
    const baseline = mean(baselineValues);
    const stress = mean(stressValues);
    const spread = values.length ? Math.max(...values) - Math.min(...values) : 0;
    const shift = baselineValues.length && stressValues.length ? Math.abs(stress - baseline) : 0;
    const contradictionSeverity =
      spread >= 4 || shift >= 2.5
        ? "strong"
        : spread >= 3 || shift >= 1.5
          ? "moderate"
          : spread >= 2
            ? "minor"
            : "none";
    const baseBand = bandFor(baseline, baselineValues.length);
    const stressBand = bandFor(stress, stressValues.length);
    let expressionBand = bandFor(overall, values.length);
    if (contradictionSeverity === "strong") expressionBand = "conflicting";
    else if (shift >= 1.5) expressionBand = "context-dependent";

    const confidence = calculateConfidence({
      scoredCount: scored.length,
      answeredCount: constructEvidence.length,
      requiredCount: construct.minimumEvidence,
      consistency: consistency(values),
      contextStability: baselineValues.length && stressValues.length ? Math.max(0, 1 - shift / 4) : 0.55,
      contradictionSeverity,
      currentStress: session.profile.currentStress,
      observerQuality: session.profile.observerFamiliarity
    });

    const subject = session.profile.mode === "self" ? "You" : session.profile.displayName;
    const baselineNarrative = `${subject} ${language[baseBand]} in ordinary conditions.`;
    const stressNarrative =
      stressBand === "insufficient"
        ? "Stress-specific evidence is limited, so no stress shift is asserted."
        : `Under pressure, the available answers point to ${stressBand} expression.`;

    return {
      constructId: construct.id,
      label: construct.plainLanguageName,
      expressionBand,
      internalScore: overall,
      baselineBand: baseBand,
      stressBand,
      shiftDirection: directionFor(baseline, stress, baselineValues.length, stressValues.length),
      confidence,
      evidenceIds: scored.map((entry) => entry.item.id),
      contradictionIds: [],
      baselineNarrative,
      stressNarrative,
      misunderstandingNarrative: `Others may mistake a ${expressionBand} expression for a fixed identity; the evidence describes observed patterns, not character or worth.`,
      practicalImplication: `Use this finding as an observation prompt and test whether it remains true in more than one setting.`,
      limitation:
        confidence.label === "strong"
          ? undefined
          : confidence.reasons.find((reason) => reason.includes("limit") || reason.includes("varied"))
    };
  });
}
