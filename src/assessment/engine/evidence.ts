import type { AssessmentSession, QuestionItem, ResponseOption } from "../domain";
import { itemById } from "../data/items";

export interface AnswerEvidence {
  item: QuestionItem;
  option: ResponseOption;
  value: number | null;
  uncertain: boolean;
  skipped: boolean;
}

export function evidenceFromSession(session: AssessmentSession): AnswerEvidence[] {
  return session.responses.flatMap((response) => {
    const item = itemById.get(response.itemId);
    if (!item) return [];
    const option = item.options.find((candidate) => candidate.id === response.optionId);
    if (!option) return [];
    return [
      {
        item,
        option,
        value: option.score?.value ?? null,
        uncertain: option.isUncertain ?? false,
        skipped: option.isSkipped ?? false
      }
    ];
  });
}
