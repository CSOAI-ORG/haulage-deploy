import { test, expect, request as pwRequest } from "@playwright/test";

/**
 * Integration: attestation API public surface.
 * Pinned to production — does NOT use Playwright's baseURL.
 */
const API_BASE = process.env.MEOK_API_BASE || "https://meok-attestation-api.vercel.app";

test.describe("MEOK Attestation API — public surface", () => {
  test("/health returns ok", async () => {
    const ctx = await pwRequest.newContext();
    const res = await ctx.get(`${API_BASE}/health`);
    expect(res.status()).toBe(200);
    const j = await res.json();
    expect(j.status).toBe("ok");
  });

  test("/openapi.json is valid OpenAPI 3.1", async () => {
    const ctx = await pwRequest.newContext();
    const res = await ctx.get(`${API_BASE}/openapi.json`);
    expect(res.status()).toBe(200);
    const spec = await res.json();
    expect(spec.openapi).toMatch(/^3\.1\./);
    expect(spec.info.title).toBe("MEOK Attestation API");
    expect(Object.keys(spec.paths).length).toBeGreaterThanOrEqual(8);
  });

  test("/docs serves Swagger UI", async () => {
    const ctx = await pwRequest.newContext();
    const res = await ctx.get(`${API_BASE}/docs`);
    expect(res.status()).toBe(200);
    const body = await res.text();
    expect(body).toContain("swagger-ui");
  });

  test("/verify with invalid payload returns 200 valid:false", async () => {
    const ctx = await pwRequest.newContext();
    const res = await ctx.post(`${API_BASE}/verify`, {
      data: { cert_id: "nonexistent", signature_sha256_hmac: "AAAA" },
    });
    expect(res.status()).toBe(200);
    const j = await res.json();
    expect(j.valid).toBe(false);
    expect(j.message).toBeTruthy();
  });

  test("/sign requires api_key (returns 401 without one)", async () => {
    const ctx = await pwRequest.newContext();
    const res = await ctx.post(`${API_BASE}/sign`, {
      data: { regulation: "EU_AI_ACT_ANNEX_III", entity: "test", score: 75 },
    });
    expect(res.status()).toBe(401);
  });

  test("/llms.txt + /robots.txt + / all 200", async () => {
    const ctx = await pwRequest.newContext();
    for (const p of ["/llms.txt", "/robots.txt", "/"]) {
      const res = await ctx.get(`${API_BASE}${p}`);
      expect(res.status(), `${p} should be 200`).toBe(200);
    }
  });
});
