import type { AssessmentSession, QuestionItem } from "../domain";
import { constructs } from "../data/constructs";
import { assessmentLimits, itemBank } from "../data/items";
import { evidenceFromSession } from "./evidence";

interface ConstructCoverage {
  answered: number;
  scored: number;
  uncertain: number;
  values: number[];
}

const emptyCoverage = (): ConstructCoverage => ({ answered: 0, scored: 0, uncertain: 0, values: [] });

export function getCoverage(session: AssessmentSession): Map<string, ConstructCoverage> {
  const coverage = new Map(constructs.map((construct) => [construct.id, emptyCoverage()]));
  for (const evidence of evidenceFromSession(session)) {
    const current = coverage.get(evidence.item.constructId) ?? emptyCoverage();
    current.answered += 1;
    if (evidence.value === null) current.uncertain += 1;
    else {
      current.scored += 1;
      current.values.push(evidence.value);
    }
    coverage.set(evidence.item.constructId, current);
  }
  return coverage;
}

function hasDivergence(values: number[]): boolean {
  if (values.length < 2) return false;
  return Math.max(...values) - Math.min(...values) >= 3;
}

function firstCandidate(
  candidates: QuestionItem[],
  answeredIds: Set<string>,
  predicate: (item: QuestionItem) => boolean
): QuestionItem | null {
  return candidates.find((item) => !answeredIds.has(item.id) && predicate(item)) ?? null;
}

export function selectNextItem(session: AssessmentSession): QuestionItem | null {
  const answeredIds = new Set(session.responses.map((response) => response.itemId));
  if (answeredIds.size >= assessmentLimits.maximum) return null;

  const coverage = getCoverage(session);

  // Establish three independent observations for every construct before optimizing.
  const leastCovered = constructs
    .map((construct) => ({ construct, count: coverage.get(construct.id)?.answered ?? 0 }))
    .filter(({ count }) => count < 3)
    .sort((a, b) => a.count - b.count || a.construct.id.localeCompare(b.construct.id))[0];
  if (leastCovered) {
    return firstCandidate(itemBank, answeredIds, (item) => item.constructId === leastCovered.construct.id);
  }

  const needsClarification = constructs
    .filter((construct) => {
      const state = coverage.get(construct.id) ?? emptyCoverage();
      return state.uncertain > 0 || hasDivergence(state.values);
    })
    .sort((a, b) => a.id.localeCompare(b.id));

  // After minimum coverage, contradictions and uncertainty earn the next evidence slot.
  for (const construct of needsClarification) {
    const explicitFollowUp = firstCandidate(
      itemBank,
      answeredIds,
      (item) => item.constructId === construct.id && item.followUp
    );
    if (explicitFollowUp) return explicitFollowUp;
    const additionalEvidence = firstCandidate(
      itemBank,
      answeredIds,
      (item) => item.constructId === construct.id
    );
    if (additionalEvidence) return additionalEvidence;
  }

  // Reach the typical path with goal-relevant fourth observations.
  if (answeredIds.size < assessmentLimits.typical) {
    const goalCandidate = firstCandidate(
      itemBank,
      answeredIds,
      (item) =>
        item.goalPriority.includes(session.profile.goal) &&
        (coverage.get(item.constructId)?.answered ?? 0) < 5
    );
    if (goalCandidate) return goalCandidate;

    return firstCandidate(
      itemBank,
      answeredIds,
      (item) => (coverage.get(item.constructId)?.answered ?? 0) < 4
    );
  }

  return null;
}

export function estimatedProgress(session: AssessmentSession): {
  answered: number;
  minimum: number;
  likelyTotal: number;
  maximum: number;
} {
  const coverage = getCoverage(session);
  const clarificationCount = [...coverage.values()].filter(
    (state) => state.uncertain > 0 || hasDivergence(state.values)
  ).length;
  return {
    answered: session.responses.length,
    minimum: assessmentLimits.minimum,
    likelyTotal: Math.min(assessmentLimits.maximum, assessmentLimits.typical + clarificationCount),
    maximum: assessmentLimits.maximum
  };
}
