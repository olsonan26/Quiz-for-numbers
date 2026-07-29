import { describe, expect, it } from "vitest";
import type { AssessmentSession } from "../../src/assessment/domain";
import { VERSIONS } from "../../src/assessment/domain";
import {
  advanceNavigation,
  currentQuestion,
  initializeNavigation,
  previousNavigation,
  selectDraftAnswer,
  selectedOptionId
} from "../../src/assessment/engine/navigation";

const now = "2026-07-29T12:00:00.000Z";

function newSession(): AssessmentSession {
  return {
    id: "navigation-test",
    status: "in-progress",
    profile: {
      id: "profile-test",
      displayName: "Alex",
      birthName: "Alex Olson",
      birthDate: "1990-06-15",
      ageRange: "25-39",
      mode: "self",
      goal: "decision-making",
      receiverStyle: "practical",
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

describe("persisted assessment navigation", () => {
  it("keeps a selection as a draft until the user presses Next", () => {
    const started = initializeNavigation(newSession());
    const first = currentQuestion(started)!;
    const selected = selectDraftAnswer(started, "often", now);

    expect(currentQuestion(selected)?.id).toBe(first.id);
    expect(selected.responses).toHaveLength(0);
    expect(selectedOptionId(selected, first.id)).toBe("often");
    expect(selected.navigation.currentIndex).toBe(0);
  });

  it("moves forward one question only after Next and records the item's exact version", () => {
    const started = initializeNavigation(newSession());
    const first = currentQuestion(started)!;
    const advanced = advanceNavigation(selectDraftAnswer(started, "often", now), now);

    expect(advanced.responses).toEqual([expect.objectContaining({ itemId: first.id, itemVersion: first.version, optionId: "often" })]);
    expect(advanced.navigation.currentIndex).toBe(1);
    expect(currentQuestion(advanced)?.id).not.toBe(first.id);
  });

  it("returns to the saved answer without deleting it and keeps the existing path stable after an edit", () => {
    const started = initializeNavigation(newSession());
    const first = currentQuestion(started)!;
    const afterFirst = advanceNavigation(selectDraftAnswer(started, "often", now), now);
    const second = currentQuestion(afterFirst)!;
    const afterSecond = advanceNavigation(selectDraftAnswer(afterFirst, "often", now), now);
    const oneBack = previousNavigation(afterSecond, now);
    expect(currentQuestion(oneBack)?.id).toBe(second.id);
    const back = previousNavigation(oneBack, now);

    expect(currentQuestion(back)?.id).toBe(first.id);
    expect(back.responses).toHaveLength(2);
    expect(selectedOptionId(back, first.id)).toBe("often");

    const edited = advanceNavigation(selectDraftAnswer(back, "almost-never", now), now);
    expect(currentQuestion(edited)?.id).toBe(second.id);
    expect(edited.responses).toHaveLength(2);
    expect(edited.responses.find((response) => response.itemId === first.id)?.optionId).toBe("almost-never");
    expect(edited.navigation.history.slice(0, 2)).toEqual([first.id, second.id]);
  });
});
