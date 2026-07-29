import { ArrowLeft, Sparkles } from "lucide-react";
import type { AssessmentSession } from "../assessment/domain";
import { itemById } from "../assessment/data/items";

interface ReviewAnswersProps {
  session: AssessmentSession;
  onChange: (session: AssessmentSession) => void;
  onBack: () => void;
  onGenerate: () => void;
}

export function ReviewAnswers({ session, onChange, onBack, onGenerate }: ReviewAnswersProps) {
  return (
    <main id="main-content" className="app-shell review-shell">
      <nav className="topbar">
        <button className="button button-ghost" onClick={onBack}><ArrowLeft size={18} aria-hidden="true" /> Questions</button>
        <p className="eyebrow">{session.responses.length} answers</p>
        <span className="save-indicator">Saved locally</span>
      </nav>
      <header className="page-header">
        <p className="eyebrow">Review</p>
        <h1>Check the evidence before scoring</h1>
        <p>Changing an answer reruns the same deterministic rules. Receiver tone and proprietary meanings never change behavioral scores.</p>
      </header>
      <div className="review-list">
        {session.responses.map((response, index) => {
          const item = itemById.get(response.itemId);
          if (!item) return null;
          return (
            <label className="review-row" key={response.itemId}>
              <span className="review-number">{index + 1}</span>
              <span className="review-prompt">{item.promptByMode[session.profile.mode]}</span>
              <select
                aria-label={`Answer for question ${index + 1}`}
                value={response.optionId}
                onChange={(event) =>
                  onChange({
                    ...session,
                    responses: session.responses.map((current) =>
                      current.itemId === response.itemId
                        ? { ...current, optionId: event.target.value, answeredAt: new Date().toISOString() }
                        : current
                    ),
                    updatedAt: new Date().toISOString()
                  })
                }
              >
                {item.options.map((option) => <option value={option.id} key={option.id}>{option.label}</option>)}
              </select>
            </label>
          );
        })}
      </div>
      <div className="sticky-action">
        <div><strong>Ready to generate?</strong><span>No AI or network call is required.</span></div>
        <button className="button button-primary" onClick={onGenerate}><Sparkles size={18} aria-hidden="true" /> Generate my profile</button>
      </div>
    </main>
  );
}
