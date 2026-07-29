import { describe, expect, it } from "vitest";
import {
  getCalledNameValue,
  getCoreNumbers,
  getLetterValue,
  getReductionSequence,
  getValueFromName,
  personalYear,
  reduceNumberWithChain,
  yearEssenceForYear
} from "../../src/proprietary/calculations/numerology";
import { calculatePMEI } from "../../src/proprietary/calculations/pmei";

describe("LOOKS-LIKE-COSTAR characterization", () => {
  it("preserves Pythagorean values A through Z", () => {
    const expected = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8];
    expect("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(getLetterValue)).toEqual(expected);
  });

  it("separates vowels and consonants exactly as the source", () => {
    expect(getValueFromName("Alex Olson", "vowels").sum).toBe(18);
    expect(getValueFromName("Alex Olson", "consonants").sum).toBe(18);
    expect(getValueFromName("Alex Olson", "all").sum).toBe(36);
  });

  it("preserves master numbers and karmic compound chains", () => {
    expect(reduceNumberWithChain(11)).toEqual({ value: 11, compound: "11" });
    expect(reduceNumberWithChain(22)).toEqual({ value: 22, compound: "22" });
    expect(reduceNumberWithChain(33)).toEqual({ value: 33, compound: "33" });
    expect(reduceNumberWithChain(49)).toEqual({ value: 4, compound: "49/13/4" });
    expect(getReductionSequence(49)).toBe("49/13/4");
    for (const compound of [13, 14, 16, 19]) {
      expect(reduceNumberWithChain(compound).compound.startsWith(`${compound}/`)).toBe(true);
    }
  });

  it("characterizes five core numbers and called name", () => {
    const input = { fullName: "Alex Olson", calledName: "Alex Olson", birthDate: "1990-06-15" };
    expect(getCoreNumbers(input).map(({ name, value, compound }) => ({ name, value, compound }))).toEqual([
      { name: "Ultimate Goal", value: 4, compound: "13/4" },
      { name: "Expression", value: 9, compound: "36/9" },
      { name: "Soul Urge", value: 9, compound: "18/9" },
      { name: "Birth Force", value: 4, compound: "31/4" },
      { name: "Balance Number", value: 7, compound: "7" }
    ]);
    expect(getCalledNameValue("Alex Olson")).toEqual({ value: 9, compound: "9" });
  });

  it("characterizes PMEI counts, checksum, genius factor, and zero plane", () => {
    const pmei = calculatePMEI("Alex Olson");
    expect(pmei.planes).toEqual({ physical: 2, mental: 2, emotional: 5, intuitive: 0 });
    expect(pmei.qaChecksumPassed).toBe(true);
    expect(pmei.geniusPlane).toBe("emotional");
    expect(pmei.zeroPlanes).toContain("intuitive");
  });

  it("retains representative timeline primitives for regression only", () => {
    expect(personalYear(15, 6, 2026)).toBe(4);
    expect(yearEssenceForYear("Alex Olson", "1990-06-15", 2026)).toBe(2);
  });
});
