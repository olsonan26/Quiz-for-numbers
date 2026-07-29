/**
 * Provenance: olsonan26/LOOKS-LIKE-COSTAR/services/pmeiEngine.ts
 * Source commit: 023140de4ac9ebad8a804b4c984337135e77b19a
 * Local version: legacy-costar-1.0.0
 * Raw count behavior is preserved. Founder prose is not emitted by this module.
 */
import { LETTER_VALUES } from "./numerology";

export type PlaneKey = "physical" | "mental" | "emotional" | "intuitive";

const PLANE_MAP: Record<number, PlaneKey> = {
  1: "mental", 2: "emotional", 3: "emotional",
  4: "physical", 5: "physical", 6: "emotional",
  7: "intuitive", 8: "mental", 9: "intuitive"
};

const IN_PLANE_NUMBERS: Record<PlaneKey, Set<number>> = {
  physical: new Set([4, 5]),
  mental: new Set([1, 8]),
  emotional: new Set([2, 3, 6]),
  intuitive: new Set([7, 9])
};

export interface PMEIResult {
  nameClean: string;
  totalLetters: number;
  planes: Record<PlaneKey, number>;
  qaChecksumPassed: boolean;
  geniusPlane: PlaneKey | null;
  geniusMargin: number;
  zeroPlanes: PlaneKey[];
  crossMatches: Array<{ plane: Exclude<PlaneKey, "emotional">; totalEquals: number }>;
  harmony: PlaneKey[];
  tone: { vowels: number; consonants: number; vowelRatio: number };
  letterMap: Array<{ letter: string; value: number; plane: PlaneKey | "unknown" }>;
}

export function calculatePMEI(fullBirthName: string): PMEIResult {
  const nameClean = (fullBirthName || "").toUpperCase().replace(/[^A-Z]/g, "");
  if (!nameClean) throw new Error("Cannot calculate PMEI for an empty name.");
  const planes: Record<PlaneKey, number> = { physical: 0, mental: 0, emotional: 0, intuitive: 0 };
  let vowels = 0;
  const letterMap = Array.from(nameClean).map((letter) => {
    const value = LETTER_VALUES[letter.toLowerCase()] ?? 0;
    const plane: PlaneKey | "unknown" = PLANE_MAP[value] ?? "unknown";
    if (plane !== "unknown") planes[plane] += 1;
    if (["A", "E", "I", "O", "U"].includes(letter)) vowels += 1;
    return { letter, value, plane };
  });
  const totalLetters = nameClean.length;
  const sorted = (Object.entries(planes) as Array<[PlaneKey, number]>).sort((a, b) => b[1] - a[1]);
  const first = sorted[0];
  const second = sorted[1];
  const margin = (first?.[1] ?? 0) - (second?.[1] ?? 0);
  const zeroPlanes = (Object.keys(planes) as PlaneKey[]).filter((plane) => planes[plane] === 0);
  const crossMatches = (["physical", "mental", "intuitive"] as const)
    .filter((plane) => [2, 3, 6].includes(planes[plane]))
    .map((plane) => ({ plane, totalEquals: planes[plane] }));
  const harmony = (Object.keys(planes) as PlaneKey[]).filter((plane) =>
    IN_PLANE_NUMBERS[plane].has(planes[plane])
  );
  return {
    nameClean,
    totalLetters,
    planes,
    qaChecksumPassed: Object.values(planes).reduce((sum, value) => sum + value, 0) === totalLetters,
    geniusPlane: margin >= 2 ? (first?.[0] ?? null) : null,
    geniusMargin: margin,
    zeroPlanes,
    crossMatches,
    harmony,
    tone: {
      vowels,
      consonants: totalLetters - vowels,
      vowelRatio: vowels / totalLetters
    },
    letterMap
  };
}
