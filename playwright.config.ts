import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 90_000,
  expect: { timeout: 15_000 },
  retries: process.env.CI ? 1 : 0,
  use: {
    baseURL: "http://127.0.0.1:5173",
    trace: "on-first-retry",
    screenshot: "only-on-failure"
  },
  webServer: {
    command: "yarn build:web && yarn preview --host 127.0.0.1 --port 5173",
    url: "http://127.0.0.1:5173/academy",
    reuseExistingServer: true,
    timeout: 600_000
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    {
      name: "tablet",
      use: {
        browserName: "chromium",
        viewport: { width: 834, height: 1194 },
        deviceScaleFactor: 2,
        hasTouch: true,
        isMobile: false
      }
    },
    {
      name: "mobile",
      use: {
        browserName: "chromium",
        viewport: { width: 393, height: 851 },
        deviceScaleFactor: 2,
        hasTouch: true,
        isMobile: true
      }
    }
  ]
});
