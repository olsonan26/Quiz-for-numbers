/**
 * Founder-authored condensed source meanings, preserved from:
 * olsonan26/LOOKS-LIKE-COSTAR/services/nameNumberDescriptions.ts
 * Commit: 023140de4ac9ebad8a804b4c984337135e77b19a
 */
export const nameNumberMeanings: Record<number, { title: string; condensed: string }> = {
  1: { title: "Initiator", condensed: "Starter and driver. Act fast, ask two grounding questions, and delegate clearly so speed stays smart." },
  2: { title: "Integrator", condensed: "Bridge builder. Gather facts quickly, make the call, and keep people and details aligned." },
  3: { title: "Expressor", condensed: "Light bringer. Protect your spark, work in simple containers, and ship on rhythm." },
  4: { title: "Builder", condensed: "Architect of durability. Keep the standard high, add curiosity and flex, and you will build trusted engines." },
  5: { title: "Explorer", condensed: "Motion with meaning. Pick fewer adventures, add constraints, finish cycles, and let momentum pay compounding dividends." },
  6: { title: "Steward", condensed: "Hearth keeper. Give generously, protect your energy with boundaries, and your care will grow stronger over time." },
  7: { title: "Seeker", condensed: "Depth diver. Keep the depth, add a publish rhythm, and let feedback sharpen your accuracy." },
  8: { title: "Executor", condensed: "Builder at scale. Aim clearly, share power, schedule renewal, and measure what matters beyond profit." },
  9: { title: "Humanitarian", condensed: "Wide heart. Serve boldly, set firm limits, and refuel with joy so your giving stays powerful and clean." }
};

export function meaningFor(value: number): { title: string; condensed: string } {
  const reduced = value === 11 ? 2 : value === 22 ? 4 : value === 33 ? 6 : value;
  return nameNumberMeanings[reduced] ?? {
    title: "Unmapped",
    condensed: "Founder-authored interpretation is not available for this value."
  };
}
