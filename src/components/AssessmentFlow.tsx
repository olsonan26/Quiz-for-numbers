import { useMemo } from "react";
import { ArrowLeft, CheckCircle2, Clock3, Save } from "lucide-react";
import type { AssessmentSession } from "../assessment/domain";
import { estimatedProgress } from "../assessment/engine/adaptive";
import { advanceNavigation, currentQuestion, previousNavigation, selectDraftAnswer, selectedOptionId } from "../assessment/engine/navigation";

interface AssessmentFlowProps {
  session: AssessmentSession;
  onChange: (session: AssessmentSession) => void;
  onPause: () => void;
  onReview: () => void;
}

export function AssessmentFlow({ session, onChange, onPause, onReview }: AssessmentFlowProps) {
  const item = useMemo(() => currentQuestion(session), [session]);
  const progress = estimatedProgress(session);

  if (session.status === "review" || !item) {
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
  const selectedOption = selectedOptionId(session, item.id);
  const answer = (optionId: string) => onChange(selectDraftAnswer(session, optionId, new Date().toISOString()));
  const goNext = () => onChange(advanceNavigation(session, new Date().toISOString()));
  const goBack = () => {
    onChange(previousNavigation(session, new Date().toISOString()));
  };

  return (
    <main id="main-content" className="app-shell assessment-shell">
      <nav className="topbar assessment-topbar">
        <button className="button button-ghost" onClick={session.navigation.currentIndex ? goBack : onPause}>
          <ArrowLeft size={18} aria-hidden="true" /> {session.navigation.currentIndex ? "Previous" : "Home"}
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
                className={`answer-option${selectedOption === option.id ? " is-selected" : ""}`}
                role="radio"
                aria-checked={selectedOption === option.id}
                onClick={() => answer(option.id)}
              >
                <span className="answer-dot" aria-hidden="true" />
                <span>{option.label}</span>
              </button>
            ))}
          </div>
          <div className="question-actions">
            <button className="button button-primary" onClick={goNext} disabled={!selectedOption}>Next</button>
          </div>
          <p className="sr-only" aria-live="polite">{selectedOption ? "Answer selected. Activate Next to continue." : "Choose an answer to enable Next."}</p>
        </section>
      </section>
    </main>
  );
}
