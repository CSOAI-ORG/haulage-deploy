import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * Legal pages — Move #25.
 * Single template handles /legal/privacy, /legal/terms, /legal/dpa, /legal/cookies.
 *
 * Content shipped here is a "good-enough starting position" — it's not a substitute
 * for a real Data Protection Lawyer review. Link to email for jurisdiction-specific requests.
 */

const PRIVACY_BODY = [
  "# Privacy Policy",
  "",
  "**Last updated:** 7 June 2026",
  "",
  "## Who we are",
  "",
  "MEOK AI Labs is the trading name of CSOAI LTD, registered at Companies House 16939677 (England + Wales).",
  "Sole controller: Nicholas Templeman — nicholas@meok.ai.",
  "",
  "## What we collect",
  "",
  "- **Email + Stripe customer ID** — when you sign up or check out",
  "- **API usage logs** — endpoint, status, timestamp, IP address (truncated to /24 IPv4 or /48 IPv6)",
  "- **Signed attestation metadata** — regulation, entity, score, findings (you control what you submit)",
  "- **Optional opt-in:** browser-side analytics via Vercel Analytics (no fingerprinting)",
  "",
  "We do NOT collect: payment card data (Stripe-hosted), passwords (none used), behavioural ad signals.",
  "",
  "## Why we collect it",
  "",
  "1. Issue + verify your signed attestations (legitimate interest + contract performance)",
  "2. Bill you (contract performance)",
  "3. Detect API abuse (legitimate interest)",
  "4. Comply with UK / EU regulators (legal obligation)",
  "",
  "## How long we keep it",
  "",
  "- Email + Stripe customer ID: until 12 months after subscription cancellation",
  "- API usage logs: 30 days (rolling)",
  "- Signed attestations: indefinitely (audit-trail integrity) unless you request erasure (Art 17 GDPR)",
  "",
  "## Your rights (UK GDPR + EU GDPR)",
  "",
  "Access · Rectify · Erase · Restrict · Port · Object · Withdraw consent · Not be subject to solely-automated decisions with legal effect (Art 22).",
  "Email nicholas@meok.ai with a UK / EU-passport-issued ID for verification.",
  "",
  "## Where data lives",
  "",
  "- **Vercel** (US-East + EU-West regions) — application + edge",
  "- **Stripe** (Ireland + US) — billing",
  "- **Upstash Redis** (Ireland) — audit ledger + webhook storage",
  "- **No data resides on Russian / Chinese servers.**",
  "",
  "## International transfers",
  "",
  "EU/UK data on Stripe US flow uses Stripe's IDTA + Standard Contractual Clauses. Vercel US + UK uses UK IDTA.",
  "",
  "## DPA + sub-processors list",
  "",
  "Available on request — email nicholas@meok.ai.",
  "",
  "## Complaints",
  "",
  "Information Commissioner's Office (UK): https://ico.org.uk · 0303 123 1113.",
  "Your home-country DPA if elsewhere in the EU.",
  "",
  "## Updates",
  "",
  "Material changes posted here + emailed to active customers 30 days before taking effect.",
].join("\n");

const TERMS_BODY = [
  "# Terms of Service",
  "",
  "**Last updated:** 7 June 2026",
  "",
  "## 1. Acceptance",
  "",
  "By using the MEOK Attestation API (haulage.app, meok-attestation-api.vercel.app, related MCPs) you agree to these terms.",
  "If you don't agree, don't use the service.",
  "",
  "## 2. Service description",
  "",
  "We provide HMAC-signed compliance attestations for trade-compliance use cases. The verifier endpoint is public + rate-limited.",
  "The sign endpoint requires a paid API key.",
  "",
  "## 3. Subscriptions + billing",
  "",
  "- Stripe handles all card transactions; we never see card data.",
  "- Cancel any time via the Stripe portal or by emailing nicholas@meok.ai.",
  "- Free tier sigs are marked UNVERIFIED — never use them as evidence in front of a regulator.",
  "- Prices on https://haulage.app/pricing — VAT added where required.",
  "",
  "## 4. Acceptable use",
  "",
  "Don't: spam our verifier, impersonate, forge signatures, redistribute API keys, scrape rate limits, use this product for any illegal purpose.",
  "We reserve the right to terminate accounts that breach.",
  "",
  "## 5. SLA + uptime",
  "",
  "- Free tier: no SLA",
  "- Starter: best-effort",
  "- Pro: 99.5% monthly uptime credit",
  "- Fleet + Enterprise: 99.9% monthly uptime credit + 24h response SLA",
  "- Status: https://status.haulage.app (when configured)",
  "",
  "## 6. Intellectual property",
  "",
  "All MEOK MCPs are MIT-licensed. The MEOK brand, logo, and proprietary signing keys remain CSOAI LTD's.",
  "",
  "## 7. Limitation of liability",
  "",
  "To the maximum extent permitted by law, MEOK is not liable for indirect, incidental, special, or consequential damages.",
  "Total liability is capped at 12 months of fees you've paid us.",
  "Nothing in these terms limits liability for death, personal injury, or fraud.",
  "",
  "## 8. Governing law",
  "",
  "English law. Exclusive jurisdiction of the English courts. EU consumers retain their consumer-protection rights under their home jurisdiction.",
  "",
  "## 9. Contact",
  "",
  "nicholas@meok.ai or write to:",
  "CSOAI LTD, Companies House 16939677, England + Wales.",
].join("\n");

const DPA_BODY = [
  "# Data Processing Addendum (DPA)",
  "",
  "**Last updated:** 7 June 2026",
  "",
  "This DPA supplements the [Terms of Service](/legal/terms) where MEOK acts as a processor of personal data on your behalf.",
  "",
  "## 1. Roles",
  "",
  "- **You** = Controller",
  "- **MEOK / CSOAI LTD** = Processor",
  "",
  "## 2. Subject + duration of processing",
  "",
  "- Subject: signed compliance attestations + API usage telemetry",
  "- Duration: lifetime of your subscription + 12 months post-cancellation",
  "",
  "## 3. Nature + purpose",
  "",
  "- Signing attestations against regulator scope you specify",
  "- Storing audit ledger entries for tamper-evident chain proof",
  "- Delivering signed webhooks to URLs you register",
  "",
  "## 4. Categories of data subjects",
  "",
  "Your customers, drivers, employees, vehicles, vehicles' VRNs, etc. — only what you submit.",
  "",
  "## 5. Categories of personal data",
  "",
  "Whatever you include in 'entity', 'findings', 'articles_audited', 'auditor_notes'.",
  "We strongly recommend **not** including raw personal data — use opaque IDs instead",
  "(e.g. 'ACME-HAULAGE-VRN-AB12CDE' not the driver's name).",
  "",
  "## 6. Sub-processors",
  "",
  "- Vercel Inc (hosting + edge)",
  "- Stripe Payments (billing)",
  "- Upstash Inc (audit ledger + webhook storage)",
  "- Sentry (error monitoring) — only if VITE_SENTRY_DSN env set",
  "",
  "Updates posted at /legal/sub-processors and emailed 30 days in advance.",
  "",
  "## 7. Security measures",
  "",
  "- TLS 1.3 in transit",
  "- HMAC-SHA256 signing key stored in Vercel encrypted env vars",
  "- IP rate limiting + replay-attack protection on /verify",
  "- API keys derived deterministically — no plain-text key storage",
  "- Webhook secrets rotatable on demand",
  "",
  "## 8. International transfers",
  "",
  "Data resides in Vercel EU-West + US-East regions per their dual-region setup.",
  "Stripe processes in Ireland + US. UK IDTA + EU SCCs in place where applicable.",
  "",
  "## 9. Audit rights",
  "",
  "You may audit MEOK's processing once per 12-month period at your own cost on 30 days' notice.",
  "",
  "## 10. Termination",
  "",
  "On termination, you may export your audit ledger entries via /api/audit.",
  "We delete personal data within 30 days of confirmed export.",
  "",
  "## Signing",
  "",
  "To execute this DPA, email it back to nicholas@meok.ai with your company details.",
  "We countersign + return within 2 working days.",
].join("\n");

const COOKIES_BODY = [
  "# Cookies + Local Storage",
  "",
  "**Last updated:** 7 June 2026",
  "",
  "We use cookies + browser localStorage sparingly. No advertising trackers, no third-party fingerprinting.",
  "",
  "## What we set",
  "",
  "| Name | Type | Purpose | Lifetime |",
  "|---|---|---|---|",
  "| haulage_locale | localStorage | Remember your chosen UI language | Until you clear it |",
  "| meok_theme | localStorage | Remember your theme (light/dark/high-contrast) | Until you clear it |",
  "| Vercel Analytics first-party cookie | Cookie | Privacy-preserving page-view counts (no fingerprinting) | 24h |",
  "| Sentry replay cookie (if VITE_SENTRY_DSN set) | Cookie | Replay error sessions; PII masked + media blocked | Per session |",
  "",
  "## What we DON'T set",
  "",
  "- Google Analytics / Facebook Pixel / TikTok Pixel / any ad-network tracker",
  "- Cross-site identifiers",
  "- Fingerprinting beacons",
  "",
  "## Opt-out",
  "",
  "- Delete localStorage in your browser settings any time",
  "- Block Vercel Analytics in your browser (e.g. Brave + uBlock Origin block by default)",
  "- Set Do Not Track header (we honour it for analytics)",
  "",
  "## Contact",
  "",
  "nicholas@meok.ai for questions or to invoke any ePrivacy / GDPR right.",
].join("\n");

const DOCS = {
  privacy: { titleKey: "legal.privacy_title", titleDefault: "Privacy Policy", bodyKey: "legal.privacy_body", bodyDefault: PRIVACY_BODY },
  terms: { titleKey: "legal.terms_title", titleDefault: "Terms of Service", bodyKey: "legal.terms_body", bodyDefault: TERMS_BODY },
  dpa: { titleKey: "legal.dpa_title", titleDefault: "Data Processing Addendum", bodyKey: "legal.dpa_body", bodyDefault: DPA_BODY },
  cookies: { titleKey: "legal.cookies_title", titleDefault: "Cookies + Local Storage", bodyKey: "legal.cookies_body", bodyDefault: COOKIES_BODY },
} as const;

type DocSlug = keyof typeof DOCS;

const LegalPage = () => {
  const { t } = useTranslation();
  const { doc } = useParams<{ doc: string }>();
  if (!doc || !(doc in DOCS)) return <Navigate to="/legal/privacy" replace />;
  const meta = DOCS[doc as DocSlug];

  return (
    <>
      <SEO
        title={`${t(meta.titleKey, meta.titleDefault)} | Haulage.app — MEOK AI Labs`}
        description={t(`${meta.titleKey}_desc`, `${meta.titleDefault} for MEOK AI Labs / CSOAI LTD.`)}
        canonical={`https://haulage.app/legal/${doc}`}
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main id="main" className="pt-32 pb-12">
          <div className="container mx-auto px-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              {t("mcps_page.back_link", "Back to Haulage.app")}
            </Link>

            <div className="max-w-3xl mx-auto">
              <nav className="mb-8 flex flex-wrap gap-2 text-sm" aria-label="Legal docs">
                {Object.keys(DOCS).map((d) => (
                  <Link
                    key={d}
                    to={`/legal/${d}`}
                    className={`px-3 py-1 rounded border ${
                      d === doc
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    {DOCS[d as DocSlug].titleDefault}
                  </Link>
                ))}
              </nav>

              <article
                className="prose prose-invert max-w-none text-foreground/90"
                style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}
              >
                {t(meta.bodyKey, meta.bodyDefault)}
              </article>

              <p className="text-xs text-muted-foreground mt-8 pt-4 border-t border-border">
                Questions or jurisdiction-specific requests:{" "}
                <a href="mailto:nicholas@meok.ai" className="text-primary hover:underline">
                  nicholas@meok.ai
                </a>
                .
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default LegalPage;
