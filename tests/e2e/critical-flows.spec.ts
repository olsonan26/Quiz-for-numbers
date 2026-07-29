import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

type Mode = "Myself" | "My child" | "My partner" | "Someone else";
type Goal = "Overall understanding" | "Decision-making" | "Communication";

async function completeSetup(page: Page, mode: Mode, goal: Goal = "Overall understanding") {
  await page.getByRole("button", { name: /^Begin/ }).first().click();
  await page.getByRole("button", { name: new RegExp(`^${mode}`) }).click();
  await page.getByRole("button", { name: /Continue/ }).click();
  await page.getByRole("button", { name: new RegExp(`^${goal}`) }).click();
  await page.getByRole("button", { name: /Continue/ }).click();
  await page.getByLabel("Display name or nickname").fill(mode === "Myself" ? "Alex" : "Jordan");
  await page.getByLabel("Full birth name").fill("Alex Jordan Olson");
  await page.getByLabel("Called name").fill("Alex Olson");
  await page.getByLabel("Birth date").fill("1990-06-15");
  if (mode === "My child") await page.getByLabel("Age range").selectOption({ label: "8-12" });
  await page.getByRole("button", { name: /Continue/ }).click();
  await page.getByRole("button", { name: /Practical and action-oriented/ }).click();
  await page.getByRole("button", { name: /Continue/ }).click();
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: /Begin assessment/ }).click();
}

async function chooseAndContinue(page: Page, answer = "Often") {
  await page.getByRole("radio", { name: answer }).click();
  await page.getByRole("button", { name: "Next" }).click();
}

async function answerToCompletion(page: Page, pattern: "often" | "uncertain" | "contradictory" = "often") {
  for (let index = 0; index < 50; index += 1) {
    if (await page.getByRole("heading", { name: /Review before generating results/i }).isVisible().catch(() => false)) return;
    const answer =
      pattern === "uncertain"
        ? "It depends on the situation"
        : pattern === "contradictory" && index % 2 === 0
          ? "Almost never"
          : pattern === "contradictory"
            ? "Almost always"
            : "Often";
    await chooseAndContinue(page, answer);
  }
  throw new Error("Assessment did not finish within 50 questions.");
}

test("answer selection waits for Next, can change, and Next advances once", async ({ page }) => {
  await page.goto("/");
  await completeSetup(page, "Myself");

  const question = page.getByRole("heading", { level: 1 });
  const firstPrompt = await question.textContent();
  const next = page.getByRole("button", { name: "Next" });
  await expect(next).toBeDisabled();

  await page.getByRole("radio", { name: "Often" }).click();
  await expect(question).toHaveText(firstPrompt ?? "");
  await expect(page.getByRole("radio", { name: "Often" })).toHaveAttribute("aria-checked", "true");
  await expect(next).toBeEnabled();

  await page.getByRole("radio", { name: "Almost never" }).click();
  await expect(question).toHaveText(firstPrompt ?? "");
  await expect(page.getByRole("radio", { name: "Almost never" })).toHaveAttribute("aria-checked", "true");
  await expect(page.getByRole("radio", { name: "Often" })).toHaveAttribute("aria-checked", "false");

  await next.click();
  await expect(question).not.toHaveText(firstPrompt ?? "");
  await expect(page.getByText(/^1 answered$/)).toBeVisible();
  await expect(next).toBeDisabled();
});

test("Previous preserves answers and an intentional edit keeps the saved path", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile-chromium", "The same navigation model is covered in the desktop flow.");
  await page.goto("/");
  await completeSetup(page, "Myself");
  const firstPrompt = await page.getByRole("heading", { level: 1 }).textContent();
  await chooseAndContinue(page, "Often");
  const secondPrompt = await page.getByRole("heading", { level: 1 }).textContent();
  await chooseAndContinue(page, "Often");

  await page.getByRole("button", { name: "Previous" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(secondPrompt ?? "");
  await expect(page.getByRole("radio", { name: "Often" })).toHaveAttribute("aria-checked", "true");
  await page.getByRole("button", { name: "Previous" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(firstPrompt ?? "");
  await expect(page.getByRole("radio", { name: "Often" })).toHaveAttribute("aria-checked", "true");

  await page.getByRole("radio", { name: "Almost never" }).click();
  await page.getByRole("button", { name: "Next" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(secondPrompt ?? "");
  await expect(page.getByRole("radio", { name: "Often" })).toHaveAttribute("aria-checked", "true");
});

test("observer questions use an observer label", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile-chromium", "Observer copy does not vary by viewport.");
  await page.goto("/");
  await completeSetup(page, "My partner", "Communication");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/your partner/i);
});

for (const mode of ["Myself", "My child", "My partner", "Someone else"] as const) {
  test(`${mode} completes a deterministic assessment`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === "mobile-chromium" && mode !== "Myself", "Other modes are covered at desktop; self covers mobile.");
    await page.goto("/");
    await completeSetup(page, mode);
    await answerToCompletion(page);
    await page.getByRole("button", { name: /Review answers/ }).click();
    await page.getByRole("button", { name: /Make my report/ }).click();
    await expect(page.locator("h1", { hasText: "The main patterns to understand" })).toBeVisible();
    await expect(page.getByText(/Nothing left this browser/)).toBeVisible();
  });
}

test("the review repeats the chosen goal and decision report leads with a direct answer", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile-chromium", "The full decision report is covered at desktop.");
  await page.goto("/");
  await completeSetup(page, "Myself", "Decision-making");
  await answerToCompletion(page);
  await page.getByRole("button", { name: /Review answers/ }).click();
  await expect(page.getByText(/You chose this assessment to improve decision-making/i)).toBeVisible();
  await expect(page.getByText(/how you make choices, where you may get stuck/i)).toBeVisible();
  await page.getByRole("button", { name: /Make my report/ }).click();

  await expect(page.getByText(/What you wanted help with/i)).toBeVisible();
  await expect(page.getByText(/The direct answer:/i)).toBeVisible();
  for (const heading of [
    "How you usually make decisions",
    "How you may sabotage your own decision",
    "Signs to pause before deciding",
    "A simple decision method",
    "Real-life examples",
    "Decision checklist",
    "Your seven-day experiment"
  ]) {
    await expect(page.getByRole("heading", { name: heading })).toBeVisible();
  }
  for (const label of ["Try this", "Example", "Avoid this", "Why it helps"]) {
    await expect(page.getByRole("heading", { name: label }).first()).toBeVisible();
  }
});

test("uncertainty gathers extra evidence and yields limited confidence", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile-chromium", "Covered on desktop.");
  await page.goto("/");
  await completeSetup(page, "Myself");
  await answerToCompletion(page, "uncertain");
  await expect(page.getByText(/answered 48 questions/i)).toBeVisible();
});

test("contradictory answers surface contradiction findings", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile-chromium", "Covered on desktop.");
  await page.goto("/");
  await completeSetup(page, "Myself");
  await answerToCompletion(page, "contradictory");
  await page.getByRole("button", { name: /Review answers/ }).click();
  await page.getByRole("button", { name: /Make my report/ }).click();
  await expect(page.getByText(/preserves that tension/i)).toBeVisible();
  await expect(page.locator(".confidence-conflicting").first()).toBeVisible();
});

test("refresh resumes at the current question and local deletion clears saved data", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile-chromium", "Covered on desktop.");
  await page.goto("/");
  await completeSetup(page, "Myself");
  await chooseAndContinue(page, "Often");
  await chooseAndContinue(page, "Often");
  const prompt = await page.getByRole("heading", { level: 1 }).textContent();
  await page.reload();
  await expect(page.getByText(/2 answers saved/)).toBeVisible();
  await page.getByRole("button", { name: /Resume assessment/ }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(prompt ?? "");
  await expect(page.getByText(/^2 answered$/)).toBeVisible();
  await page.getByRole("button", { name: "Pause" }).click();
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: /Clear all local data/ }).click();
  await expect(page.getByText(/Assessment in progress/)).toHaveCount(0);
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
});

test("sample report keeps secondary visuals closed, exposes conflict and uses visible need labels", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Preview a sample report/ }).click();
  await expect(page.locator("h1", { hasText: "How to make communication clearer" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Conflict Process Map" })).toBeVisible();
  const fullProfile = page.locator("details.full-profile-disclosure");
  await expect(fullProfile).not.toHaveAttribute("open", "");
  await expect(page.getByRole("heading", { name: /What You Need and Notice/i })).not.toBeVisible();
  await fullProfile.locator(":scope > summary").click();
  await expect(page.getByRole("heading", { name: /What You Need and Notice/i })).toBeVisible();
  await expect(page.getByText(/Lower means it showed up less often/i)).toBeVisible();
  await expect(page.getByText(/Moderate means it was in the middle/i)).toBeVisible();
  await expect(page.getByText(/Higher means it showed up more often/i)).toBeVisible();
});

test("sample report works without AI, can be deleted, and passes the axe scan", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Preview a sample report/ }).click();
  await expect(page.getByText(/No AI or remote service/)).toBeVisible();
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((violation) => ["critical", "serious"].includes(violation.impact ?? ""))).toEqual([]);
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: /Delete this report/ }).click();
  await expect(page.getByRole("heading", { name: /Understand the person/i })).toBeVisible();
});

test("keyboard selection waits for Next before moving on", async ({ page }) => {
  await page.goto("/");
  await completeSetup(page, "Myself");
  const question = page.getByRole("heading", { level: 1 });
  const firstPrompt = await question.textContent();
  const radio = page.getByRole("radio", { name: "Often" });
  await radio.focus();
  await page.keyboard.press("Enter");
  await expect(question).toHaveText(firstPrompt ?? "");
  await expect(radio).toHaveAttribute("aria-checked", "true");
  await page.getByRole("button", { name: "Next" }).focus();
  await page.keyboard.press("Enter");
  await expect(question).not.toHaveText(firstPrompt ?? "");
});
