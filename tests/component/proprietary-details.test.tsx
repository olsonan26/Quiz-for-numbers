import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { AssessmentReport } from "../../src/assessment/domain";
import { ProprietaryDetails } from "../../src/components/ProprietaryDetails";
import { costarProvider } from "../../src/proprietary/adapters/costarProvider";

function reportFixture(): AssessmentReport {
  const profile = {
    id: "profile-1", displayName: "Alex", birthName: "Alex Olson", calledName: "Alex Olson", birthDate: "1990-06-15",
    ageRange: "adult", mode: "self" as const, goal: "communication" as const, receiverStyle: "practical" as const,
    currentStress: false, consentedAt: "2026-07-29T00:00:00.000Z"
  };
  return {
    id: "report-1", profileId: profile.id, assessmentId: "human-pattern-profile", completedAt: profile.consentedAt,
    profile, versions: { assessment: "hue-v1.1.0", itemBank: "pilot-72-v1.1.0", scoring: "deterministic-v1.0.0", chartMapping: "costar-hypotheses-v1.0.0", proprietaryCalculation: "legacy-costar-1.0.0", proprietaryInterpretation: "founder-meanings-1.0.0", interpretation: "templates-v1.1.0", report: "reports-v1.1.0", visualization: "visuals-v1.1.0", safety: "safety-v1.0.0" },
    headline: "Test", summary: "Test", constructResults: [], contradictions: [], interactions: [], recommendations: [], visualizations: [],
    proprietaryProfile: costarProvider.calculateProfile({ fullName: profile.birthName, calledName: profile.calledName, birthDate: profile.birthDate }),
    chartAlignments: [{ hypothesisId: "hyp-1", constructId: "HUE-04", classification: "supported", confidence: { label: "tentative", internalScore: 0.5, reasons: [], coverage: 0.5, consistency: 0.5, contextStability: 0.5, responseQuality: 0.5, contradictionPenalty: 0, stateContaminationPenalty: 0 }, evidenceIds: [], summary: "A founder-source idea matches the available answers.", founderInputRequired: true }],
    goalAnswer: { goal: "communication", goalLabel: "Communication", wantedHelpWith: "Communication", heading: "Test", directAnswer: "Test", whatAnswersSuggest: [], whatHelps: [], whereYouGetStuck: "Test", whatNotToDo: "Test", realisticExample: "Test", thisWeek: "Test", constructIds: [], confidence: "tentative" },
    validationStatus: { instrumentStatus: "developmental", validatedPopulations: [], unvalidatedPopulations: [], knownLimitations: [] },
    limitations: [], feedbackStatus: "pending"
  };
}

describe("ProprietaryDetails", () => {
  it("shows founder-source numbers separately from answer evidence", () => {
    render(<ProprietaryDetails report={reportFixture()} />);
    expect(screen.getByRole("heading", { name: "Your numbers and your answers" })).toBeInTheDocument();
    expect(screen.getByText(/never used to change/i)).toBeInTheDocument();
    screen.getByText("See the number and name details").click();
    expect(screen.getByRole("heading", { name: /Called Name: 9/i })).toBeInTheDocument();
    expect(screen.getByText("PMEI / Lettrology name count")).toBeInTheDocument();
    expect(screen.getByText("Checksum")).toBeInTheDocument();
    expect(screen.getByText(/Matches your answers/i)).toBeInTheDocument();
  });
});
