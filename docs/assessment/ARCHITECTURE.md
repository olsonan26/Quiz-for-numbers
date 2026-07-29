# Architecture

## Stack

React 19, strict TypeScript, Vite, Zod, Vitest, Testing Library, Playwright, axe-core, Lucide, accessible SVG, and CSS.

## Boundaries

```text
src/assessment/data          versioned constructs, items, templates
src/assessment/engine        pure adaptive, scoring, confidence, contradiction, report functions
src/assessment/safety        prohibited-language enforcement and public limitations
src/assessment/persistence   local repository interface and JSON export
src/proprietary              pinned source formulas, meanings, manifest, and provider
src/components               workflow and rendering only
```

UI components never calculate assessment scores. `generateReport()` is the deterministic orchestration boundary; no network or AI service participates.
