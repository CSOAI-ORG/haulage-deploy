/**
 * Onboarding wizard data integrity — Move #32.
 */
import { describe, it, expect } from "vitest";
import {
  FLEET_SIZES,
  REGULATOR_OPTIONS,
  VERTICAL_OPTIONS,
  computeRecommendation,
} from "@/data/onboarding";
import { detectRegion, getPricing, PRICING_BY_REGION } from "@/data/pricing-ppp";
import { CASE_STUDIES, getPublishedCaseStudies } from "@/data/case-studies";

describe("onboarding", () => {
  it("ships at least 4 fleet sizes + 10 verticals + 10 regulators", () => {
    expect(FLEET_SIZES.length).toBeGreaterThanOrEqual(4);
    expect(VERTICAL_OPTIONS.length).toBeGreaterThanOrEqual(10);
    expect(REGULATOR_OPTIONS.length).toBeGreaterThanOrEqual(10);
  });

  it("computeRecommendation suggests Pro tier for 6-25 vehicles", () => {
    const result = computeRecommendation("6-25", ["uk-road-haulage"], ["dvsa-ocrs"]);
    expect(result.recommendedTier.label).toContain("Pro");
    expect(result.recommendedMCPs.length).toBeGreaterThan(0);
    // Regulator boost should be top
    expect(result.recommendedMCPs[0]).toBe("meok-tacho-audit-mcp");
  });

  it("computeRecommendation de-dupes when vertical + regulator overlap", () => {
    const result = computeRecommendation(
      "26-100",
      ["uk-road-haulage"],
      ["dvsa-ocrs"], // also in uk-road-haulage's mcps
    );
    const uniques = new Set(result.recommendedMCPs);
    expect(uniques.size).toBe(result.recommendedMCPs.length);
  });

  it("every fleet size has a stripeUrl or mailto", () => {
    for (const f of FLEET_SIZES) {
      expect(f.stripeUrl).toMatch(/^(https:\/\/buy\.stripe\.com|mailto:)/);
    }
  });
});

describe("PPP pricing", () => {
  it("ships 10 regions × 3 tiers", () => {
    expect(Object.keys(PRICING_BY_REGION).length).toBe(10);
    for (const rows of Object.values(PRICING_BY_REGION)) {
      expect(rows.length).toBe(3);
    }
  });

  it("detectRegion maps locales correctly", () => {
    expect(detectRegion("en")).toBe("UK");
    expect(detectRegion("en-GB")).toBe("UK");
    expect(detectRegion("fr")).toBe("EU");
    expect(detectRegion("de")).toBe("EU");
    expect(detectRegion("hi")).toBe("IN");
    expect(detectRegion("pt-BR")).toBe("BR");
    expect(detectRegion("tr")).toBe("TR");
    expect(detectRegion("ja")).toBe("JP");
    expect(detectRegion("ko")).toBe("KR");
    expect(detectRegion("ar")).toBe("MENA");
  });

  it("getPricing returns the right tier rows", () => {
    const uk = getPricing("UK");
    expect(uk.find((r) => r.tier === "pro")?.monthly).toBe(79);
    const in_ = getPricing("IN");
    expect(in_.find((r) => r.tier === "pro")?.currency).toBe("INR");
    expect(in_.find((r) => r.tier === "pro")?.monthly).toBeLessThan(uk.find((r) => r.tier === "pro")!.monthly * 100);
  });
});

describe("case studies", () => {
  it("ships ≥3 case study templates", () => {
    expect(CASE_STUDIES.length).toBeGreaterThanOrEqual(3);
  });
  it("getPublishedCaseStudies hides placeholders by default", () => {
    const published = getPublishedCaseStudies();
    expect(published.every((c) => !c.placeholder)).toBe(true);
  });
});
