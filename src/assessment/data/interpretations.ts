import type { Goal } from "../domain";

export interface InterpretationTemplate {
  constructId: string;
  high: string;
  moderate: string;
  low: string;
  action: string;
  example: string;
  avoid: string;
  whyItHelps: string;
  goals: Goal[];
  impact: "moderate" | "high";
  effort: "low" | "moderate" | "high";
}

export const interpretationTemplates: InterpretationTemplate[] = [
  {
    constructId: "HUE-01",
    high: "Social contact often supplies momentum and perspective.",
    moderate: "Social engagement appears selective and sensitive to setting.",
    low: "Solitude and lower-stimulation contact often protect capacity.",
    action: "Match the communication setting to the amount of social energy you have, and allow quiet time after demanding contact.",
    example: "Would one-to-one, a small group, or time to think first work best?",
    avoid: "Treating recovery needs as rejection or lack of interest.",
    whyItHelps: "A better setting protects attention and makes the conversation easier to use.",
    goals: ["communication", "strengths", "overall"],
    impact: "moderate",
    effort: "low"
  },
  {
    constructId: "HUE-02",
    high: "Subtle emotional and interpersonal signals register strongly.",
    moderate: "Sensitivity rises mainly when the relationship or stakes matter.",
    low: "Emotional cues may need to be direct before they reliably register.",
    action: "Use specific, calm language and reduce avoidable emotional or sensory load during important conversations.",
    example: "I want to be clear about one behavior, not make a judgment about you.",
    avoid: "Using ambiguity, public pressure, or emotional intensity to force a response.",
    whyItHelps: "Clear, calm words reduce extra signals that can hide the main point.",
    goals: ["communication", "emotional-reactions", "overall"],
    impact: "high",
    effort: "low"
  },
  {
    constructId: "HUE-03",
    high: "Regulation and recovery skills are often available even after strong emotion.",
    moderate: "Recovery is workable but depends on timing, space, or support.",
    low: "Activation may outlast the event or make immediate repair difficult.",
    action: "Pause difficult conversations at the first sign that processing has stopped, then agree on a return time.",
    example: "Let’s take twenty minutes and come back when we can both use the conversation.",
    avoid: "Demanding immediate resolution while activation is still rising.",
    whyItHelps: "A planned pause gives the body time to settle without abandoning the conversation.",
    goals: ["emotional-reactions", "conflict", "stress-patterns", "overall"],
    impact: "high",
    effort: "moderate"
  },
  {
    constructId: "HUE-04",
    high: "Choice and ownership strongly influence cooperation and effort.",
    moderate: "Autonomy matters most when consequences feel personal or irreversible.",
    low: "Clear guidance and shared structure may feel more helpful than burdensome.",
    action: "Name the goal and limits, then offer a real choice about how to get there.",
    example: "Here’s what has to be true. Which approach would you rather take?",
    avoid: "Presenting advice as control when a real choice exists.",
    whyItHelps: "Choice makes cooperation easier without losing the shared goal.",
    goals: ["communication", "motivation", "decision-making", "conflict", "overall"],
    impact: "high",
    effort: "low"
  },
  {
    constructId: "HUE-05",
    high: "Visible connection and reassurance often help relationships feel secure.",
    moderate: "Closeness needs change with trust, conflict, and recent contact.",
    low: "Connection can remain secure without frequent reassurance or proximity.",
    action: "Separate reassurance from advice: confirm the relationship before trying to solve the decision.",
    example: "I’m with you. Do you want comfort, ideas, or both?",
    avoid: "Assuming a request for connection is permission to take over.",
    whyItHelps: "Reassurance lowers relationship worry before advice asks for more effort.",
    goals: ["communication", "emotional-reactions", "motivation", "overall"],
    impact: "high",
    effort: "low"
  },
  {
    constructId: "HUE-06",
    high: "Evaluation can carry emotional weight beyond the specific correction.",
    moderate: "Feedback works when it is specific, private, and connected to a workable next step.",
    low: "Direct correction is usually usable without extensive emotional preparation.",
    action: "Name the observable behavior, its impact, and one next step without making a global character claim.",
    example: "When the deadline moved without notice, planning broke. Next time, tell me as soon as the risk appears.",
    avoid: "Public correction, mind-reading, or words like always and never.",
    whyItHelps: "Specific private feedback keeps the focus on a changeable action.",
    goals: ["communication", "conflict", "strengths", "overall"],
    impact: "high",
    effort: "low"
  },
  {
    constructId: "HUE-07",
    high: "Information gathering and reconsideration may be extensive before commitment feels safe.",
    moderate: "Decision depth changes with stakes and reversibility.",
    low: "Decisions often move quickly once the key outcome is visible.",
    action: "Define the decision deadline, the criteria, and what evidence would justify reopening it.",
    example: "For a job choice, name the three things that matter most and set a time to decide.",
    avoid: "Adding information that cannot change the choice.",
    whyItHelps: "A clear stopping rule prevents more information from turning into more doubt.",
    goals: ["decision-making", "direction", "strengths", "overall"],
    impact: "high",
    effort: "moderate"
  },
  {
    constructId: "HUE-08",
    high: "Conflict and boundaries are likely to become explicit rather than remain hidden.",
    moderate: "Directness depends on safety, fairness, and accumulated frustration.",
    low: "Tension may be minimized or delayed until the need becomes difficult to ignore.",
    action: "Name small concerns early and use a repair sequence: behavior, need, request, return time.",
    example: "I’m noticing tension. My concern is specific, and I want to solve it before it grows.",
    avoid: "Waiting for accumulated frustration to supply the clarity.",
    whyItHelps: "A small concern is easier to solve before it becomes a larger fight.",
    goals: ["conflict", "communication", "overall"],
    impact: "high",
    effort: "moderate"
  },
  {
    constructId: "HUE-09",
    high: "Clear plans and defined expectations strongly support focus.",
    moderate: "Unknowns are workable when ownership and the next checkpoint are clear.",
    low: "Ambiguity and changing information are often tolerated without urgent closure.",
    action: "State what is known, what is unknown, who owns the next step, and when the situation will be reviewed.",
    example: "We don’t know the outcome yet. Here’s what we do know and when we’ll check again.",
    avoid: "False reassurance or inventing certainty.",
    whyItHelps: "A known next step gives useful structure without pretending the outcome is certain.",
    goals: ["stress-patterns", "decision-making", "direction", "overall"],
    impact: "high",
    effort: "low"
  },
  {
    constructId: "HUE-10",
    high: "Meaningful reward and visible progress strongly shape sustained effort.",
    moderate: "Motivation changes by role and by whether the reward feels personally relevant.",
    low: "External reward alone may not reliably activate effort.",
    action: "Connect the work to one primary motive and make progress visible without turning it into surveillance.",
    example: "Which matters most here: mastery, freedom, contribution, or recognition?",
    avoid: "Assuming one reward motivates every role.",
    whyItHelps: "The right reason and visible progress make effort easier to repeat.",
    goals: ["motivation", "direction", "strengths", "overall"],
    impact: "high",
    effort: "moderate"
  },
  {
    constructId: "HUE-11",
    high: "Change and novelty can be incorporated quickly.",
    moderate: "Adaptation works best with a bridge between the old plan and the new one.",
    low: "Preparation, continuity, and a clear transition sequence protect performance.",
    action: "Explain what remains stable, what changes, why it changes, and the first manageable transition step.",
    example: "The goal stays the same. This part changes, and here is the first step.",
    avoid: "Treating processing time as refusal.",
    whyItHelps: "A bridge from the old plan to the new one lowers the load of changing course.",
    goals: ["direction", "stress-patterns", "strengths", "overall"],
    impact: "moderate",
    effort: "low"
  },
  {
    constructId: "HUE-12",
    high: "Stress responses become visible quickly or require active coping.",
    moderate: "Stress expression depends on the demand, relationship, and available recovery.",
    low: "Outward stress signals may remain subtle even while capacity is falling.",
    action: "Identify the earliest observable warning sign and pair it with one small, repeatable reset.",
    example: "When I notice the first sign, I will pause, name the state, and choose one next step.",
    avoid: "Waiting for total overload before changing the demand.",
    whyItHelps: "An early reset is smaller, faster, and easier to repeat than a late recovery.",
    goals: ["stress-patterns", "emotional-reactions", "conflict", "overall"],
    impact: "high",
    effort: "moderate"
  }
];

export const interpretationByConstruct = new Map(
  interpretationTemplates.map((template) => [template.constructId, template])
);
