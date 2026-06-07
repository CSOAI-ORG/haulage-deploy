/**
 * Unit: competitor data integrity.
 * Catches drift if someone adds a new competitor but forgets a required field.
 */
import { describe, it, expect } from "vitest";
import { competitors, getCompetitor } from "@/data/competitors";

describe("competitors data", () => {
  it("ships at least 4 competitors", () => {
    expect(competitors.length).toBeGreaterThanOrEqual(4);
  });

  it("every competitor has unique slug + 10+ comparison rows", () => {
    const slugs = new Set<string>();
    for (const c of competitors) {
      expect(slugs.has(c.slug), `duplicate slug ${c.slug}`).toBe(false);
      slugs.add(c.slug);
      expect(c.comparison.length).toBeGreaterThanOrEqual(10);
    }
  });

  it("required textual fields populated", () => {
    for (const c of competitors) {
      expect(c.competitorName.length).toBeGreaterThan(0);
      expect(c.competitorSummary.length).toBeGreaterThan(40);
      expect(c.whenToPickThem.length).toBeGreaterThan(40);
      expect(c.whenToPickMeok.length).toBeGreaterThan(40);
      expect(c.metaDescription.length).toBeGreaterThan(40);
      expect(c.metaDescription.length).toBeLessThan(230); // SEO sweet spot (Google truncates ~155-160 chars but tolerates more)
    }
  });

  it("each row has both sides + the value types are sensible", () => {
    for (const c of competitors) {
      for (const row of c.comparison) {
        expect(row.feature).toBeTruthy();
        expect(row.competitor).not.toBeUndefined();
        expect(row.meok).not.toBeUndefined();
      }
    }
  });

  it("getCompetitor returns undefined for unknown slug", () => {
    expect(getCompetitor("acme-unknown")).toBeUndefined();
  });

  it("getCompetitor returns each canonical slug", () => {
    expect(getCompetitor("mandata")?.competitorName).toBe("Mandata");
    expect(getCompetitor("microlise")?.competitorName).toBe("Microlise");
    expect(getCompetitor("fleetcheck")?.competitorName).toBe("FleetCheck");
    expect(getCompetitor("vanta")?.competitorName).toBe("Vanta");
  });
});
