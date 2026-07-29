import { goalById } from "../data/goals";
import type {
  AssessmentSession,
  ConfidenceLabel,
  ConstructResult,
  Goal,
  Recommendation
} from "../domain";

export interface DecisionGoalDetails {
  usualStyle: string;
  selfSabotage: string;
  pauseSigns: string[];
  method: string[];
  examples: Array<{ title: string; situation: string; response: string }>;
  checklist: string[];
  sevenDayExperiment: string;
}

export interface GoalAnswer {
  goal: Goal;
  goalLabel: string;
  wantedHelpWith: string;
  heading: string;
  directAnswer: string;
  whatAnswersSuggest: string[];
  whatHelps: string[];
  whereYouGetStuck: string;
  whatNotToDo: string;
  realisticExample: string;
  thisWeek: string;
  constructIds: string[];
  confidence: ConfidenceLabel;
  decisionDetails?: DecisionGoalDetails;
}

const resultById = (results: ConstructResult[], id: string) =>
  results.find((result) => result.constructId === id);

const readableBand = (result: ConstructResult | undefined) => {
  if (!result || result.expressionBand === "insufficient") return "not clear yet";
  if (result.expressionBand === "context-dependent") return "changes with the situation";
  if (result.expressionBand === "conflicting") return "shows a mixed pattern";
  return `${result.expressionBand}`;
};

const weakestConfidence = (results: ConstructResult[]): ConfidenceLabel => {
  const order: ConfidenceLabel[] = ["insufficient", "conflicting", "tentative", "moderate", "strong"];
  return [...results]
    .sort((a, b) => order.indexOf(a.confidence.label) - order.indexOf(b.confidence.label))[0]
    ?.confidence.label ?? "insufficient";
};

function decisionAnswer(
  session: AssessmentSession,
  results: ConstructResult[],
  recommendations: Recommendation[]
): GoalAnswer {
  const decision = resultById(results, "HUE-07");
  const certainty = resultById(results, "HUE-09");
  const autonomy = resultById(results, "HUE-04");
  const stress = resultById(results, "HUE-12");
  const relevant = [decision, certainty, autonomy, stress].filter(Boolean) as ConstructResult[];
  const needsMoreTime = decision?.expressionBand === "higher";
  const uncertaintyIsHard = certainty?.expressionBand === "higher";
  const protectsOwnership = autonomy?.expressionBand === "higher";
  const stressChangesChoices = stress?.shiftDirection !== "stable" && stress?.shiftDirection !== "unknown";
  const first = recommendations.find((item) => item.findingIds.some((id) => ["HUE-07", "HUE-09", "HUE-04", "HUE-12"].includes(id)));

  const directAnswer = needsMoreTime
    ? "You are most likely to make a clear choice when you limit the facts that matter and give the choice a firm stopping point."
    : "You are most likely to make a clear choice when you slow the first reaction just enough to check the facts that matter.";
  const stuck = uncertaintyIsHard
    ? "Unclear outcomes can keep the choice open longer than it needs to stay open."
    : needsMoreTime
      ? "More research can feel useful even after it stops changing the choice."
      : "Speed can turn a strong first impression into a final answer before the tradeoffs are clear.";
  const sabotage = stressChangesChoices
    ? "Under stress, you may use your usual decision habit more strongly—either rushing for relief or delaying until you feel completely sure."
    : "You may reopen a sound choice because doubt feels like new information.";
  const ownershipHelp = protectsOwnership
    ? "Keep the final choice in your hands. Ask for advice about facts or tradeoffs, not permission."
    : "Use one trusted person to check your thinking, then name the choice in your own words.";

  return {
    goal: session.profile.goal,
    goalLabel: "Decision-making",
    wantedHelpWith: "Making decisions with less doubt and fewer costly restarts.",
    heading: "How you can make clearer decisions",
    directAnswer,
    whatAnswersSuggest: [
      `Your decision pattern is ${readableBand(decision)}.`,
      `Your need for clear answers is ${readableBand(certainty)}.`,
      `Your need to own the choice is ${readableBand(autonomy)}.`,
      stressChangesChoices
        ? "Your answers suggest that pressure can change how you choose."
        : "Your choice pattern looks fairly similar under pressure."
    ],
    whatHelps: [
      ownershipHelp,
      needsMoreTime
        ? "Decide in advance which three facts can change the answer."
        : "Use a short pause before a choice that is costly or hard to undo.",
      "Set a decision time and a clear reason that would justify reopening the choice."
    ],
    whereYouGetStuck: stuck,
    whatNotToDo: first?.avoid ?? "Do not keep collecting facts that cannot change the choice.",
    realisticExample: "If you are choosing between two jobs, pick the three things that matter most, score both jobs on those three things, and decide by a set time.",
    thisWeek: "Use the five-step method below for one real choice and write down whether you reopened it without new information.",
    constructIds: relevant.map((result) => result.constructId),
    confidence: weakestConfidence(relevant),
    decisionDetails: {
      usualStyle: directAnswer,
      selfSabotage: sabotage,
      pauseSigns: [
        "You want to decide only to end an uncomfortable feeling.",
        "You are asking the same question again but have no new facts.",
        "Your body feels rushed, shut down, or too tired to compare the options."
      ],
      method: [
        "State the decision in one sentence.",
        "Name the three things that matter most.",
        "Decide what information would actually change your choice.",
        "Set a decision time.",
        "Choose, then reopen the decision only when something important changes."
      ],
      examples: [
        {
          title: "Choosing between two jobs",
          situation: "Both jobs have real strengths, and more research is making the choice noisier.",
          response: "Compare only the three things you chose, ask one final fact-based question, and decide at the set time."
        },
        {
          title: "Making a large purchase",
          situation: "You feel pressure to buy now, but the cost would be hard to undo.",
          response: "Pause until tomorrow, check the total cost and return rules, then choose without adding new criteria."
        }
      ],
      checklist: [
        "Is the choice stated clearly?",
        "Do I know the three things that matter most?",
        "Am I missing a fact that could truly change the answer?",
        "Am I calm enough to compare the options?",
        "When will I decide?",
        "What new event would justify reopening it?"
      ],
      sevenDayExperiment: "For seven days, write each medium-sized choice in one sentence, set a decision time, and do not reopen it unless one important fact changes."
    }
  };
}

const goalGuidance: Record<Exclude<Goal, "decision-making">, {
  direct: string;
  stuck: string;
  avoid: string;
  example: string;
  week: string;
}> = {
  communication: {
    direct: "Communication works best when the main point is clear, the setting matches the person, and there is room to respond without pressure.",
    stuck: "The message can get lost when tone, timing, or a need for control becomes more important than the actual request.",
    avoid: "Do not pile several concerns into one talk or use words like always and never.",
    example: "Say, “I want to solve one thing. When the plan changed without notice, I could not adjust. Please tell me earlier next time.”",
    week: "In one important talk, name one behavior, one impact, and one request."
  },
  motivation: {
    direct: "Effort is more likely to last when the work connects to a reason that matters and progress is easy to see.",
    stuck: "Pressure without a clear purpose can turn into delay, resistance, or a burst of effort that does not last.",
    avoid: "Do not assume praise or pressure will motivate every kind of task.",
    example: "For a task you have avoided, choose whether mastery, freedom, contribution, or recognition is the real reason to finish it.",
    week: "Pick one task, name the reason it matters, and mark one visible sign of progress each day."
  },
  "emotional-reactions": {
    direct: "Strong reactions are easier to handle when you notice the first signal, lower the load, and wait to interpret the event until you can think clearly.",
    stuck: "A small signal can start to feel like proof of a much larger problem when stress is already high.",
    avoid: "Do not force an answer or a repair while the reaction is still rising.",
    example: "Say, “I am reacting strongly. I need twenty minutes, and I will come back at 7:30.”",
    week: "Write down the first body or behavior sign that appears before one strong reaction."
  },
  conflict: {
    direct: "Conflict is easier to repair when the concern is named early, the boundary is specific, and both people know when the conversation will continue.",
    stuck: "Waiting too long can make a small concern come out as a much bigger judgment.",
    avoid: "Do not use public pressure, mind-reading, or threats to force quick agreement.",
    example: "Say, “I want to fix this before it grows. My concern is the missed update, not your character.”",
    week: "Raise one small concern before it becomes a larger argument."
  },
  "stress-patterns": {
    direct: "The most useful stress plan starts before overload: notice the first sign, reduce one demand, and choose one small reset.",
    stuck: "It is easy to wait until normal coping has already stopped working.",
    avoid: "Do not treat pushing harder as the only answer to falling capacity.",
    example: "When you notice your first warning sign, pause messages for ten minutes and choose the next single task.",
    week: "Track one early stress sign and use the same small reset every time it appears."
  },
  strengths: {
    direct: "Your strongest patterns become useful strengths when you choose the right setting and know when the same habit can become too much.",
    stuck: "A strength can create friction when it is used in every setting at the same intensity.",
    avoid: "Do not turn a strong result into a fixed label or a rule about what you cannot do.",
    example: "Use careful thinking for a costly choice, but set a stopping point so care does not become delay.",
    week: "Choose one supported strength and use it on purpose in one situation where it fits."
  },
  direction: {
    direct: "A good direction is likely to offer the right mix of purpose, choice, structure, and change—not one perfect title or path.",
    stuck: "A setting can look exciting while asking for conditions that drain you every day.",
    avoid: "Do not treat this report as a career prediction or ignore real limits such as pay, safety, and family needs.",
    example: "Compare two paths by daily conditions: amount of choice, pace of change, people contact, and visible purpose.",
    week: "Ask one person in a possible path what an ordinary day is actually like."
  },
  overall: {
    direct: "The clearest patterns are best used as a map of helpful conditions, stress shifts, and small experiments—not as a fixed personality label.",
    stuck: "A broad summary can hide the fact that the same pattern changes across people, pressure, and setting.",
    avoid: "Do not treat one score or one chart meaning as the whole person.",
    example: "Pick one result that fits, one that depends on context, and one action you can test this week.",
    week: "Try the first recommendation once, then record what changed and what did not."
  }
};

export function buildGoalAnswer(
  session: AssessmentSession,
  results: ConstructResult[],
  recommendations: Recommendation[]
): GoalAnswer {
  if (session.profile.goal === "decision-making") {
    return decisionAnswer(session, results, recommendations);
  }
  const definition = goalById.get(session.profile.goal);
  const guidance = goalGuidance[session.profile.goal];
  const relevant = (definition?.constructIds ?? [])
    .map((id) => resultById(results, id))
    .filter(Boolean) as ConstructResult[];
  const strongest = [...relevant]
    .filter((result) => result.confidence.label !== "insufficient")
    .sort((a, b) => b.confidence.internalScore - a.confidence.internalScore)[0];
  const first = recommendations.find((recommendation) =>
    recommendation.findingIds.some((id) => relevant.some((result) => result.constructId === id))
  );

  return {
    goal: session.profile.goal,
    goalLabel: definition?.label ?? "Overall understanding",
    wantedHelpWith: definition?.setupQuestion ?? "Understanding the main patterns.",
    heading: definition?.directAnswerHeading ?? "What your answers suggest",
    directAnswer: guidance.direct,
    whatAnswersSuggest: relevant.slice(0, 4).map((result) =>
      `${result.label} is ${readableBand(result)} with ${result.confidence.label} support.`
    ),
    whatHelps: [
      first?.action ?? strongest?.practicalImplication ?? "Use one small experiment and watch what changes.",
      strongest?.stressNarrative ?? "Lower the pressure before trying to solve the whole problem.",
      "Review the result after a week and keep only what was useful."
    ],
    whereYouGetStuck: guidance.stuck,
    whatNotToDo: first?.avoid ?? guidance.avoid,
    realisticExample: first?.exampleLanguage ?? guidance.example,
    thisWeek: guidance.week,
    constructIds: relevant.map((result) => result.constructId),
    confidence: weakestConfidence(relevant)
  };
}
