import type { AssessmentMode, EvidenceContext, Goal, QuestionItem, ResponseOption } from "../domain";

type Seed = {
  constructId: string;
  facet: string;
  goals: Goal[];
  prompts: [string, string, string, string, string, string];
  contexts: [EvidenceContext, EvidenceContext, EvidenceContext, EvidenceContext, EvidenceContext, EvidenceContext];
  risk?: "low" | "moderate" | "high";
};

const observerPrompt = (prompt: string) =>
  prompt
    .replace(/\bAre you\b/g, "Are they")
    .replace(/\bare you\b/g, "are they")
    .replace(/\bDo you\b/g, "Do they")
    .replace(/\bdo you\b/g, "do they")
    .replace(/\bHave you\b/g, "Have they")
    .replace(/\bhave you\b/g, "have they")
    .replace(/\bYour\b/g, "Their")
    .replace(/\byour\b/g, "their")
    .replace(/\bYou\b/g, "They")
    .replace(/\byou\b/g, "they");

const makeOptions = (constructId: string, facetId: string, context: EvidenceContext): ResponseOption[] => [
  { id: "almost-never", label: "Almost never", score: { constructId, facetId, value: -2, weight: 1, context } },
  { id: "rarely", label: "Rarely", score: { constructId, facetId, value: -1, weight: 1, context } },
  { id: "sometimes", label: "Sometimes", score: { constructId, facetId, value: 0, weight: 1, context } },
  { id: "often", label: "Often", score: { constructId, facetId, value: 1, weight: 1, context } },
  { id: "almost-always", label: "Almost always", score: { constructId, facetId, value: 2, weight: 1, context } },
  { id: "depends", label: "It depends on the situation", isUncertain: true },
  { id: "not-observed", label: "Not sure / have not observed this", isUncertain: true },
  { id: "prefer-not", label: "Prefer not to answer", isSkipped: true }
];

const seeds: Seed[] = [
  {
    constructId: "HUE-01",
    facet: "social-engagement",
    goals: ["communication", "strengths", "overall"],
    contexts: ["baseline", "baseline", "stress", "relationship", "stress", "general"],
    prompts: [
      "After several hours with people, do you actively seek quiet time before taking on another social demand?",
      "In a new group, do you start conversations before someone else draws you in?",
      "When pressure builds, do you pull away from people even when support could help?",
      "With people you trust, do you prefer one-to-one depth over a wider group?",
      "When overstimulated, do you become noticeably less patient or expressive?",
      "Does your desired amount of social contact change sharply depending on the people involved?"
    ]
  },
  {
    constructId: "HUE-02",
    facet: "signal-sensitivity",
    goals: ["emotional-reactions", "communication", "stress-patterns", "overall"],
    contexts: ["baseline", "relationship", "stress", "baseline", "stress", "general"],
    risk: "moderate",
    prompts: [
      "Do subtle changes in another person's tone stay on your mind after the conversation ends?",
      "When an important person becomes unusually quiet, do you first wonder whether you did something wrong?",
      "Under pressure, do ordinary noises, interruptions, or emotional demands feel harder to filter out?",
      "Do you notice tension between people before anyone says there is a problem?",
      "After a sharp comment, does the emotional impact linger even when the issue is resolved?",
      "Does your sensitivity look very different in safe relationships than in unfamiliar settings?"
    ]
  },
  {
    constructId: "HUE-03",
    facet: "regulation-recovery",
    goals: ["emotional-reactions", "stress-patterns", "conflict", "overall"],
    contexts: ["baseline", "stress", "stress", "relationship", "baseline", "general"],
    prompts: [
      "After becoming upset, can you name what you feel before acting on it?",
      "During emotional overload, do you pause long enough to choose your first response?",
      "After a tense conversation, do you regain normal focus within a reasonable period?",
      "When you need support, do you ask directly instead of expecting others to notice?",
      "Can you revise your first interpretation after learning new context?",
      "Does your recovery depend strongly on whether you can have privacy or space?"
    ]
  },
  {
    constructId: "HUE-04",
    facet: "autonomy-reactance",
    goals: ["communication", "motivation", "conflict", "decision-making", "overall"],
    contexts: ["baseline", "relationship", "stress", "decision", "conflict", "general"],
    risk: "moderate",
    prompts: [
      "Do you work better when the outcome is clear but the method is yours to choose?",
      "When someone gives detailed advice you did not request, do you feel an urge to resist it?",
      "When options narrow suddenly, do you become more forceful about protecting choice?",
      "Do you prefer to make an imperfect decision yourself rather than have someone decide for you?",
      "Do you stay cooperative until a boundary feels permanently removed?",
      "Can you accept guidance more easily when it is offered as an option rather than an instruction?"
    ]
  },
  {
    constructId: "HUE-05",
    facet: "belonging-reassurance",
    goals: ["communication", "emotional-reactions", "motivation", "overall"],
    contexts: ["baseline", "relationship", "stress", "relationship", "stress", "general"],
    risk: "high",
    prompts: [
      "Do regular signs of connection help you feel settled in important relationships?",
      "When closeness feels uncertain, do you seek clear reassurance rather than waiting it out?",
      "Under stress, do delayed replies or changed routines feel more personally significant?",
      "Can you depend on someone without feeling that you have lost independence?",
      "When you fear disconnection, do you move closer rather than protect yourself with distance?",
      "Does your need for reassurance vary sharply by relationship or recent conflict?"
    ]
  },
  {
    constructId: "HUE-06",
    facet: "evaluation-response",
    goals: ["communication", "strengths", "conflict", "overall"],
    contexts: ["baseline", "relationship", "stress", "baseline", "stress", "general"],
    risk: "high",
    prompts: [
      "Can you use specific private feedback without hearing it as a judgment of your whole character?",
      "When correction comes from someone important, do you ask questions before defending your intent?",
      "Under pressure, do small mistakes trigger extensive over-explaining or self-criticism?",
      "Can you let an imperfect result be visible while you continue learning?",
      "When criticized publicly, do you need time before responding constructively?",
      "Does feedback land very differently depending on the person's tone or status?"
    ]
  },
  {
    constructId: "HUE-07",
    facet: "decision-process",
    goals: ["decision-making", "direction", "strengths", "overall"],
    contexts: ["decision", "baseline", "stress", "decision", "stress", "general"],
    prompts: [
      "Before an important decision, do you define what information would actually change your choice?",
      "Do you reach a workable decision without gathering every available detail?",
      "Under time pressure, do you either decide too fast or delay beyond the useful window?",
      "Can you consult someone without handing them ownership of the choice?",
      "After committing, do you keep reopening the decision even when no new evidence appears?",
      "Does your decision speed change sharply when the choice cannot easily be reversed?"
    ]
  },
  {
    constructId: "HUE-08",
    facet: "conflict-boundaries",
    goals: ["conflict", "communication", "overall"],
    contexts: ["conflict", "baseline", "stress", "relationship", "conflict", "general"],
    risk: "moderate",
    prompts: [
      "When a small disagreement begins, do you state your position before frustration accumulates?",
      "Can you set a boundary without adding a global judgment about the other person?",
      "Under pressure, do you move from quiet accommodation to unusually strong directness?",
      "After conflict, do you make a clear repair attempt instead of waiting for the tension to disappear?",
      "When fairness is involved, do you confront issues you would otherwise avoid?",
      "Does your conflict style change mainly according to how safe or powerful you feel?"
    ]
  },
  {
    constructId: "HUE-09",
    facet: "ambiguity-tolerance",
    goals: ["stress-patterns", "decision-making", "direction", "overall"],
    contexts: ["baseline", "stress", "decision", "baseline", "stress", "general"],
    prompts: [
      "Can you continue useful work while an important outcome remains unknown?",
      "When plans stay uncertain, do you repeatedly seek reassurance or additional details?",
      "Can you make a provisional decision and revise it when better evidence arrives?",
      "Do clear expectations help you focus without becoming rigid rules?",
      "Under stress, do ambiguous messages quickly feel more negative or threatening?",
      "Does uncertainty become much easier when you understand who controls the next step?"
    ]
  },
  {
    constructId: "HUE-10",
    facet: "reward-orientation",
    goals: ["motivation", "direction", "strengths", "overall"],
    contexts: ["baseline", "baseline", "relationship", "stress", "general", "general"],
    risk: "moderate",
    prompts: [
      "Do you sustain effort longer when you can see skill or mastery increasing?",
      "Does freedom over how to work motivate you more than public recognition?",
      "Do you invest extra effort when the outcome clearly helps people you care about?",
      "Under stress, does pressure without meaning make your effort collapse quickly?",
      "Do specific signs of progress motivate you more than vague encouragement?",
      "Does your strongest motive change noticeably across work, home, and close relationships?"
    ]
  },
  {
    constructId: "HUE-11",
    facet: "change-response",
    goals: ["direction", "stress-patterns", "strengths", "overall"],
    contexts: ["baseline", "stress", "baseline", "stress", "decision", "general"],
    prompts: [
      "When a familiar plan changes, can you update without losing the original goal?",
      "Under sudden change, do you need a clear transition step before moving forward?",
      "Do routines support you without preventing useful experimentation?",
      "When overwhelmed, do you cling to a plan after evidence shows it no longer works?",
      "Can you distinguish exciting novelty from a change that actually improves the situation?",
      "Does your adaptability depend mainly on whether you had time to prepare?"
    ]
  },
  {
    constructId: "HUE-12",
    facet: "stress-coping",
    goals: ["stress-patterns", "emotional-reactions", "conflict", "overall"],
    contexts: ["stress", "baseline", "stress", "relationship", "stress", "general"],
    risk: "moderate",
    prompts: [
      "When demands pile up, do you notice your first warning sign before the reaction becomes intense?",
      "Do you have a reliable way to restore capacity before returning to a difficult task?",
      "Under overload, do you keep functioning outwardly while strain builds privately?",
      "Can you tell others what helps instead of expecting them to guess during stress?",
      "When coping stops working, do you change strategies rather than simply pushing harder?",
      "Does your stress response take a different form at work than in close relationships?"
    ]
  }
];

const modes: AssessmentMode[] = ["self", "child-observer", "partner-observer", "other-observer"];

export const itemBank: QuestionItem[] = seeds.flatMap((seed) =>
  seed.prompts.map((prompt, index) => {
    const id = `ITEM-${seed.constructId.slice(4)}-${String(index + 1).padStart(2, "0")}`;
    const context = seed.contexts[index] ?? "general";
    const prompts = Object.fromEntries(
      modes.map((mode) => [mode, mode === "self" ? prompt : observerPrompt(prompt)])
    ) as Record<AssessmentMode, string>;
    return {
      id,
      version: "1.0.0",
      status: "pilot",
      promptByMode: prompts,
      responseType: "frequency",
      options: makeOptions(seed.constructId, seed.facet, context),
      constructId: seed.constructId,
      facetId: seed.facet,
      context,
      goalPriority: seed.goals,
      sourceType: "original",
      licensingStatus: "original",
      socialDesirabilityRisk: seed.risk ?? "low",
      readingLevelNote: "Plain-language pilot wording; cognitive interviews required.",
      chartHypothesisIds: [`COSTAR-${seed.constructId}`],
      followUp: index >= 5
    } satisfies QuestionItem;
  })
);

export const itemById = new Map(itemBank.map((item) => [item.id, item]));

export const assessmentLimits = {
  candidate: itemBank.length,
  minimum: 36,
  typical: 42,
  maximum: 48
} as const;

export const branchRules = [
  { id: "BR-MIN-COVERAGE", version: "1.0.0", action: "prioritize minimum three observations per construct" },
  { id: "BR-GOAL", version: "1.0.0", action: "prioritize goal-relevant fourth observations" },
  { id: "BR-UNCERTAIN", version: "1.0.0", action: "gather more evidence after uncertain responses" },
  { id: "BR-CONTRADICTION", version: "1.0.0", action: "ask context follow-up after strongly divergent answers" },
  { id: "BR-LIMIT", version: "1.0.0", action: "stop at 48 questions" }
] as const;
