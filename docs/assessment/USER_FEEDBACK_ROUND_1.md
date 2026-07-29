# User Feedback Round 1

Date: 2026-07-29
Branch: `fix/plain-language-goal-first-experience`

## Feedback received

A person who completed the full assessment reported that the questions felt abstract, an answer moved forward too quickly, Previous did not feel safe, unexplained dots were confusing, the report showed too many graphs, and the chosen goal was not answered clearly. The user also questioned whether the LOOKS-LIKE-COSTAR calculations, meanings, descriptions, and PMEI structures were actually being used.

## Product corrections

- Answer selection stays on the current question. Next is a separate action.
- A selected answer stays visibly checked and can be changed before Next.
- Previous moves through a stable history and never deletes a response.
- Refresh resumes the exact question and keeps draft/confirmed selections.
- All 72 questions and all four modes were reviewed and rewritten; see `QUESTION_COPY_AUDIT.md`.
- The chosen goal is repeated near the end and on review.
- The report gives the selected goal's direct answer, guidance, example, and weekly step first.
- Decision-making includes usual style, help, stuck points, self-sabotage, pause signs, a five-step method, two examples, a checklist, and a seven-day experiment.
- Recommendations use **Try this**, **Example**, **Avoid this**, and **Why it helps**.
- Only two or three goal-relevant visuals are shown first. The rest begin in **Explore your full profile**.
- Needs and sensitivities use visible band words and bars rather than unexplained dots.
- **Your numbers and your answers** now exposes the five source-specific core meanings, the distinct Called Name meaning, PMEI/Lettrology raw counts and checks, and readable match statuses.

## LOOKS-LIKE-COSTAR finding

The user's concern was correct in practical terms. Before this round, the source calculations ran, but most meanings and PMEI results were not visible. Called Name also used the generic name-number table instead of the source's separate Called Name table.

This round ports and routes the correct source-specific tables from pinned commit `023140de4ac9ebad8a804b4c984337135e77b19a`. The source repository remained read-only and clean. Founder-source content stays optional and never changes behavioral scores, confidence, contradictions, or recommendations. The HUE mapping still needs founder approval.

## Completed usability paths

### Decision-making

The desktop end-to-end path completed the full adaptive assessment, repeated the goal on review, and verified the direct decision answer plus every required decision section. The result included three recommendation cards and kept secondary charts collapsed.

### Communication

The partner-observer end-to-end path completed the full adaptive assessment with the Communication goal and verified the goal-first communication heading. The communication sample report was also inspected at desktop, 390px mobile, and 320px narrow widths.

### Mobile phone follow-up

A live 390×844 browser check against the LAN URL found that the landing headline extended beyond the usable 375px content width even though document-level overflow remained hidden. The mobile headline now fits inside the viewport, and the compact navigation button meets the 44px minimum touch-target height. The mobile visual test asserts all three conditions so the clipping cannot silently return.

## Screen inspection

Reviewed fixtures:

- `screenshots/goal-selection-desktop.png`
- `screenshots/question-representative-desktop.png`
- `screenshots/adaptive-follow-up-desktop.png`
- `screenshots/report-desktop-chromium.png`
- `screenshots/report-mobile-chromium.png`
- `screenshots/report-narrow-320.png`
- `screenshots/report-print-desktop.png`

The live 390px pass found two additional defects: “communication” split inside the word, and the page had a small horizontal overflow. Both were fixed. The final live check reported equal document scroll width and client width. Desktop and mobile browser logs had no new warnings or errors after a clean reload.

## Read-through

Every question is represented in the 72-row copy audit and all 288 mode prompts passed the plain-language invariant tests. A final primary-copy read-through also corrected “You shows…,” removed several technical phrases from the loading and summary screens, and simplified conflict guidance.

## Verification

- `npm run check`: pass
- Unit/component: 48 passed
- `npm run test:e2e`: 22 passed, 10 intentional duplicate-coverage skips
- Focused full Communication path: 1 passed
- Axe serious/critical scan: pass on desktop and mobile sample reports
- `npm audit --audit-level=low`: 0 vulnerabilities
- Tracked secret-pattern scan: no matches
- `git diff --check`: pass

## Remaining research limits

- This round implements direct participant feedback but is not a new external participant study.
- Cognitive interviews are still required for 29 higher-risk wording changes.
- Pre-existing direction, facet, double-barreled, and frequency-scale concerns were documented rather than silently changed.
- No reliability, validity, norm, diagnosis, prediction, or population claim is authorized.
- Founder approval is still required for chart-to-HUE mappings and any deeper proprietary interpretation.
