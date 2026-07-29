# AGENTS.md — Human Understanding Engine

## Mission

Build a professional, mobile-first human-understanding assessment that combines:

- founder-authored name, number, and Lettrology hypotheses
- behavioral and situational questions
- self-report and observer context
- baseline versus stress behavior
- contradiction analysis
- confidence and uncertainty
- practical, receiver-aware guidance
- deep, honest visual results

The target user reaction is:

> “I finally understand who this person is, how their patterns work, and how to interact with them better.”

This is a developmental assessment, not a clinical diagnosis and not yet a scientifically validated psychological test.

## Repositories

### Product repository

`https://github.com/olsonan26/Quiz-for-numbers.git`

All quiz code, documentation, research, tests, and pull requests belong here.

### Proprietary calculation and interpretation source

`https://github.com/olsonan26/LOOKS-LIKE-COSTAR.git`

Treat this as a read-only source during the quiz build. It contains Alex Olson’s current calculations, number/name meanings, Lettrology/PMEI structures, timeline logic, and interpretation content. Do not invent replacements and do not push changes there unless Alex explicitly assigns a separate task.

Follow `research/human-understanding-engine/10_PROPRIETARY_ENGINE_INTEGRATION.md`.

## Required reading before implementation

Read these files in order:

1. `research/human-understanding-engine/00_EXECUTIVE_SUMMARY.md`
2. `research/human-understanding-engine/01_PROJECT_THESIS.md`
3. `research/human-understanding-engine/02_RESEARCH_AND_EVIDENCE_METHOD.md`
4. `research/human-understanding-engine/03_HUMAN_UNDERSTANDING_CONSTRUCT_MAP.md`
5. `research/human-understanding-engine/04_V1_ASSESSMENT_SPEC.md`
6. `research/human-understanding-engine/05_RESULTS_AND_VISUALIZATION_SPEC.md`
7. `research/human-understanding-engine/06_SCORING_CONTRADICTION_AND_CONFIDENCE.md`
8. `research/human-understanding-engine/07_ETHICS_PRIVACY_AND_VALIDATION.md`
9. `research/human-understanding-engine/08_CODEX_BUILD_PLAN.md`
10. `research/human-understanding-engine/09_SOURCE_CORPUS_AND_RESEARCH_BACKLOG.md`
11. `research/human-understanding-engine/10_PROPRIETARY_ENGINE_INTEGRATION.md`
12. `research/human-understanding-engine/11_EXECUTION_AND_MERGE_CONTRACT.md`
13. `research/human-understanding-engine/12_WORLD_CLASS_BENCHMARK.md`

Treat these documents as the governing product specification. When implementation and documentation conflict, document the conflict in `docs/assessment/DECISION_LOG.md` before changing the specification.

## Build principles

1. **Data-driven, not hardcoded.** Questions, constructs, scoring, branches, chart hypotheses, interpretations, safety rules, and visualizations must be versioned structured data.
2. **Deterministic measurement.** AI may narrate structured findings, but it must not determine scores, confidence, contradictions, branches, or safety classifications.
3. **Founder rules are source material.** Port and test the real calculations and meanings from `LOOKS-LIKE-COSTAR`; do not fabricate them.
4. **Preserve provenance.** Every ported proprietary rule records source repository, path, commit SHA, local version, and founder-review status.
5. **Chart hypotheses may fail.** The system must be able to say that questionnaire evidence did not support a proprietary hypothesis.
6. **No false precision.** Use explainable categories such as strongly supported, moderately supported, tentative, conflicting, or insufficient information.
7. **Context matters.** Separate baseline behavior, stress behavior, role behavior, current state, developmental stage, and learned adaptation.
8. **Action over labels.** Every major result should help the user communicate, decide, support, regulate, or relate more effectively.
9. **Visual depth with restraint.** Graphs must reveal meaningful patterns, not decorate the report or imply unsupported scientific precision.
10. **Privacy first.** Treat names, dates, relationships, and answers as sensitive. Prefer local-first storage for V1.
11. **Accessible and mobile-first.** Build for small screens, touch, keyboard, screen readers, reduced motion, and clear contrast.
12. **Research-prototype language.** Never claim clinical, diagnostic, or scientific validation until real validation work has been completed.
13. **World-class benchmark.** Aim to surpass leading commercial assessments through context, contradiction intelligence, visual clarity, actionability, transparency, safety, and measurable outcomes—not through length or hype.

## V1 scope lock

Unless the governing specification is intentionally revised, V1 is one complete vertical slice:

- assessment target: self, child, partner, or another person
- primary goal selection: communication, motivation, conflict, emotional reactions, decision-making, stress patterns, strengths, or direction
- approximately 12 core constructs
- approximately 36–48 adaptive questions selected from a larger pilot bank
- baseline and stress comparison
- proprietary chart-hypothesis integration as a separate evidence source
- contradiction engine
- explainable confidence
- professional visual report
- practical recommendations
- feedback and correction loop

Do not add timeline prediction, diagnosis, hiring decisions, medical inference, death prediction, or deterministic relationship outcomes to V1.

## Suggested architecture

```text
src/
  assessment/
    data/
    engine/
    schemas/
    components/
    charts/
    reports/
    safety/
    persistence/
    tests/
  proprietary/
    calculations/
    meanings/
    hypotheses/
    adapters/
    tests/
```

Maintain separation between content, scoring, branching, interpretation, visuals, persistence, proprietary source logic, and UI.

## Required result visuals

At minimum implement:

- Human Pattern Wheel
- Baseline vs Stress comparison
- Motivation Hierarchy
- Communication Profile
- Conflict Process Map
- Needs and Sensitivities Balance
- Pattern Interaction Map
- Chart vs Behavior Alignment
- Evidence and Confidence Panel
- Growth Leverage Matrix
- Environment Fit Dashboard
- practical “How to Work With Me” card

Visual rules are defined in `05_RESULTS_AND_VISUALIZATION_SPEC.md`.

## Branch and merge policy

Follow `11_EXECUTION_AND_MERGE_CONTRACT.md`.

In summary:

- review and repair foundation PR #1
- merge the foundation only after its quality gate passes
- create a separate implementation branch
- build and test the complete application
- open an implementation PR
- merge only after build, test, safety, privacy, visual, and accessibility gates pass
- verify updated `main` after merge

If merge permissions are unavailable, leave the PR fully ready and document the exact manual action required.

## Safety boundaries

The product must not output claims such as:

- “This person is a narcissist.”
- “Your child will become…”
- “This person cannot be trusted.”
- “Your marriage will fail.”
- “This proves trauma.”
- “This person is dangerous.”
- “You should leave your partner.”
- “Their name proves they are manipulative.”
- medical, psychiatric, mortality, or catastrophe predictions

Discuss behaviors and uncertainty; do not diagnose or declare fate.

## Testing requirements

Before marking work complete, verify:

- identical inputs and versions produce identical structured results
- unrelated answers do not alter unrelated constructs
- missing or uncertain answers cannot increase confidence
- contradictions cannot produce maximum confidence
- chart agreement alone cannot create high behavioral confidence
- receiver tone never changes scoring
- AI failure still produces a complete deterministic report
- proprietary calculation characterization tests pass or intentional differences are documented
- prohibited-language tests pass
- mobile and keyboard flows work
- graphs have accessible alternatives
- data can be deleted and exported
- build, lint, type-check, unit, component, and end-to-end tests pass

## Definition of done

A screen rendering is not completion. V1 is done only when the full assessment can be started, saved, resumed, completed, scored, visualized, explained, corrected through feedback, exported, and deleted—while preserving uncertainty, safety, versioning, proprietary provenance, and deterministic behavior.

## Founder input that must not be invented

Do not invent final proprietary meanings, calculation changes, legal claims, clinical claims, model-training consent, pricing, or future-prediction rules. Use typed placeholders, record exact questions, and continue unrelated work.