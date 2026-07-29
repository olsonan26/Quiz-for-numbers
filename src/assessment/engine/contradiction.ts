import type {
  AssessmentSession,
  ChartAlignment,
  ChartHypothesis,
  ConstructResult,
  Contradiction
} from "../domain";
import { evidenceFromSession } from "./evidence";

export function detectBehavioralContradictions(session: AssessmentSession): Contradiction[] {
  const evidence = evidenceFromSession(session);
  const constructIds = [...new Set(evidence.map((entry) => entry.item.constructId))];
  const contradictions: Contradiction[] = [];

  for (const constructId of constructIds) {
    const scored = evidence.filter(
      (entry) => entry.item.constructId === constructId && entry.value !== null
    );
    const values = scored.map((entry) => entry.value as number);
    if (values.length >= 2) {
      const spread = Math.max(...values) - Math.min(...values);
      if (spread >= 3) {
        contradictions.push({
          id: `CON-${constructId}-ITEMS`,
          constructId,
          type: "item-vs-item",
          severity: spread >= 4 ? "strong" : "moderate",
          sourceA: scored[values.indexOf(Math.min(...values))]?.item.id ?? "",
          sourceB: scored[values.indexOf(Math.max(...values))]?.item.id ?? "",
          status: "context-dependent",
          possibleExplanationIds: ["context-dependent", "competing-needs", "temporary-state"],
          followUpItemIds: [],
          userNarrative: "Credible answers point in different directions. Context is more informative than averaging them away."
        });
      }
    }

    const baseline = scored
      .filter((entry) => ["baseline", "general"].includes(entry.item.context))
      .map((entry) => entry.value as number);
    const stress = scored
      .filter((entry) => entry.item.context === "stress")
      .map((entry) => entry.value as number);
    if (baseline.length && stress.length) {
      const baseMean = baseline.reduce((sum, value) => sum + value, 0) / baseline.length;
      const stressMean = stress.reduce((sum, value) => sum + value, 0) / stress.length;
      const shift = Math.abs(stressMean - baseMean);
      if (shift >= 1.5) {
        contradictions.push({
          id: `CON-${constructId}-STRESS`,
          constructId,
          type: "baseline-vs-stress",
          severity: shift >= 2.5 ? "strong" : "moderate",
          sourceA: "baseline evidence",
          sourceB: "stress evidence",
          status: "stress-shift",
          possibleExplanationIds: ["stress-shift", "current-state", "role-adaptation"],
          followUpItemIds: [],
          userNarrative: "Ordinary and pressure conditions produce different expressions; both can be true."
        });
      }
    }
  }
  return contradictions;
}

export function classifyChartAlignments(
  hypotheses: ChartHypothesis[],
  results: ConstructResult[]
): ChartAlignment[] {
  return hypotheses.map((hypothesis) => {
    const result = results.find((candidate) => candidate.constructId === hypothesis.constructId);
    if (!result || result.confidence.label === "insufficient") {
      return {
        hypothesisId: hypothesis.id,
        constructId: hypothesis.constructId,
        classification: "insufficient",
        confidence: result?.confidence ?? {
          label: "insufficient",
          internalScore: 0,
          reasons: ["No behavioral result was available."],
          coverage: 0,
          consistency: 0,
          contextStability: 0,
          responseQuality: 0,
          contradictionPenalty: 0,
          stateContaminationPenalty: 0
        },
        evidenceIds: result?.evidenceIds ?? [],
        summary: "There is not enough behavioral evidence to evaluate this proprietary hypothesis.",
        founderInputRequired: hypothesis.founderInputRequired
      };
    }

    const expected = hypothesis.expectedDirection;
    const actual = result.expressionBand;
    let classification: ChartAlignment["classification"];
    if (actual === "context-dependent") classification = "contextual";
    else if (actual === "conflicting") classification = "unresolved";
    else if (expected === actual) classification = "supported";
    else if (expected === "moderate" || actual === "moderate") classification = "partial";
    else classification = "contradicted";

    return {
      hypothesisId: hypothesis.id,
      constructId: hypothesis.constructId,
      classification,
      confidence: result.confidence,
      evidenceIds: result.evidenceIds,
      summary:
        classification === "contradicted"
          ? "The available behavioral evidence did not support this proprietary hypothesis."
          : `The proprietary hypothesis was classified as ${classification} against behavioral evidence.`,
      founderInputRequired: hypothesis.founderInputRequired
    };
  });
}

export function attachContradictions(
  results: ConstructResult[],
  contradictions: Contradiction[]
): ConstructResult[] {
  return results.map((result) => ({
    ...result,
    contradictionIds: contradictions
      .filter((contradiction) => contradiction.constructId === result.constructId)
      .map((contradiction) => contradiction.id)
  }));
}
