import { expect, test } from "@playwright/test";

test("captures landing and full report visual fixtures", async ({ page }, testInfo) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Understand the person/i })).toBeVisible();
  await page.screenshot({
    path: `docs/assessment/screenshots/landing-${testInfo.project.name}.png`,
    fullPage: true
  });
  await page.getByRole("button", { name: /Preview a sample report/ }).click();
  await expect(page.getByRole("heading", { name: /Turning your answers into useful next steps/i })).toBeVisible();
  await page.screenshot({
    path: `docs/assessment/screenshots/loading-result-${testInfo.project.name}.png`,
    fullPage: true
  });
  await expect(page.locator("h1", { hasText: "How to make communication clearer" })).toBeVisible();
  await page.screenshot({
    path: `docs/assessment/screenshots/report-${testInfo.project.name}.png`,
    fullPage: true
  });
  if (testInfo.project.name === "desktop-chromium") {
    await page.emulateMedia({ media: "print" });
    await page.screenshot({
      path: "docs/assessment/screenshots/report-print-desktop.png",
      fullPage: true
    });
    await page.emulateMedia({ media: "screen" });
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto("/");
    await page.getByRole("button", { name: /Preview a sample report/ }).click();
    await expect(page.locator("h1", { hasText: "How to make communication clearer" })).toBeVisible();
    const hasBodyOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(hasBodyOverflow).toBe(false);
    await page.screenshot({
      path: "docs/assessment/screenshots/report-narrow-320.png",
      fullPage: true
    });
  }
});

test("captures setup, question, and adaptive follow-up states", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop-chromium", "A single desktop fixture set is sufficient for intermediate states.");
  await page.goto("/");
  await page.getByRole("button", { name: /^Begin/ }).first().click();
  await page.screenshot({ path: "docs/assessment/screenshots/mode-selection-desktop.png", fullPage: true });
  await page.getByRole("button", { name: /^Myself/ }).click();
  await page.getByRole("button", { name: /Continue/ }).click();
  await page.screenshot({ path: "docs/assessment/screenshots/goal-selection-desktop.png", fullPage: true });
  await page.getByRole("button", { name: /Overall understanding/ }).click();
  await page.getByRole("button", { name: /Continue/ }).click();
  await page.getByLabel("Display name or nickname").fill("Alex");
  await page.getByLabel("Full birth name").fill("Alex Jordan Olson");
  await page.getByLabel("Called name").fill("Alex Olson");
  await page.getByLabel("Birth date").fill("1990-06-15");
  await page.getByRole("button", { name: /Continue/ }).click();
  await page.getByRole("button", { name: /Practical and action-oriented/ }).click();
  await page.getByRole("button", { name: /Continue/ }).click();
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: /Begin assessment/ }).click();
  await page.locator(".question-layout").screenshot({ path: "docs/assessment/screenshots/question-representative-desktop.png" });

  for (let index = 0; index < 36; index += 1) {
    await page.getByRole("radio", { name: "It depends on the situation" }).click();
    await page.getByRole("button", { name: "Next" }).click();
  }
  await expect(page.getByText(/36 answered/)).toBeVisible();
  await page.evaluate(() => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    window.scrollTo(0, 0);
  });
  await page.locator(".question-layout").screenshot({ path: "docs/assessment/screenshots/adaptive-follow-up-desktop.png" });
});
