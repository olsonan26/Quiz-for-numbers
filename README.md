# Quiz for Numbers

Working V1 of a professional Human Understanding Engine that combines founder-authored number/name/Lettrology hypotheses with behavioral evidence, context, contradiction analysis, explainable confidence, and accessible visual reports.

## Public assessment

The mobile-ready production release is available at:

<https://quiz-for-numbers.vercel.app>

Assessment answers and reports remain in that device's browser storage. They are not sent to Vercel, an AI provider, analytics, or a remote database.

## Run locally

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

Quality gates:

```powershell
npm run check
npm run test:e2e
npm audit
```

The application requires no account, API key, database, AI provider, or network service after dependencies are installed.

## Codex

Give Codex the short instruction in:

```text
CODEX_START_HERE.md
```

The full assignment is versioned inside the repository rather than pasted into one oversized prompt.

Codex must read:

- `AGENTS.md`
- every numbered file under `research/human-understanding-engine/`

## Proprietary source

The existing calculations, meanings, interpretations, and Lettrology/PMEI structures are in:

`https://github.com/olsonan26/LOOKS-LIKE-COSTAR.git`

That repository is treated as a read-only founder-authored source during the quiz build. Integration rules live in:

```text
research/human-understanding-engine/10_PROPRIETARY_ENGINE_INTEGRATION.md
```

## Workflow

Foundation PR #1 was repaired, quality-gated, and merged as
`54f1cfa0431c265f552f4543d7305aabdf30047d`. The V1 implementation was built on
`feat/human-understanding-quiz-v1` from that exact merged foundation and merged
through PR #2 as `36fcd94cdfe8c96a2c1e8e0077d0128d2d63204c`. Post-merge build, critical-path,
served-report, export, deterministic fallback, and deletion checks passed.

## Product standard

The goal is not a longer generic personality quiz. The goal is a contextual human-understanding system that:

- distinguishes baseline from stress behavior
- distinguishes traits from states and adaptations
- explains contradictions
- compares proprietary hypotheses with lived behavior
- allows proprietary hypotheses to fail
- shows evidence and uncertainty
- produces practical guidance
- visualizes patterns professionally and accessibly
- remains useful without AI
- protects privacy and avoids diagnosis or fatalism

See `research/human-understanding-engine/12_WORLD_CLASS_BENCHMARK.md` for the internal quality bar.
