import type { AssessmentMode, AssessmentSession, Goal, ReceiverStyle } from "../domain";
import { VERSIONS } from "../domain";
import { itemBank } from "../data/items";

export function createDemoSession(options?: {
  mode?: AssessmentMode;
  goal?: Goal;
  receiverStyle?: ReceiverStyle;
  pattern?: "convergent" | "contradictory" | "uncertain";
}): AssessmentSession {
  const now = new Date().toISOString();
  const pattern = options?.pattern ?? "convergent";
  const chosen = itemBank.filter((_, index) => index % 6 < 4);
  return {
    id: `demo-${pattern}`,
    status: "complete",
    profile: {
      id: "profile-demo",
      displayName: options?.mode && options.mode !== "self" ? "Jordan" : "Alex",
      birthName: "Alex Jordan Olson",
      calledName: "Alex Olson",
      birthDate: "1990-06-15",
      ageRange: "25-39",
      mode: options?.mode ?? "self",
      goal: options?.goal ?? "communication",
      receiverStyle: options?.receiverStyle ?? "analytical",
      observerFamiliarity: options?.mode && options.mode !== "self" ? "high" : undefined,
      currentStress: pattern === "contradictory",
      currentTransition: false,
      consentedAt: now
    },
    responses: chosen.map((item, index) => ({
      itemId: item.id,
      optionId:
        pattern === "uncertain" && index % 5 === 0
          ? "depends"
          : pattern === "contradictory"
            ? index % 2 === 0
              ? "almost-never"
              : "almost-always"
            : index % 4 === 0
              ? "almost-always"
              : "often",
      answeredAt: now
    })),
    startedAt: now,
    updatedAt: now,
    versions: VERSIONS
  };
}
