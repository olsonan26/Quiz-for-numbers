import { useState } from "react";
import { Download, Home, Printer, Shield, Trash2 } from "lucide-react";
import type { AssessmentReport, FeedbackRecord } from "../assessment/domain";
import { downloadJson } from "../assessment/persistence/localRepository";
import {
  BaselineStress,
  ChartAlignmentView,
  CommunicationProfile,
  ConfidencePanel,
  ConflictMap,
  EnvironmentFit,
  GrowthMatrix,
  InteractionMap,
  MotivationHierarchy,
  NeedsSensitivities,
  PatternWheel,
  ShareCard
} from "./ReportVisuals";

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

  const submitFeedback = () => {
    onFeedback({
      id: `feedback-${report.id}`,
      reportId: report.id,
      reportVersion: report.versions.interpretation,
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
          <p className="eyebrow">Developmental profile · {report.profile.mode.replace("-", " ")}</p>
          <h1>{report.headline}</h1>
          <p className="report-summary">{report.summary}</p>
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
          <span>Practical takeaway</span>
          <p>{report.recommendations[0]?.action ?? "Gather more context before drawing a firm conclusion."}</p>
          <small>{report.recommendations[0]?.confidence.label ?? "tentative"} support</small>
        </aside>
      </header>

      <nav className="section-nav" aria-label="Report sections">
        <a href="#pattern-wheel">Overview</a><a href="#baseline-stress">Under pressure</a>
        <a href="#communication">Communication</a><a href="#conflict-map">Conflict</a>
        <a href="#chart-alignment">Chart alignment</a><a href="#growth">Actions</a>
        <a href="#confidence">Evidence</a>
      </nav>

      <div className="report-grid">
        <PatternWheel results={report.constructResults} />
        <BaselineStress results={report.constructResults} />
        <MotivationHierarchy report={report} />
        <CommunicationProfile report={report} />
        <ConflictMap report={report} />
        <NeedsSensitivities report={report} />
        <InteractionMap report={report} />
        <ChartAlignmentView report={report} />
        <ConfidencePanel report={report} />
        <GrowthMatrix report={report} />
        <EnvironmentFit report={report} />
        <ShareCard report={report} />
      </div>

      <section className="report-module evidence-ledger">
        <header><p className="eyebrow">Traceability</p><h2>Evidence and limits</h2><p>Every result preserves its source evidence and exact engine versions.</p></header>
        <div className="ledger-grid">
          <div><span>Assessment</span><strong>{report.versions.assessment}</strong></div>
          <div><span>Item bank</span><strong>{report.versions.itemBank}</strong></div>
          <div><span>Scoring</span><strong>{report.versions.scoring}</strong></div>
          <div><span>Proprietary source</span><strong>{report.proprietaryProfile.sourceCommit.slice(0, 12)}</strong></div>
        </div>
        <details>
          <summary>Proprietary calculation trace</summary>
          <div className="trace-list">
            {report.proprietaryProfile.traces.map((trace) => (
              <div key={trace.id}><strong>{trace.label}: {trace.compound}</strong><span>{trace.sourcePath}</span><small>{trace.inputSummary}</small></div>
            ))}
          </div>
        </details>
        <ul>{report.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}</ul>
        <div className="privacy-banner"><Shield size={20} aria-hidden="true" /><p><strong>Nothing left this browser.</strong> No AI or remote service was used to score or narrate this report.</p></div>
      </section>

      <section className="report-module feedback-module">
        <header><p className="eyebrow">Correction loop</p><h2>What fits—and what does not?</h2><p>Your correction is saved beside this exact report version. It does not silently rewrite the historical result.</p></header>
        {submitted ? <p className="success-message">Feedback saved locally. Thank you for correcting the model.</p> : (
          <div className="feedback-form">
            <label>Overall fit<select value={fit} onChange={(event) => setFit(event.target.value as typeof fit)}><option value="low">Low</option><option value="mixed">Mixed</option><option value="high">High</option></select></label>
            <label>Emotional impact<select value={impact} onChange={(event) => setImpact(event.target.value as typeof impact)}><option value="negative">Negative</option><option value="neutral">Neutral</option><option value="positive">Positive</option></select></label>
            <label>Recommendation usefulness<select value={usefulness} onChange={(event) => setUsefulness(event.target.value as typeof usefulness)}><option value="not-yet-tried">Not tried yet</option><option value="not-useful">Not useful</option><option value="somewhat-useful">Somewhat useful</option><option value="useful">Useful</option></select></label>
            <label className="full-width">Correction or missing context<textarea value={correction} onChange={(event) => setCorrection(event.target.value)} maxLength={2000} /></label>
            <button className="button button-primary" onClick={submitFeedback}>Save feedback locally</button>
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
