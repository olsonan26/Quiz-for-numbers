import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { App } from "../../src/App";

describe("application experience", () => {
  beforeEach(() => localStorage.clear());

  it("renders the product promise and local-first controls", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: /Understand the person/i })).toBeInTheDocument();
    expect(screen.getByText(/Stays in your browser/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Clear all local data/i })).toBeInTheDocument();
  });

  it("renders every required visualization and its accessible table alternative", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: /Preview a sample report/i }));
    expect(screen.getByRole("heading", { name: /Connecting patterns with context/i })).toBeInTheDocument();
    await screen.findByRole("heading", { name: "Human Pattern Wheel" });
    const headings = [
      "Human Pattern Wheel",
      "Baseline vs Stress Profile",
      "Motivation Hierarchy",
      "Communication Profile",
      "Conflict Process Map",
      "Needs and Sensitivities Balance",
      "Pattern Interaction Map",
      "Chart vs Behavior Alignment",
      "Evidence and Confidence Panel",
      "Growth Leverage Matrix",
      "Environment Fit Dashboard",
      "How to Work With Me"
    ];
    headings.forEach((name) => expect(screen.getByRole("heading", { name })).toBeInTheDocument());
    expect(screen.getAllByText("View accessible data table")).toHaveLength(12);
  });
});
