# Proprietary Source Audit

## Pinned source

- Repository: `olsonan26/LOOKS-LIKE-COSTAR`
- Branch inspected: `main`
- Commit: `023140de4ac9ebad8a804b4c984337135e77b19a`
- Use: read-only; no source-repository changes were made.

The repository is a React/Vite application with 90+ TypeScript/JSON files. It mixes deterministic numerology, PMEI/Lettrology, astrology, relationship, career, timeline, static interpretation, AI narration, and UI concerns.

## Calculation modules

- `constants.ts`: Pythagorean A–Z values, vowels, master numbers 11/22/33, karmic compounds 13/14/16/19.
- `services/numerology.ts`: reductions and chains; name totals; Expression, Ultimate Goal, Soul Urge, Birth Force, Balance Number, Called Name; personal year/month; name-cycle yearly/monthly/daily essences; active-name timeline rule; UTC timeline slicing.
- `services/pmeiEngine.ts`: PMEI raw letter counts, plane map, checksum, genius margin, zero planes, cross-matches, harmony, tone, and generated coaching copy.
- `services/charting.ts`: pinnacle/challenge and chart helpers.
- `services/astrology.ts` and `calculations/whole_signs_calculator.ts`: astrology calculations, excluded from V1.
- `name-engine/src/engine.ts`: deterministic first-name letter cues, pair rules, totals, markers, and seeded selection.

## Interpretation data

- `services/data.ts`: daily essence, monthly combiner, personal year, yearly essence/combiner, core-number descriptions, and warning patterns.
- `services/nameNumberDescriptions.ts`: founder-authored name-number meanings 1–9.
- `services/calledNameDescriptions.ts`: called-name/public-perception meanings 1–9.
- `services/pmeiEngine.ts`: plane foundations, number lenses, tone, genius, blind-spot, and bad-habit copy.
- `name-engine/data/letters.*`, `numbers.*`, `pair_trio_rules.*`, and `templates.*`: letter cards, numeric flavor, combination rules, and narrative templates.

## Relationship and career modules

- `services/coupledynamics.ts`, `loveDescriptions.ts`, and `marriageadvice.ts`: relationship/timeline advice.
- `services/careerGuidanceData.ts`: career categories and guidance.
- `components/LoveScreen.tsx`, `CareerGuidanceModal.tsx`, `ShopScreen.tsx`: consumer interfaces using these modules.

These remain outside V1 high-stakes or deterministic relationship/career conclusions.

## Timeline modules

- `services/numerology.ts`, `services/data.ts`, `services/descriptions.ts`.
- `components/CalendarView.tsx`, `DetailsModal.tsx`, `HomeScreen.tsx`, `YearAndMonthScreen.tsx`.
- `components/charts/AdvancedTimelineChart.tsx`.

Timeline primitives are retained only for characterization/regression architecture. No future prediction is exposed in V1.

## PMEI/Lettrology

Actual PMEI logic is present in `services/pmeiEngine.ts`, not merely in types. Plane bins are Physical 4/5, Mental 1/8, Emotional 2/3/6, and Intuitive 7/9. The engine uses raw letter counts, a checksum, a top-minus-next genius threshold of two, zero-plane handling, cross-matches, name-length “bad habit” digits, vowel/consonant tone, and harmony checks.

The separate `name-engine/` implements deeper letter-position and pair/trio rules. Its content is preserved as future integration material; V1 ports the auditable PMEI calculation boundary and founder name-number meanings.

## AI paths

- `services/textTransformer.ts` calls Google Gemini to rewrite perspective.
- `components/ShopScreen.tsx` calls Gemini to generate an “Ultra Profile.”
- Astrology UI/system-prompt modules contain additional generative prompt paths.

V1 imports none of these. No API key, external model call, or raw-response transmission exists.

## Duplicate or conflicting rules

- Letter values appear in `constants.ts`, `services/numerology.ts`, `services/pmeiEngine.ts`, and `name-engine/src/engine.ts`.
- `reduceToSingleDigit(0)` returns 9, while `reduceNumberWithChain(0)` returns 0.
- Ordinary reduction continues through 11/22/33 in `getReductionSequence`, while `reduceNumberWithChain` stops on those master numbers.
- Core-number meanings and name-number meanings are distinct tables but sometimes use similar identity language.
- Called-name logic reduces first and last separately before summing; full-name Expression reduces the total once.
- The six-month married-name adoption rule is timeline-specific and is not used for V1 identity calculations.

These behaviors are preserved and tested; changes require founder approval.

## Incomplete or placeholder content

- PMEI “bad habit” shadows are explicit only for digits 1, 5, and 8; other digits use a neutral placeholder.
- Astrology rectification contains a `timing: {}` placeholder.
- Several knowledge-base comments explicitly identify undetailed or future material.
- No explicit founder-approved mapping from name/number meanings to the twelve HUE constructs was located.

## Safety-sensitive content classification

- Safe hypothesis material: observable name-number tendencies, PMEI counts, tone ratios, and calculation traces.
- Coaching suggestions requiring evidence labels: strengths/watchouts, plane habits, work and communication suggestions.
- Spiritual framing: karmic debt and past-life claims.
- Timeline-only: daily/monthly/yearly warnings and future-oriented meanings.
- High-sensitivity: medical/checkup language, “destiny,” manipulation/control language, trauma/psychology claims, and relationship guidance.
- Prohibited for public V1: fatalistic prediction, diagnosis, catastrophe, guaranteed outcomes, and directives based solely on chart data.

V1 ports formulas and safe founder-authored condensed meanings as separately labeled hypotheses. The safety layer prevents sensitive source prose from leaking into the deterministic public report.

## Ported V1 boundary

- A–Z values, vowel/consonant selection, reduction chains, master numbers, karmic compounds as calculation trace only.
- Expression, Ultimate Goal, Soul Urge, Birth Force, Balance Number, and Called Name.
- PMEI raw plane counts, checksum, genius plane, zero planes, harmony, and trace.
- Condensed name-number meanings 1–9.
- Structured chart hypotheses that may be supported, partial, contextual, contradicted, unresolved, or insufficient.

Every completed report stores the source commit and local calculation/interpretation versions.
