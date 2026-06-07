import { defineConfig, devices } from "@playwright/test";

/**
 * E2E test config for haulage.app.
 *
 * - Default base URL = production (https://haulage.app) so the suite
 *   doubles as an external uptime + regression check.
 * - Override via PLAYWRIGHT_BASE_URL=http://localhost:8080 for local dev.
 * - CI: GitHub Actions matrix (chromium / firefox / webkit / mobile-safari).
 */
const baseURL = process.env.PLAYWRIGHT_BASE_URL || "https://haulage.app";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: process.env.CI
    ? [["html", { open: "never" }], ["github"], ["list"]]
    : [["list"], ["html", { open: "on-failure" }]],
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 10_000,
  },
  expect: { timeout: 8_000 },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    { name: "mobile-chrome", use: { ...devices["Pixel 7"] } },
    { name: "mobile-safari", use: { ...devices["iPhone 14"] } },
  ],
});
