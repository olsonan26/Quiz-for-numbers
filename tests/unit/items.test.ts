import { describe, expect, it } from "vitest";
import type { AssessmentMode } from "../../src/assessment/domain";
import { itemBank, optionsForMode } from "../../src/assessment/data/items";

const modes: AssessmentMode[] = ["self", "child-observer", "partner-observer", "other-observer"];
const expectedScoredOptions = [
  ["almost-never", -2],
  ["rarely", -1],
  ["sometimes", 0],
  ["often", 1],
  ["almost-always", 2]
] as const;

describe("plain-language item bank", () => {
  it("keeps the same 72 stable item IDs with six items per construct", () => {
    expect(itemBank).toHaveLength(72);
    expect(new Set(itemBank.map((item) => item.id)).size).toBe(72);

    for (let construct = 1; construct <= 12; construct += 1) {
      const constructId = `HUE-${String(construct).padStart(2, "0")}`;
      const ids = itemBank.filter((item) => item.constructId === constructId).map((item) => item.id);
      expect(ids).toEqual(
        Array.from({ length: 6 }, (_, index) => `ITEM-${String(construct).padStart(2, "0")}-${String(index + 1).padStart(2, "0")}`)
      );
    }
  });

  it("versions every rewritten item as 1.1.0 and keeps explicit wording for all modes", () => {
    for (const item of itemBank) {
      expect(item.version).toBe("1.1.0");
      expect(Object.keys(item.promptByMode).sort()).toEqual([...modes].sort());
      expect(new Set(Object.values(item.promptByMode)).size).toBe(4);
      expect(item.promptByMode["child-observer"]).toMatch(/\byour child\b/i);
      expect(item.promptByMode["partner-observer"]).toMatch(/\byour partner\b/i);
      expect(item.promptByMode["other-observer"]).toMatch(/\bthis person\b/i);
    }
  });

  it("removes the reviewed abstract phrases from primary self wording", () => {
    const selfCopy = itemBank.map((item) => item.promptByMode.self).join(" ");
    const retiredPhrases = [
      "social demand",
      "one-to-one depth",
      "emotional overload",
      "reasonable period",
      "provisional decision",
      "available detail",
      "global judgment",
      "quiet accommodation",
      "ambiguous messages",
      "skill or mastery",
      "restore capacity"
    ];

    for (const phrase of retiredPhrases) expect(selfCopy.toLowerCase()).not.toContain(phrase);
  });

  it("preserves numeric scoring, weights, construct, facet, and context", () => {
    for (const item of itemBank) {
      for (const [optionId, value] of expectedScoredOptions) {
        const option = item.options.find((candidate) => candidate.id === optionId);
        expect(option?.score).toEqual({
          constructId: item.constructId,
          facetId: item.facetId,
          value,
          weight: 1,
          context: item.context
        });
      }
      expect(item.options.find((option) => option.id === "depends")).toMatchObject({ isUncertain: true });
      expect(item.options.find((option) => option.id === "not-observed")).toMatchObject({ isUncertain: true });
      expect(item.options.find((option) => option.id === "prefer-not")).toMatchObject({ isSkipped: true });
    }
  });

  it("uses mode-aware uncertainty labels without changing option meaning", () => {
    const item = itemBank[0];
    expect(item).toBeDefined();

    const selfOptions = optionsForMode(item!, "self");
    const childOptions = optionsForMode(item!, "child-observer");
    const partnerOptions = optionsForMode(item!, "partner-observer");
    const otherOptions = optionsForMode(item!, "other-observer");

    expect(selfOptions.find((option) => option.id === "not-observed")?.label).toBe("Not sure");
    for (const options of [childOptions, partnerOptions, otherOptions]) {
      expect(options.find((option) => option.id === "not-observed")).toMatchObject({
        label: "Not sure / haven’t seen this",
        isUncertain: true
      });
    }
    expect(childOptions.map((option) => option.score)).toEqual(selfOptions.map((option) => option.score));
  });

  it("keeps the sixth item in each construct as the adaptive follow-up", () => {
    for (let index = 0; index < itemBank.length; index += 1) {
      expect(itemBank[index]?.followUp).toBe(index % 6 === 5);
    }
  });
});
