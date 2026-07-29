import { describe, expect, it } from "vitest";
import type { Goal } from "../../src/assessment/domain";
import { generateReport } from "../../src/assessment/engine/report";
import { createDemoSession } from "../../src/assessment/fixtures/demo";

const goals: Goal[] = [
  "communication",
  "motivation",
  "emotional-reactions",
  "conflict",
  "decision-making",
  "stress-patterns",
  "strengths",
  "direction",
  "overall"
];

describe("goal-first report answers", () => {
  it.each(goals)("builds a direct answer for %s", (goal) => {
    const report = generateReport(createDemoSession({ goal }));
    expect(report.goalAnswer.goal).toBe(goal);
    expect(report.goalAnswer.heading.length).toBeGreaterThan(10);
    expect(report.goalAnswer.directAnswer.length).toBeGreaterThan(30);
    expect(report.goalAnswer.whatHelps.length).toBeGreaterThanOrEqual(3);
    expect(report.goalAnswer.thisWeek.length).toBeGreaterThan(20);
  });

  it("builds the complete decision-making guide", () => {
    const report = generateReport(createDemoSession({ goal: "decision-making" }));
    const details = report.goalAnswer.decisionDetails;
    expect(details?.method).toHaveLength(5);
    expect(details?.examples.length).toBeGreaterThanOrEqual(2);
    expect(details?.checklist.length).toBeGreaterThanOrEqual(5);
    expect(details?.pauseSigns.length).toBeGreaterThanOrEqual(3);
    expect(details?.sevenDayExperiment).toMatch(/seven days/i);
  });

  it("changes the decision answer when the response pattern changes", () => {
    const convergent = generateReport(createDemoSession({ goal: "decision-making", pattern: "convergent" }));
    const contradictory = generateReport(createDemoSession({ goal: "decision-making", pattern: "contradictory" }));
    expect(contradictory.goalAnswer.whatAnswersSuggest).not.toEqual(convergent.goalAnswer.whatAnswersSuggest);
    expect(contradictory.goalAnswer.confidence).not.toBe("strong");
  });
});
