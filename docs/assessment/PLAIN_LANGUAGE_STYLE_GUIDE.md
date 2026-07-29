# Plain-Language Style Guide

## Purpose

People should understand each screen the first time they read it. The product should sound useful, calm, and human. It should not sound academic, clinical, mystical, or as if it is trying to impress the reader.

Target a sixth- to eighth-grade reading level for primary copy. Technical detail may remain inside optional evidence and calculation sections.

## Core rules

1. Use familiar everyday words.
2. Ask one clear thing at a time.
3. Describe behavior the user can picture.
4. Keep sentences short.
5. Use active voice.
6. Explain what happens next.
7. Give an example when reasonable people could read a phrase differently.
8. Name uncertainty directly instead of hiding it behind technical language.
9. Use the person's selected goal to explain why information matters.
10. Read primary copy aloud before approving it.

## Prefer

| Avoid | Prefer |
|---|---|
| meaningful choice | a real choice |
| available capacity | the energy or focus you have right now |
| evaluation threat | feeling judged |
| provisional decision | temporary choice |
| behavioral evidence | your answers |
| preserve choice over method | choose how you will do it |
| context-dependent | changes with the situation |
| state contamination | current stress may be affecting the result |
| expression band | pattern level |
| source convergence | your answers and number profile agree |

These replacements are examples, not mechanical substitutions. The sentence must remain natural and preserve the intended meaning.

## Questions

- Ask about one observable behavior or reaction.
- Include the situation when it changes the meaning.
- Avoid two behaviors joined by “and” unless both are required for the same idea.
- Avoid hidden moral answers.
- Avoid asking the user to agree with a number or name interpretation.
- Use natural self, child, partner, and observer wording. Do not generate observer wording with blind pronoun replacement.
- Keep scoring direction, construct, facet, context, and weight unchanged unless a correction is documented.
- Treat “It depends,” “Not sure,” and “Prefer not to answer” as valid choices.

## Navigation

- Selecting an answer must not move to another question.
- Show the selected answer clearly in text and with a visible control state.
- Keep **Next** disabled until the user selects an answer.
- **Previous** navigates without deleting an answer.
- When the user returns, show the saved answer.
- Progress copy should explain that the assessment may ask extra questions when an answer needs more context.

## Review screen

Answer these questions in order:

1. Why did I take this assessment?
2. What will the report help me understand?
3. What happens when I generate the report?

Avoid scoring-engine language in primary copy.

## Report

Begin with:

1. What the user wanted help with
2. A direct answer
3. What their answers suggest
4. What to try
5. What to avoid
6. A realistic example
7. One small step for the next seven days

The archetype, graphs, number meanings, and technical evidence support that answer. They do not replace it.

## Recommendations

Every primary recommendation uses these labels:

- **Try this** — one specific behavior
- **Example** — a sentence or realistic situation
- **Avoid this** — a likely unhelpful behavior
- **Why it helps** — a short link to the person's result

Do not tell the user which high-stakes job, purchase, relationship, medical, legal, or financial choice to make.

## Numbers, names, and Lettrology

- Call this the **number and name profile** in primary copy.
- Show the calculated value and its founder-authored meaning in plain language.
- Clearly label it as a hypothesis from Alex Olson's existing system.
- State whether the user's answers support, partly support, change by situation, contradict, or cannot yet test the hypothesis.
- Do not let chart agreement increase behavioral confidence by itself.
- Keep formula traces, source paths, commit IDs, and version details inside an optional “How this was calculated” section.
- Never expose timeline, fatalistic, medical-sounding, karmic/past-life, or future-prediction source content in V1.

## Graphs and symbols

- Use a plain heading that states the human question.
- Explain the scale next to the visual.
- Show visible Low / Medium / High or equivalent text.
- Do not rely on dots, shade, position, or color alone.
- Put meaningful content in visible text, not only an `aria-hidden` element.
- Keep technical tables available as an optional alternative.
- Show only the two or three visuals most useful for the selected goal at first.
- Place the remaining visuals inside **Explore your full profile**.

## Screen audit checklist

For setup, consent, questions, answers, progress, review, loading, results, recommendations, graphs, feedback, errors, and empty states, confirm:

- The purpose is clear.
- The next action is clear.
- No sentence sounds academic, clinical, mystical, or inflated.
- The copy is natural in every assessment mode.
- Important meaning is not carried by color alone.
- Labels and errors work with keyboard and screen readers.
- The layout works at 320–393px without horizontal overflow.
