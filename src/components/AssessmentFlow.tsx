import { useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, Clock3, Save } from "lucide-react";
import type { AssessmentSession, ResponseRecord } from "../assessment/domain";
import { estimatedProgress, selectNextItem } from "../assessment/engine/adaptive";

interface AssessmentFlowProps {
  session: AssessmentSession;
  onChange: (session: AssessmentSession) => void;
  onPause: () => void;
  onReview: () => void;
}

export function AssessmentFlow({ session, onChange, onPause, onReview }: AssessmentFlowProps) {
  const [lastItemId, setLastItemId] = useState<string | null>(null);
  const item = useMemo(() => selectNextItem(session), [session]);
  const progress = estimatedProgress(session);

  if (!item) {
    return (
      <main id="main-content" className="app-shell centered-shell">
        <section className="completion-card">
          <CheckCircle2 size={42} aria-hidden="true" />
          <p className="eyebrow">Evidence path complete</p>
          <h1>Review before generating results</h1>
          <p>You answered {session.responses.length} questions. Nothing is scored or sent outside this browser.</p>
          <button className="button button-primary" onClick={onReview}>Review answers</button>
        </section>
      </main>
    );
  }

  const prompt = item.promptByMode[session.profile.mode];
  const answer = (optionId: string) => {
    const response: ResponseRecord = { itemId: item.id, optionId, answeredAt: new Date().toISOString() };
    const responses = [...session.responses.filter((current) => current.itemId !== item.id), response];
    setLastItemId(item.id);
    onChange({ ...session, responses, updatedAt: response.answeredAt });
  };
  const goBack = () => {
    const previous = session.responses[session.responses.length - 1];
    if (!previous) return;
    onChange({
      ...session,
      responses: session.responses.slice(0, -1),
      updatedAt: new Date().toISOString()
    });
  };

  return (
    <main id="main-content" className="app-shell assessment-shell">
      <nav className="topbar assessment-topbar">
        <button className="button button-ghost" onClick={session.responses.length ? goBack : onPause}>
          <ArrowLeft size={18} aria-hidden="true" /> {session.responses.length ? "Previous" : "Home"}
        </button>
        <span className="save-indicator"><Save size={16} aria-hidden="true" /> Saved locally</span>
        <button className="button button-ghost" onClick={onPause}>Pause</button>
      </nav>

      <section className="question-layout">
        <aside className="progress-panel" aria-label="Assessment progress">
          <p className="eyebrow">Section {Math.min(5, Math.floor(progress.answered / 9) + 1)} of 5</p>
          <div className="progress-track" aria-hidden="true">
            <span style={{ width: `${Math.min(100, (progress.answered / progress.likelyTotal) * 100)}%` }} />
          </div>
          <p><strong>{progress.answered}</strong> answered</p>
          <p className="muted">Likely total: {progress.likelyTotal}. Maximum: {progress.maximum}.</p>
          <div className="context-note">
            <Clock3 size={18} aria-hidden="true" />
            <span>Uncertain answers gather more context. They never lower or raise a trait score.</span>
          </div>
        </aside>

        <section className="question-card" key={item.id}>
          <div className="question-meta">
            <span>{item.context === "stress" ? "Under pressure" : item.context === "relationship" ? "In relationships" : "Everyday pattern"}</span>
            <span>{item.id}</span>
          </div>
          <h1>{prompt}</h1>
          <p className="question-help">Choose the option that best reflects repeated behavior, not one exceptional day.</p>
          <div className="answer-list" role="radiogroup" aria-label="Response options">
            {item.options.map((option) => (
              <button
                key={option.id}
                className="answer-option"
                role="radio"
                aria-checked="false"
                onClick={() => answer(option.id)}
              >
                <span className="answer-dot" aria-hidden="true" />
                <span>{option.label}</span>
              </button>
            ))}
          </div>
          {lastItemId && <p className="sr-only" aria-live="polite">Previous answer saved for {lastItemId}.</p>}
        </section>
      </section>
    </main>
  );
}
