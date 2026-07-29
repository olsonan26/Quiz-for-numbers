# Human Understanding Engine Research Package

This directory is the product, research, psychometric, ethical, and implementation foundation for the Quiz for Numbers project.

## North star

> Build a human-understanding engine that combines proprietary name- and number-based hypotheses with behavioral evidence, context, contradiction analysis, and practical guidance so users can understand themselves and the people who matter most.

The product is not merely a personality labeler. It should explain:

- who the person appears to be
- what motivates them
- how they behave when secure versus stressed
- what they need but may not communicate
- what others misunderstand about them
- where internal tensions exist
- how to communicate and work with them
- where the evidence is strong, mixed, or insufficient

## Governing model

```text
Chart hypotheses
+ lived behavior
+ observer context
+ current conditions
+ developmental stage
+ contradictions
= contextual human understanding
```

## Document map

- `00_EXECUTIVE_SUMMARY.md` — mission, V1 decision, risks, and build outcome
- `01_PROJECT_THESIS.md` — product philosophy and differentiation
- `02_RESEARCH_AND_EVIDENCE_METHOD.md` — research hierarchy, psychometrics, and evidence grading
- `03_HUMAN_UNDERSTANDING_CONSTRUCT_MAP.md` — the human dimensions the engine must represent
- `04_V1_ASSESSMENT_SPEC.md` — locked pilot quiz architecture and user journey
- `05_RESULTS_AND_VISUALIZATION_SPEC.md` — professional report, graphs, dashboards, and visual integrity rules
- `06_SCORING_CONTRADICTION_AND_CONFIDENCE.md` — deterministic scoring and evidence integration
- `07_ETHICS_PRIVACY_AND_VALIDATION.md` — prohibited uses, consent, privacy, and validation program
- `08_CODEX_BUILD_PLAN.md` — phased implementation instructions and acceptance criteria
- `09_SOURCE_CORPUS_AND_RESEARCH_BACKLOG.md` — instructors, frameworks, primary-source research tasks, and backlog
- `schemas/assessment-blueprint.schema.json` — implementation-facing assessment schema
- `schemas/result-profile.schema.json` — implementation-facing result schema

## Required status labels

Every scientific or proprietary statement must be tagged internally as one of:

- established evidence
- substantial but limited evidence
- promising evidence
- contested or theoretical
- proprietary hypothesis
- unsupported or not yet tested

## Non-negotiables

- Do not describe the pilot as clinically or scientifically validated.
- Do not force chart interpretations to be correct.
- Do not use AI as the hidden measurement engine.
- Do not diagnose, predict catastrophe, or permanently label children.
- Do not let beautiful graphs imply unsupported certainty.
- Do not build the entire theory of humanity before shipping one useful vertical slice.

## Intended Codex starting instruction

> Read `AGENTS.md` and every file in this directory. Then complete the repository audit, lock the V1 build specification, create the data schemas and test fixtures, and build the product in the phases defined in `08_CODEX_BUILD_PLAN.md`. Keep all scoring deterministic, all content versioned, and all graph values traceable to structured evidence.
