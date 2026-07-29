# Data Model

All durable records contain IDs and versions. `src/assessment/domain.ts` defines profile context, question items, options, sessions, responses, confidence, construct results, contradictions, chart hypotheses and alignments, interactions, recommendations, visualization data, reports, feedback, and proprietary traces.

Runtime Zod checks validate profiles, sessions, responses, and feedback before storage. A completed report preserves assessment, item-bank, scoring, chart-mapping, proprietary calculation/interpretation, interpretation, visualization, and safety versions.

## Migration rule

V1 storage keys end in `.v1`. A future incompatible schema must use a new key and an explicit migration; it must never reinterpret stored historical answers under new rules without preserving the old result.
