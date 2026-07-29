import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, ShieldCheck } from "lucide-react";
import type { AssessmentMode, Goal, ProfileContext, ReceiverStyle } from "../assessment/domain";
import { goalDefinitions } from "../assessment/data/goals";
import { profileContextSchema } from "../assessment/schemas";

const modes: Array<{ id: AssessmentMode; title: string; detail: string }> = [
  { id: "self", title: "Myself", detail: "Reflect on your own observable patterns." },
  { id: "child-observer", title: "My child", detail: "A developmental guardian-observer perspective." },
  { id: "partner-observer", title: "My partner", detail: "Your observations, not access to their inner state." },
  { id: "other-observer", title: "Someone else", detail: "Use a nickname and share only with consent." }
];

const receiverStyles: Array<{ id: ReceiverStyle; label: string }> = [
  { id: "direct", label: "Direct and concise" },
  { id: "gentle", label: "Gentle but clear" },
  { id: "analytical", label: "Analytical and detailed" },
  { id: "practical", label: "Practical and action-oriented" },
  { id: "strengths-first", label: "Strengths first" }
];

interface SetupWizardProps {
  onComplete: (profile: ProfileContext) => void;
  onCancel: () => void;
}

export function SetupWizard({ onComplete, onCancel }: SetupWizardProps) {
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<AssessmentMode>("self");
  const [goal, setGoal] = useState<Goal>("communication");
  const [displayName, setDisplayName] = useState("");
  const [birthName, setBirthName] = useState("");
  const [calledName, setCalledName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [ageRange, setAgeRange] = useState("25-39");
  const [observerFamiliarity, setObserverFamiliarity] = useState<"low" | "moderate" | "high">("high");
  const [currentStress, setCurrentStress] = useState(false);
  const [currentTransition, setCurrentTransition] = useState(false);
  const [receiverStyle, setReceiverStyle] = useState<ReceiverStyle>("practical");
  const [consented, setConsented] = useState(false);
  const [error, setError] = useState("");

  const finish = () => {
    const profile = {
      id: crypto.randomUUID(),
      displayName: mode === "self" ? displayName || "You" : displayName,
      birthName,
      calledName: calledName || undefined,
      birthDate,
      ageRange,
      mode,
      goal,
      receiverStyle,
      observerFamiliarity: mode === "self" ? undefined : observerFamiliarity,
      currentStress,
      currentTransition,
      consentedAt: new Date().toISOString()
    };
    const parsed = profileContextSchema.safeParse(profile);
    if (!consented) {
      setError("Please confirm that you understand how this assessment works and that it saves in this browser.");
      return;
    }
    if (!parsed.success) {
      setError("Complete the required name and birth-date fields before continuing.");
      return;
    }
    onComplete(parsed.data);
  };

  const next = () => {
    setError("");
    if (step === 2 && (!displayName.trim() || !birthName.trim() || !birthDate)) {
      setError("Display name, birth name, and birth date are required for this prototype.");
      return;
    }
    setStep((value) => Math.min(4, value + 1));
  };

  return (
    <main id="main-content" className="app-shell setup-shell">
      <nav className="topbar" aria-label="Assessment setup">
        <button className="button button-ghost" onClick={step === 0 ? onCancel : () => setStep(step - 1)}>
          <ArrowLeft aria-hidden="true" size={18} /> {step === 0 ? "Home" : "Back"}
        </button>
        <p className="eyebrow">Step {step + 1} of 5</p>
        <span className="save-indicator"><ShieldCheck size={16} aria-hidden="true" /> Local only</span>
      </nav>

      <section className="setup-card" aria-live="polite">
        {step === 0 && (
          <>
            <p className="eyebrow">Choose a perspective</p>
            <h1>Who are you understanding?</h1>
            <p className="lede">Observer paths describe what you have seen. They do not claim access to another person’s private experience.</p>
            <div className="choice-grid mode-grid">
              {modes.map((item) => (
                <button
                  key={item.id}
                  className={`choice-card ${mode === item.id ? "selected" : ""}`}
                  onClick={() => setMode(item.id)}
                  aria-pressed={mode === item.id}
                >
                  <span className="choice-title">{item.title}</span>
                  <span>{item.detail}</span>
                  {mode === item.id && <Check className="choice-check" size={20} aria-hidden="true" />}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <p className="eyebrow">Choose your goal</p>
            <h1>What do you want help with?</h1>
            <p className="lede">Your answer puts the most useful questions and report sections first. It does not change how answers are scored.</p>
            <div className="pill-grid">
              {goalDefinitions.map((item) => (
                <button
                  key={item.id}
                  className={`select-pill ${goal === item.id ? "selected" : ""}`}
                  onClick={() => setGoal(item.id)}
                  aria-pressed={goal === item.id}
                >
                  <strong>{item.label}</strong>
                  <span>{item.setupQuestion}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <p className="eyebrow">Minimal context</p>
            <h1>Set up the profile</h1>
            <p className="lede">
              Names and dates stay in this browser. For someone else, use a display nickname whenever practical.
            </p>
            <div className="form-grid">
              <label>
                Display name or nickname
                <input value={displayName} onChange={(event) => setDisplayName(event.target.value)} autoComplete="off" />
              </label>
              <label>
                Full birth name
                <input value={birthName} onChange={(event) => setBirthName(event.target.value)} autoComplete="off" />
              </label>
              <label>
                Called name <span className="optional">(optional)</span>
                <input value={calledName} onChange={(event) => setCalledName(event.target.value)} autoComplete="off" />
              </label>
              <label>
                Birth date
                <input type="date" value={birthDate} onChange={(event) => setBirthDate(event.target.value)} />
              </label>
              <label>
                Age range
                <select value={ageRange} onChange={(event) => setAgeRange(event.target.value)}>
                  <option>Under 8</option>
                  <option>8-12</option>
                  <option>13-17</option>
                  <option>18-24</option>
                  <option>25-39</option>
                  <option>40-59</option>
                  <option>60+</option>
                </select>
              </label>
              {mode !== "self" && (
                <label>
                  Observer familiarity
                  <select
                    value={observerFamiliarity}
                    onChange={(event) => setObserverFamiliarity(event.target.value as typeof observerFamiliarity)}
                  >
                    <option value="high">High — many settings over time</option>
                    <option value="moderate">Moderate — some settings</option>
                    <option value="low">Low — limited situations</option>
                  </select>
                </label>
              )}
            </div>
            <fieldset className="check-stack">
              <legend>Current context</legend>
              <label className="check-row">
                <input type="checkbox" checked={currentStress} onChange={(event) => setCurrentStress(event.target.checked)} />
                This is an unusually high-stress period.
              </label>
              <label className="check-row">
                <input type="checkbox" checked={currentTransition} onChange={(event) => setCurrentTransition(event.target.checked)} />
                A major transition may be affecting ordinary behavior.
              </label>
            </fieldset>
          </>
        )}

        {step === 3 && (
          <>
            <p className="eyebrow">Choose a writing style</p>
            <h1>How should the report speak?</h1>
            <p className="lede">This changes the wording and order only. Your answers and scores stay the same.</p>
            <div className="choice-grid">
              {receiverStyles.map((item) => (
                <button
                  key={item.id}
                  className={`choice-card compact ${receiverStyle === item.id ? "selected" : ""}`}
                  onClick={() => setReceiverStyle(item.id)}
                  aria-pressed={receiverStyle === item.id}
                >
                  <span className="choice-title">{item.label}</span>
                  {receiverStyle === item.id && <Check className="choice-check" size={20} aria-hidden="true" />}
                </button>
              ))}
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <p className="eyebrow">Before you begin</p>
            <h1>Developmental, private, and correctable</h1>
            <div className="consent-copy">
              <p>This pilot is not a diagnosis, prediction, hiring tool, or clinically validated test.</p>
              <p>“Not sure” is a valid answer. Name and number meanings are compared with your answers and may not match them.</p>
              <p>Your session is saved only in this browser. You can export or delete it at any time.</p>
              {mode !== "self" && <p>This report reflects your observations and should be reviewed before sharing.</p>}
              {mode === "child-observer" && <p>Child results describe current patterns and developing skills—not adult destiny.</p>}
            </div>
            <label className="consent-check">
              <input type="checkbox" checked={consented} onChange={(event) => setConsented(event.target.checked)} />
              <span>
                {mode === "child-observer"
                  ? "I am authorized to complete and locally store this guardian-observer assessment."
                  : "I understand the developmental status and consent to local browser storage."}
              </span>
            </label>
          </>
        )}

        {error && <p className="form-error" role="alert">{error}</p>}
        <footer className="setup-actions">
          <span className="step-dots" aria-label={`Step ${step + 1} of 5`}>
            {[0, 1, 2, 3, 4].map((value) => <i key={value} className={value <= step ? "active" : ""} />)}
          </span>
          {step < 4 ? (
            <button className="button button-primary" onClick={next}>Continue <ArrowRight size={18} aria-hidden="true" /></button>
          ) : (
            <button className="button button-primary" onClick={finish}>Begin assessment <ArrowRight size={18} aria-hidden="true" /></button>
          )}
        </footer>
      </section>
    </main>
  );
}
