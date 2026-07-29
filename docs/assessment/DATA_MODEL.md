# Data Model

All durable records contain IDs and versions. `src/assessment/domain.ts` defines profile context, question items, options, sessions, responses, confidence, construct results, contradictions, chart hypotheses and alignments, interactions, recommendations, visualization data, reports, feedback, and proprietary traces.

Runtime Zod checks validate profiles, sessions, responses, and feedback before storage. A completed report preserves assessment, item-bank, scoring, chart-mapping, proprietary calculation/interpretation, interpretation, report, visualization, and safety versions.

## Migration rule

Storage keys end in `.v1`, but stored content also carries exact engine and item versions. An unfinished session whose assessment or item-bank version does not match the running application is removed and replaced with a clear restart notice. It is never resumed against rewritten questions. Completed historical reports keep their original versions.

## Navigation state

An in-progress session stores the stable visited-question history, current history index, draft selections not yet confirmed with Next, and confirmed responses with `itemVersion`. Previous changes only the index. It never deletes a response or recomputes the visited path.

## Goal-first report state

`AssessmentReport.goalAnswer` stores the selected goal, direct answer, supporting observations, practical guidance, example, weekly step, and support label. Decision-making reports also store the five-step method, pause signs, two examples, checklist, and seven-day experiment.
