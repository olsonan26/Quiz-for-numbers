# Codex Execution and Merge Contract

## Purpose

This document contains the repository-level execution rules that would otherwise require an oversized launch prompt. Codex should receive a short instruction pointing here, then use this repository as durable memory.

## Repositories

### Product repository

- Repository: `https://github.com/olsonan26/Quiz-for-numbers.git`
- Repository ID: `olsonan26/Quiz-for-numbers`
- Default branch: `main`
- Foundation branch: `feat/human-understanding-foundation`
- Foundation pull request: `#1`

All quiz application code, research artifacts, tests, documentation, and implementation changes belong here.

### Proprietary source repository

- Repository: `https://github.com/olsonan26/LOOKS-LIKE-COSTAR.git`
- Repository ID: `olsonan26/LOOKS-LIKE-COSTAR`
- Default branch: `main`

Treat this repository as read-only during the quiz build. It contains Alex Olson's current formulas, interpretations, number/name meanings, PMEI structures, timeline logic, and related application concepts. Follow `10_PROPRIETARY_ENGINE_INTEGRATION.md`.

Do not push changes to `LOOKS-LIKE-COSTAR` unless Alex explicitly assigns a separate task to do so.

## Starting state

At the time this contract was written:

- the Human Understanding research foundation exists on `feat/human-understanding-foundation`
- Draft PR #1 targets `main`
- the working quiz application has not yet been implemented
- the long-term product requirements live in this repository
- the proprietary formulas and meanings live primarily in `LOOKS-LIKE-COSTAR`

Codex must inspect the live state rather than assuming this status is unchanged.

## Initial workflow

1. Open or clone both repositories as sibling directories.
2. Fetch all branches and pull-request state.
3. Read `AGENTS.md`, `CODEX_START_HERE.md`, and all governing research documents.
4. Review Draft PR #1 before writing production code.
5. Repair any broken references, schemas, contradictions, or incomplete foundation requirements.
6. Validate the research foundation.
7. Update PR #1 with foundation corrections.
8. Mark PR #1 ready only when the foundation is coherent.
9. Merge PR #1 into `main` only when the review is clean and permissions allow it.
10. Create the implementation branch from the updated `main`.

If merge permissions are unavailable, create the implementation branch from `feat/human-understanding-foundation`, record the blocker, and continue. Do not stop the build solely because the foundation cannot be merged automatically.

## Foundation validation gate

Before merging PR #1, verify:

- every file referenced by `AGENTS.md` exists
- JSON schemas parse
- CSV templates have consistent headers
- internal file links resolve
- V1 scope is explicit
- scoring, branching, contradiction, confidence, visual, privacy, and safety requirements are implementable
- no document claims scientific, clinical, or diagnostic validation
- the proprietary-source integration document points to the live source repository
- founder decisions are distinguished from executable requirements
- the build plan and definition of done are consistent

Record corrections in the PR and in a decision log when material.

## Implementation branch

Preferred branch after the foundation merge:

```text
feat/human-understanding-quiz-v1
```

Do not implement directly on `main`.

Record the implementation base commit in:

```text
docs/assessment/IMPLEMENTATION_STATUS.md
```

## Implementation responsibility

Codex is responsible for creating the complete V1 application, not merely another plan or design document.

The implementation must include:

- production web application
- adaptive assessment flow
- versioned item bank
- deterministic scoring
- baseline-versus-stress modeling
- proprietary chart provider
- contradiction engine
- explainable confidence
- receiver-aware interpretation
- professional visual results
- practical recommendations
- save and resume
- local-first persistence
- export and deletion
- feedback and correction loop
- safety enforcement
- child-specific safeguards
- accessibility
- unit, component, end-to-end, safety, and visual tests
- documentation that matches the code

Follow `08_CODEX_BUILD_PLAN.md` in order unless a documented repository-specific reason requires a change.

## Durable-memory requirement

Codex must maintain:

```text
docs/assessment/IMPLEMENTATION_STATUS.md
docs/assessment/DECISION_LOG.md
docs/assessment/PROPRIETARY_SOURCE_AUDIT.md
docs/assessment/PROPRIETARY_RULE_QUESTIONS.md
```

Use these files instead of relying on conversational memory.

`IMPLEMENTATION_STATUS.md` must contain:

```markdown
## Completed
## In Progress
## Blocked
## Founder Input Needed
## Tests Passing
## Known Defects
## Deliberately Deferred
## Current Branch
## Current Commit
## Pull Request Status
```

## Autonomous work policy

Continue through implementation phases without asking Alex to approve every small decision.

Pause only when:

- repository access fails
- a destructive or irreversible action is required
- an external secret/account is required
- a legal or consent decision cannot be deferred
- a proprietary rule is genuinely unavailable and blocks that specific component
- two incompatible product directions cannot be resolved from the governing specifications
- merge permissions are unavailable at the final integration step

For a missing proprietary rule:

1. create a typed placeholder
2. mark it `founderInputRequired`
3. write the exact question in `PROPRIETARY_RULE_QUESTIONS.md`
4. continue all unrelated work

## Commit policy

Use small, reviewable commits. A suggested sequence is:

```text
docs: complete foundation review and V1 build specification
chore: initialize application and development tooling
feat: add assessment schemas and versioning
feat: add construct and item data system
feat: add adaptive questionnaire engine
feat: add deterministic scoring engine
feat: add contradiction and confidence engines
feat: port proprietary calculations with provenance tests
feat: build assessment experience
feat: build deterministic result interpretation
feat: add professional visualization dashboard
feat: add persistence export and deletion
feat: add feedback and correction loop
feat: add safety and privacy enforcement
feat: add optional AI narrative layer
test: add unit component and end-to-end coverage
fix: resolve accessibility and visual QA findings
docs: finalize implementation and validation status
```

Do not place the entire application in one commit.

## Implementation pull request

After the full vertical slice is functional:

1. push the implementation branch
2. open a draft PR against `main`
3. include architecture, screenshots, construct list, question counts, scoring, contradictions, confidence, proprietary-source status, visual modules, privacy, safety, tests, accessibility, limitations, and founder-input needs
4. review the full diff
5. repair all blocking defects
6. rerun all checks
7. mark the PR ready only when quality gates pass

## Merge quality gate

Merge the implementation PR into `main` only when:

- production build passes
- lint and strict type checking pass
- unit tests pass
- component tests pass
- end-to-end critical paths pass
- prohibited-output tests pass
- no high-severity privacy or safety defect remains
- visual QA screenshots were inspected
- charts work at 320px width and have text/table alternatives
- accessibility testing is completed and limitations are documented
- no secret is committed
- assessment and scoring versions persist with results
- AI-disabled fallback is complete
- proprietary provenance is recorded
- chart hypotheses can be contradicted
- documentation matches implementation
- no copyrighted assessment content is used improperly
- validation language is scientifically honest

If any gate is not met, keep the PR open and document the exact remaining work.

## Post-merge verification

After an authorized merge:

1. fetch and check out updated `main`
2. rerun the production build
3. rerun critical tests
4. start the merged application
5. complete at least one fixture assessment
6. verify result visuals and deterministic fallback
7. confirm export and deletion
8. update the root README
9. record the final merge commit

## Deployment boundary

Prepare deployment configuration, environment examples, and instructions. Do not deploy to a third-party production environment without explicit authorization.

## Completion report

The final report must include:

- foundation PR review and merge status
- foundation merge commit or exact blocker
- implementation branch and PR
- implementation merge commit or exact blocker
- final `main` commit
- technology stack
- constructs and item counts
- adaptive question range
- scoring, contradiction, and confidence models
- proprietary source commit and ported modules
- graphs and result modules
- safety and privacy controls
- AI behavior and fallback
- test and build results
- accessibility and visual QA status
- screenshots produced
- known limitations
- founder decisions still needed
- exact local-run commands
- deployment-readiness status

Do not claim completion when required checks fail or major work remains.