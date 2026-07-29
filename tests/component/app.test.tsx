import { render, screen, within } from "@testing-library/react";
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

  it("starts with a small useful report and keeps the remaining visual profile optional", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: /Preview a sample report/i }));
    await screen.findAllByRole("heading", { name: /How to make communication clearer/i });

    expect(screen.getByText(/The direct answer:/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Conflict Process Map" })).toBeVisible();
    expect(screen.getByRole("heading", { name: "How You Communicate" })).toBeVisible();

    const disclosure = screen.getByText("Explore your full profile").closest("details");
    expect(disclosure).not.toBeNull();
    expect(disclosure).not.toHaveAttribute("open");
    expect(within(disclosure!).getByText(/You do not need them to use the main answer/i)).toBeInTheDocument();

    await user.click(screen.getByText("Explore your full profile"));
    expect(disclosure).toHaveAttribute("open");
    expect(screen.getByRole("heading", { name: "Your Main Patterns" })).toBeVisible();
    expect(screen.getByRole("heading", { name: /What You Need and Notice/i })).toBeVisible();
    expect(screen.getAllByText("View accessible data table").length).toBeGreaterThanOrEqual(10);
  });

  it("uses plain recommendation labels", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: /Preview a sample report/i }));
    await screen.findAllByRole("heading", { name: /How to make communication clearer/i });

    ["Try this", "Example", "Avoid this", "Why it helps"].forEach((label) => {
      expect(screen.getAllByRole("heading", { name: label }).length).toBeGreaterThan(0);
    });
  });
});
