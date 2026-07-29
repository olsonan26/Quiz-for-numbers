# Privacy Model

V1 uses only browser `localStorage`:

- `hue.current-session.v1`
- `hue.reports.v1`
- `hue.feedback.v1`

There is no server, account, analytics tracker, cookie, external model, or remote persistence. The user can resume, export JSON, print/PDF, delete one report, or clear all app data. Browser storage is not encrypted and may be visible to anyone with access to the same browser profile; this limitation is disclosed.

Remote storage, research datasets, analytics, and model training require future separate consent and legal review.
