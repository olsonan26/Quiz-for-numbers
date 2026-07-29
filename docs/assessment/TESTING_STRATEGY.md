# Testing Strategy

## Automated gates

- Strict type checking and ESLint
- 48 Vitest unit/component tests covering navigation history/drafts, all-question invariants, goal answers, adaptation, scoring invariants, contradictions, confidence, proprietary characterization, safety, schemas, persistence, and visuals
- Playwright desktop/mobile flows for all four modes, uncertainty, contradiction, resume, AI-off behavior, full keyboard completion, deletion foundations, axe-core, visual fixtures, and 320px containment
- Production build and full dependency audit

Commands:

```powershell
npm run check
npm run test:e2e
npm audit
```

Current Feedback Round 1 result: 48 unit/component tests and 22 Playwright cases pass; 10 Playwright cases intentionally skip duplicate mobile coverage. The decision-making path and a partner-observer Communication path complete end to end. Visual fixtures are inspected manually after capture; generation alone is not accepted.
