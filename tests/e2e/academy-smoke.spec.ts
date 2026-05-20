import { expect, test } from "@playwright/test";

const routes = [
  "/academy",
  "/academy/my-courses",
  "/academy/my-courses/course-constitutional-onboarding",
  "/academy/learn/course-constitutional-onboarding/lessons/lesson-constitution-3",
  "/academy/progress",
  "/academy/rewards",
  "/academy/governance-review"
];

for (const route of routes) {
  test(`renders ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: "domcontentloaded", timeout: 60_000 });
    await page.waitForLoadState("networkidle", { timeout: 30_000 }).catch(() => undefined);
    await expect(page.getByText("Axodus Academy").first()).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
  });
}

test("learning workspace exposes quiz, PoK and reward gates", async ({ page }) => {
  await page.goto("/academy/learn/course-constitutional-onboarding/lessons/lesson-constitution-3", { waitUntil: "domcontentloaded", timeout: 60_000 });
  await page.waitForLoadState("networkidle", { timeout: 30_000 }).catch(() => undefined);

  await expect(page.getByText("Learning Workspace")).toBeVisible();
  await expect(page.getByText("Quiz / PoK dependency")).toBeVisible();
  await expect(page.getByText("Reward gates after current mock state")).toBeVisible();
});
