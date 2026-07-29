# Testing Strategy

## Automated gates

- Strict type checking and ESLint
- 24 Vitest unit/component tests covering adaptation, scoring invariants, contradictions, confidence, proprietary characterization, safety, schemas, persistence, and visuals
- Playwright desktop/mobile flows for all four modes, uncertainty, contradiction, resume, AI-off behavior, full keyboard completion, deletion foundations, axe-core, visual fixtures, and 320px containment
- Production build and full dependency audit

Commands:

```powershell
npm run check
npm run test:e2e
npm audit
```

Current result: 24 unit/component tests and 15 Playwright cases pass; 7 Playwright cases intentionally skip duplicate mobile coverage. Visual fixtures are inspected manually after capture; generation alone is not accepted.
