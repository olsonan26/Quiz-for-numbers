# Accessibility

- Semantic headings, landmarks, labels, fieldsets, radio roles, progress language, and live save messages
- Visible focus and logical keyboard order
- 44px minimum interactive targets
- Reduced-motion support
- Non-color confidence labels and distinct baseline/stress markers
- A text/data-table alternative for every graph
- Responsive layouts verified at 320px, mobile, tablet, and desktop
- Internal overflow only for dense tables
- Print-friendly report

Automated axe-core checks, including color contrast, found no serious or critical violations in the desktop or mobile sample report. Keyboard reachability and 320px containment pass. Automated checks do not replace a formal screen-reader or disabled-user study; those remain pilot work.

## Feedback Round 1 additions

- Radio state is now accurate and remains selected until Next is activated.
- Keyboard selection does not move to the next question.
- Previous preserves the checked answer and stable history.
- Needs and sensitivities have visible band words and bars; color is supplementary.
- Secondary charts begin in a native closed `details` disclosure.
- The decision report uses semantic headings, lists, examples, and a checklist.
- Live 390px and automated 320px checks confirm no document-level horizontal overflow.
