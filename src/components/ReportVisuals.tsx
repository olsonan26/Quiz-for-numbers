import type { AssessmentReport, ConstructResult, ExpressionBand } from "../assessment/domain";

const bandPosition: Record<ExpressionBand, number> = {
  lower: 22,
  moderate: 50,
  higher: 78,
  "context-dependent": 50,
  conflicting: 50,
  insufficient: 10
};

const bandLabel = (band: ExpressionBand) => band.replace("-", " ");

function AlternativeTable({ rows }: { rows: Array<Array<string | number>> }) {
  return (
    <details className="data-alternative">
      <summary>View accessible data table</summary>
      <table>
        <thead><tr>{rows[0]?.map((cell) => <th key={cell}>{cell}</th>)}</tr></thead>
        <tbody>
          {rows.slice(1).map((row, index) => (
            <tr key={index}>{row.map((cell, cellIndex) => <td key={`${index}-${cellIndex}`}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </details>
  );
}

function VisualSection({
  id,
  title,
  question,
  children,
  rows
}: {
  id: string;
  title: string;
  question: string;
  children: React.ReactNode;
  rows: Array<Array<string | number>>;
}) {
  return (
    <section className="report-module visual-module" id={id} aria-labelledby={`${id}-title`}>
      <header>
        <p className="eyebrow">Pattern view</p>
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{question}</p>
      </header>
      {children}
      <AlternativeTable rows={rows} />
    </section>
  );
}

export function PatternWheel({ results }: { results: ConstructResult[] }) {
  const shown = results.slice(0, 8);
  const center = 160;
  return (
    <VisualSection
      id="pattern-wheel"
      title="Human Pattern Wheel"
      question="Which broad patterns appear most strongly in the available behavioral evidence?"
      rows={[["Pattern", "Expression", "Confidence"], ...shown.map((result) => [result.label, bandLabel(result.expressionBand), result.confidence.label])]}
    >
      <div className="wheel-wrap">
        <svg viewBox="0 0 320 320" role="img" aria-label="Circular pattern overview. Use the accessible table below for values.">
          {[46, 84, 122].map((radius) => <circle key={radius} cx={center} cy={center} r={radius} className="wheel-ring" />)}
          {shown.map((result, index) => {
            const angle = (index / shown.length) * Math.PI * 2 - Math.PI / 2;
            const distance = 46 + (bandPosition[result.expressionBand] / 100) * 76;
            const x = center + Math.cos(angle) * distance;
            const y = center + Math.sin(angle) * distance;
            const labelX = center + Math.cos(angle) * 143;
            const labelY = center + Math.sin(angle) * 143;
            return (
              <g key={result.constructId}>
                <line x1={center} y1={center} x2={x} y2={y} className="wheel-spoke" />
                <circle cx={x} cy={y} r={result.confidence.label === "strong" ? 8 : 6} className={`wheel-dot confidence-${result.confidence.label}`} />
                <text x={labelX} y={labelY} textAnchor="middle" dominantBaseline="middle">{result.label}</text>
              </g>
            );
          })}
          <circle cx={center} cy={center} r="20" className="wheel-core" />
          <text x={center} y={center} textAnchor="middle" dominantBaseline="middle" className="wheel-core-label">YOU</text>
        </svg>
        <div className="wheel-legend"><span>Center = lower</span><span>Middle = moderate</span><span>Outer = higher</span></div>
      </div>
    </VisualSection>
  );
}

export function BaselineStress({ results }: { results: ConstructResult[] }) {
  const shown = results.filter((result) => result.baselineBand !== "insufficient" || result.stressBand !== "insufficient").slice(0, 8);
  return (
    <VisualSection
      id="baseline-stress"
      title="Baseline vs Stress Profile"
      question="How does expression change when pressure rises?"
      rows={[["Pattern", "Baseline", "Under pressure", "Shift", "Confidence"], ...shown.map((result) => [result.label, bandLabel(result.baselineBand), bandLabel(result.stressBand), result.shiftDirection, result.confidence.label])]}
    >
      <div className="slope-chart" aria-hidden="true">
        <div className="slope-axis"><span>Lower</span><span>Moderate</span><span>Higher</span></div>
        {shown.map((result) => (
          <div className="slope-row" key={result.constructId}>
            <strong>{result.label}</strong>
            <div className="slope-track">
              <i className="baseline-dot" style={{ left: `${bandPosition[result.baselineBand]}%` }} />
              <i className="stress-dot" style={{ left: `${bandPosition[result.stressBand]}%` }} />
              <span
                className="slope-line"
                style={{
                  left: `${Math.min(bandPosition[result.baselineBand], bandPosition[result.stressBand])}%`,
                  width: `${Math.abs(bandPosition[result.baselineBand] - bandPosition[result.stressBand])}%`
                }}
              />
            </div>
          </div>
        ))}
        <div className="dot-legend"><span><i className="baseline-dot" /> Baseline</span><span><i className="stress-dot" /> Under pressure</span></div>
      </div>
    </VisualSection>
  );
}

export function MotivationHierarchy({ report }: { report: AssessmentReport }) {
  const ranked = [...report.constructResults]
    .filter((result) => ["HUE-10", "HUE-04", "HUE-05", "HUE-09", "HUE-11"].includes(result.constructId))
    .sort((a, b) => b.internalScore - a.internalScore);
  return (
    <VisualSection
      id="motivation"
      title="Motivation Hierarchy"
      question="Which conditions appear most likely to support sustained effort?"
      rows={[["Condition", "Expression", "Evidence"], ...ranked.map((result) => [result.label, bandLabel(result.expressionBand), result.evidenceIds.length])]}
    >
      <div className="ranked-bars" aria-hidden="true">
        {ranked.map((result, index) => (
          <div className="ranked-row" key={result.constructId}>
            <span>{index + 1}</span><strong>{result.label}</strong>
            <i><b style={{ width: `${bandPosition[result.expressionBand]}%` }} /></i>
            <small>{bandLabel(result.expressionBand)}</small>
          </div>
        ))}
      </div>
      <p className="module-note">Rank is contextual, not permanent. Lower position does not mean a motive is absent.</p>
    </VisualSection>
  );
}

export function CommunicationProfile({ report }: { report: AssessmentReport }) {
  const ids = ["HUE-01", "HUE-04", "HUE-06", "HUE-07"];
  const labels: Record<string, [string, string]> = {
    "HUE-01": ["Private processing", "Social processing"],
    "HUE-04": ["Guidance-friendly", "Autonomy-protective"],
    "HUE-06": ["Direct evaluation", "Sensitive to format"],
    "HUE-07": ["Quick commitment", "Deliberate processing"]
  };
  const results = ids.map((id) => report.constructResults.find((result) => result.constructId === id)).filter(Boolean) as ConstructResult[];
  return (
    <VisualSection
      id="communication"
      title="Communication Profile"
      question="How does this person tend to process and receive important information?"
      rows={[["Continuum", "Expression", "Practical implication"], ...results.map((result) => [result.label, bandLabel(result.expressionBand), result.practicalImplication])]}
    >
      <div className="continuum-list" aria-hidden="true">
        {results.map((result) => (
          <div className="continuum" key={result.constructId}>
            <strong>{result.label}</strong>
            <div><span>{labels[result.constructId]?.[0]}</span><i><b style={{ left: `${bandPosition[result.expressionBand]}%` }} /></i><span>{labels[result.constructId]?.[1]}</span></div>
          </div>
        ))}
      </div>
      <div className="practical-callout">
        <strong>Best opening</strong>
        <p>{report.recommendations.find((recommendation) => recommendation.findingIds.includes("HUE-06"))?.exampleLanguage ?? "Begin with the observable behavior and ask what context is missing."}</p>
      </div>
    </VisualSection>
  );
}

export function ConflictMap({ report }: { report: AssessmentReport }) {
  const conflict = report.constructResults.find((result) => result.constructId === "HUE-08");
  const steps = conflict?.expressionBand === "lower"
    ? ["Notices tension", "Minimizes the issue", "Frustration accumulates", "Boundary becomes urgent", "Needs a clear repair window"]
    : ["Notices tension", "Names the concern", "Protects the boundary", "Checks impact", "Returns for repair"];
  return (
    <VisualSection
      id="conflict-map"
      title="Conflict Process Map"
      question="What sequence may occur as tension rises?"
      rows={[["Step", "Likely process"], ...steps.map((step, index) => [index + 1, step])]}
    >
      <ol className="process-map" aria-hidden="true">
        {steps.map((step, index) => <li key={step}><span>{index + 1}</span><strong>{step}</strong></li>)}
      </ol>
      <div className="split-callout">
        <div><span>Helpful response</span><p>Name the specific issue early and agree on a return time if regulation drops.</p></div>
        <div><span>Likely friction</span><p>Global judgments, forced immediacy, or interpreting space as indifference.</p></div>
      </div>
    </VisualSection>
  );
}

export function NeedsSensitivities({ report }: { report: AssessmentReport }) {
  const needIds = ["HUE-04", "HUE-05", "HUE-09", "HUE-10"];
  const sensitivityIds = ["HUE-02", "HUE-06", "HUE-12"];
  const needs = report.constructResults.filter((result) => needIds.includes(result.constructId));
  const sensitivities = report.constructResults.filter((result) => sensitivityIds.includes(result.constructId));
  return (
    <VisualSection
      id="needs"
      title="Needs and Sensitivities Balance"
      question="Which needs appear strongest, and what may disrupt them?"
      rows={[["Type", "Pattern", "Expression"], ...needs.map((result) => ["Need", result.label, bandLabel(result.expressionBand)]), ...sensitivities.map((result) => ["Sensitivity", result.label, bandLabel(result.expressionBand)])]}
    >
      <div className="paired-panels" aria-hidden="true">
        <div><h3>Core needs</h3>{needs.map((result) => <span key={result.constructId}><b>{result.label}</b><i data-band={result.expressionBand} /></span>)}</div>
        <div><h3>Primary sensitivities</h3>{sensitivities.map((result) => <span key={result.constructId}><b>{result.label}</b><i data-band={result.expressionBand} /></span>)}</div>
      </div>
    </VisualSection>
  );
}

export function InteractionMap({ report }: { report: AssessmentReport }) {
  return (
    <VisualSection
      id="interaction-map"
      title="Pattern Interaction Map"
      question="Which combinations create important strengths and tensions?"
      rows={[["Interaction", "Strength", "Friction", "Leverage"], ...report.interactions.map((item) => [item.title, item.strengthExpression, item.frictionExpression, item.actionLeverage])]}
    >
      <div className="interaction-grid">
        {report.interactions.length ? report.interactions.map((item) => (
          <article className="interaction-card" key={item.id}>
            <span>{item.confidence.label} support</span>
            <h3>{item.title}</h3>
            <p><strong>Strength</strong>{item.strengthExpression}</p>
            <p><strong>Friction</strong>{item.frictionExpression}</p>
            <p><strong>Leverage</strong>{item.actionLeverage}</p>
          </article>
        )) : <p className="empty-state">No interaction met the minimum confidence rule. More evidence is needed.</p>}
      </div>
    </VisualSection>
  );
}

export function ChartAlignmentView({ report }: { report: AssessmentReport }) {
  return (
    <VisualSection
      id="chart-alignment"
      title="Chart vs Behavior Alignment"
      question="Which founder-authored name and number hypotheses were supported by observed behavior?"
      rows={[["Source hypothesis", "Construct", "Classification", "Behavioral evidence"], ...report.chartAlignments.map((alignment) => [alignment.hypothesisId, alignment.constructId, alignment.classification, alignment.evidenceIds.length])]}
    >
      <div className="alignment-table-wrap">
        <table className="alignment-table">
          <thead><tr><th>Hypothesis</th><th>Behavioral area</th><th>Finding</th><th>Evidence</th></tr></thead>
          <tbody>
            {report.chartAlignments.map((alignment) => (
              <tr key={alignment.hypothesisId}>
                <td>{alignment.hypothesisId}</td><td>{alignment.constructId}</td>
                <td><span className={`status-chip status-${alignment.classification}`}>{alignment.classification}</span></td>
                <td>{alignment.evidenceIds.length} items</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="module-note">Founder mapping review is still required. Chart agreement never creates strong behavioral confidence by itself.</p>
    </VisualSection>
  );
}

export function ConfidencePanel({ report }: { report: AssessmentReport }) {
  return (
    <VisualSection
      id="confidence"
      title="Evidence and Confidence Panel"
      question="How much evidence supports each conclusion, and what limits certainty?"
      rows={[["Pattern", "Confidence", "Evidence", "Contradictions", "Primary reason"], ...report.constructResults.map((result) => [result.label, result.confidence.label, result.evidenceIds.length, result.contradictionIds.length, result.confidence.reasons[0] ?? ""])]}
    >
      <div className="confidence-grid">
        {report.constructResults.map((result) => (
          <article key={result.constructId} className="confidence-card">
            <span className={`confidence-mark confidence-${result.confidence.label}`} />
            <div><strong>{result.label}</strong><small>{result.confidence.label} · {result.evidenceIds.length} observations</small></div>
          </article>
        ))}
      </div>
    </VisualSection>
  );
}

export function GrowthMatrix({ report }: { report: AssessmentReport }) {
  const cell = (impact: string, effort: string) => report.recommendations.filter((item) => item.impactBand === impact && item.effortBand === effort);
  const quadrants = [
    { title: "Quick wins", impact: "high", effort: "low" },
    { title: "High-value practices", impact: "high", effort: "moderate" },
    { title: "Supportive experiments", impact: "moderate", effort: "low" },
    { title: "Longer practice", impact: "moderate", effort: "moderate" }
  ];
  return (
    <VisualSection
      id="growth"
      title="Growth Leverage Matrix"
      question="Which practical experiments may offer useful payoff for the effort involved?"
      rows={[["Recommendation", "Impact", "Effort", "Trial"], ...report.recommendations.map((item) => [item.title, item.impactBand, item.effortBand, item.trialPeriod])]}
    >
      <div className="matrix-grid">
        {quadrants.map((quadrant) => (
          <div key={quadrant.title}><h3>{quadrant.title}</h3>
            {cell(quadrant.impact, quadrant.effort).map((item) => <span key={item.id}>{item.title}</span>)}
            {!cell(quadrant.impact, quadrant.effort).length && <small>No eligible finding</small>}
          </div>
        ))}
      </div>
    </VisualSection>
  );
}

export function EnvironmentFit({ report }: { report: AssessmentReport }) {
  const dimensions: Array<[string, string, string]> = [
    ["Structure", "Freedom", "HUE-04"],
    ["Solitude", "Stimulation", "HUE-01"],
    ["Stable routine", "Novelty", "HUE-11"],
    ["Private ownership", "Collaboration", "HUE-05"],
    ["Known path", "Ambiguity", "HUE-09"]
  ];
  return (
    <VisualSection
      id="environment"
      title="Environment Fit Dashboard"
      question="Which environmental conditions may help this person function well?"
      rows={[["Left condition", "Right condition", "Position", "Confidence"], ...dimensions.map(([left, right, id]) => {
        const result = report.constructResults.find((candidate) => candidate.constructId === id);
        return [left, right, result ? bandLabel(result.expressionBand) : "insufficient", result?.confidence.label ?? "insufficient"];
      })]}
    >
      <div className="environment-list" aria-hidden="true">
        {dimensions.map(([left, right, id]) => {
          const result = report.constructResults.find((candidate) => candidate.constructId === id);
          return <div key={id}><span>{left}</span><i><b style={{ left: `${bandPosition[result?.expressionBand ?? "insufficient"]}%` }} /></i><span>{right}</span></div>;
        })}
      </div>
      <p className="module-note">This is an environmental-fit hypothesis, not career destiny.</p>
    </VisualSection>
  );
}

export function ShareCard({ report }: { report: AssessmentReport }) {
  const stress = report.constructResults.find((result) => result.constructId === "HUE-12");
  const feedback = report.recommendations.find((item) => item.findingIds.includes("HUE-06"));
  const autonomy = report.recommendations.find((item) => item.findingIds.includes("HUE-04"));
  return (
    <VisualSection
      id="share-card"
      title="How to Work With Me"
      question="What concise, user-controlled guidance is safe and useful to share?"
      rows={[["Prompt", "Shareable guidance"], ["I work best when", autonomy?.action ?? "Expectations and choices are clear."], ["When stressed", stress?.stressNarrative ?? "I may need a pause before repair."], ["Feedback", feedback?.exampleLanguage ?? "Be specific and private."], ["Please do not assume", "A need for space means a lack of care."], ["Reset", "Name the state, reduce the load, and choose one next step."]]}
    >
      <article className="share-card">
        <header><span>Human Pattern Profile</span><strong>{report.profile.displayName}</strong></header>
        <dl>
          <div><dt>I work best when…</dt><dd>{autonomy?.action ?? "Expectations and choices are clear."}</dd></div>
          <div><dt>When I am stressed…</dt><dd>{stress?.stressNarrative ?? "I may need a pause before repair."}</dd></div>
          <div><dt>The best feedback is…</dt><dd>{feedback?.exampleLanguage ?? "Specific, private, and connected to a next step."}</dd></div>
          <div><dt>Please do not assume…</dt><dd>That a need for space means a lack of care.</dd></div>
          <div><dt>What helps me reset…</dt><dd>Name the state, reduce the load, and choose one next step.</dd></div>
        </dl>
        <footer>Shared by choice · Developmental profile · {report.versions.assessment}</footer>
      </article>
    </VisualSection>
  );
}
