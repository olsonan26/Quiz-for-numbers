import type { AssessmentReport } from "../assessment/domain";
import { calculatePMEI, type PlaneKey } from "../proprietary/calculations/pmei";
import { calledNameMeaningFor } from "../proprietary/meanings/calledNameMeanings";

interface ProprietaryDetailsProps {
  report: AssessmentReport;
}

const planeLabel: Record<PlaneKey, string> = {
  physical: "Physical",
  mental: "Mental",
  emotional: "Emotional",
  intuitive: "Intuitive"
};

const alignmentLabel: Record<AssessmentReport["chartAlignments"][number]["classification"], string> = {
  supported: "Matches your answers",
  partial: "Partly matches your answers",
  contextual: "Depends on the situation",
  contradicted: "Does not match your answers",
  unresolved: "Not enough to compare yet",
  insufficient: "Not enough answers to compare"
};

/**
 * A transparent, optional view of the founder-source calculation layer.
 * It deliberately consumes the report only for display and never writes to
 * scoring, confidence, contradictions, or recommendations.
 */
export function ProprietaryDetails({ report }: ProprietaryDetailsProps) {
  const pmei = calculatePMEI(report.profile.birthName);
  const calledName = calledNameMeaningFor(report.proprietaryProfile.calledName.value);

  return (
    <section className="report-module proprietary-details">
      <header>
        <p className="eyebrow">Optional founder-source layer</p>
        <h2>Your numbers and your answers</h2>
        <p>
          These are Alex Olson&apos;s number and name ideas from the pinned source. They are compared with,
          but never used to change, what your answers say about you.
        </p>
      </header>

      <details>
        <summary>See the number and name details</summary>
        <section aria-labelledby="core-numbers-heading">
          <h3 id="core-numbers-heading">Five core numbers</h3>
          <dl className="ledger-grid">
            {report.proprietaryProfile.coreNumbers.map((number) => (
              <div key={number.name}>
                <dt>{number.name}</dt>
                <dd><strong>{number.compound}</strong></dd>
                <dd>{number.sourceMeaning}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="called-name-heading">
          <h3 id="called-name-heading">Called Name: {report.proprietaryProfile.calledName.compound}</h3>
          <p><strong>{calledName.title}</strong></p>
          <p>{calledName.full}</p>
          <p><small>This is the source&apos;s separate public-perception meaning for the name you use. It is a hypothesis, not a finding from the assessment.</small></p>
        </section>

        <section aria-labelledby="pmei-heading">
          <h3 id="pmei-heading">PMEI / Lettrology name count</h3>
          <p>These are raw letter counts from the birth name, not scores from your answers.</p>
          <dl className="ledger-grid">
            {(Object.keys(pmei.planes) as PlaneKey[]).map((plane) => (
              <div key={plane}>
                <dt>{planeLabel[plane]}</dt>
                <dd><strong>{pmei.planes[plane]}</strong> letters</dd>
              </div>
            ))}
            <div><dt>Total letters</dt><dd><strong>{pmei.totalLetters}</strong></dd></div>
            <div><dt>Checksum</dt><dd><strong>{pmei.qaChecksumPassed ? "Passed" : "Needs review"}</strong></dd></div>
            <div><dt>Strongest plane</dt><dd>{pmei.geniusPlane ? `${planeLabel[pmei.geniusPlane]} (ahead by ${pmei.geniusMargin})` : "No plane is ahead by two or more"}</dd></div>
            <div><dt>Missing planes</dt><dd>{pmei.zeroPlanes.length ? pmei.zeroPlanes.map((plane) => planeLabel[plane]).join(", ") : "None"}</dd></div>
            <div><dt>Plane harmony</dt><dd>{pmei.harmony.length ? pmei.harmony.map((plane) => planeLabel[plane]).join(", ") : "None"}</dd></div>
            <div><dt>Vowels and consonants</dt><dd>{pmei.tone.vowels} vowels, {pmei.tone.consonants} consonants</dd></div>
            <div><dt>Cross matches</dt><dd>{pmei.crossMatches.length ? pmei.crossMatches.map((match) => `${planeLabel[match.plane]} = ${match.totalEquals}`).join(", ") : "None"}</dd></div>
          </dl>
        </section>

        <section aria-labelledby="alignment-heading">
          <h3 id="alignment-heading">Where the source ideas match your answers</h3>
          {report.chartAlignments.length ? (
            <ul>
              {report.chartAlignments.map((alignment) => (
                <li key={alignment.hypothesisId}>
                  <strong>{alignmentLabel[alignment.classification]}:</strong> {alignment.summary}
                </li>
              ))}
            </ul>
          ) : <p>There are no source ideas to compare for this report.</p>}
        </section>
      </details>
    </section>
  );
}
