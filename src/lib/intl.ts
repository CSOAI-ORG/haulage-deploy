/**
 * Cultural i18n helpers — Intl.{Date,Number,RelativeTime,List}Format wrappers
 * tuned to each locale's conventions.
 *
 * Why: shipping `t("foo")` strings is half of i18n. The other half is reading
 * dates / numbers / currency in the right format. EU customer should see
 * "07/06/2026", US customer "6/7/2026", JP customer "2026/06/07".
 *
 * Usage:
 *   import { formatDate, formatNumber, formatCurrency, formatList } from "@/lib/intl";
 *   formatDate(new Date(), { locale: "ja" });   // "2026/06/07"
 *   formatCurrency(79, { locale: "ru" });       // "79 £"
 *   formatList(["FORS", "DVSA", "BS 7121"]);    // "FORS, DVSA, and BS 7121"
 */
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

export type SupportedLocale =
  | "en"
  | "fr"
  | "de"
  | "es"
  | "it"
  | "pl"
  | "ar"
  | "zh"
  | "ja"
  | "ko"
  | "pt-BR"
  | "ru"
  | "hi"
  | "tr";

/** Normalise locale codes for Intl APIs. */
const intlLocale = (lng: string): string => {
  // i18next gives us e.g. "ar", "zh-CN", "pt" — Intl wants BCP-47 like "ar-EG"
  switch (lng.toLowerCase().split("-")[0]) {
    case "en":
      return "en-GB"; // default to UK English for date order, GBP currency
    case "ar":
      return "ar-EG";
    case "zh":
      return "zh-CN";
    case "pt":
      return "pt-BR";
    case "ja":
      return "ja-JP";
    case "ko":
      return "ko-KR";
    case "hi":
      return "hi-IN";
    case "ru":
      return "ru-RU";
    case "tr":
      return "tr-TR";
    default:
      return lng;
  }
};

interface FormatOptions {
  locale?: string;
}

/** Format a Date for the given locale. */
export function formatDate(
  date: Date | string | number,
  opts: FormatOptions & Intl.DateTimeFormatOptions = {},
): string {
  const { locale = "en", ...intlOpts } = opts;
  const d = date instanceof Date ? date : new Date(date);
  return new Intl.DateTimeFormat(intlLocale(locale), {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...intlOpts,
  }).format(d);
}

/** Format a number (e.g. 1234.56 → "1,234.56" / "1.234,56"). */
export function formatNumber(
  value: number,
  opts: FormatOptions & Intl.NumberFormatOptions = {},
): string {
  const { locale = "en", ...intlOpts } = opts;
  return new Intl.NumberFormat(intlLocale(locale), intlOpts).format(value);
}

/** Format a GBP currency amount with the right symbol position. */
export function formatCurrency(
  amount: number,
  opts: FormatOptions & { currency?: string } = {},
): string {
  const { locale = "en", currency = "GBP" } = opts;
  return new Intl.NumberFormat(intlLocale(locale), {
    style: "currency",
    currency,
  }).format(amount);
}

/** Format a list with the locale-appropriate conjunction ("and"/"y"/"و"). */
export function formatList(items: string[], opts: FormatOptions & Intl.ListFormatOptions = {}): string {
  const { locale = "en", ...intlOpts } = opts;
  return new Intl.ListFormat(intlLocale(locale), {
    style: "long",
    type: "conjunction",
    ...intlOpts,
  }).format(items);
}

/** Format a relative time ("3 days ago", "in 5 minutes"). */
export function formatRelative(
  value: number,
  unit: Intl.RelativeTimeFormatUnit,
  opts: FormatOptions = {},
): string {
  const { locale = "en" } = opts;
  return new Intl.RelativeTimeFormat(intlLocale(locale), { numeric: "auto" }).format(value, unit);
}

// ── React hooks ──────────────────────────────────────────────────────

/** Hook that returns memoised formatters bound to the active locale. */
export function useIntlFormatters() {
  const { i18n } = useTranslation();
  const locale = i18n.language || "en";
  return useMemo(
    () => ({
      formatDate: (d: Date | string | number, o: Intl.DateTimeFormatOptions = {}) =>
        formatDate(d, { locale, ...o }),
      formatNumber: (v: number, o: Intl.NumberFormatOptions = {}) =>
        formatNumber(v, { locale, ...o }),
      formatCurrency: (v: number, o: { currency?: string } = {}) =>
        formatCurrency(v, { locale, ...o }),
      formatList: (items: string[], o: Intl.ListFormatOptions = {}) =>
        formatList(items, { locale, ...o }),
      formatRelative: (v: number, unit: Intl.RelativeTimeFormatUnit) =>
        formatRelative(v, unit, { locale }),
    }),
    [locale],
  );
}
