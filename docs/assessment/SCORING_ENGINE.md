# Scoring Engine

Options carry values from -2 to +2, a construct/facet, weight, and context. Uncertain and skipped options carry no value.

The engine aggregates only within the targeted construct, computes separate baseline and stress means, derives lower/moderate/higher bands, identifies context dependence or conflict, and then calculates confidence. UI and receiver tone do not participate.

Automated invariants prove reproducibility, unrelated-answer isolation, missingness limits, contradiction limits, receiver-tone independence, and minimum-evidence behavior.
