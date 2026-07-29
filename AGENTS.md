# AGENTS.md — Human Understanding Engine

## Mission
Build a professional, mobile-first human-understanding assessment that combines:

- proprietary name/number hypotheses
- behavioral and situational questions
- self-report and observer context
- baseline versus stress behavior
- contradiction analysis
- confidence and uncertainty
- practical, receiver-aware guidance
- deep, honest visual results

The target user reaction is: **“I finally understand who this person is, how their patterns work, and how to interact with them better.”**

This is a developmental assessment, not a clinical diagnosis and not yet a scientifically validated psychological test.

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

Treat those documents as the governing product specification. When implementation and documentation conflict, document the conflict before changing the specification.

## Build principles

1. **Data-driven, not hardcoded.** Questions, constructs, scoring, branches, chart hypotheses, interpretations, safety rules, and visualizations must be represented as versioned structured data.
2. **Deterministic measurement.** AI may narrate structured findings, but it must not secretly determine scores, confidence, contradictions, branches, or safety classifications.
3. **Chart hypotheses may fail.** The system must be able to say that questionnaire evidence did not support a proprietary hypothesis.
4. **No false precision.** User-facing confidence should use explainable categories such as strongly supported, moderately supported, tentative, conflicting, or insufficient information.
5. **Context matters.** Separate baseline behavior, stress behavior, role behavior, current state, developmental stage, and learned adaptation.
6. **Action over labels.** Every major result should help the user communicate, decide, support, regulate, or relate more effectively.
7. **Visual depth with restraint.** Graphs must reveal meaningful patterns, not decorate the report or imply unsupported scientific precision.
8. **Privacy first.** Treat names, dates, relationship data, and answers as sensitive. Prefer local-first storage for V1.
9. **Accessible and mobile-first.** Build for small screens, touch, keyboard, screen readers, reduced motion, and clear contrast.
10. **Research prototype language.** Never claim clinical, diagnostic, or scientific validation until real validation work has been completed.

## V1 scope lock
Unless the specification is intentionally revised, V1 is one complete vertical slice:

- assessment target: self, child, partner, or another person
- primary goal selection: communication, motivation, conflict, emotional reactions, decision-making, stress patterns, strengths, or direction
- approximately 12 core constructs
- approximately 36–48 adaptive questions
- baseline and stress comparison
- chart-hypothesis integration as a separate evidence source
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
```

Maintain separation between content, scoring, branching, interpretation, visuals, persistence, and UI.

## Required result visuals
At minimum implement:

- Human Pattern Wheel
- Baseline vs Stress comparison
- Motivation hierarchy
- Communication and conflict profile
- Needs and sensitivities balance
- Pattern interaction or tension map
- Evidence/confidence panel
- chart-versus-behavior alignment view
- growth leverage matrix
- practical “how to work with me” card

Visual rules are defined in `05_RESULTS_AND_VISUALIZATION_SPEC.md`.

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
- prohibited language tests pass
- mobile and keyboard flows work
- data can be deleted and exported
- build, lint, type-check, unit, component, and end-to-end tests pass

## Definition of done
A screen rendering is not completion. V1 is done only when the full assessment can be started, saved, resumed, completed, scored, visualized, explained, corrected through feedback, exported, and deleted—while preserving uncertainty, safety, versioning, and deterministic behavior.

## Founder input that must not be invented
Do not invent final proprietary number/name meanings, legal claims, clinical claims, model-training consent, pricing, or future-prediction rules. Use explicit placeholders and continue unrelated work.
