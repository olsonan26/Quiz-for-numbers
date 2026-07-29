# Codex Build Plan

## Operating instruction

Read `AGENTS.md` and every document in this directory before implementing production behavior.

Do not respond with a research plan only. Create the application, tests, documentation, and fixtures. Use the repository as durable memory and update implementation status as work proceeds.

## Branch policy

Create a new implementation branch from this foundation branch, for example:

```text
feat/human-pattern-profile-v1
```

Do not merge automatically.

## Phase 0 — Repository and technology setup

Because this repository began as a research workspace, select a production-ready web stack suitable for:

- mobile-first assessment flow
- TypeScript
- deterministic engines
- accessible data visualizations
- local-first persistence
- unit, component, and end-to-end tests
- future server integration

Recommended default unless a better repository-specific reason emerges:

- React
- TypeScript
- Vite or Next.js
- a schema validator such as Zod
- a test runner such as Vitest
- React Testing Library
- Playwright for end-to-end tests
- an accessible visualization library or carefully built SVG components

Document the stack choice in `docs/assessment/ARCHITECTURE.md`.

Deliverables:

- application boots
- formatting, linting, type-checking, tests, and build commands work
- CI workflow exists
- no secrets committed
- root README updated

## Phase 1 — Product specification lock

Create:

```text
docs/assessment/V1_BUILD_SPEC.md
docs/assessment/IMPLEMENTATION_STATUS.md
docs/assessment/DECISION_LOG.md
```

The build spec must explicitly lock:

- target users
- V1 modes
- twelve constructs
- question-count range
- completion-time target
- report modules
- graph modules
- data-storage approach
- AI role
- safety boundaries
- validation-status language
- exclusions
- definition of done

Do not begin broad UI implementation until the build spec exists.

## Phase 2 — Domain schemas

Implement runtime-validated schemas for:

- assessment definition
- assessment path
- profile context
- construct
- facet
- question item
- response option
- branch rule
- chart hypothesis
- assessment session
- response record
- construct result
- contradiction
- confidence components
- interaction result
- recommendation
- visualization datum
- report
- feedback
- validation status

Requirements:

- all records have IDs and versions
- malformed data fails early
- historical sessions preserve their content/scoring versions
- migrations are documented

## Phase 3 — Research-ready item bank

Create a pilot item bank containing approximately 70–100 candidate questions, from which the adaptive engine selects 36–48.

Every item requires metadata:

- construct and facet
- mode wording
- response type
- scoring direction
- context
- chart hypotheses tested
- source classification
- licensing status
- reading-level note
- social-desirability risk
- branch rules
- status: draft, reviewed, pilot, retired

Do not copy restricted assessment items.

Create fictional fixtures representing:

- strong convergence
- high contradiction
- high uncertainty
- high current stress
- child observer
- partner observer
- chart unsupported
- chart contextually supported

## Phase 4 — Adaptive engine

Implement a pure deterministic function that selects the next item from:

- minimum construct coverage
- selected goal
- mode
- age/developmental rules
- unanswered priority
- low-confidence constructs
- contradiction follow-ups
- maximum-length limit

Required tests:

- same state returns same next item
- maximum question count is respected
- each construct reaches minimum coverage
- uncertainty can trigger additional evidence gathering
- irrelevant child/adult items are excluded
- high-confidence constructs stop receiving redundant questions

## Phase 5 — Scoring engine

Implement pure functions for:

- option scoring
- reverse scoring
- facet aggregation
- construct aggregation
- baseline/stress separation
- context modifiers
- response-quality indicators
- minimum-evidence checks

Scoring must not live in UI components.

Required tests are defined in `06_SCORING_CONTRADICTION_AND_CONFIDENCE.md`.

## Phase 6 — Chart-hypothesis adapter

Create an interface for proprietary number/name calculations.

Until founder rules are supplied, implement:

- mock hypotheses
- versioned placeholder mapping
- explicit `founderInputRequired` flags
- no invented meanings

The adapter should produce structured hypotheses without exposing them to the user before the quiz.

## Phase 7 — Contradiction and confidence engines

Implement:

- evidence-source comparison
- contradiction classification
- severity
- allowed explanation ranking
- follow-up selection
- chart alignment classification
- confidence components
- user-facing confidence categories

Create snapshot fixtures for each contradiction type.

## Phase 8 — Recommendation and interpretation engine

Build a deterministic template system.

Each output statement must reference:

- finding IDs
- interaction IDs
- recommendation IDs
- confidence
- limitations

Implement receiver styles without changing meaning or certainty.

Add optional AI enhancement only after the deterministic report passes tests.

AI requirements:

- structured input only where possible
- structured output validation
- configurable provider
- timeout handling
- no secrets in client code
- prohibited-language scan
- complete fallback report
- model and prompt version stored

## Phase 9 — Assessment UX

Build the full flow:

1. landing and promise
2. choose person
3. choose goal
4. profile context
5. assessment explanation and consent
6. adaptive questions
7. progress
8. pause/resume
9. answer review
10. result generation
11. report
12. feedback
13. export/share controls
14. deletion

UX requirements:

- mobile-first
- large touch targets
- accessible labels
- keyboard completion
- screen-reader support
- visible save state
- graceful refresh recovery
- no model call after every question
- no misleading completion progress when adaptive length changes; use an estimated range or section progress

## Phase 10 — Result visualizations

Implement all V1 visuals in `05_RESULTS_AND_VISUALIZATION_SPEC.md`.

Minimum required:

- Human Pattern Wheel
- Baseline vs Stress slope chart
- Motivation Hierarchy
- Communication Profile
- Conflict Process Map
- Needs and Sensitivities panel
- Pattern Interaction Map
- Chart vs Behavior matrix
- Evidence and Confidence panel
- Growth Leverage Matrix
- Environment Fit dashboard
- shareable “How to Work With Me” card

Graph acceptance criteria:

- meaningful title and question
- deterministic data input
- text/table alternative
- keyboard and screen-reader support
- readable at 320px width
- no false precision
- loading and empty states
- screenshot fixtures

## Phase 11 — Persistence and privacy

Implement a persistence interface with a local-first adapter.

Required capabilities:

- create profile
- save session
- resume session
- list completed reports
- export JSON
- export/print report
- delete assessment
- delete profile
- clear all data

Document what stays in the browser and what, if anything, leaves the device.

## Phase 12 — Feedback and pilot instrumentation

Implement feedback linked to exact versions.

Collect:

- fit
- useful insight IDs
- inaccurate insight IDs
- context-dependent insight IDs
- stress-only insight IDs
- emotional impact
- recommendation usefulness
- free-text correction

General analytics must not include raw answer text or identifying information.

Create a separate explicit research-consent model for future de-identified datasets.

## Phase 13 — Testing

### Unit tests

- schemas
- item scoring
- aggregation
- branching
- contradiction detection
- confidence
- chart alignment
- recommendations
- safety filters
- version migrations

### Component tests

- question rendering
- response interaction
- navigation
- review
- result modules
- graph text alternatives
- deletion and export

### End-to-end tests

- self assessment
- child assessment
- partner assessment
- someone-else assessment
- contradictory flow
- uncertain flow
- interrupted/resumed flow
- AI unavailable
- deletion
- mobile viewport
- keyboard-only path

### Visual QA

Capture screenshots of:

- landing
- mode selection
- goal selection
- representative questions
- adaptive follow-up
- loading/result transition
- every result graph
- mobile and desktop report
- print/export view

Inspect screenshots; do not merely generate them.

## Phase 14 — Documentation

Create:

```text
docs/assessment/
  README.md
  V1_BUILD_SPEC.md
  ARCHITECTURE.md
  DATA_MODEL.md
  ITEM_BANK.md
  ADAPTIVE_ENGINE.md
  SCORING_ENGINE.md
  CONTRADICTION_ENGINE.md
  CONFIDENCE_MODEL.md
  INTERPRETATION_ENGINE.md
  VISUALIZATION_SYSTEM.md
  AI_INTEGRATION.md
  SAFETY_RULES.md
  PRIVACY_MODEL.md
  TESTING_STRATEGY.md
  VALIDATION_STATUS.md
  KNOWN_LIMITATIONS.md
  IMPLEMENTATION_STATUS.md
  DECISION_LOG.md
  FUTURE_ROADMAP.md
```

Documentation must match the code.

## Phase 15 — Final audit

Audit for:

- unsupported claims
- accidental diagnosis
- deterministic identity language
- copyright risk
- chart-confirmation bias
- false graph precision
- accessibility defects
- privacy leakage
- AI-only functionality
- missing tests
- unversioned content
- dead branches
- inconsistent language
- mobile failures

Do not call the build complete with failing tests or undocumented limitations.

## Definition of done

The product is complete only when a user can:

- choose whom they are understanding
- complete a professional adaptive assessment
- receive deterministic results
- see baseline and stress patterns visually
- understand motivations, communication, conflict, needs, and tensions
- see where chart hypotheses fit and fail
- understand confidence and limitations
- receive practical actions
- save, resume, export, share selectively, and delete
- use the full experience without AI

And developers can:

- trace every result to versioned evidence
- add constructs and items without rewriting UI
- test every scoring and branch rule
- preserve historical results
- inspect all graph data
- run the application and full test suite with documented commands

## Final Codex completion report

At completion report:

- branch
- commits
- stack
- files created and modified
- V1 constructs
- candidate and typical item counts
- adaptive rules
- scoring and confidence approach
- chart adapter status
- visualizations implemented
- AI use
- tests and results
- accessibility status
- privacy behavior
- validation status
- founder input still required
- known defects
- deliberately deferred work
