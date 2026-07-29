# Ethics, Privacy, and Validation

## Product status

V1 is a developmental human-understanding assessment. It is not a clinical instrument, diagnostic test, hiring tool, forensic assessment, or scientifically validated predictor.

The application must communicate that clearly without making the experience feel apologetic or useless.

## Core ethical principle

The system should leave people with more agency, clarity, and compassion—not more fear, fatalism, dependence, or hostility toward another person.

## Prohibited conclusions

The engine must not state or strongly imply:

- a psychiatric diagnosis
- a personality disorder diagnosis
- that a person is dangerous, deceptive, evil, or incapable of change
- that a child will become a particular kind of adult
- that trauma definitely occurred
- that a relationship is destined to fail
- that someone should divorce, fire, hire, date, reject, or trust a person based on the assessment alone
- medical, nutritional, hormonal, metabolic, or neurological diagnoses
- death, accident, illness, catastrophe, or guaranteed future-event predictions
- moral worth or human value scores

## Permitted behavioral language

Prefer:

> “Your answers suggest this person may react defensively when correction feels public or global.”

Avoid:

> “This person is a narcissist who cannot tolerate criticism.”

Prefer:

> “This pattern may reflect current stress, learned protection, or a stable sensitivity. The available evidence cannot determine which explanation is primary.”

Avoid:

> “This proves they have trauma.”

## Child safeguards

Child reports require additional protection:

- describe current patterns, not destiny
- account for age and development
- avoid adult personality pathology language
- emphasize skills that can develop
- include environmental and parenting context
- show uncertainty prominently
- do not encourage parents to treat chart meanings as permanent identity
- require guardian confirmation for storage or sharing
- provide age-appropriate deletion and privacy rules

A parent’s interpretation of a child is an observer report, not objective access to the child’s inner experience.

## Non-consenting adult profiles

Users may be allowed to reflect on someone they know, but V1 should:

- collect minimal identifying data
- encourage nicknames rather than full legal names when chart requirements permit
- store locally by default
- state that results reflect the user’s observations
- prohibit public sharing without review
- avoid claims about hidden motives or diagnoses
- allow complete deletion

Remote storage of detailed profiles about non-consenting adults requires a later explicit legal and privacy decision.

## Manipulation safeguards

Insight can be used to connect or control.

The product must not provide exploitative guidance such as:

- how to use insecurity to gain compliance
- how to create dependence
- how to bypass boundaries
- how to trigger jealousy or fear
- how to manipulate a child, partner, client, or employee

Recommendations should support mutual clarity, consent, boundaries, and communication.

## Employer and institutional use

V1 must not be marketed or configured for:

- candidate screening
- employee ranking
- promotion decisions
- disciplinary decisions
- insurance
- lending
- education placement
- legal or custody decisions

These uses create serious validity, fairness, consent, and legal concerns.

## High-distress handling

The quiz is not a crisis tool. If a user provides open text indicating immediate danger or severe distress, the application should follow a separately reviewed safety flow rather than interpreting the text as personality evidence.

Do not infer suicidality, abuse, psychosis, or violence risk from construct scores.

## Privacy model

### Data minimization

Collect only information needed for the assessment and chart calculation.

### Local-first V1

Prefer encrypted or browser-local storage where practical. Clearly disclose limitations of local storage.

### User controls

Provide:

- save and resume
- export structured results
- delete assessment
- delete profile
- clear all local data
- control over shared report content

### AI transmission

Do not send raw responses or identifying information to an external model without explicit consent.

When AI is used, prefer transmitting a minimized structured finding object rather than raw answers.

### Model training

No user data may be used for model training or research datasets without separate explicit opt-in consent.

### Analytics

General analytics must not contain raw answer content, names, dates of birth, open-text responses, or sensitive report conclusions.

## Consent layers

Keep these permissions separate:

- consent to complete the assessment
- consent to save locally
- consent to save remotely
- consent to AI-enhanced narrative generation
- consent to anonymous product analytics
- consent to research participation
- consent to use de-identified data for model or instrument improvement
- consent to share a report

Do not bundle all permissions into one vague checkbox.

## Interpretation safety checks

Before displaying a result:

1. Validate the structured result schema.
2. Check minimum evidence.
3. Apply prohibited-claim rules.
4. Confirm tone does not change certainty.
5. Confirm no diagnosis or fate language.
6. Confirm recommendations are linked to evidence.
7. Confirm observer reports use perspective-aware wording.
8. Confirm child reports use developmental language.
9. Confirm uncertainty and limitations are present.

AI-generated text requires an additional post-generation safety scan and deterministic fallback.

## Fairness and measurement invariance

As pilot data grows, investigate whether items and scores behave differently across:

- age
- sex or gender where relevant and ethically collected
- culture and language
- education and reading level
- relationship mode
- self versus observer report
- socioeconomic context
- disability and neurodivergence where ethically and adequately studied

Do not assume one norm or interpretation works for every group.

## Validation claims ladder

Product wording must match evidence stage.

### Developmental
Based on research-informed constructs and internal rules; no formal validation claim.

### Pilot-tested
Usability and preliminary item behavior studied in a defined sample.

### Reliability evidence available
Specific reliability analyses completed for a defined population and version.

### Construct evidence available
Convergence, discrimination, or internal-structure evidence completed.

### Validated for limited use
Evidence supports a narrowly defined interpretation in a defined population.

Never use “scientifically proven” as a general marketing phrase.

## Pilot study plan

### Phase 1 — Cognitive interviews

Recruit 10–20 participants across relevant modes. Observe:

- interpretation of wording
- confusion
- emotional reaction
- missing response options
- situations users imagine while answering
- whether observer questions invite speculation

### Phase 2 — Usability pilot

Recruit approximately 50–100 participants. Measure:

- completion rate
- time
- drop-off
- uncertainty responses
- report comprehension
- perceived usefulness
- negative emotional impact
- feedback corrections

### Phase 3 — Measurement pilot

Use an appropriately larger sample based on the intended analyses and number of items. Obtain psychometric consultation before claiming factor structure or norms.

Analyze:

- item distributions
- redundancy
- missingness
- reliability
- test–retest
- observer agreement
- expected construct relationships
- chart incremental value

### Phase 4 — Practical outcome pilot

Test a small number of recommendations over time. Example outcomes:

- communication clarity
- conflict escalation frequency
- parenting interaction confidence
- user ability to predict their own stress response

Do not infer clinical improvement.

## Comparison design

Randomly or systematically compare:

- questionnaire-only report
- chart-only report
- combined report
- generic positive report
- structured deterministic report
- AI-polished report

Measure not only perceived accuracy but:

- specificity
- correct rejection of inaccurate claims
- usefulness
- behavior change
- emotional safety
- recall
- user trust calibration

## Failure reporting

Maintain records of:

- unsupported chart hypotheses
- failed items
- misleading interpretations
- harmful or anxiety-producing wording
- user groups with weaker measurement
- graphs users misunderstand
- recommendations that do not help

Do not remove negative data from research summaries.

## Required legal review topics before public scale

- privacy policy
- terms and disclaimers
- child data
- non-consenting adult profiles
- biometric or psychological profiling laws where relevant
- consumer protection claims
- AI disclosure
- data retention
- deletion rights
- research consent
- accessibility obligations

The development agent must flag these topics but must not invent final legal advice.
