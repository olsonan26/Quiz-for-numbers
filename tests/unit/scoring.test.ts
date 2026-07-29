import { describe, expect, it } from "vitest";
import type { AssessmentSession } from "../../src/assessment/domain";
import { createDemoSession } from "../../src/assessment/fixtures/demo";
import { generateReport } from "../../src/assessment/engine/report";
import { scoreAssessment } from "../../src/assessment/engine/scoring";
import { itemBank } from "../../src/assessment/data/items";

describe("deterministic scoring invariants", () => {
  it("produces identical structured output for identical inputs and versions", () => {
    const session = createDemoSession();
    expect(generateReport(session)).toEqual(generateReport(session));
  });

  it("does not let unrelated answers alter another construct", () => {
    const session = createDemoSession();
    const baseline = scoreAssessment(session).find((result) => result.constructId === "HUE-01");
    const target = session.responses.find((response) => {
      const item = itemBank.find((candidate) => candidate.id === response.itemId);
      return item?.constructId === "HUE-12";
    });
    expect(target).toBeDefined();
    const changed: AssessmentSession = {
      ...session,
      responses: session.responses.map((response) =>
        response.itemId === target?.itemId ? { ...response, optionId: "almost-never" } : response
      )
    };
    expect(scoreAssessment(changed).find((result) => result.constructId === "HUE-01")).toEqual(baseline);
  });

  it("does not let missing or uncertain answers raise confidence", () => {
    const session = createDemoSession();
    const base = scoreAssessment(session).find((result) => result.constructId === "HUE-01")!;
    const changed: AssessmentSession = {
      ...session,
      responses: session.responses.map((response, index) =>
        index === 0 ? { ...response, optionId: "depends" } : response
      )
    };
    const uncertain = scoreAssessment(changed).find((result) => result.constructId === "HUE-01")!;
    expect(uncertain.confidence.internalScore).toBeLessThanOrEqual(base.confidence.internalScore);
  });

  it("prevents strong contradiction from receiving maximum confidence", () => {
    const report = generateReport(createDemoSession({ pattern: "contradictory" }));
    const conflicted = report.constructResults.filter((result) => result.expressionBand === "conflicting");
    expect(conflicted.length).toBeGreaterThan(0);
    expect(conflicted.every((result) => result.confidence.label !== "strong")).toBe(true);
  });

  it("keeps scoring identical across receiver styles", () => {
    const direct = createDemoSession({ receiverStyle: "direct" });
    const gentle = {
      ...direct,
      profile: { ...direct.profile, receiverStyle: "gentle" as const }
    };
    expect(scoreAssessment(direct)).toEqual(scoreAssessment(gentle));
    expect(generateReport(direct).summary).not.toEqual(generateReport(gentle).summary);
  });
});
