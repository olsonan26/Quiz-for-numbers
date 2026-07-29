import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

async function completeSetup(page: Page, mode: "Myself" | "My child" | "My partner" | "Someone else") {
  await page.getByRole("button", { name: /^Begin/ }).first().click();
  await page.getByRole("button", { name: new RegExp(`^${mode}`) }).click();
  await page.getByRole("button", { name: /Continue/ }).click();
  await page.getByRole("button", { name: /Overall understanding/ }).click();
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

async function answerToCompletion(page: Page, pattern: "often" | "uncertain" | "contradictory" = "often") {
  for (let index = 0; index < 50; index += 1) {
    if (await page.getByRole("heading", { name: /Review before generating results/i }).isVisible().catch(() => false)) return;
    const name =
      pattern === "uncertain"
        ? "It depends on the situation"
        : pattern === "contradictory" && index % 2 === 0
          ? "Almost never"
          : pattern === "contradictory"
            ? "Almost always"
            : "Often";
    await page.getByRole("radio", { name }).click();
  }
  throw new Error("Assessment did not finish within 50 questions.");
}

for (const mode of ["Myself", "My child", "My partner", "Someone else"] as const) {
  test(`${mode} completes a deterministic assessment`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === "mobile-chromium" && mode !== "Myself", "Other modes are covered at desktop; self covers mobile.");
    await page.goto("/");
    await completeSetup(page, mode);
    await answerToCompletion(page);
    await page.getByRole("button", { name: /Review answers/ }).click();
    await page.getByRole("button", { name: /Generate my profile/ }).click();
    await expect(page.getByRole("heading", { name: /Human Pattern Wheel/ })).toBeVisible();
    await expect(page.getByText(/Nothing left this browser/)).toBeVisible();
  });
}

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
  await page.getByRole("button", { name: /Generate my profile/ }).click();
  await expect(page.getByText(/preserves that tension/i)).toBeVisible();
  await expect(page.locator(".confidence-conflicting").first()).toBeVisible();
});

test("session resumes after refresh and local deletion clears saved data", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === "mobile-chromium", "Covered on desktop.");
  await page.goto("/");
  await completeSetup(page, "Myself");
  await page.getByRole("radio", { name: "Often" }).click();
  await page.getByRole("radio", { name: "Often" }).click();
  await page.reload();
  await expect(page.getByText(/2 answers saved/)).toBeVisible();
  await page.getByRole("button", { name: /Resume assessment/ }).click();
  await expect(page.getByText(/2 answered/)).toBeVisible();
  await page.getByRole("button", { name: "Pause" }).click();
  page.once("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: /Clear all local data/ }).click();
  await expect(page.getByText(/Assessment in progress/)).toHaveCount(0);
  expect(await page.evaluate(() => localStorage.length)).toBe(0);
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

test("a complete assessment is operable through keyboard activation", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: /Who are you understanding/ })).toBeVisible();

  const activate = async (locator: ReturnType<Page["getByRole"]>) => {
    await locator.focus();
    await page.keyboard.press("Enter");
  };

  await activate(page.getByRole("button", { name: /^Myself/ }));
  await activate(page.getByRole("button", { name: /Continue/ }));
  await activate(page.getByRole("button", { name: /Overall understanding/ }));
  await activate(page.getByRole("button", { name: /Continue/ }));

  for (const [label, value] of [
    ["Display name or nickname", "Alex"],
    ["Full birth name", "Alex Jordan Olson"],
    ["Called name", "Alex Olson"],
    ["Birth date", "06151990"]
  ] as const) {
    const field = page.getByLabel(label);
    await field.focus();
    await page.keyboard.type(value);
  }

  await activate(page.getByRole("button", { name: /Continue/ }));
  await activate(page.getByRole("button", { name: /Practical and action-oriented/ }));
  await activate(page.getByRole("button", { name: /Continue/ }));
  await page.getByRole("checkbox").focus();
  await page.keyboard.press("Space");
  await activate(page.getByRole("button", { name: /Begin assessment/ }));

  for (let index = 0; index < 50; index += 1) {
    if (await page.getByRole("heading", { name: /Review before generating results/i }).isVisible().catch(() => false)) break;
    await page.getByRole("radio", { name: "Often" }).focus();
    await page.keyboard.press("Enter");
  }

  await activate(page.getByRole("button", { name: /Review answers/ }));
  await activate(page.getByRole("button", { name: /Generate my profile/ }));
  await expect(page.getByRole("heading", { name: "Human Pattern Wheel" })).toBeVisible();
});
