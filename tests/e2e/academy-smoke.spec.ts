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
    await page.goto(route);
    await expect(page.locator("body")).toContainText("Axodus Academy");
    await expect(page.locator("main")).toBeVisible();
  });
}

test("learning workspace exposes quiz, PoK and reward gates", async ({ page }) => {
  await page.goto("/academy/learn/course-constitutional-onboarding/lessons/lesson-constitution-3");

  await expect(page.getByText("Learning Workspace")).toBeVisible();
  await expect(page.getByText("Quiz / PoK dependency")).toBeVisible();
  await expect(page.getByText("Reward gates after current mock state")).toBeVisible();
});
