# Decision Log

## 2026-07-29 — Application stack

Selected React 19, TypeScript, Vite, Zod, Vitest, Testing Library, Playwright, and custom accessible SVG/CSS visualizations. This minimizes runtime complexity while supporting deterministic pure functions, mobile-first UI, local persistence, and full automated gates.

## 2026-07-29 — Local-first and AI-free V1

V1 stores profiles, answers, results, and feedback only in browser storage. No external AI is enabled; this makes the deterministic fallback the primary product and prevents accidental raw-answer transmission.

## 2026-07-29 — Visual precision

User-facing visualizations use lower/moderate/higher expression bands and named confidence categories. Internal normalized values are used only for stable layout, never presented as validated percentages.

## 2026-07-29 — Proprietary source handling

`LOOKS-LIKE-COSTAR` commit `023140de4ac9ebad8a804b4c984337135e77b19a` is the pinned source. Formula behavior is preserved behind a local provider; spiritual, karmic, timeline-warning, clinical-sounding, and deterministic content is not exposed in V1.

## 2026-07-29 — Zero-vulnerability development gate

The Vite, Vitest, ESLint, React plugin, globals, and jsdom toolchain was upgraded after the initial production-only audit exposed development-only findings. The full dependency graph now reports zero known vulnerabilities, and every quality gate was rerun after the upgrade.

## 2026-07-29 — Visual QA evidence

Playwright fixtures cover landing, mode and goal selection, a representative question, an adaptive follow-up, deterministic result transition, every report visualization, desktop, mobile, print, and 320px width. These images were manually inspected; the 320px test also asserts no document-body overflow.

## 2026-07-29 — Post-merge verification

Implementation PR #2 merged as `36fcd94cdfe8c96a2c1e8e0077d0128d2d63204c`. A clean install on merged `main` passed the production build, 24 unit/component tests, 9 desktop critical-path tests, and a zero-vulnerability audit. The built application was then served locally and completed through a fixture assessment; all twelve visual modules rendered, the deterministic no-AI message remained present, exported JSON retained assessment and proprietary-source versions, and deletion removed the saved report.

## 2026-07-29 — Public mobile release

The user authorized a shareable mobile link. Vercel project `quiz-for-numbers` deployed the prebuilt `main` artifact and assigned <https://quiz-for-numbers.vercel.app>. Direct HTML verification returned HTTP 200 with the expected production bundle hashes. A live Pixel 5-sized browser completed the assessment, rendered all twelve result modules, preserved the deterministic no-AI path, and found no landing or report document overflow. Vercel could not automatically connect the GitHub repository because the Vercel account lacks a GitHub login connection, so production releases remain manual until that account connection is added.

## 2026-07-29 — Feedback Round 1 repair boundary

Direct usability feedback found that the assessment advances before users can confirm an answer, uses abstract wording, presents too many equal-weight graphs, and does not answer the selected goal soon enough. The repair preserves construct IDs, scoring direction and weights, confidence, contradiction rules, proprietary calculations, safety, and privacy. It will version question wording and report interpretation separately, restart incompatible unfinished V1 sessions instead of mixing content versions, make navigation history explicit, and present Alex Olson's existing number/name meanings as a clearly labeled and falsifiable hypothesis layer rather than hiding them in technical metadata.
