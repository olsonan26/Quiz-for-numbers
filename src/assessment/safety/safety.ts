const prohibitedPatterns: Array<{ id: string; pattern: RegExp }> = [
  { id: "diagnosis", pattern: /\b(narcissist|psychopath|sociopath|has (?:a )?personality disorder|is diagnosed|this proves a diagnosis)\b/i },
  { id: "danger", pattern: /\b(this person is dangerous|cannot be trusted|is evil)\b/i },
  { id: "destiny", pattern: /\b(destined to|will definitely|guaranteed future|will become)\b/i },
  { id: "relationship-directive", pattern: /\b(you should (leave|divorce|fire|hire|date|reject))\b/i },
  { id: "trauma-proof", pattern: /\b(this proves trauma|definitely has trauma)\b/i },
  { id: "medical", pattern: /\b(you have (a disease|a disorder)|medical diagnosis)\b/i },
  { id: "catastrophe", pattern: /\b(death prediction|fatal accident|catastrophe will)\b/i }
];

export function scanProhibitedLanguage(text: string): string[] {
  return prohibitedPatterns.filter(({ pattern }) => pattern.test(text)).map(({ id }) => id);
}

export function assertSafeOutput(value: unknown): void {
  const text = typeof value === "string" ? value : JSON.stringify(value);
  const violations = scanProhibitedLanguage(text);
  if (violations.length) throw new Error(`Safety rule violation: ${violations.join(", ")}`);
}

export const publicLimitations = [
  "This is a developmental, research-informed assessment—not a clinical or diagnostic test.",
  "Observer reports reflect one person's observations and cannot reveal another person's private inner experience.",
  "Current stress, role, culture, age, and environment can change how patterns appear.",
  "Proprietary name and number meanings are hypotheses and may be unsupported by behavioral answers."
];
