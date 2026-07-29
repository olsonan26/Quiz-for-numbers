# Human Pattern Profile Design System

## Direction

Premium, calm, intelligent, personal, and emotionally resonant without clinical or occult clichés. The interface uses editorial Georgia headings, a system sans-serif body, warm paper surfaces, charcoal ink, sage, ochre, muted blue, and plum.

## Tokens

- Ink: `#1b2624`
- Paper: `#f7f4ed`
- Deep paper: `#ebe6da`
- Cream: `#fffaf0`
- Sage: `#3f6157`
- Ochre: `#c48b42`
- Blue: `#446a83`
- Plum: `#765d73`
- Danger: `#9d403f`
- Radius: 11px controls, 18–24px cards, 26–38px major surfaces

## Interaction rules

- Touch targets are at least 44px.
- Focus is a visible 3px blue outline.
- Hover never shifts layout.
- Motion stays between 150–250ms and is removed under `prefers-reduced-motion`.
- Lucide supplies interface icons; no emoji icons.

## Visualization rules

- Bands and labels are primary; normalized internal positions never appear as validated percentages.
- Baseline and stress use different shape/color markers.
- Each graph states its human question and includes a data-table alternative.
- Charts remain readable at 320px; wide tables scroll inside their own container.
- Color is never the only carrier of status.

## Responsive rules

- 320–680px: one column, compact report header, stacked process/matrix modules.
- 681–980px: single-column report with wider modules.
- 981px and above: two-column visual dashboard.
- Body horizontal overflow is prohibited.
