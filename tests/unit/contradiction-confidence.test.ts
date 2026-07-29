import { describe, expect, it } from "vitest";
import type { ChartHypothesis } from "../../src/assessment/domain";
import { createDemoSession } from "../../src/assessment/fixtures/demo";
import { detectBehavioralContradictions, classifyChartAlignments } from "../../src/assessment/engine/contradiction";
import { scoreAssessment } from "../../src/assessment/engine/scoring";

describe("contradiction and chart alignment", () => {
  it("detects item and baseline-versus-stress contradictions", () => {
    const contradictions = detectBehavioralContradictions(createDemoSession({ pattern: "contradictory" }));
    expect(contradictions.some((item) => item.type === "item-vs-item")).toBe(true);
  });

  it("allows a chart hypothesis to be contradicted", () => {
    const results = scoreAssessment(createDemoSession());
    const target = results.find((result) => result.expressionBand === "higher")!;
    const hypothesis: ChartHypothesis = {
      id: "hyp-opposite",
      version: "1",
      sourceRuleId: "test",
      sourceValue: "test",
      constructId: target.constructId,
      facetId: "test",
      expectedDirection: "lower",
      sourceMeaning: "test hypothesis",
      testingItemIds: target.evidenceIds,
      founderInputRequired: false
    };
    expect(classifyChartAlignments([hypothesis], results)[0]?.classification).toBe("contradicted");
  });

  it("does not create behavioral confidence from chart evidence alone", () => {
    const results = scoreAssessment({
      ...createDemoSession(),
      responses: []
    });
    const hypothesis: ChartHypothesis = {
      id: "chart-only",
      version: "1",
      sourceRuleId: "test",
      sourceValue: "1",
      constructId: "HUE-04",
      facetId: "choice",
      expectedDirection: "higher",
      sourceMeaning: "test",
      testingItemIds: [],
      founderInputRequired: false
    };
    const alignment = classifyChartAlignments([hypothesis], results)[0];
    expect(alignment?.classification).toBe("insufficient");
    expect(alignment?.confidence.label).toBe("insufficient");
  });
});
