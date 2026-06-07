/**
 * Persona data integrity — Move #22.
 * Catches drift if someone adds a persona but forgets a CTA or copy field.
 */
import { describe, it, expect } from "vitest";
import { PERSONAS, getPersona } from "@/data/personas";

describe("personas", () => {
  it("ships at least 5 personas (incl. default + dev)", () => {
    expect(Object.keys(PERSONAS).length).toBeGreaterThanOrEqual(5);
    expect(PERSONAS.default).toBeDefined();
    expect(PERSONAS.dev).toBeDefined();
  });

  it("every persona has all required copy fields populated", () => {
    for (const p of Object.values(PERSONAS)) {
      expect(p.label.length).toBeGreaterThan(0);
      expect(p.eyebrow.length).toBeGreaterThan(0);
      expect(p.headlinePrefix.length).toBeGreaterThan(0);
      expect(p.headlineHighlight.length).toBeGreaterThan(0);
      expect(p.sub.length).toBeGreaterThan(40);
      expect(p.ctaLabel.length).toBeGreaterThan(0);
      expect(p.ctaHref.length).toBeGreaterThan(0);
      expect(p.secondaryCtaLabel.length).toBeGreaterThan(0);
      expect(p.secondaryCtaHref.length).toBeGreaterThan(0);
    }
  });

  it("getPersona falls back to default for unknown codes", () => {
    expect(getPersona("nope").code).toBe("default");
    expect(getPersona("").code).toBe("default");
    expect(getPersona(null).code).toBe("default");
  });

  it("getPersona returns the right persona for canonical codes", () => {
    expect(getPersona("tm").code).toBe("tm");
    expect(getPersona("co").code).toBe("co");
    expect(getPersona("cfo").code).toBe("cfo");
    expect(getPersona("aud").code).toBe("aud");
    expect(getPersona("dev").code).toBe("dev");
  });

  it("every CTA href is either internal (/…), external (https://…) or anchor (#…)", () => {
    for (const p of Object.values(PERSONAS)) {
      const all = [p.ctaHref, p.secondaryCtaHref];
      for (const href of all) {
        expect(
          href.startsWith("/") || href.startsWith("https://") || href.startsWith("mailto:") || href.startsWith("#"),
          `${p.code} bad href: ${href}`,
        ).toBe(true);
      }
    }
  });
});
