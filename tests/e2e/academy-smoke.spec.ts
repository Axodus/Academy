import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/courses",
  "/courses/axodus-constitutional-onboarding",
  "/my-courses",
  "/dashboard",
  "/progress",
  "/proof-of-knowledge",
  "/certifications",
  "/rewards",
  "/governance-review",
  "/paths",
  "/paths/path-governance-operator",
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
    const dimensions = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, innerWidth: window.innerWidth }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.innerWidth);
  });
}

test("mobile navigation opens the complete route drawer", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("navigation", { name: "Primary navigation" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Proof of Knowledge", exact: true })).toBeVisible();
});

test("learning workspace exposes quiz, PoK and preview gates", async ({ page }) => {
  await page.goto("/academy/learn/course-constitutional-onboarding/lessons/lesson-constitution-3", { waitUntil: "domcontentloaded", timeout: 60_000 });
  await page.waitForLoadState("networkidle", { timeout: 30_000 }).catch(() => undefined);

  await expect(page.locator("main").getByText("Learning Workspace").first()).toBeVisible();
  await expect(page.getByText("Quiz / PoK dependency")).toBeVisible();
  await expect(page.getByText("Preview gates after current assessment state")).toBeVisible();
});
