export type AssessmentMode = "self" | "child-observer" | "partner-observer" | "other-observer";
export type Goal =
  | "communication"
  | "motivation"
  | "emotional-reactions"
  | "conflict"
  | "decision-making"
  | "stress-patterns"
  | "strengths"
  | "direction"
  | "overall";
export type ReceiverStyle = "direct" | "gentle" | "analytical" | "practical" | "strengths-first";
export type EvidenceContext = "baseline" | "stress" | "relationship" | "conflict" | "decision" | "general";
export type ExpressionBand = "lower" | "moderate" | "higher" | "context-dependent" | "conflicting" | "insufficient";
export type ConfidenceLabel = "strong" | "moderate" | "tentative" | "conflicting" | "insufficient";

export interface VersionSet {
  assessment: string;
  itemBank: string;
  scoring: string;
  chartMapping: string;
  proprietaryCalculation: string;
  proprietaryInterpretation: string;
  interpretation: string;
  visualization: string;
  safety: string;
}

export const VERSIONS: VersionSet = {
  assessment: "hue-v1.0.0",
  itemBank: "pilot-72-v1.0.0",
  scoring: "deterministic-v1.0.0",
  chartMapping: "costar-hypotheses-v1.0.0",
  proprietaryCalculation: "legacy-costar-1.0.0",
  proprietaryInterpretation: "founder-meanings-1.0.0",
  interpretation: "templates-v1.0.0",
  visualization: "visuals-v1.0.0",
  safety: "safety-v1.0.0"
};

export interface ConstructDefinition {
  id: string;
  version: string;
  name: string;
  plainLanguageName: string;
  definition: string;
  facets: string[];
  minimumEvidence: number;
  evidenceGrade: "A" | "B" | "C" | "D" | "P" | "U";
  validationStatus: "developmental";
}

export interface OptionScore {
  constructId: string;
  facetId: string;
  value: number;
  weight: number;
  context: EvidenceContext;
}

export interface ResponseOption {
  id: string;
  label: string;
  score?: OptionScore;
  isUncertain?: boolean;
  isSkipped?: boolean;
}

export interface QuestionItem {
  id: string;
  version: string;
  status: "draft" | "reviewed" | "pilot" | "retired";
  promptByMode: Record<AssessmentMode, string>;
  responseType: "frequency" | "single-select";
  options: ResponseOption[];
  constructId: string;
  facetId: string;
  context: EvidenceContext;
  goalPriority: Goal[];
  sourceType: "original";
  licensingStatus: "original";
  socialDesirabilityRisk: "low" | "moderate" | "high";
  readingLevelNote: string;
  chartHypothesisIds: string[];
  followUp: boolean;
}

export interface ProfileContext {
  id: string;
  displayName: string;
  birthName: string;
  calledName?: string;
  birthDate: string;
  ageRange: string;
  mode: AssessmentMode;
  goal: Goal;
  receiverStyle: ReceiverStyle;
  observerFamiliarity?: "low" | "moderate" | "high";
  currentStress: boolean;
  currentTransition?: boolean;
  consentedAt: string;
}

export interface ResponseRecord {
  itemId: string;
  optionId: string;
  answeredAt: string;
}

export interface AssessmentSession {
  id: string;
  status: "in-progress" | "review" | "complete";
  profile: ProfileContext;
  responses: ResponseRecord[];
  startedAt: string;
  updatedAt: string;
  versions: VersionSet;
}

export interface Confidence {
  label: ConfidenceLabel;
  internalScore: number;
  reasons: string[];
  coverage: number;
  consistency: number;
  contextStability: number;
  responseQuality: number;
  contradictionPenalty: number;
  stateContaminationPenalty: number;
}

export interface ConstructResult {
  constructId: string;
  label: string;
  expressionBand: ExpressionBand;
  internalScore: number;
  baselineBand: ExpressionBand;
  stressBand: ExpressionBand;
  shiftDirection: "lower" | "stable" | "higher" | "mixed" | "unknown";
  confidence: Confidence;
  evidenceIds: string[];
  contradictionIds: string[];
  baselineNarrative: string;
  stressNarrative: string;
  misunderstandingNarrative: string;
  practicalImplication: string;
  limitation?: string;
}

export type ContradictionType =
  | "item-vs-item"
  | "baseline-vs-stress"
  | "chart-vs-behavior"
  | "context-vs-context"
  | "current-vs-longstanding";

export interface Contradiction {
  id: string;
  constructId: string;
  type: ContradictionType;
  severity: "minor" | "moderate" | "strong";
  sourceA: string;
  sourceB: string;
  status: "unresolved" | "context-dependent" | "stress-shift" | "chart-not-supported" | "insufficient";
  possibleExplanationIds: string[];
  followUpItemIds: string[];
  userNarrative: string;
}

export interface ChartHypothesis {
  id: string;
  version: string;
  sourceRuleId: string;
  sourceValue: string;
  constructId: string;
  facetId: string;
  expectedDirection: "lower" | "moderate" | "higher" | "context-dependent";
  sourceMeaning: string;
  testingItemIds: string[];
  founderInputRequired: boolean;
}

export interface ChartAlignment {
  hypothesisId: string;
  constructId: string;
  classification: "supported" | "partial" | "contextual" | "contradicted" | "unresolved" | "insufficient";
  confidence: Confidence;
  evidenceIds: string[];
  summary: string;
  founderInputRequired: boolean;
}

export interface ProprietaryCalculationTrace {
  id: string;
  label: string;
  inputSummary: string;
  compound: string;
  value: number;
  sourcePath: string;
}

export interface ProprietaryProfile {
  providerId: string;
  sourceCommit: string;
  calculationVersion: string;
  interpretationVersion: string;
  coreNumbers: Array<{ name: string; value: number; compound: string; sourceMeaning: string }>;
  calledName: { value: number; compound: string; sourceMeaning: string };
  pmei: {
    planes: Record<"physical" | "mental" | "emotional" | "intuitive", number>;
    geniusPlane: "physical" | "mental" | "emotional" | "intuitive" | null;
    zeroPlanes: string[];
    harmony: string[];
    qaChecksumPassed: boolean;
  };
  traces: ProprietaryCalculationTrace[];
}

export interface Recommendation {
  id: string;
  findingIds: string[];
  title: string;
  trigger: string;
  action: string;
  exampleLanguage: string;
  avoid: string;
  confidence: Confidence;
  impactBand: "low" | "moderate" | "high";
  effortBand: "low" | "moderate" | "high";
  trialPeriod: string;
  successSignal: string;
  isExperiment: boolean;
}

export interface InteractionResult {
  id: string;
  ruleId: string;
  constructIds: string[];
  confidence: Confidence;
  title: string;
  strengthExpression: string;
  frictionExpression: string;
  actionLeverage: string;
  recommendationIds: string[];
}

export interface VisualizationDatum {
  constructId: string;
  label: string;
  baselineBand: ExpressionBand;
  stressBand: ExpressionBand;
  internalScore: number;
  confidence: ConfidenceLabel;
  evidenceCount: number;
  contradictionCount: number;
  chartAlignment?: ChartAlignment["classification"];
  explanationId: string;
  assessmentVersion: string;
}

export interface AssessmentReport {
  id: string;
  profileId: string;
  assessmentId: string;
  completedAt: string;
  profile: ProfileContext;
  versions: VersionSet;
  headline: string;
  summary: string;
  constructResults: ConstructResult[];
  contradictions: Contradiction[];
  chartAlignments: ChartAlignment[];
  interactions: InteractionResult[];
  recommendations: Recommendation[];
  visualizations: VisualizationDatum[];
  proprietaryProfile: ProprietaryProfile;
  validationStatus: {
    instrumentStatus: "developmental";
    validatedPopulations: string[];
    unvalidatedPopulations: string[];
    knownLimitations: string[];
  };
  limitations: string[];
  feedbackStatus: "pending" | "submitted";
}

export interface FeedbackRecord {
  id: string;
  reportId: string;
  reportVersion: string;
  overallFit: "low" | "mixed" | "high";
  usefulInsightIds: string[];
  inaccurateInsightIds: string[];
  contextDependentInsightIds: string[];
  stressOnlyInsightIds: string[];
  emotionalImpact: "negative" | "neutral" | "positive";
  recommendationUsefulness: "not-yet-tried" | "not-useful" | "somewhat-useful" | "useful";
  correction?: string;
  submittedAt: string;
}
