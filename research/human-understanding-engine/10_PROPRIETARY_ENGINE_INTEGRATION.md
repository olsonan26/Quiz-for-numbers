# Proprietary Calculation and Interpretation Engine Integration

## Purpose

The Human Understanding Engine must not invent Alex Olson's number, name, timeline, or Lettrology rules. A separate existing repository contains the current working implementation of many formulas, profile structures, interpretation tables, and UI concepts.

Reference repository:

- Repository: `https://github.com/olsonan26/LOOKS-LIKE-COSTAR.git`
- Repository ID: `olsonan26/LOOKS-LIKE-COSTAR`
- Default branch: `main`
- Reference commit observed during foundation preparation: `023140de4ac9ebad8a804b4c984337135e77b19a`

Codex must inspect the live repository and pin the exact commit it actually uses. The SHA above is a starting reference, not permission to ignore newer founder work.

## Role of the reference repository

Treat `LOOKS-LIKE-COSTAR` as a **read-only proprietary source repository** during this build.

It currently contains at least:

- Pythagorean letter-value calculations
- number-reduction and compound-chain logic
- master-number handling
- core number calculations
- called-name calculations
- name-number interpretations
- birth-date calculations
- timeline calculations
- daily, monthly, and yearly meanings
- warning-pattern content
- profile and report type definitions
- existing name analysis, self, love, and timeline interface concepts

It is not automatically the final architecture for the quiz. It is a source of founder-authored calculations, hypotheses, meanings, terminology, and test cases.

## Known important source files

Codex must inspect the entire repository, not only these files. These are confirmed high-priority starting points:

### `services/numerology.ts`

Contains current formulas and helpers including:

- `getLetterValue`
- `reduceToSingleDigit`
- `reduceNumberWithChain`
- `getReductionSequence`
- `getValueFromName`
- `getCoreNumbers`
- `getCalledNameValue`
- personal year/month calculations
- yearly, monthly, and daily essence calculations
- active-name logic
- timeline-slice generation

### `services/descriptions.ts`

Contains interpretation routing including:

- core-number description lookup
- name-number meaning lookup
- day-level warnings
- month-level warnings
- timeline meaning selection
- master-number fallbacks
- karmic-debt interpretation additions

### `services/data.ts`

Contains founder-authored meaning data including daily essence, personal year, combiners, core-number descriptions, warning patterns, and other interpretation content.

### `services/nameNumberDescriptions.ts`

Contains current founder-authored static name-number meanings for numbers 1–9, with titles, full descriptions, and condensed descriptions.

### `types.ts`

Contains existing profile, calculation, meaning, core-number, name-number, timeline, PMEI, career, and report structures. Of particular interest are:

- `UserProfile`
- `CalculationResult`
- `CoreNumber`
- `NameNumberMeaning`
- `PMEIReport`
- PMEI plane, genius-factor, blind-spot, bad-habit, harmony, and tone structures

The PMEI types indicate a deeper existing model involving physical, mental, emotional, and intuitive planes. Codex must locate the actual implementation and source data before recreating or integrating it.

### `constants.ts`

Contains current master numbers, karmic debt numbers, letter-value tables, and vowel definitions.

## Required discovery work

Before implementing the proprietary adapter, Codex must inventory the reference repository and produce:

```text
docs/assessment/PROPRIETARY_SOURCE_AUDIT.md
```

The audit must identify:

- every calculation module
- every interpretation-data module
- every static personality/name module
- every timeline module
- every PMEI/Lettrology module
- every relationship or compatibility module
- every career/direction module
- every current AI prompt or generated interpretation path
- every relevant UI component
- dependencies between modules
- duplicated or conflicting formulas
- incomplete or placeholder content
- safety-sensitive wording
- source commit SHA

Do not assume file names from this document are exhaustive.

## Integration strategy

Do not create a runtime dependency on a separate GitHub repository.

Use one of these implementation approaches, in order of preference:

1. Extract the founder calculation logic into a clean, versioned package inside `Quiz-for-numbers`.
2. Port the required modules into `src/proprietary/` with provenance headers and characterization tests.
3. If a reusable package is clearly justified, create it inside this repository first and document a future extraction plan.

Suggested destination:

```text
src/
  proprietary/
    sourceManifest.ts
    types.ts
    calculations/
    meanings/
    hypotheses/
    adapters/
    tests/
```

Every imported or adapted rule must record:

- source repository
- source path
- source commit SHA
- port date
- local version
- whether behavior was preserved or intentionally changed
- founder-review status

## Preserve before improving

Codex must first reproduce the current formula outputs before refactoring their behavior.

Create characterization tests for:

- letter values A–Z
- vowels and consonants
- reduction chains
- master numbers 11, 22, and 33
- karmic debt compounds 13, 14, 16, and 19
- Expression
- Ultimate Goal
- Soul Urge
- Birth Force
- Balance Number
- Called Name
- PMEI calculations when located
- active-name behavior when relevant
- representative timeline calculations, even if timeline is excluded from V1

The new implementation must show whether it matches or intentionally differs from the source.

Do not silently "clean up" a formula and change historical results.

If a formula appears inconsistent, document it in:

```text
docs/assessment/PROPRIETARY_RULE_QUESTIONS.md
```

Then preserve the current result behind a legacy version until Alex approves a change.

## V1 use of proprietary logic

Version 1 is a Human Understanding assessment, not a future-prediction product.

Prioritize proprietary components that describe the person:

- name-number meanings
- core numbers
- called-name dynamics
- birth-derived identity hypotheses
- PMEI/Lettrology planes and patterns
- strengths, needs, tendencies, conflicts, and possible stress expressions

Keep timeline logic isolated and versioned, but do not expose future-prediction features in the V1 quiz unless the governing specification is intentionally changed.

Timeline modules may still be used for:

- regression tests
- future research architecture
- retrospective pattern analysis
- identifying reusable calculation primitives

## Meanings are hypotheses, not proven traits

Founder-authored meanings must enter the assessment as structured proprietary hypotheses.

They must not automatically become final conclusions.

Each meaning should be mapped into fields such as:

- hypothesis ID
- source number/calculation
- proposed construct
- proposed facet
- baseline expression
- possible stress expression
- possible strength
- possible vulnerability
- behavioral predictions
- questions that test the hypothesis
- evidence supporting it
- evidence contradicting it
- result status
- founder version

The possible result statuses are:

- supported
- partially supported
- contextually supported
- contradicted
- unresolved
- insufficient evidence

The system must be allowed to conclude that a number or name interpretation was not supported by questionnaire evidence.

## Interpretation-content audit

Existing interpretations include a mixture of:

- behavioral descriptions
- coaching guidance
- motivational language
- spiritual language
- past-life or karmic claims
- timeline warnings
- risk statements

Codex must classify interpretation content before using it in V1:

1. safe behavioral hypothesis
2. coaching suggestion
3. spiritual framing requiring explicit positioning
4. timeline-only content
5. high-sensitivity content requiring founder review
6. prohibited or unsuitable for V1

Do not automatically surface past-life, death, catastrophe, diagnosis, guaranteed future, or fear-inducing claims in the Human Understanding report.

Preserve source content in the research layer when needed, but make public V1 output follow the safety specification.

## Date and name handling

The reference implementation uses UTC date accessors in several calculations. Preserve and test date behavior carefully so local timezone conversion does not change a user's birth date.

The system must distinguish:

- legal birth name
- preferred/called name
- married or changed name
- current display name
- the name used for each proprietary calculation

Do not infer which name should control a calculation without an explicit founder rule.

The existing six-month married-name adoption rule is timeline-specific and must not automatically be applied to all identity calculations.

## Cross-repository working method

Codex should clone both repositories as siblings when possible:

```text
workspace/
  Quiz-for-numbers/
  LOOKS-LIKE-COSTAR/
```

All product changes belong in `Quiz-for-numbers` unless Alex explicitly requests changes to the source repository.

Do not push changes to `LOOKS-LIKE-COSTAR` as part of the quiz assignment.

## Required adapter

Implement a typed provider such as:

```ts
interface ProprietaryChartProvider {
  readonly providerId: string;
  readonly calculationVersion: string;
  readonly interpretationVersion: string;
  readonly sourceCommit: string;

  calculateProfile(input: ProprietaryProfileInput): ProprietaryProfile;
  getHypotheses(profile: ProprietaryProfile): ChartHypothesis[];
  explainCalculation(resultId: string): CalculationTrace;
}
```

The provider must separate:

- raw inputs
- calculations
- calculated values
- founder-authored meanings
- construct mappings
- questionnaire evidence
- final interpretations

## Required provenance manifest

Create a machine-readable manifest similar to:

```json
{
  "sourceRepository": "olsonan26/LOOKS-LIKE-COSTAR",
  "sourceCommit": "<pinned-sha>",
  "portedFiles": [],
  "calculationVersion": "legacy-costar-1.0.0",
  "interpretationVersion": "founder-meanings-1.0.0",
  "reviewedByFounder": false
}
```

The manifest must ship with the implementation and be preserved in completed results.

## Definition of complete integration

The proprietary integration is not complete until:

- the source repository has been audited
- the exact source commit is pinned
- required formulas have characterization tests
- V1 personality-relevant modules are ported or adapted
- timeline modules remain isolated
- meanings are structured as testable hypotheses
- source provenance is preserved
- contradictions are allowed
- founder questions are documented
- no sensitive source wording leaks into public reports without review
- the quiz works with a deterministic fallback even when proprietary content is incomplete
