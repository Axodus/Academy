import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  expect: { timeout: 5_000 },
  use: {
    baseURL: "http://127.0.0.1:5173",
    trace: "on-first-retry",
    screenshot: "only-on-failure"
  },
  webServer: {
    command: "yarn dev:web --host 127.0.0.1 --port 5173",
    url: "http://127.0.0.1:5173/academy",
    reuseExistingServer: true,
    timeout: 120_000
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "tablet", use: { ...devices["iPad Pro 11"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } }
  ]
});
