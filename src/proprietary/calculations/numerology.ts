/**
 * Provenance: olsonan26/LOOKS-LIKE-COSTAR
 * Source paths: constants.ts, services/numerology.ts
 * Source commit: 023140de4ac9ebad8a804b4c984337135e77b19a
 * Local version: legacy-costar-1.0.0
 * Behavior: preserved; public interpretations are separated from calculations.
 */

export const MASTER_NUMBERS = [11, 22, 33] as const;
export const KARMIC_DEBT_NUMBERS = [13, 14, 16, 19] as const;
export const VOWELS = ["a", "e", "i", "o", "u"] as const;

export const LETTER_VALUES: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
  s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
};

export interface SourceProfileInput {
  fullName: string;
  calledName?: string;
  birthDate: string;
}

export interface CoreNumberValue {
  name: "Ultimate Goal" | "Expression" | "Soul Urge" | "Birth Force" | "Balance Number";
  value: number;
  compound: string;
  calculation?: string;
}

export const getLetterValue = (char: string): number => {
  const upperChar = char.toUpperCase();
  if (upperChar < "A" || upperChar > "Z") return 0;
  return ((upperChar.charCodeAt(0) - "A".charCodeAt(0)) % 9) + 1;
};

export const reduceToSingleDigit = (n: number): number => {
  let num = n;
  while (num > 9) {
    if (Number.isNaN(num)) return 0;
    num = String(num)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }
  return num === 0 ? 9 : num;
};

export const getReductionSequence = (n: number): string => {
  if (n <= 9) return String(n);
  const sequence = [n];
  let current = n;
  while (current > 9) {
    current = String(current)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
    sequence.push(current);
  }
  return sequence.join("/");
};

export const reduceNumberWithChain = (n: number): { value: number; compound: string } => {
  if (Number.isNaN(n)) return { value: 0, compound: "0" };
  if (n >= 0 && n <= 9) return { value: n, compound: String(n) };
  const sequence = [n];
  let current = n;
  while (current > 9) {
    if (MASTER_NUMBERS.includes(current as (typeof MASTER_NUMBERS)[number])) break;
    current = String(current)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
    sequence.push(current);
  }
  let last = sequence[sequence.length - 1] ?? 0;
  while (last > 9 && !MASTER_NUMBERS.includes(last as (typeof MASTER_NUMBERS)[number])) {
    last = String(last)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
    sequence.push(last);
  }
  const distinct = sequence.filter((value, index) => sequence.indexOf(value) === index);
  return { value: distinct[distinct.length - 1] ?? 0, compound: distinct.join("/") };
};

export const getValueFromName = (
  name: string,
  type: "all" | "vowels" | "consonants"
): { sum: number; calculation: string } => {
  const parts: string[] = [];
  const sum = name.toLowerCase().split("").reduce((currentSum, char) => {
    const value = getLetterValue(char);
    if (value > 0) {
      const isVowel = VOWELS.includes(char as (typeof VOWELS)[number]);
      if (type === "all" || (type === "vowels" && isVowel) || (type === "consonants" && !isVowel)) {
        parts.push(`${char.toUpperCase()}(${value})`);
        return currentSum + value;
      }
    }
    return currentSum;
  }, 0);
  return { sum, calculation: parts.join(" + ") };
};

const parseBirthDate = (birthDate: string) => {
  const [year, month, day] = birthDate.split("-").map(Number);
  if (!year || !month || !day) throw new Error("Birth date must use YYYY-MM-DD.");
  return { year, month, day };
};

export const getCoreNumbers = (profile: SourceProfileInput): CoreNumberValue[] => {
  const expressionSum = getValueFromName(profile.fullName, "all").sum;
  const expression = reduceNumberWithChain(expressionSum);
  const { year, month, day } = parseBirthDate(profile.birthDate);
  const birthday = reduceNumberWithChain(month + day + year);
  const ultimateGoal = reduceNumberWithChain(birthday.value + expression.value);
  const soulUrgeSum = getValueFromName(profile.fullName, "vowels").sum;
  const soulUrge = reduceNumberWithChain(soulUrgeSum);
  const birthForceSum = `${day}${month}${year}`
    .split("")
    .map(Number)
    .reduce((a, b) => a + b, 0);
  const birthForce = reduceNumberWithChain(birthForceSum);
  const initials = profile.fullName.trim().toUpperCase().split(/\s+/).map((name) => name[0] ?? "");
  const balanceData = getValueFromName(initials.join(""), "all");
  const balance = reduceNumberWithChain(balanceData.sum);

  return [
    { name: "Ultimate Goal", ...ultimateGoal },
    { name: "Expression", ...expression },
    { name: "Soul Urge", ...soulUrge },
    {
      name: "Birth Force",
      ...birthForce,
      calculation: `${String(day).split("").join(" + ")} + ${String(month).split("").join(" + ")} + ${String(year).split("").join(" + ")} = ${birthForceSum}`
    },
    { name: "Balance Number", ...balance, calculation: `${balanceData.calculation} = ${balanceData.sum}` }
  ];
};

export const getCalledNameValue = (fullName: string): { value: number; compound: string } => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return { value: 0, compound: "0" };
  const firstName = parts[0] ?? "";
  const lastName = parts.length > 1 ? (parts[parts.length - 1] ?? "") : "";
  const firstValue = reduceNumberWithChain(getValueFromName(firstName, "all").sum).value;
  const lastValue = lastName ? reduceNumberWithChain(getValueFromName(lastName, "all").sum).value : 0;
  return reduceNumberWithChain(firstValue + lastValue);
};

const generateNameCycle = (namePart: string): string =>
  [...namePart.toUpperCase().replace(/[^A-Z]/g, "")]
    .map((char) => char.repeat(getLetterValue(char)))
    .join("");

export const personalYear = (birthDay: number, birthMonth: number, year: number): number => {
  const value = reduceToSingleDigit(birthDay + birthMonth + year);
  return value === 0 ? 9 : value;
};

export const yearEssenceForYear = (fullName: string, birthDate: string, targetYear: number): number => {
  const { year: birthYear } = parseBirthDate(birthDate);
  const age = targetYear - birthYear;
  const cycles = fullName.split(" ").filter(Boolean).map(generateNameCycle);
  let sum = 0;
  for (const cycle of cycles) {
    if (cycle.length > 0) {
      const index = ((age - 1) % cycle.length + cycle.length) % cycle.length;
      sum += getLetterValue(cycle[index] ?? "");
    }
  }
  return reduceToSingleDigit(sum);
};
