import { cloneElement, useState, type ReactElement } from "react";
import { Download, Home, Printer, Shield, Trash2 } from "lucide-react";
import type { AssessmentReport, FeedbackRecord } from "../assessment/domain";
import { goalById } from "../assessment/data/goals";
import { downloadJson } from "../assessment/persistence/localRepository";
import {
  BaselineStress,
  ChartAlignmentView,
  CommunicationProfile,
  ConfidencePanel,
  ConflictMap,
  DecisionStyle,
  EnvironmentFit,
  GrowthMatrix,
  InteractionMap,
  MotivationHierarchy,
  NeedsSensitivities,
  PatternWheel,
  ShareCard
} from "./ReportVisuals";
import { ProprietaryDetails } from "./ProprietaryDetails";

interface ReportDashboardProps {
  report: AssessmentReport;
  onHome: () => void;
  onDelete: () => void;
  onFeedback: (feedback: FeedbackRecord) => void;
}

export function ReportDashboard({ report, onHome, onDelete, onFeedback }: ReportDashboardProps) {
  const [fit, setFit] = useState<"low" | "mixed" | "high">("mixed");
  const [impact, setImpact] = useState<"negative" | "neutral" | "positive">("neutral");
  const [usefulness, setUsefulness] = useState<FeedbackRecord["recommendationUsefulness"]>("not-yet-tried");
  const [correction, setCorrection] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const goal = goalById.get(report.profile.goal);

  const visualModules: Record<string, ReactElement> = {
    "pattern-wheel": <PatternWheel results={report.constructResults} />,
    "baseline-stress": <BaselineStress results={report.constructResults} />,
    motivation: <MotivationHierarchy report={report} />,
    communication: <CommunicationProfile report={report} />,
    "conflict-map": <ConflictMap report={report} />,
    "decision-style": <DecisionStyle report={report} />,
    needs: <NeedsSensitivities report={report} />,
    "interaction-map": <InteractionMap report={report} />,
    "chart-alignment": <ChartAlignmentView report={report} />,
    confidence: <ConfidencePanel report={report} />,
    growth: <GrowthMatrix report={report} />,
    environment: <EnvironmentFit report={report} />,
    "share-card": <ShareCard report={report} />
  };
  const primaryVisualIds = [...new Set(goal?.primaryVisualIds ?? ["pattern-wheel", "baseline-stress", "interaction-map"])];
  const primaryVisuals = primaryVisualIds
    .map((id) => visualModules[id] ? cloneElement(visualModules[id], { key: id }) : null)
    .filter(Boolean);
  const secondaryVisuals = Object.entries(visualModules)
    .filter(([id]) => !primaryVisualIds.includes(id))
    .map(([id, visual]) => cloneElement(visual, { key: id }));

  const submitFeedback = () => {
    onFeedback({
      id: `feedback-${report.id}`,
      reportId: report.id,
      reportVersion: report.versions.report,
      overallFit: fit,
      usefulInsightIds: [],
      inaccurateInsightIds: [],
      contextDependentInsightIds: [],
      stressOnlyInsightIds: [],
      emotionalImpact: impact,
      recommendationUsefulness: usefulness,
      correction: correction || undefined,
      submittedAt: new Date().toISOString()
    });
    setSubmitted(true);
  };

  return (
    <main id="main-content" className="report-shell">
      <nav className="report-nav">
        <button className="brand-button" onClick={onHome}><span>H</span><strong>Human Pattern Profile</strong></button>
        <div>
          <button className="button button-ghost" onClick={() => downloadJson(`${report.profile.displayName}-human-pattern-profile.json`, report)}>
            <Download size={17} aria-hidden="true" /> Export JSON
          </button>
          <button className="button button-ghost" onClick={() => window.print()}><Printer size={17} aria-hidden="true" /> Print / PDF</button>
          <button className="button button-ghost" onClick={onHome}><Home size={17} aria-hidden="true" /> Home</button>
        </div>
      </nav>

      <header className="report-hero">
        <div>
          <p className="eyebrow">What you wanted help with</p>
          <h1>{report.goalAnswer.heading}</h1>
          <p className="goal-wanted">{report.goalAnswer.wantedHelpWith}</p>
          <p className="report-summary"><strong>The direct answer:</strong> {report.goalAnswer.directAnswer}</p>
          <div className="hero-patterns">
            {report.constructResults
              .filter((result) => result.confidence.label !== "insufficient")
              .sort((a, b) => b.confidence.internalScore - a.confidence.internalScore)
              .slice(0, 3)
              .map((result) => (
                <span key={result.constructId}><i className={`confidence-mark confidence-${result.confidence.label}`} />{result.label}<small>{result.expressionBand}</small></span>
              ))}
          </div>
        </div>
        <aside className="hero-insight">
          <span>Try this week</span>
          <p>{report.goalAnswer.thisWeek}</p>
          <small>{report.goalAnswer.confidence} support · {report.headline}</small>
        </aside>
      </header>

      <nav className="section-nav" aria-label="Report sections">
        <a href="#goal-answer">Your answer</a><a href="#recommendations">What to try</a>
        {primaryVisualIds.map((id) => <a href={`#${id}`} key={id}>{id.replaceAll("-", " ")}</a>)}
        <a href="#full-profile">Full profile</a><a href="#evidence">Details</a>
      </nav>

      <section className="report-module goal-answer-module" id="goal-answer">
        <header>
          <p className="eyebrow">{report.goalAnswer.goalLabel}</p>
          <h2>{report.goalAnswer.heading}</h2>
          <p>{report.goalAnswer.directAnswer}</p>
        </header>
        <div className="goal-answer-grid">
          <div>
            <h3>What your answers suggest</h3>
            <ul>{report.goalAnswer.whatAnswersSuggest.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <h3>What helps</h3>
            <ul>{report.goalAnswer.whatHelps.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div><h3>Where you may get stuck</h3><p>{report.goalAnswer.whereYouGetStuck}</p></div>
          <div><h3>What not to do</h3><p>{report.goalAnswer.whatNotToDo}</p></div>
          <div><h3>A realistic example</h3><p>{report.goalAnswer.realisticExample}</p></div>
          <div><h3>One small step this week</h3><p>{report.goalAnswer.thisWeek}</p></div>
        </div>
        {report.goalAnswer.decisionDetails && (
          <div className="decision-guide">
            <div><h3>How you usually make decisions</h3><p>{report.goalAnswer.decisionDetails.usualStyle}</p></div>
            <div><h3>How you may sabotage your own decision</h3><p>{report.goalAnswer.decisionDetails.selfSabotage}</p></div>
            <div><h3>Signs to pause before deciding</h3><ul>{report.goalAnswer.decisionDetails.pauseSigns.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div><h3>A simple decision method</h3><ol>{report.goalAnswer.decisionDetails.method.map((item) => <li key={item}>{item}</li>)}</ol></div>
            <div className="decision-examples"><h3>Real-life examples</h3>{report.goalAnswer.decisionDetails.examples.map((example) => <article key={example.title}><strong>{example.title}</strong><p>{example.situation}</p><span>{example.response}</span></article>)}</div>
            <div><h3>Decision checklist</h3><ul className="checklist">{report.goalAnswer.decisionDetails.checklist.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div className="seven-day-experiment"><h3>Your seven-day experiment</h3><p>{report.goalAnswer.decisionDetails.sevenDayExperiment}</p></div>
          </div>
        )}
      </section>

      <section className="recommendation-section" id="recommendations" aria-labelledby="recommendations-title">
        <header><p className="eyebrow">Start small</p><h2 id="recommendations-title">What to try first</h2><p>These ideas come from your answers. Treat each one as an experiment, not a rule.</p></header>
        <div className="recommendation-grid">
          {report.recommendations.slice(0, 3).map((recommendation) => (
            <article className="recommendation-card" key={recommendation.id}>
              <span>{recommendation.confidence.label} support</span>
              <h3>{recommendation.title}</h3>
              <h4>Try this</h4><p>{recommendation.action}</p>
              <h4>Example</h4><p>{recommendation.exampleLanguage}</p>
              <h4>Avoid this</h4><p>{recommendation.avoid}</p>
              <h4>Why it helps</h4><p>{recommendation.whyItHelps}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="report-grid primary-visuals">{primaryVisuals}</div>

      <section className="report-module pattern-summary">
        <header><p className="eyebrow">Short summary</p><h2>Your broader pattern</h2></header>
        <h3>{report.headline}</h3>
        <p>{report.summary}</p>
      </section>

      <details className="full-profile-disclosure" id="full-profile">
        <summary>Explore your full profile</summary>
        <p>Open this section when you want the rest of the charts. You do not need them to use the main answer above.</p>
        <div className="report-grid">{secondaryVisuals}</div>
      </details>

      <ProprietaryDetails report={report} />

      <section className="report-module evidence-ledger" id="evidence">
        <header><p className="eyebrow">Details</p><h2>Evidence and limits</h2><p>This section records the exact versions and limits behind the report.</p></header>
        <div className="ledger-grid">
          <div><span>Assessment</span><strong>{report.versions.assessment}</strong></div>
          <div><span>Item bank</span><strong>{report.versions.itemBank}</strong></div>
          <div><span>Report</span><strong>{report.versions.report}</strong></div>
          <div><span>Source version</span><strong>{report.proprietaryProfile.sourceCommit.slice(0, 12)}</strong></div>
        </div>
        <details>
          <summary>How the name and number calculations were made</summary>
          <div className="trace-list">
            {report.proprietaryProfile.traces.map((trace) => (
              <div key={trace.id}><strong>{trace.label}: {trace.compound}</strong><span>{trace.sourcePath}</span><small>{trace.inputSummary}</small></div>
            ))}
          </div>
        </details>
        <ul>{report.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}</ul>
        <div className="privacy-banner"><Shield size={20} aria-hidden="true" /><p><strong>Nothing left this browser.</strong> No AI or remote service was used to score or write this report.</p></div>
      </section>

      <section className="report-module feedback-module">
        <header><p className="eyebrow">Help improve the report</p><h2>What fits—and what does not?</h2><p>Your correction is saved with this report. It does not change the original result.</p></header>
        {submitted ? <p className="success-message">Feedback saved in this browser. Thank you.</p> : (
          <div className="feedback-form">
            <label>Overall fit<select value={fit} onChange={(event) => setFit(event.target.value as typeof fit)}><option value="low">Low</option><option value="mixed">Mixed</option><option value="high">High</option></select></label>
            <label>How this felt<select value={impact} onChange={(event) => setImpact(event.target.value as typeof impact)}><option value="negative">Negative</option><option value="neutral">Neutral</option><option value="positive">Positive</option></select></label>
            <label>How useful was the advice?<select value={usefulness} onChange={(event) => setUsefulness(event.target.value as typeof usefulness)}><option value="not-yet-tried">Not tried yet</option><option value="not-useful">Not useful</option><option value="somewhat-useful">Somewhat useful</option><option value="useful">Useful</option></select></label>
            <label className="full-width">What is wrong or missing?<textarea value={correction} onChange={(event) => setCorrection(event.target.value)} maxLength={2000} /></label>
            <button className="button button-primary" onClick={submitFeedback}>Save feedback in this browser</button>
          </div>
        )}
      </section>

      <footer className="report-footer">
        <div><strong>Human Pattern Profile</strong><span>Developmental research prototype · not a diagnosis</span></div>
        <button className="button button-danger" onClick={onDelete}><Trash2 size={17} aria-hidden="true" /> Delete this report</button>
      </footer>
    </main>
  );
}
