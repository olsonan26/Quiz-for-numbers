/**
 * Founder-authored core-number excerpts, preserved from
 * olsonan26/LOOKS-LIKE-COSTAR/services/data.ts at
 * 023140de4ac9ebad8a804b4c984337135e77b19a.
 *
 * These are the first, non-sensitive sentences from the source-specific tables.
 * They are presented only as founder-source ideas, not behavioral findings.
 */
import type { CoreNumberValue } from "../calculations/numerology";

type CoreName = CoreNumberValue["name"];
type MeaningTable = Record<number, string>;

const lifePathDescriptions: MeaningTable = {
  1: "Your Life Path is that of the Leader and Pioneer.",
  2: "Your Life Path is that of the Peacemaker and Diplomat.",
  3: "Your Life Path is that of the Creative Communicator.",
  4: "Your Life Path is that of the Master Builder.",
  5: "Your Life Path is that of the Agent of Change and Adventurer.",
  6: "Your Life Path is that of the Nurturer and a beacon of Responsible Love.",
  7: "Your Life Path is that of the Seeker of Truth.",
  8: "Your Life Path is that of the Powerhouse and Manifester.",
  9: "Your Life Path is that of the Compassionate Humanitarian."
};

const expressionDescriptions: MeaningTable = {
  1: "You express yourself as a natural leader, an innovator, and a pioneer.",
  2: "You express yourself as a diplomat, a peacemaker, and a team player.",
  3: "You express yourself with creativity, charm, and a joyful spirit.",
  4: "You express yourself as a builder, an organizer, and a pragmatist.",
  5: "You express yourself as an adventurer, a catalyst for change, and a free spirit.",
  6: "You express yourself as a nurturer, a teacher, and a responsible caregiver.",
  7: "You express yourself as a seeker of truth, a thinker, and an analyst.",
  8: "You express yourself as a powerful leader, a strategist, and an achiever.",
  9: "You express yourself as a compassionate humanitarian, an idealist, and an artist."
};

const soulUrgeDescriptions: MeaningTable = {
  1: "You are motivated by autonomy, novelty, and the feeling that your life is moved by your own will.",
  2: "You are motivated by harmony, cooperation, and the felt sense that people can work together without doing violence to one another's dignity.",
  3: "You are motivated by joy, creative expression, and the desire to lift the emotional tone of any room you enter.",
  4: "You are motivated by order, stability, and the deep satisfaction of building something solid and worthwhile.",
  5: "You are motivated by freedom, exploration, and the sense that life is an adventure to be lived, not a script to be followed.",
  6: "You are motivated by devotion, responsibility, and the desire to create safety for the people and communities you love.",
  7: "You are motivated by truth, depth, and the refinement of understanding.",
  8: "You are motivated by impact, achievement, and the will to turn potential into performance.",
  9: "You are motivated by compassion, meaning, and the hope that your life can ease suffering and elevate the human story."
};

const birthForceDescriptions: MeaningTable = {
  1: "You have leadership ability and qualities.",
  2: "You are a diplomatic type, sensitive, cooperative, and considerate.",
  3: "You are creative, imaginative, and deeply feeling.",
  4: "You are a practical type who likes to know what you are doing and do not care to take chances unless you are sure.",
  5: "You like freedom and have a natural interest in what is happening around you, and you seem to have many things going on at once.",
  6: "You have a caring attitude to work, you are an idealist, and you have strong opinions about what is right and wrong.",
  7: "You are a natural thinker with an observing nature and an analytical mind.",
  8: "You are a management type with strong organization skills.",
  9: "You are a caring type who colors your affairs with emotion and can deal with people from any walk of life and at any level in business and private relationships."
};

const balanceNumberDescriptions: MeaningTable = {
  1: "Draw strength from yourself, and be more willing to share your troubles with friends and family.",
  2: "Use tact and diplomacy.",
  3: "Be more lighthearted and optimistic in your approach to problems.",
  4: "Try to have perspective and a more lighthearted attitude toward emotionally charged issues.",
  5: "Focus on your problem rather than avoiding it.",
  6: "Your strength lies in understanding people and the underlying conditions of a conflict.",
  7: "You may retreat into a safe haven within yourself and hope you will not have to deal with the issue at hand.",
  8: "Use your considerable power in a balanced way.",
  9: "Your compassion and idealism guide you, but you may struggle with letting go of emotional attachments to outcomes."
};

const tables: Record<CoreName, MeaningTable> = {
  "Ultimate Goal": lifePathDescriptions,
  Expression: expressionDescriptions,
  "Soul Urge": soulUrgeDescriptions,
  "Birth Force": birthForceDescriptions,
  "Balance Number": balanceNumberDescriptions
};

const rootValue = (value: number) => (value === 11 ? 2 : value === 22 ? 4 : value === 33 ? 6 : value);

export function coreMeaningFor(name: CoreName, value: number): string {
  return tables[name][rootValue(value)] ?? "Founder-authored interpretation is not available for this value.";
}
