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
