# Codex Build Plan

## Operating instruction

Read `AGENTS.md` and every document in this directory before implementing production behavior.

Do not respond with a research plan only. Create the application, tests, documentation, fixtures, and pull requests. Use the repository as durable memory and update implementation status as work proceeds.

Follow `11_EXECUTION_AND_MERGE_CONTRACT.md` for foundation review, branch creation, pull requests, quality gates, and merging.

## Repository policy

Work with two repositories:

- product repository: `olsonan26/Quiz-for-numbers`
- read-only proprietary source: `olsonan26/LOOKS-LIKE-COSTAR`

All product changes belong in `Quiz-for-numbers` unless Alex explicitly assigns a separate source-repository task.

## Branch policy

1. Review and repair foundation PR #1.
2. Merge it into `main` only after the foundation quality gate passes and permissions allow it.
3. Create a new implementation branch from updated `main`, preferably:

```text
feat/human-understanding-quiz-v1
```

4. Open a separate implementation PR.
5. Merge the implementation only after every required quality gate passes.

When permissions block a merge, leave the PR fully ready and report the exact manual action required.

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
- implementation base commit recorded

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
- proprietary source integration boundary
- world-class benchmark criteria

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
- proprietary profile and calculation trace
- source provenance manifest
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
- historical sessions preserve content, scoring, proprietary, interpretation, and visual versions
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

## Phase 6 — Proprietary calculation and chart-hypothesis integration

Follow `10_PROPRIETARY_ENGINE_INTEGRATION.md`.

Clone or inspect `olsonan26/LOOKS-LIKE-COSTAR` as the read-only source for Alex Olson’s current rules.

Before porting logic, create:

```text
docs/assessment/PROPRIETARY_SOURCE_AUDIT.md
docs/assessment/PROPRIETARY_RULE_QUESTIONS.md
```

The source audit must identify:

- formula modules
- core-number calculations
- called-name logic
- PMEI/Lettrology calculations
- name and number meanings
- relationship and career modules
- timeline modules
- duplicated or conflicting rules
- source commit SHA
- safety-sensitive interpretation content

Port personality-relevant V1 logic into a versioned `src/proprietary/` boundary with provenance.

Create characterization tests before refactoring:

- A–Z letter values
- vowels and consonants
- reduction chains
- master numbers
- karmic debt compounds
- Expression
- Ultimate Goal
- Soul Urge
- Birth Force
- Balance Number
- Called Name
- PMEI calculations when located
- representative timeline calculations for regression only

The provider must separate:

- raw inputs
- calculations
- calculated values
- founder-authored meanings
- construct mappings
- questionnaire evidence
- final interpretations

Use typed placeholders only for rules genuinely absent from the source. Mark them `founderInputRequired` and continue unrelated work.

The adapter should produce structured hypotheses without exposing them to the user before the quiz.

The system must allow each proprietary hypothesis to be:

- supported
- partially supported
- contextually supported
- contradicted
- unresolved
- insufficient evidence

Do not expose future-prediction features in V1.

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

Do not manufacture explanations that preserve a chart hypothesis.

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
6. receiver preference
7. adaptive questions
8. progress
9. pause/resume
10. answer review
11. result generation
12. report
13. feedback
14. export/share controls
15. deletion

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

- meaningful title and human question
- deterministic data input
- evidence traceability
- uncertainty representation
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

Do not transmit raw answers to an external AI without explicit consent.

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
- proprietary characterization
- recommendations
- safety filters
- visualization transforms
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
  PROPRIETARY_SOURCE_AUDIT.md
  PROPRIETARY_RULE_QUESTIONS.md
  CHART_PROVIDER.md
  INTERPRETATION_ENGINE.md
  VISUALIZATION_SYSTEM.md
  COMPETITIVE_BENCHMARK.md
  AI_INTEGRATION.md
  SAFETY_RULES.md
  CHILD_SAFETY.md
  PRIVACY_MODEL.md
  TESTING_STRATEGY.md
  ACCESSIBILITY.md
  VALIDATION_STATUS.md
  KNOWN_LIMITATIONS.md
  IMPLEMENTATION_STATUS.md
  DECISION_LOG.md
  FUTURE_ROADMAP.md
```

Documentation must match the code.

## Phase 15 — World-class benchmark review

Follow `12_WORLD_CLASS_BENCHMARK.md`.

Create `docs/assessment/COMPETITIVE_BENCHMARK.md` comparing the implementation with representative commercial and established assessment categories without copying their proprietary content.

Evaluate:

- behavioral specificity
- context sensitivity
- baseline-versus-stress modeling
- contradiction handling
- evidence transparency
- confidence communication
- visual depth
- actionability
- relationship usefulness
- child appropriateness
- accessibility
- privacy
- scientific honesty
- proprietary differentiation

The purpose is to expose gaps, not to make unsupported superiority claims.

## Phase 16 — Final audit

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
- missing proprietary provenance
- dead branches
- inconsistent language
- mobile failures
- documentation/code mismatch

Do not call the build complete with failing tests or undocumented limitations.

## Definition of done

The product is complete only when a user can:

- choose whom they are understanding
- complete a professional adaptive assessment
- receive deterministic results
- see baseline and stress patterns visually
- understand motivations, communication, conflict, needs, and tensions
- see where proprietary chart hypotheses fit and fail
- understand confidence and limitations
- receive practical actions
- save, resume, export, share selectively, and delete
- use the full experience without AI

And developers can:

- trace every result to versioned evidence
- trace proprietary rules to a pinned source commit
- add constructs and items without rewriting UI
- test every scoring and branch rule
- preserve historical results
- inspect all graph data
- run the application and full test suite with documented commands

And the repository workflow is complete only when:

- foundation PR status is documented
- implementation PR status is documented
- merge quality gates were applied
- merged `main` was verified, or the exact permission blocker is stated

## Final Codex completion report

At completion report:

- foundation PR review and merge status
- foundation merge commit or blocker
- implementation branch and PR
- implementation merge commit or blocker
- final `main` commit
- stack
- files created and modified
- V1 constructs
- candidate, minimum, typical, and maximum item counts
- adaptive rules
- scoring and confidence approach
- contradiction model
- proprietary source commit and ported modules
- chart adapter status
- visualizations implemented
- AI use and fallback
- tests and results
- accessibility status
- visual QA status
- privacy behavior
- validation status
- founder input still required
- known defects
- deliberately deferred work
- local-run commands
- deployment-readiness status