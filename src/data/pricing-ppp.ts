/**
 * Locale-aware PPP-adjusted pricing — Move #24.
 *
 * Stripe price tables per region. GBP remains canonical for UK; PPP-adjusted
 * variants for India / Brazil / Turkey / Japan / etc. improve conversion
 * dramatically (~3-5x conversion in Tier-2/3 markets per published SaaS data).
 *
 * Locale → currency mapping uses BCP-47 region tag. Defaults to GBP if no
 * locale-specific override exists.
 *
 * Stripe URLs below are placeholders — replace with real Stripe Price ids
 * after creating per-currency Price objects in Stripe Dashboard.
 *
 * Roadmap:
 *   1. Create Stripe Price objects per (tier, currency) — auto-converted to local
 *   2. Replace `stripeUrl` strings here
 *   3. Add Vercel Edge geo-detect middleware to pre-select the right region
 *   4. Manual override via ?region=… URL param
 */

export type Region = "UK" | "EU" | "US" | "IN" | "BR" | "TR" | "JP" | "KR" | "MENA" | "AU";

export interface PricingRow {
  tier: "starter" | "pro" | "fleet";
  currency: string;
  monthly: number;
  monthlyLabel: string; // pre-formatted with locale conventions, e.g. "₹2,990"
  stripeUrl: string;
}

/**
 * Per-region pricing table. UK = canonical GBP; everywhere else is PPP-adjusted.
 *
 * PPP basis: World Bank PPP conversion ratios 2024, rounded to local price
 * psychology (no awkward "127" — round to ₹2,990 instead of ₹3,127).
 */
export const PRICING_BY_REGION: Record<Region, PricingRow[]> = {
  UK: [
    { tier: "starter", currency: "GBP", monthly: 29, monthlyLabel: "£29", stripeUrl: "https://buy.stripe.com/4gMbJ3fsM28a381fL28k844" },
    { tier: "pro", currency: "GBP", monthly: 79, monthlyLabel: "£79", stripeUrl: "https://buy.stripe.com/14A4gB3K4eUWgYR56o8k836" },
    { tier: "fleet", currency: "GBP", monthly: 499, monthlyLabel: "£499", stripeUrl: "mailto:nicholas@meok.ai?subject=Fleet%20tier%20interest" },
  ],
  EU: [
    { tier: "starter", currency: "EUR", monthly: 35, monthlyLabel: "€35", stripeUrl: "TODO_STRIPE_EUR_STARTER" },
    { tier: "pro", currency: "EUR", monthly: 95, monthlyLabel: "€95", stripeUrl: "TODO_STRIPE_EUR_PRO" },
    { tier: "fleet", currency: "EUR", monthly: 595, monthlyLabel: "€595", stripeUrl: "mailto:nicholas@meok.ai?subject=Fleet%20EU" },
  ],
  US: [
    { tier: "starter", currency: "USD", monthly: 39, monthlyLabel: "$39", stripeUrl: "TODO_STRIPE_USD_STARTER" },
    { tier: "pro", currency: "USD", monthly: 99, monthlyLabel: "$99", stripeUrl: "TODO_STRIPE_USD_PRO" },
    { tier: "fleet", currency: "USD", monthly: 599, monthlyLabel: "$599", stripeUrl: "mailto:nicholas@meok.ai?subject=Fleet%20US" },
  ],
  IN: [
    { tier: "starter", currency: "INR", monthly: 990, monthlyLabel: "₹990", stripeUrl: "TODO_STRIPE_INR_STARTER" },
    { tier: "pro", currency: "INR", monthly: 2990, monthlyLabel: "₹2,990", stripeUrl: "TODO_STRIPE_INR_PRO" },
    { tier: "fleet", currency: "INR", monthly: 19_900, monthlyLabel: "₹19,900", stripeUrl: "mailto:nicholas@meok.ai?subject=Fleet%20India" },
  ],
  BR: [
    { tier: "starter", currency: "BRL", monthly: 79, monthlyLabel: "R$79", stripeUrl: "TODO_STRIPE_BRL_STARTER" },
    { tier: "pro", currency: "BRL", monthly: 199, monthlyLabel: "R$199", stripeUrl: "TODO_STRIPE_BRL_PRO" },
    { tier: "fleet", currency: "BRL", monthly: 1490, monthlyLabel: "R$1.490", stripeUrl: "mailto:nicholas@meok.ai?subject=Fleet%20Brazil" },
  ],
  TR: [
    { tier: "starter", currency: "TRY", monthly: 199, monthlyLabel: "₺199", stripeUrl: "TODO_STRIPE_TRY_STARTER" },
    { tier: "pro", currency: "TRY", monthly: 499, monthlyLabel: "₺499", stripeUrl: "TODO_STRIPE_TRY_PRO" },
    { tier: "fleet", currency: "TRY", monthly: 3990, monthlyLabel: "₺3.990", stripeUrl: "mailto:nicholas@meok.ai?subject=Fleet%20Turkey" },
  ],
  JP: [
    { tier: "starter", currency: "JPY", monthly: 3800, monthlyLabel: "¥3,800", stripeUrl: "TODO_STRIPE_JPY_STARTER" },
    { tier: "pro", currency: "JPY", monthly: 9800, monthlyLabel: "¥9,800", stripeUrl: "TODO_STRIPE_JPY_PRO" },
    { tier: "fleet", currency: "JPY", monthly: 69_800, monthlyLabel: "¥69,800", stripeUrl: "mailto:nicholas@meok.ai?subject=Fleet%20Japan" },
  ],
  KR: [
    { tier: "starter", currency: "KRW", monthly: 39_000, monthlyLabel: "₩39,000", stripeUrl: "TODO_STRIPE_KRW_STARTER" },
    { tier: "pro", currency: "KRW", monthly: 99_000, monthlyLabel: "₩99,000", stripeUrl: "TODO_STRIPE_KRW_PRO" },
    { tier: "fleet", currency: "KRW", monthly: 690_000, monthlyLabel: "₩690,000", stripeUrl: "mailto:nicholas@meok.ai?subject=Fleet%20Korea" },
  ],
  MENA: [
    { tier: "starter", currency: "AED", monthly: 139, monthlyLabel: "AED 139", stripeUrl: "TODO_STRIPE_AED_STARTER" },
    { tier: "pro", currency: "AED", monthly: 369, monthlyLabel: "AED 369", stripeUrl: "TODO_STRIPE_AED_PRO" },
    { tier: "fleet", currency: "AED", monthly: 2390, monthlyLabel: "AED 2,390", stripeUrl: "mailto:nicholas@meok.ai?subject=Fleet%20UAE" },
  ],
  AU: [
    { tier: "starter", currency: "AUD", monthly: 55, monthlyLabel: "A$55", stripeUrl: "TODO_STRIPE_AUD_STARTER" },
    { tier: "pro", currency: "AUD", monthly: 145, monthlyLabel: "A$145", stripeUrl: "TODO_STRIPE_AUD_PRO" },
    { tier: "fleet", currency: "AUD", monthly: 899, monthlyLabel: "A$899", stripeUrl: "mailto:nicholas@meok.ai?subject=Fleet%20AU" },
  ],
};

/** Map a locale → region. Defaults to UK. */
export function detectRegion(locale: string): Region {
  const lng = locale.toLowerCase();
  if (lng.startsWith("hi") || lng.includes("-in")) return "IN";
  if (lng === "pt-br" || lng.startsWith("pt-br")) return "BR";
  if (lng.startsWith("tr")) return "TR";
  if (lng.startsWith("ja")) return "JP";
  if (lng.startsWith("ko")) return "KR";
  if (lng.startsWith("ar")) return "MENA";
  if (lng.startsWith("ru")) return "EU";
  if (["fr", "de", "es", "it", "pl"].includes(lng) || ["fr-", "de-", "es-", "it-", "pl-"].some((p) => lng.startsWith(p))) {
    return "EU";
  }
  if (lng.startsWith("zh")) return "EU"; // China + HK use the EU PPP tier for now; refine after data
  return "UK";
}

/** Get pricing rows for a given region, or default to UK. */
export function getPricing(region: Region): PricingRow[] {
  return PRICING_BY_REGION[region] ?? PRICING_BY_REGION.UK;
}
