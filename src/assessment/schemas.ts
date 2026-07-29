import { z } from "zod";

export const modeSchema = z.enum(["self", "child-observer", "partner-observer", "other-observer"]);
export const goalSchema = z.enum([
  "communication",
  "motivation",
  "emotional-reactions",
  "conflict",
  "decision-making",
  "stress-patterns",
  "strengths",
  "direction",
  "overall"
]);
export const receiverStyleSchema = z.enum(["direct", "gentle", "analytical", "practical", "strengths-first"]);

export const profileContextSchema = z.object({
  id: z.string().min(1),
  displayName: z.string().trim().min(1).max(80),
  birthName: z.string().trim().min(1).max(160),
  calledName: z.string().trim().max(80).optional(),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  ageRange: z.string().min(1),
  mode: modeSchema,
  goal: goalSchema,
  receiverStyle: receiverStyleSchema,
  observerFamiliarity: z.enum(["low", "moderate", "high"]).optional(),
  currentStress: z.boolean(),
  currentTransition: z.boolean().optional(),
  consentedAt: z.string().datetime()
});

export const responseRecordSchema = z.object({
  itemId: z.string().min(1),
  itemVersion: z.string().min(1),
  optionId: z.string().min(1),
  answeredAt: z.string().datetime()
});

export const navigationSchema = z.object({
  history: z.array(z.string().min(1)).min(1),
  currentIndex: z.number().int().nonnegative(),
  draftResponses: z.record(z.object({
    itemId: z.string().min(1),
    optionId: z.string().min(1),
    selectedAt: z.string().datetime()
  }))
}).superRefine((navigation, context) => {
  if (navigation.currentIndex >= navigation.history.length) {
    context.addIssue({ code: z.ZodIssueCode.custom, message: "Current history index must exist." });
  }
});

export const sessionSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["in-progress", "review", "complete"]),
  profile: profileContextSchema,
  responses: z.array(responseRecordSchema),
  navigation: navigationSchema,
  startedAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  versions: z.record(z.string())
});

export const feedbackSchema = z.object({
  id: z.string().min(1),
  reportId: z.string().min(1),
  reportVersion: z.string().min(1),
  overallFit: z.enum(["low", "mixed", "high"]),
  usefulInsightIds: z.array(z.string()),
  inaccurateInsightIds: z.array(z.string()),
  contextDependentInsightIds: z.array(z.string()),
  stressOnlyInsightIds: z.array(z.string()),
  emotionalImpact: z.enum(["negative", "neutral", "positive"]),
  recommendationUsefulness: z.enum(["not-yet-tried", "not-useful", "somewhat-useful", "useful"]),
  correction: z.string().max(2000).optional(),
  submittedAt: z.string().datetime()
});

export function parseStored<T>(schema: z.ZodType<T>, raw: string | null): T | null {
  if (!raw) return null;
  try {
    return schema.parse(JSON.parse(raw));
  } catch {
    return null;
  }
}
