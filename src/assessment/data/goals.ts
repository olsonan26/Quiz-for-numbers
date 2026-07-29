import type { Goal } from "../domain";

export interface GoalDefinition {
  id: Goal;
  label: string;
  setupQuestion: string;
  reminder: string;
  reportPromise: string;
  directAnswerHeading: string;
  constructIds: string[];
  primaryVisualIds: string[];
}

export const goalDefinitions: GoalDefinition[] = [
  {
    id: "communication",
    label: "Communication",
    setupQuestion: "How can I communicate more clearly?",
    reminder: "You chose this assessment to improve communication.",
    reportPromise: "Your report will start with how you take in information, what helps a message land, and what to try next.",
    directAnswerHeading: "How to make communication clearer",
    constructIds: ["HUE-01", "HUE-06", "HUE-04", "HUE-08"],
    primaryVisualIds: ["communication", "baseline-stress", "conflict-map"]
  },
  {
    id: "motivation",
    label: "Motivation",
    setupQuestion: "What helps me stay motivated?",
    reminder: "You chose this assessment to understand motivation.",
    reportPromise: "Your report will start with what helps effort last, what drains it, and what to try next.",
    directAnswerHeading: "What helps motivation last",
    constructIds: ["HUE-10", "HUE-04", "HUE-05", "HUE-11"],
    primaryVisualIds: ["motivation", "environment", "baseline-stress"]
  },
  {
    id: "emotional-reactions",
    label: "Emotional reactions",
    setupQuestion: "What is behind my emotional reactions?",
    reminder: "You chose this assessment to understand emotional reactions.",
    reportPromise: "Your report will start with what tends to set reactions off, what helps recovery, and what to try next.",
    directAnswerHeading: "What your emotional reactions may need",
    constructIds: ["HUE-02", "HUE-03", "HUE-12", "HUE-05"],
    primaryVisualIds: ["baseline-stress", "needs", "communication"]
  },
  {
    id: "conflict",
    label: "Conflict",
    setupQuestion: "How can I handle conflict better?",
    reminder: "You chose this assessment to improve how conflict is handled.",
    reportPromise: "Your report will start with how tension tends to build, what helps repair, and what to try next.",
    directAnswerHeading: "How to handle conflict with less damage",
    constructIds: ["HUE-08", "HUE-03", "HUE-06", "HUE-04"],
    primaryVisualIds: ["conflict-map", "communication", "baseline-stress"]
  },
  {
    id: "decision-making",
    label: "Decision-making",
    setupQuestion: "How can I make decisions with less doubt?",
    reminder: "You chose this assessment to improve decision-making.",
    reportPromise: "Your report will start with how you make choices, where you may get stuck, and what to try next.",
    directAnswerHeading: "How you can make clearer decisions",
    constructIds: ["HUE-07", "HUE-09", "HUE-04", "HUE-12"],
    primaryVisualIds: ["decision-style", "baseline-stress", "motivation"]
  },
  {
    id: "stress-patterns",
    label: "Stress patterns",
    setupQuestion: "What changes when I am under stress?",
    reminder: "You chose this assessment to understand stress patterns.",
    reportPromise: "Your report will start with early warning signs, what changes under pressure, and what may help recovery.",
    directAnswerHeading: "What changes under stress",
    constructIds: ["HUE-12", "HUE-03", "HUE-02", "HUE-11"],
    primaryVisualIds: ["baseline-stress", "needs", "environment"]
  },
  {
    id: "strengths",
    label: "Strengths",
    setupQuestion: "Which strengths can I use more often?",
    reminder: "You chose this assessment to understand strengths.",
    reportPromise: "Your report will start with the strengths your answers support, when they work best, and how to use them.",
    directAnswerHeading: "Strengths you can use on purpose",
    constructIds: ["HUE-01", "HUE-06", "HUE-07", "HUE-10", "HUE-11"],
    primaryVisualIds: ["pattern-wheel", "interaction-map", "environment"]
  },
  {
    id: "direction",
    label: "Direction and fit",
    setupQuestion: "What kind of direction and setting may fit me?",
    reminder: "You chose this assessment to explore direction and fit.",
    reportPromise: "Your report will start with the conditions that may fit you, the tradeoffs to watch, and one next step.",
    directAnswerHeading: "Conditions that may fit you",
    constructIds: ["HUE-10", "HUE-11", "HUE-07", "HUE-09"],
    primaryVisualIds: ["environment", "motivation", "baseline-stress"]
  },
  {
    id: "overall",
    label: "Overall understanding",
    setupQuestion: "What are the main patterns I should understand?",
    reminder: "You chose this assessment for an overall understanding.",
    reportPromise: "Your report will start with the clearest patterns, how they work together, and what to try first.",
    directAnswerHeading: "The main patterns to understand",
    constructIds: ["HUE-04", "HUE-05", "HUE-02", "HUE-03", "HUE-08"],
    primaryVisualIds: ["pattern-wheel", "baseline-stress", "interaction-map"]
  }
];

export const goalById = new Map(goalDefinitions.map((goal) => [goal.id, goal]));
