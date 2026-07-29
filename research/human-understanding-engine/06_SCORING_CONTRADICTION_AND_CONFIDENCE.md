# Scoring, Contradiction, and Confidence

## Measurement principle

The engine must separate four things that are often collapsed:

1. **expression** — where the person appears on a construct
2. **context shift** — how expression changes by situation
3. **confidence** — how much evidence supports the conclusion
4. **chart alignment** — whether proprietary hypotheses agree with behavior

A high expression score is not automatically high confidence. Chart agreement is not behavioral proof. Contradiction is not noise to hide.

## Deterministic pipeline

```text
validated profile context
+ versioned question responses
+ versioned chart hypotheses
+ response-quality indicators
→ item scoring
→ facet aggregation
→ construct aggregation
→ baseline/stress separation
→ contradiction detection
→ confidence classification
→ interaction rules
→ structured insights
→ deterministic narrative and visual data
→ optional AI narrative enhancement
```

The same inputs and versions must always produce the same structured output.

## Item scoring

Every scored option specifies:

- construct ID
- facet ID
- direction
- weight
- context: baseline, stress, relationship, decision, conflict, or general
- evidence type
- whether the item is reverse keyed
- minimum confidence contribution

Do not score “not sure,” “not observed,” or “prefer not to answer” toward a trait. They contribute to missingness and confidence limits.

## Scale philosophy

Internally, scores may use normalized numeric ranges for calculation. User-facing outputs should primarily use interpretable bands:

- lower expression
- moderate expression
- higher expression
- context-dependent
- conflicting
- insufficient evidence

Avoid labeling poles as negative and positive.

## Facet aggregation

Constructs should contain distinct facets. Do not average opposing facets into a meaningless middle.

Example: social engagement may contain:

- initiative
- expressiveness
- stimulation preference
- recovery need

A person could show high initiative and high recovery need. Report that pattern instead of “moderate extraversion.”

## Baseline and stress separation

Store separate estimates:

- baseline expression
- stress expression
- shift direction
- shift magnitude band
- shift confidence

Do not infer stress behavior from baseline items alone.

## Context profiles

When evidence allows, store contextual modifiers such as:

- close relationship
- authority
- group setting
- public evaluation
- unfamiliar environment
- high uncertainty
- time pressure

V1 should only display context-specific conclusions supported by multiple observations or a clarifying follow-up.

## Response-quality indicators

Use these as confidence modifiers, not accusation tools:

- unusually fast completion
- repeated identical responses
- incompatible answer pairs
- excessive uncertainty
- low observer familiarity
- high current-state disruption
- skipped sections
- attention-check failures where ethically appropriate

Never tell the user they lied. Use language such as “The available answers were too inconsistent for a firm conclusion.”

## Confidence model

Confidence is based on explainable components:

- item coverage
- facet coverage
- internal consistency
- contextual consistency
- response quality
- observer familiarity
- current-state contamination
- contradiction severity
- source convergence

Suggested internal components:

```ts
interface ConfidenceComponents {
  coverage: number;
  consistency: number;
  contextStability: number;
  responseQuality: number;
  observerQuality?: number;
  contradictionPenalty: number;
  stateContaminationPenalty: number;
}
```

User-facing classifications:

- **Strongly supported** — broad, consistent evidence with no major unresolved contradiction
- **Moderately supported** — adequate evidence with minor uncertainty
- **Tentative** — limited coverage or meaningful context dependence
- **Conflicting** — credible evidence points in different directions
- **Insufficient information** — minimum evidence threshold not reached

Do not show a user-facing 87% confidence unless formal calibration later justifies that interpretation.

## Chart hypothesis scoring

Chart evidence is stored separately from behavioral evidence.

Each hypothesis record specifies:

- construct and facet
- expected direction
- expected contexts
- expected stress pattern
- testing items
- minimum behavioral evidence

Classification rules:

### Strongly supported
Behavioral evidence agrees across multiple items and relevant contexts.

### Partially supported
Some predicted facets appear, but not the full hypothesis.

### Contextually supported
The hypothesis appears only under defined relationships, roles, or stress conditions.

### Contradicted
Adequate behavioral evidence consistently opposes the hypothesis.

### Unresolved
Evidence is missing, inconsistent, or too state-contaminated.

Chart alignment must not inflate behavioral confidence beyond a capped contribution until incremental validity is established.

## Contradiction engine

A contradiction is a structured comparison between credible evidence sources.

Types:

- item versus item
- baseline versus stress
- self versus observer
- chart versus behavior
- stated preference versus situational choice
- one relationship context versus another
- current behavior versus longstanding behavior

Possible explanation categories:

- context dependent
- stress shift
- role adaptation
- competing needs
- developmental change
- temporary state
- impression management possible
- observer perspective limitation
- insufficient information
- chart hypothesis not supported

The engine must not automatically select an explanation. It should rank only explanations allowed by explicit rules and evidence.

## Contradiction severity

### Minor
Small differences within expected measurement variation.

### Moderate
A repeated difference requiring context or follow-up.

### Strong
Multiple credible sources point in opposing directions.

Strong contradictions reduce confidence and should appear in the result when practically meaningful.

## Follow-up rules

Trigger follow-up when:

- two independent items strongly conflict
- chart and behavior oppose each other with adequate evidence
- baseline and stress patterns reverse
- a high-priority goal construct remains tentative
- observer claims an inner state without observable basis
- current stress may explain a large portion of the result

Follow-ups should ask for context, time course, relationship specificity, or observable examples.

## Interaction rules

Interactions must be versioned logic, not free-form AI inference.

Example:

```text
IF autonomy = high
AND belonging = high
AND criticism sensitivity = moderate/high
THEN candidate interaction = connection-without-control tension
REQUIRE minimum confidence = moderate for all inputs
```

Each interaction has:

- required inputs
- prohibited conditions
- strength expression
- friction expression
- context conditions
- recommendation IDs
- confidence rule

## Recommendation scoring

Recommendations should be selected by:

- primary user goal
- high-confidence patterns
- meaningful stress shifts
- high-impact interactions
- user relationship mode
- receiver preference
- safety restrictions

Never select a strong recommendation from a tentative single construct.

Recommendations should be ranked by:

- likely relevance
- evidence confidence
- expected effort
- potential impact
- safety

## Deterministic narrative

Every insight should be assembled from validated templates with slots for:

- pattern
- context
- evidence status
- common misunderstanding
- practical implication
- limitation

Example template:

> Under {context}, {subject} tends to {behavior}. This appears connected to {need_or_sensitivity}. Others may interpret it as {misinterpretation}, although the evidence suggests {better_explanation}. {recommendation}. Confidence: {confidence_label}.

AI enhancement may rewrite for flow but may not introduce claims outside the structured insight object.

## Required invariants

Automated tests must prove:

- identical input/version produces identical result
- unrelated answers cannot change unrelated constructs
- missing data cannot raise confidence
- uncertainty options cannot count as confirmation
- chart evidence alone cannot produce strong behavioral confidence
- strong contradiction prevents maximum confidence
- receiver tone cannot change scoring
- AI output cannot alter structured scores
- no construct result appears below minimum evidence
- historical results preserve their versioned scores after rules change

## Validation status object

Every result should include:

```ts
interface ValidationStatus {
  instrumentStatus: "developmental" | "pilot" | "validated-for-limited-use";
  validatedPopulations: string[];
  unvalidatedPopulations: string[];
  knownLimitations: string[];
  scoringVersion: string;
  itemBankVersion: string;
  chartMappingVersion: string;
  interpretationVersion: string;
}
```

V1 should use `developmental` or `pilot`.
