# Adaptive Engine

`selectNextItem()` is a pure deterministic function.

Priority order:

1. Establish three independent observations for every construct.
2. Gather context after uncertain or strongly divergent answers.
3. Add goal-relevant fourth observations.
4. Reach a typical 42-item path when evidence is coherent.
5. Continue only as needed and never exceed 48.

Answered IDs cannot repeat. High-coverage coherent constructs stop receiving redundant questions. Because the V1 bank contains universal, mode-safe items, there are no adult-only items to leak into child mode.
