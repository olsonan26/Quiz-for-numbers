import { useState } from "react";
import { ArrowRight, BarChart3, BrainCircuit, Eye, LockKeyhole, RotateCcw, ShieldCheck, Sparkles } from "lucide-react";
import type { AssessmentReport, AssessmentSession, FeedbackRecord, ProfileContext } from "./assessment/domain";
import { VERSIONS } from "./assessment/domain";
import { createDemoSession } from "./assessment/fixtures/demo";
import { generateReport } from "./assessment/engine/report";
import { localRepository } from "./assessment/persistence/localRepository";
import { AssessmentFlow } from "./components/AssessmentFlow";
import { ReportDashboard } from "./components/ReportDashboard";
import { ReviewAnswers } from "./components/ReviewAnswers";
import { SetupWizard } from "./components/SetupWizard";

type Screen = "home" | "setup" | "assessment" | "review" | "generating" | "report";

export function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [session, setSession] = useState<AssessmentSession | null>(() => localRepository.loadSession());
  const [report, setReport] = useState<AssessmentReport | null>(() => localRepository.listReports()[0] ?? null);

  const saveSession = (next: AssessmentSession) => {
    setSession(next);
    localRepository.saveSession(next);
  };

  const begin = (profile: ProfileContext) => {
    const now = new Date().toISOString();
    const next: AssessmentSession = {
      id: crypto.randomUUID(),
      status: "in-progress",
      profile,
      responses: [],
      startedAt: now,
      updatedAt: now,
      versions: VERSIONS
    };
    saveSession(next);
    setScreen("assessment");
  };

  const generate = () => {
    if (!session) return;
    const completed = { ...session, status: "complete" as const, updatedAt: new Date().toISOString() };
    const nextReport = generateReport(completed);
    saveSession(completed);
    localRepository.saveReport(nextReport);
    setScreen("generating");
    window.scrollTo(0, 0);
    window.setTimeout(() => {
      setReport(nextReport);
      setScreen("report");
    }, 400);
  };

  const preview = () => {
    const demo = createDemoSession();
    const nextReport = generateReport(demo);
    setScreen("generating");
    window.scrollTo(0, 0);
    window.setTimeout(() => {
      setReport(nextReport);
      setScreen("report");
    }, 400);
  };

  const deleteReport = () => {
    if (!report || !window.confirm("Delete this completed report from this browser? This cannot be undone.")) return;
    localRepository.deleteReport(report.id);
    setReport(null);
    setScreen("home");
  };

  const saveFeedback = (feedback: FeedbackRecord) => localRepository.saveFeedback(feedback);

  if (screen === "setup") return <SetupWizard onComplete={begin} onCancel={() => setScreen("home")} />;
  if (screen === "assessment" && session) {
    return <AssessmentFlow session={session} onChange={saveSession} onPause={() => setScreen("home")} onReview={() => setScreen("review")} />;
  }
  if (screen === "review" && session) {
    return <ReviewAnswers session={session} onChange={saveSession} onBack={() => setScreen("assessment")} onGenerate={generate} />;
  }
  if (screen === "generating") {
    return (
      <main id="main-content" className="generating-shell" aria-live="polite">
        <div className="generating-mark" aria-hidden="true"><span /><span /><span /></div>
        <p className="eyebrow">Building the evidence view</p>
        <h1>Connecting patterns with context.</h1>
        <p>The deterministic engine is comparing baseline, stress, contradictions, confidence, and founder-authored chart hypotheses. No model call is being made.</p>
      </main>
    );
  }
  if (screen === "report" && report) {
    return <ReportDashboard report={report} onHome={() => setScreen("home")} onDelete={deleteReport} onFeedback={saveFeedback} />;
  }

  return (
    <main id="main-content" className="home-shell">
      <nav className="home-nav">
        <div className="brand"><span>H</span><strong>Human Pattern Profile</strong></div>
        <div>
          {report && <button className="button button-ghost" onClick={() => setScreen("report")}><BarChart3 size={17} aria-hidden="true" /> Last report</button>}
          <button className="button button-primary compact-button" onClick={() => setScreen("setup")}>Begin <ArrowRight size={17} aria-hidden="true" /></button>
        </div>
      </nav>

      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">Patterns, context, and what helps</p>
          <h1>Understand the person.<br /><em>Not just the label.</em></h1>
          <p className="home-lede">See how everyday tendencies, stress responses, needs, and context interact—then turn that understanding into practical communication.</p>
          <div className="hero-actions">
            <button className="button button-primary button-large" onClick={() => setScreen("setup")}>Start the assessment <ArrowRight size={19} aria-hidden="true" /></button>
            <button className="button button-secondary button-large" onClick={preview}><Eye size={19} aria-hidden="true" /> Preview a sample report</button>
          </div>
          <div className="trust-row">
            <span><LockKeyhole size={17} aria-hidden="true" /> Stays in your browser</span>
            <span><BrainCircuit size={17} aria-hidden="true" /> Deterministic scoring</span>
            <span><ShieldCheck size={17} aria-hidden="true" /> Developmental, not diagnostic</span>
          </div>
        </div>
        <div className="hero-visual" aria-label="Preview of a pattern profile">
          <div className="orbit-card">
            <span className="orbit-title">Pattern overview</span>
            <svg viewBox="0 0 300 300" aria-hidden="true">
              {[45, 80, 115].map((radius) => <circle key={radius} cx="150" cy="150" r={radius} />)}
              {Array.from({ length: 8 }).map((_, index) => {
                const angle = (index / 8) * Math.PI * 2;
                const radius = [95, 70, 108, 82, 102, 65, 88, 76][index] ?? 80;
                return <circle key={index} cx={150 + Math.cos(angle) * radius} cy={150 + Math.sin(angle) * radius} r="7" className={index % 3 === 0 ? "accent" : ""} />;
              })}
              <circle cx="150" cy="150" r="21" className="center" />
            </svg>
            <div className="orbit-insight"><Sparkles size={18} aria-hidden="true" /><p><strong>Meaningful tension</strong>Connection matters, and choice protects cooperation.</p></div>
          </div>
        </div>
      </section>

      {session && session.status !== "complete" && (
        <section className="resume-banner">
          <div><RotateCcw size={22} aria-hidden="true" /><span><strong>Assessment in progress</strong>{session.responses.length} answers saved on this device.</span></div>
          <button className="button button-secondary" onClick={() => setScreen("assessment")}>Resume assessment</button>
        </section>
      )}

      <section className="difference-section">
        <header><p className="eyebrow">A five-source model</p><h2>Recognition is the start.<br />Useful action is the standard.</h2></header>
        <div className="difference-grid">
          <article><span>01</span><h3>Behavior</h3><p>Concrete questions about what happens, not flattering identity prompts.</p></article>
          <article><span>02</span><h3>Context</h3><p>Baseline, stress, relationship, and current-state evidence stay distinct.</p></article>
          <article><span>03</span><h3>Contradiction</h3><p>Opposing evidence becomes a finding to explore, not noise to hide.</p></article>
          <article><span>04</span><h3>Chart hypotheses</h3><p>Founder-authored number and name meanings can be supported—or rejected.</p></article>
          <article><span>05</span><h3>Practical translation</h3><p>Every recommendation links back to a finding, confidence level, and limitation.</p></article>
        </div>
      </section>

      <section className="privacy-section">
        <div><p className="eyebrow">Private by default</p><h2>Your answers stay yours.</h2><p>V1 has no account, analytics tracker, model call, or remote database. Export a structured copy or delete everything from this browser at any time.</p></div>
        <button
          className="button button-danger"
          onClick={() => {
            if (window.confirm("Clear every saved session, report, and feedback record from this browser?")) {
              localRepository.clearAll();
              setSession(null);
              setReport(null);
            }
          }}
        >
          Clear all local data
        </button>
      </section>

      <footer className="home-footer"><strong>Human Pattern Profile</strong><span>Developmental research prototype · No clinical or scientific validation claim</span></footer>
    </main>
  );
}
