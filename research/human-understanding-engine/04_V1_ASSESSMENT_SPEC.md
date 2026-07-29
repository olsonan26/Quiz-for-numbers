# V1 Assessment Specification

## Product name placeholder

Working name: **Human Pattern Profile**

Do not finalize branding during the foundation build.

## V1 promise

> See the patterns shaping how you think, connect, decide, react, and recover—and learn what helps you function at your best.

Observer mode:

> Understand this person’s patterns more clearly and learn how to communicate with them more effectively.

## Assessment modes

The same core engine supports four modes with adapted wording:

1. **Myself** — self-report
2. **My child** — parent/guardian observer report
3. **My partner** — partner observer report
4. **Someone else** — general observer report

Do not claim direct access to another person’s inner state in observer mode. Use language such as “Based on your observations…”

## Primary goal selection

Before questions begin, ask what the user most wants help understanding:

- communication
- motivation
- emotional reactions
- conflict
- decision-making
- stress patterns
- strengths
- direction and fit
- overall understanding

Goal selection affects question priority and report ordering, not core scoring.

## Required profile context

Collect only what is necessary:

- assessment subject display name or nickname
- relationship mode
- age or age range
- date/name inputs required for proprietary calculation
- observer familiarity when relevant
- current high-stress or unusual-condition flag
- main goal
- receiver style preference

Optional context:

- significant current transition
- preferred pronouns
- cultural or family-context note

Do not collect diagnoses, medical histories, trauma narratives, or highly sensitive open text unless a later ethically reviewed module requires them.

## Receiver style preference

Ask how the user prefers to receive results:

- direct and concise
- gentle but clear
- analytical and detailed
- practical and action-oriented
- strengths first

This changes phrasing and ordering, never scores or confidence.

## Assessment length

Target:

- minimum path: 36 questions
- typical path: 42 questions
- maximum adaptive path: 48 questions
- estimated completion time: 8–12 minutes

Each construct should receive at least three independent observations before a scored conclusion. Priority constructs may receive four or five.

## Question types

Use a measured mix:

- five-point frequency scales
- situational single choice
- paired preference choices
- behavior rankings where necessary
- “which is most like them?” forced choice
- context follow-ups
- optional short text for user correction, not scoring

Every relevant question should allow:

- not sure
- depends on the situation
- have not observed this
- prefer not to answer

These responses reduce information, not trait scores.

## Core question design rules

Questions should be behaviorally concrete.

Weak:

> Are you emotionally sensitive?

Stronger:

> After a tense conversation, how long does it usually take before you can focus normally again?

Weak:

> Are you independent?

Stronger:

> When someone gives you detailed advice you did not ask for, what are you most likely to do?

Avoid:

- double-barreled items
- obvious virtue answers
- diagnostic wording
- mystical wording inside behavioral items
- “always” and “never” unless truly necessary
- items whose answer is transparent from the desired result
- items that ask the user to validate the chart directly

## Assessment sections

### Section 1 — Orientation

- choose subject
- choose goal
- explain developmental/research status
- explain that uncertainty is acceptable
- explain that observer reports reflect the observer’s perspective

### Section 2 — Everyday Patterns

Measure ordinary behavior across social energy, autonomy, belonging, decisions, motivation, and change.

### Section 3 — Emotional and Relational Patterns

Measure sensitivity, criticism response, reassurance, conflict, boundaries, and recovery.

### Section 4 — Under Pressure

Repeat selected constructs in stress-specific scenarios.

### Section 5 — Context and Contradiction Follow-ups

Ask adaptive follow-ups when:

- two items conflict strongly
- chart and behavioral evidence disagree
- baseline and stress expression differ
- observer familiarity is low
- the person appears highly context-dependent
- confidence is below threshold

### Section 6 — Review

Allow answers to be reviewed and changed before report generation.

## Adaptive rules

The engine should:

- prioritize goal-relevant items
- preserve minimum construct coverage
- stop asking additional items when coverage and consistency are sufficient
- add follow-ups when contradiction severity crosses threshold
- ask relationship-specific context when observer and chart evidence diverge
- ask whether a pattern is recent or longstanding when current stress is high
- ask child-development wording appropriate to age range
- avoid redundant questions after high-confidence convergence

Adaptive behavior must be deterministic and testable.

## Example adaptive flow

Initial item:

> When disagreement begins, they usually try to reduce tension rather than state their position immediately.

Conflicting item:

> When they believe something is unfair, they confront it quickly even if it creates tension.

Follow-up:

> Which explanation fits best?
>
> - They avoid small disagreements but confront issues tied to fairness.
> - They avoid conflict with close people but confront strangers or coworkers.
> - They stay quiet until frustration builds, then become very direct.
> - Their response depends mostly on how safe they feel.
> - None of these fit.

This follow-up resolves context, not simply averages two scores.

## Chart integration

The chart engine should generate versioned hypotheses before or during the quiz.

Each chart hypothesis must specify:

- target construct
- expected facet
- expected direction
- expected context
- expected stress expression
- question IDs that test it
- permitted result language

The quiz must not reveal the hypothesis in a way that leads responses.

After scoring, classify each hypothesis as:

- strongly supported
- partially supported
- contextually supported
- contradicted
- unresolved

## Result modules

The final report includes:

1. **At a Glance** — one-paragraph synthesis
2. **Core Pattern Wheel** — balanced overview
3. **How You Change Under Stress** — baseline versus pressure
4. **What Drives You** — motivation hierarchy
5. **How You Communicate** — preferred style and likely misunderstandings
6. **How You Handle Conflict** — escalation, boundaries, repair
7. **Needs and Sensitivities** — what supports or destabilizes
8. **Internal Tensions** — meaningful contradictions and context dependence
9. **Chart Alignment** — supported, mixed, and unsupported hypotheses
10. **Strongest Assets** — specific strengths with conditions
11. **Friction Risks** — patterns that create predictable difficulty
12. **Growth Leverage** — changes with highest likely payoff
13. **How to Work With Me** — practical shareable card
14. **Evidence and Limits** — confidence and what remains unknown
15. **Feedback** — user correction and usefulness rating

## Recommendation requirements

Every recommendation must link to a structured finding.

A recommendation record should include:

- trigger or context
- observed pattern
- desired outcome
- recommended action
- example wording
- what to avoid
- evidence confidence
- whether the recommendation is general or experimental

Example:

> **When giving feedback:** Start with the specific behavior, not a global judgment. Give the person a moment to process before requiring an immediate response. Avoid correcting them publicly unless the issue is urgent.

## Child-mode requirements

Child reports must:

- use developmentally appropriate comparisons
- avoid fixed identity language
- distinguish skill not yet developed from stable tendency
- frame adult behavior as part of the environment
- include “what the child may be communicating through behavior”
- provide parent actions, not just child labels
- avoid predicting the child’s adult personality

## Observer-mode requirements

Observer reports must include:

- observer familiarity rating
- situations in which the observer knows the person
- explicit reminder that unseen inner experience may differ
- ability to invite the subject to complete a self-report later
- comparison architecture for future self-versus-observer reports

## Feedback loop

After results, collect:

- overall fit
- useful insights
- inaccurate insights
- context-dependent insights
- insights that only appear under stress
- emotional impact
- recommendation usefulness
- wording that felt unfair or too strong

Feedback updates the individual profile only through transparent rules. It must not silently rewrite historical results.

## V1 exclusions

Do not include:

- future timeline prediction
- death, illness, accident, or catastrophe prediction
- clinical diagnosis
- employee hiring or firing recommendations
- moral worth scores
- deception detection
- violence prediction
- romantic destiny scores
- automatic “leave/stay” advice
- medical or nutritional diagnosis
- unrestricted AI-generated interpretations

## V1 acceptance criteria

V1 is complete when:

- all four wording modes work
- the typical assessment completes in 8–12 minutes
- all twelve constructs have minimum coverage
- adaptive follow-ups trigger correctly
- chart hypotheses can fail
- baseline and stress values are separate
- results are traceable and explainable
- all required graph modules render accessibly
- deterministic reports work without AI
- results can be saved, resumed, exported, and deleted
- safety tests pass
- no claim of validation appears
