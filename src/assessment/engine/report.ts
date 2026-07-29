import type {
  AssessmentReport,
  AssessmentSession,
  Confidence,
  ConstructResult,
  InteractionResult,
  Recommendation
} from "../domain";
import { VERSIONS } from "../domain";
import { interpretationByConstruct } from "../data/interpretations";
import { calculateProprietaryProfile, costarProvider } from "../../proprietary/adapters/costarProvider";
import { assertSafeOutput, publicLimitations } from "../safety/safety";
import { attachContradictions, classifyChartAlignments, detectBehavioralContradictions } from "./contradiction";
import { scoreAssessment } from "./scoring";
import { buildGoalAnswer } from "./goalAnswer";

const confidenceEligible = (confidence: Confidence) =>
  confidence.label === "strong" || confidence.label === "moderate";

function applyInterpretations(results: ConstructResult[]): ConstructResult[] {
  return results.map((result) => {
    const template = interpretationByConstruct.get(result.constructId);
    if (!template) return result;
    const source =
      result.expressionBand === "higher"
        ? template.high
        : result.expressionBand === "lower"
          ? template.low
          : template.moderate;
    return {
      ...result,
      baselineNarrative: `${result.baselineNarrative} ${source}`,
      practicalImplication: template.action,
      misunderstandingNarrative: `A ${result.expressionBand} result is not a moral rating or fixed label. ${template.avoid}`
    };
  });
}

function interaction(
  id: string,
  title: string,
  a: ConstructResult | undefined,
  b: ConstructResult | undefined,
  strength: string,
  friction: string,
  action: string
): InteractionResult | null {
  if (!a || !b || !confidenceEligible(a.confidence) || !confidenceEligible(b.confidence)) return null;
  const confidence = a.confidence.internalScore <= b.confidence.internalScore ? a.confidence : b.confidence;
  return {
    id,
    ruleId: `RULE-${id}`,
    constructIds: [a.constructId, b.constructId],
    confidence,
    title,
    strengthExpression: strength,
    frictionExpression: friction,
    actionLeverage: action,
    recommendationIds: [`REC-${a.constructId}`, `REC-${b.constructId}`]
  };
}

function buildInteractions(results: ConstructResult[]): InteractionResult[] {
  const get = (id: string) => results.find((result) => result.constructId === id);
  return [
    interaction(
      "AUTONOMY-BELONGING",
      "Connection without control",
      get("HUE-04"),
      get("HUE-05"),
      "Loyal connection can coexist with strong individuality.",
      "Reassurance may feel necessary while advice can feel controlling.",
      "Ask for emotional support separately from decision guidance."
    ),
    interaction(
      "SENSITIVITY-RECOVERY",
      "Signal depth and recovery",
      get("HUE-02"),
      get("HUE-03"),
      "Sensitivity can support empathy and precision when recovery is protected.",
      "High signal load can outlast the event and narrow interpretation.",
      "Reduce load first; interpret the event after regulation returns."
    ),
    interaction(
      "CERTAINTY-ADAPTABILITY",
      "Structure through change",
      get("HUE-09"),
      get("HUE-11"),
      "Clear anchors can make meaningful change easier to absorb.",
      "Unclear change may be experienced as loss of control rather than novelty.",
      "Name what stays stable before introducing what changes."
    ),
    interaction(
      "CONFLICT-EVALUATION",
      "Directness and dignity",
      get("HUE-08"),
      get("HUE-06"),
      "Clear boundaries can coexist with thoughtful repair.",
      "Evaluation threat can delay directness until frustration is high.",
      "Use private, behavior-specific feedback before tension accumulates."
    )
  ].filter((value): value is InteractionResult => value !== null);
}

function buildRecommendations(results: ConstructResult[], session: AssessmentSession): Recommendation[] {
  const prioritized = [...results].sort((a, b) => {
    const aTemplate = interpretationByConstruct.get(a.constructId);
    const bTemplate = interpretationByConstruct.get(b.constructId);
    const aGoal = aTemplate?.goals.includes(session.profile.goal) ? 1 : 0;
    const bGoal = bTemplate?.goals.includes(session.profile.goal) ? 1 : 0;
    return bGoal - aGoal || b.confidence.internalScore - a.confidence.internalScore;
  });

  return prioritized.slice(0, 6).flatMap((result) => {
    const template = interpretationByConstruct.get(result.constructId);
    if (!template || result.confidence.label === "insufficient") return [];
    return [{
      id: `REC-${result.constructId}`,
      findingIds: [result.constructId],
      title: `${result.label}: one useful experiment`,
      trigger: `When ${result.label.toLowerCase()} becomes relevant`,
      action: template.action,
      exampleLanguage: template.example,
      avoid: template.avoid,
      whyItHelps: template.whyItHelps,
      confidence: result.confidence,
      impactBand: template.impact,
      effortBand: template.effort,
      trialPeriod: "Try for seven days, then review the observable effect.",
      successSignal: "Communication becomes clearer or recovery requires less repair.",
      isExperiment: true
    } satisfies Recommendation];
  });
}

function reportHeadline(results: ConstructResult[]): string {
  const autonomy = results.find((result) => result.constructId === "HUE-04");
  const belonging = results.find((result) => result.constructId === "HUE-05");
  const sensitivity = results.find((result) => result.constructId === "HUE-02");
  if (autonomy?.expressionBand === "higher" && belonging?.expressionBand === "higher") {
    return "The Independent Connector";
  }
  if (sensitivity?.expressionBand === "higher") return "The Attuned Observer";
  if (autonomy?.expressionBand === "higher") return "The Self-Directed Builder";
  return "The Context-Aware Navigator";
}

function receiverOpening(session: AssessmentSession): string {
  const openings = {
    direct: "The clearest pattern is this:",
    gentle: "One pattern may be especially useful:",
    analytical: "The answers most strongly point to this:",
    practical: "The most useful pattern to act on is:",
    "strengths-first": "The strongest supported pattern is:"
  };
  return openings[session.profile.receiverStyle];
}

export function generateReport(session: AssessmentSession): AssessmentReport {
  const proprietaryProfile = calculateProprietaryProfile(session.profile);
  const hypotheses = costarProvider.getHypotheses(proprietaryProfile);
  const behavioralContradictions = detectBehavioralContradictions(session);
  let results = attachContradictions(applyInterpretations(scoreAssessment(session)), behavioralContradictions);
  const chartAlignments = classifyChartAlignments(hypotheses, results);
  const chartContradictions = chartAlignments
    .filter((alignment) => alignment.classification === "contradicted")
    .map((alignment) => ({
      id: `CON-CHART-${alignment.hypothesisId}`,
      constructId: alignment.constructId,
      type: "chart-vs-behavior" as const,
      severity: "moderate" as const,
      sourceA: alignment.hypothesisId,
      sourceB: "behavioral evidence",
      status: "chart-not-supported" as const,
      possibleExplanationIds: ["chart-hypothesis-not-supported", "context-dependent"],
      followUpItemIds: [],
      userNarrative: "The behavioral evidence did not support this proprietary hypothesis."
    }));
  const contradictions = [...behavioralContradictions, ...chartContradictions];
  results = attachContradictions(results, contradictions);
  const interactions = buildInteractions(results);
  const recommendations = buildRecommendations(results, session);
  const goalAnswer = buildGoalAnswer(session, results, recommendations);
  const strongest = [...results]
    .filter((result) => result.confidence.label !== "insufficient")
    .sort((a, b) => b.confidence.internalScore - a.confidence.internalScore)[0];
  const tension = contradictions[0];
  const summary = `${receiverOpening(session)} ${strongest?.baselineNarrative ?? "The evidence remains limited."} ${
    tension
      ? "Some answers change by situation or source, so the report shows that difference instead of hiding it."
      : "The answers mostly agree with one another, but the result is still a working guide rather than a final label."
  }`;

  const report: AssessmentReport = {
    id: `report-${session.id}`,
    profileId: session.profile.id,
    assessmentId: "human-pattern-profile",
    completedAt: session.updatedAt,
    profile: session.profile,
    versions: VERSIONS,
    headline: reportHeadline(results),
    summary,
    goalAnswer,
    constructResults: results,
    contradictions,
    chartAlignments,
    interactions,
    recommendations,
    visualizations: results.map((result) => ({
      constructId: result.constructId,
      label: result.label,
      baselineBand: result.baselineBand,
      stressBand: result.stressBand,
      internalScore: result.internalScore,
      confidence: result.confidence.label,
      evidenceCount: result.evidenceIds.length,
      contradictionCount: result.contradictionIds.length,
      chartAlignment: chartAlignments.find((alignment) => alignment.constructId === result.constructId)?.classification,
      explanationId: result.constructId,
      assessmentVersion: VERSIONS.assessment
    })),
    proprietaryProfile,
    validationStatus: {
      instrumentStatus: "developmental",
      validatedPopulations: [],
      unvalidatedPopulations: ["All populations; formal validation has not yet been completed."],
      knownLimitations: publicLimitations
    },
    limitations: publicLimitations,
    feedbackStatus: "pending"
  };
  assertSafeOutput(report);
  return report;
}
