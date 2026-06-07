import { test, expect } from "@playwright/test";

/**
 * Smoke: every public route returns 200 and renders meaningful content.
 * Doubles as external uptime monitor when run against production.
 */
const ROUTES = [
  { path: "/", titleHint: /Haulage|MEOK/ },
  { path: "/mcps", titleHint: /Haulage|MEOK|MCP/ },
  { path: "/map", titleHint: /Haulage|MEOK|Map|Coverage/ },
  { path: "/pricing", titleHint: /Haulage|MEOK|Pricing/ },
  { path: "/governance", titleHint: /Haulage|MEOK|Governance/ },
  { path: "/docs/quickstart", titleHint: /Haulage|MEOK|Quickstart/ },
  { path: "/trust", titleHint: /Haulage|MEOK|Trust/ },
  { path: "/vs/mandata", titleHint: /Mandata|MEOK/ },
  { path: "/vs/microlise", titleHint: /Microlise|MEOK/ },
  { path: "/vs/fleetcheck", titleHint: /FleetCheck|MEOK/ },
  { path: "/vs/vanta", titleHint: /Vanta|MEOK/ },
  { path: "/blog/launch", titleHint: /Launch|Haulage|MEOK/ },
  { path: "/about", titleHint: /Haulage|MEOK|About/ },
  { path: "/contact", titleHint: /Haulage|MEOK|Contact/ },
];

for (const { path, titleHint } of ROUTES) {
  test(`route ${path} returns 200 and renders`, async ({ page }) => {
    const response = await page.goto(path, { waitUntil: "networkidle" });
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(titleHint);
    // Ensure the main landmark exists for screen-reader users.
    await expect(page.locator("#main")).toBeAttached();
  });
}

test("static assets — sitemap, llms.txt, catalogue.json, robots.txt", async ({ request }) => {
  for (const asset of ["/sitemap.xml", "/llms.txt", "/catalogue.json", "/robots.txt"]) {
    const res = await request.get(asset);
    expect(res.status(), `${asset} should be 200`).toBe(200);
    expect(res.headers()["content-type"]).toBeTruthy();
  }
});

test("catalogue.json is well-formed + has live/pending counts", async ({ request }) => {
  const res = await request.get("/catalogue.json");
  const json = await res.json();
  expect(json.totalMCPs).toBe(32);
  expect(json.liveMCPs).toBeGreaterThanOrEqual(7);
  expect(json.pendingMCPs).toBeGreaterThanOrEqual(0);
  expect(json.mcps).toHaveLength(32);
  for (const mcp of json.mcps) {
    expect(mcp).toHaveProperty("id");
    expect(mcp).toHaveProperty("name");
    expect(mcp).toHaveProperty("published");
  }
});
