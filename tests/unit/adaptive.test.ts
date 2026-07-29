import { describe, expect, it } from "vitest";
import type { AssessmentSession } from "../../src/assessment/domain";
import { VERSIONS } from "../../src/assessment/domain";
import { constructs } from "../../src/assessment/data/constructs";
import { selectNextItem } from "../../src/assessment/engine/adaptive";
import { itemById } from "../../src/assessment/data/items";

function blankSession(): AssessmentSession {
  const now = "2026-07-29T12:00:00.000Z";
  return {
    id: "session-test",
    status: "in-progress",
    profile: {
      id: "profile-test",
      displayName: "Alex",
      birthName: "Alex Olson",
      calledName: "Alex",
      birthDate: "1990-06-15",
      ageRange: "25-39",
      mode: "self",
      goal: "communication",
      receiverStyle: "analytical",
      currentStress: false,
      consentedAt: now
    },
    responses: [],
    navigation: { history: [], currentIndex: 0, draftResponses: {} },
    startedAt: now,
    updatedAt: now,
    versions: VERSIONS
  };
}

function completeAdaptivePath(optionForIndex: (index: number) => string): AssessmentSession {
  let session = blankSession();
  for (let index = 0; index < 60; index += 1) {
    const item = selectNextItem(session);
    if (!item) return session;
    const optionId = optionForIndex(index);
    expect(item.options.some((option) => option.id === optionId)).toBe(true);
    session = {
      ...session,
      responses: [...session.responses, { itemId: item.id, itemVersion: item.version, optionId, answeredAt: session.updatedAt }]
    };
  }
  throw new Error("Adaptive path failed to stop.");
}

describe("adaptive engine", () => {
  it("returns the same next item for the same state", () => {
    const session = blankSession();
    expect(selectNextItem(session)?.id).toBe(selectNextItem(session)?.id);
  });

  it("reaches three observations per construct and stops at the typical path", () => {
    const session = completeAdaptivePath(() => "often");
    expect(session.responses).toHaveLength(42);
    for (const construct of constructs) {
      const count = session.responses.filter(
        (response) => itemById.get(response.itemId)?.constructId === construct.id
      ).length;
      expect(count).toBeGreaterThanOrEqual(3);
    }
  });

  it("uses extra questions for uncertainty without exceeding the maximum", () => {
    const session = completeAdaptivePath((index) => (index % 8 === 0 ? "depends" : "often"));
    expect(session.responses.length).toBeGreaterThan(42);
    expect(session.responses.length).toBeLessThanOrEqual(48);
  });

  it("never returns an item already answered", () => {
    let session = blankSession();
    const seen = new Set<string>();
    while (true) {
      const item = selectNextItem(session);
      if (!item) break;
      expect(seen.has(item.id)).toBe(false);
      seen.add(item.id);
      session = {
        ...session,
        responses: [...session.responses, { itemId: item.id, itemVersion: item.version, optionId: "often", answeredAt: session.updatedAt }]
      };
    }
  });
});
