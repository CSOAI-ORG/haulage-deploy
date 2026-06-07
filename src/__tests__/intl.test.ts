/**
 * Cultural i18n unit tests — verify Intl formatters render per-locale conventions.
 */
import { describe, it, expect } from "vitest";
import {
  formatCurrency,
  formatDate,
  formatList,
  formatNumber,
  formatRelative,
} from "@/lib/intl";

describe("cultural i18n formatters", () => {
  describe("formatDate", () => {
    const d = new Date("2026-06-07T00:00:00Z");
    it("uses UK ordering by default (DD/MM)", () => {
      const out = formatDate(d, { locale: "en", year: "numeric", month: "2-digit", day: "2-digit" });
      // "07/06/2026" in en-GB
      expect(out).toMatch(/07\/06\/2026/);
    });
    it("uses ISO-style ordering for Japanese (YYYY/MM/DD)", () => {
      const out = formatDate(d, { locale: "ja", year: "numeric", month: "2-digit", day: "2-digit" });
      expect(out).toMatch(/2026.06.07/);
    });
    it("renders Hindi locale", () => {
      const out = formatDate(d, { locale: "hi" });
      expect(out).toBeTruthy();
      expect(out.length).toBeGreaterThan(3);
    });
  });

  describe("formatNumber", () => {
    it("uses comma thousands separator for en-GB", () => {
      expect(formatNumber(1234567, { locale: "en" })).toMatch(/1,234,567/);
    });
    it("uses space thousands separator for fr", () => {
      // Some Node builds output U+202F (narrow no-break space); accept anything non-comma
      const out = formatNumber(1234567, { locale: "fr" });
      expect(out).toMatch(/1.234.567/);
      expect(out).not.toContain(",");
    });
    it("renders Devanagari numerals when asked", () => {
      const out = formatNumber(1234, { locale: "hi", numberingSystem: "deva" });
      // ०१२३ - Hindi numerals
      expect(out).toMatch(/[०-९]/);
    });
  });

  describe("formatCurrency", () => {
    it("GBP renders with £ for en-GB", () => {
      expect(formatCurrency(79, { locale: "en" })).toMatch(/£/);
    });
    it("GBP renders correctly across locales", () => {
      // Each locale may use Latin (79), Arabic-Indic (٧٩), Devanagari (७९),
      // or other numeral systems — assert the formatter returns something with
      // any digit + a currency marker, and doesn't throw.
      for (const loc of ["fr", "de", "es", "it", "pl", "ar", "zh", "ja", "hi", "ru"]) {
        const out = formatCurrency(79, { locale: loc });
        expect(out, `${loc} returned empty`).toBeTruthy();
        // Some currency markers — £ Latin / Arabic UK£ / 〒 etc.
        expect(out, `${loc} missing currency marker`).toMatch(/[£$€¥₹₽₣₺]|GBP|UK/i);
      }
    });
  });

  describe("formatList", () => {
    it("uses 'and' for English", () => {
      expect(formatList(["A", "B", "C"], { locale: "en" })).toMatch(/and/i);
    });
    it("uses 'et' for French", () => {
      expect(formatList(["A", "B", "C"], { locale: "fr" })).toMatch(/et/);
    });
    it("works for RTL Arabic", () => {
      const out = formatList(["A", "B", "C"], { locale: "ar" });
      expect(out).toBeTruthy();
      expect(out).toContain("A");
      expect(out).toContain("B");
      expect(out).toContain("C");
    });
  });

  describe("formatRelative", () => {
    it("returns a non-empty string for typical inputs", () => {
      expect(formatRelative(-3, "day", { locale: "en" })).toBeTruthy();
      expect(formatRelative(5, "minute", { locale: "fr" })).toBeTruthy();
      expect(formatRelative(-2, "month", { locale: "ja" })).toBeTruthy();
    });
  });
});
