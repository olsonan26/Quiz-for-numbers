import type { AssessmentSession, DraftResponse, QuestionItem, ResponseRecord } from "../domain";
import { itemById } from "../data/items";
import { selectNextItem } from "./adaptive";

const updated = (session: AssessmentSession, now: string) => ({ ...session, updatedAt: now });

export function currentQuestion(session: AssessmentSession): QuestionItem | null {
  const itemId = session.navigation.history[session.navigation.currentIndex];
  return itemId ? itemById.get(itemId) ?? null : null;
}

export function initializeNavigation(session: AssessmentSession): AssessmentSession {
  if (currentQuestion(session)) return session;
  const first = selectNextItem(session);
  if (!first) return session;
  return { ...session, navigation: { history: [first.id], currentIndex: 0, draftResponses: {} } };
}

export function selectedOptionId(session: AssessmentSession, itemId: string): string | undefined {
  return session.navigation.draftResponses[itemId]?.optionId
    ?? session.responses.find((response) => response.itemId === itemId)?.optionId;
}

export function selectDraftAnswer(session: AssessmentSession, optionId: string, now: string): AssessmentSession {
  const item = currentQuestion(session);
  if (!item) return session;
  const draft: DraftResponse = { itemId: item.id, optionId, selectedAt: now };
  return updated({
    ...session,
    navigation: {
      ...session.navigation,
      draftResponses: { ...session.navigation.draftResponses, [item.id]: draft }
    }
  }, now);
}

function replaceResponse(responses: ResponseRecord[], response: ResponseRecord): ResponseRecord[] {
  return [...responses.filter((current) => current.itemId !== response.itemId), response];
}

/** Existing history wins after an edit so adaptive selection never silently rewrites the path. */
export function advanceNavigation(session: AssessmentSession, now: string): AssessmentSession {
  const item = currentQuestion(session);
  const draft = item && session.navigation.draftResponses[item.id];
  if (!item || !draft) return session;
  const response: ResponseRecord = { itemId: item.id, itemVersion: item.version, optionId: draft.optionId, answeredAt: now };
  const committed = updated({
    ...session,
    responses: replaceResponse(session.responses, response),
    navigation: {
      ...session.navigation,
      draftResponses: Object.fromEntries(Object.entries(session.navigation.draftResponses).filter(([itemId]) => itemId !== item.id))
    }
  }, now);
  const nextIndex = committed.navigation.currentIndex + 1;
  const knownNextId = committed.navigation.history[nextIndex];
  if (knownNextId && itemById.has(knownNextId)) {
    return { ...committed, navigation: { ...committed.navigation, currentIndex: nextIndex } };
  }
  const next = selectNextItem(committed);
  if (!next) return { ...committed, status: "review" };
  return {
    ...committed,
    navigation: {
      ...committed.navigation,
      history: [...committed.navigation.history.slice(0, nextIndex), next.id],
      currentIndex: nextIndex
    }
  };
}

/** Previous is navigation only. It never removes or re-scores an answer. */
export function previousNavigation(session: AssessmentSession, now: string): AssessmentSession {
  if (session.navigation.currentIndex === 0) return session;
  return updated({
    ...session,
    status: "in-progress",
    navigation: { ...session.navigation, currentIndex: session.navigation.currentIndex - 1 }
  }, now);
}
