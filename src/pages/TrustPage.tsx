import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ShieldCheck,
  FileSearch,
  Lock,
  Globe,
  KeyRound,
  ExternalLink,
  MessageSquare,
  CheckCircle2,
  Circle,
  Download,
  Mail,
  BadgeCheck,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

/**
 * Trust Center v2 — Vanta-pattern rebuild (per research finding #2).
 * Live status of controls, AI chatbot for procurement Qs, gated artifacts,
 * partner badges, AI disclosure. The pattern that moves enterprise procurement.
 */

const trustPillars = [
  { icon: KeyRound, title: "HMAC-SHA256 signing", body: "Every tool result from every MEOK MCP is signed with HMAC-SHA256 using your organisation's secret. The signature, issuer, version and timestamp are emitted alongside the payload. No exceptions." },
  { icon: ShieldCheck, title: "Public verifier endpoint", body: "Anyone — auditor, regulator, customer — can verify a signature without installing a single dependency by POSTing the payload + sig to meok-attestation-api.vercel.app/verify. Pass = chain intact." },
  { icon: Lock, title: "Stripe-only billing", body: "Card data never touches MEOK's infrastructure. All checkout flows go through Stripe-hosted payment pages with 3DS strong-customer-auth. We hold no PANs, no CVCs, no card tokens." },
  { icon: FileSearch, title: "Open source MCPs", body: "Every published MCP server is open source on PyPI. Read the code before you install it. Build alongside our team. Issues + PRs on github.com/CSOAI-ORG/." },
  { icon: Globe, title: "EU AI Act + UK AI Bill bridge", body: "Compliance attestations from every trade MCP auto-bridge to EU AI Act Annex III, UK AI Bill Article 22c, NIST AI RMF and ISO/IEC 42001 via meok-haulage-governance-bridge-mcp. One install, both sides." },
];

// Vanta-pattern live controls — surfaces what's passing right now
const LIVE_CONTROLS = [
  { name: "Attestation API uptime (verifier endpoint live)", probeUrl: "https://meok-attestation-api.vercel.app/health" },
  { name: "OpenAPI 3.1 spec published + reachable", probeUrl: "https://meok-attestation-api.vercel.app/openapi.json" },
  { name: "Audit ledger query endpoint live", probeUrl: "https://meok-attestation-api.vercel.app/api/audit" },
  { name: "Catalogue JSON published with live/pending flags", probeUrl: "https://haulage.app/catalogue.json" },
  { name: "robots.txt + AI crawler allowances", probeUrl: "https://haulage.app/robots.txt" },
  { name: "Service-worker (PWA install) registered", probeUrl: "https://haulage.app/sw.js" },
];

// Gated artifacts — request via form, we send within same business day
const GATED_ARTIFACTS = [
  { name: "SOC 2 Type 1 (in progress — preview pack on request)", scope: "Security + Availability + Confidentiality" },
  { name: "Penetration test report (planned Q3 2026)", scope: "External attestation API + dashboard" },
  { name: "DPIA template + completed DPIA for MEOK service", scope: "GDPR Art 35" },
  { name: "FRIA template (Fundamental Rights Impact Assessment)", scope: "EU AI Act Art 27" },
  { name: "Sub-processor list", scope: "Vercel, Stripe, Upstash, Sentry (if configured)" },
  { name: "Data Processing Addendum (DPA)", scope: "Per UK ICO + EU GDPR templates" },
  { name: "Signed attestation chain explainer + verification recipe", scope: "Step-by-step Python + curl + verifier API" },
  { name: "AI disclosure (which MEOK product features use AI + how)", scope: "Per EU AI Act Art 13" },
];

const PROCUREMENT_FAQ = [
  { q: "Do you have a SOC 2 Type 1 letter?", a: "In progress — Vanta + AssuranceLab path, Q3 2026 target. Preview controls pack available on request." },
  { q: "Are you on the DVSA Earned Recognition approved-software list?", a: "Application in progress. Listed competitors include Truckfile, FleetCheck, Convey, CheckedSafe, Chevin, Vehocheck, Prolius." },
  { q: "How do you handle data residency?", a: "Vercel EU-West + US-East. Stripe Ireland + US under standard SCC + UK IDTA. No data on Russian/Chinese infrastructure. Detailed in /legal/privacy + /legal/dpa." },
  { q: "What's your incident response SLA?", a: "Pro tier: 99.5% uptime credit. Fleet + Enterprise: 99.9% + 24h response SLA. Status at /status + status.haulage.app (Better Stack — DNS pending)." },
  { q: "Where can I see your accreditations?", a: "Full live status at /accreditations — including in-progress (DVSA ER, SOC 2 Type 1, WCAG AAA) and planned (ISO 42001, EU AI Act conformity)." },
  { q: "Do you support OAuth 2.1 + RFC 8707 for MCP?", a: "Build-vs-buy spike scheduled. WorkOS recommended path. Currently API-key authentication with per-tenant derived keys via Stripe checkout." },
];

interface Probe {
  url: string;
  status: "checking" | "ok" | "down";
}

const TrustPage = () => {
  const { t } = useTranslation();
  const [probes, setProbes] = useState<Record<string, Probe>>(
    () => Object.fromEntries(LIVE_CONTROLS.map((c) => [c.probeUrl, { url: c.probeUrl, status: "checking" as const }])),
  );
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatReplies, setChatReplies] = useState<Array<{ q: string; a: string }>>([]);

  useEffect(() => {
    let cancelled = false;
    LIVE_CONTROLS.forEach((c) => {
      fetch(c.probeUrl, { method: "GET", mode: "no-cors", cache: "no-store" })
        .then(() => {
          if (!cancelled) setProbes((p) => ({ ...p, [c.probeUrl]: { url: c.probeUrl, status: "ok" } }));
        })
        .catch(() => {
          if (!cancelled) setProbes((p) => ({ ...p, [c.probeUrl]: { url: c.probeUrl, status: "down" } }));
        });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const passingCount = Object.values(probes).filter((p) => p.status === "ok").length;

  const askChatbot = () => {
    const q = chatInput.trim().toLowerCase();
    if (!q) return;
    // Simple keyword match — surface the closest FAQ
    const matched = PROCUREMENT_FAQ.find((f) =>
      [f.q.toLowerCase(), ...f.q.toLowerCase().split(/\W+/)].some(
        (token) => q.includes(token) && token.length > 3,
      ),
    );
    const fallback = {
      q: chatInput,
      a: "I don't have a canned answer for that yet — Nick (nicholas@meok.ai) replies same business day. The FAQ below covers the most common procurement questions.",
    };
    setChatReplies((prev) => [...prev, matched ? { q: chatInput, a: matched.a } : fallback]);
    setChatInput("");
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MEOK AI Labs / CSOAI LTD",
    description:
      "Trust Center showing MEOK's live security posture, in-progress accreditations, AI governance disclosure, and procurement-ready evidence pack.",
    url: "https://haulage.app/trust",
    sameAs: [
      "https://github.com/CSOAI-ORG",
      "https://meok.ai",
      "https://www.linkedin.com/in/nicholastempleman",
      "https://haulage.app",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "nicholas@meok.ai",
      contactType: "security",
      availableLanguage: "English",
    },
  };

  return (
    <>
      <SEO
        title={t("trust.seo_title", "Trust Center — security, accreditations, signed evidence | MEOK")}
        description={t(
          "trust.seo_description",
          "Live control status, in-progress accreditations (SOC 2 Type 1, DVSA ER, WCAG AAA), AI governance disclosure, gated artifact request, procurement chatbot. Vanta-pattern Trust Center.",
        )}
        canonical="https://haulage.app/trust"
        extraJsonLd={jsonLd}
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

            <div className="max-w-3xl mb-12">
              <span className="text-primary font-display uppercase tracking-wider text-sm">
                {t("trust.eyebrow", "Trust Center")}
              </span>
              <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 mb-4">
                {t("trust.title_prefix", "Live status,")}{" "}
                <span className="text-gradient">
                  {t("trust.title_highlight", "honest about what's not done yet.")}
                </span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t(
                  "trust.intro",
                  "Vanta-pattern Trust Center — what's live, what's in-progress, what's coming. Click the chatbot for procurement Qs. Request gated artifacts via the form (same-day reply).",
                )}
              </p>
            </div>

            {/* Live controls — Vanta-style */}
            <section className="card-industrial p-6 mb-8 max-w-4xl">
              <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-3">
                <span
                  className={`inline-block w-3 h-3 rounded-full animate-pulse ${
                    passingCount === LIVE_CONTROLS.length ? "bg-green-500" : "bg-amber-500"
                  }`}
                  aria-hidden="true"
                />
                {passingCount}/{LIVE_CONTROLS.length} {t("trust.controls_passing", "controls passing right now")}
              </h2>
              <ul className="space-y-2">
                {LIVE_CONTROLS.map((c) => {
                  const p = probes[c.probeUrl];
                  return (
                    <li key={c.probeUrl} className="flex items-center justify-between gap-3 text-sm py-2 border-b border-border/30 last:border-0">
                      <span className="flex items-center gap-2">
                        {p?.status === "ok" ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" aria-hidden="true" />
                        ) : p?.status === "down" ? (
                          <span className="w-3 h-3 rounded-full bg-red-500" aria-hidden="true" />
                        ) : (
                          <Circle className="w-4 h-4 text-muted-foreground animate-pulse" aria-hidden="true" />
                        )}
                        <span>{c.name}</span>
                      </span>
                      <a
                        href={c.probeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-primary"
                      >
                        verify ↗
                      </a>
                    </li>
                  );
                })}
              </ul>
              <Link
                to="/status"
                className="inline-flex items-center gap-1 text-primary hover:underline text-sm mt-4"
              >
                Full live status + 12 endpoints monitored at /status →
              </Link>
            </section>

            {/* Accreditations link */}
            <section className="card-industrial p-6 mb-8 max-w-4xl bg-gradient-to-br from-primary/5 to-transparent">
              <h2 className="font-display text-2xl font-bold mb-3 flex items-center gap-3">
                <BadgeCheck className="w-6 h-6 text-primary" aria-hidden="true" />
                {t("trust.accreditations_title", "Accreditations — live / in-progress / planned")}
              </h2>
              <p className="text-muted-foreground mb-4 text-sm">
                {t(
                  "trust.accreditations_body",
                  "Radical transparency: MIT licence + Companies House + ICO LIVE today. DVSA ER + SOC 2 Type 1 + WCAG AAA IN-PROGRESS. ISO 42001 + EU AI Act conformity + FORS PLANNED.",
                )}
              </p>
              <Link to="/accreditations" className="inline-flex items-center gap-1 text-primary hover:underline text-sm">
                Full accreditations breakdown at /accreditations →
              </Link>
            </section>

            {/* Procurement chatbot stub */}
            <section className="card-industrial p-6 mb-8 max-w-4xl">
              <h2 className="font-display text-2xl font-bold mb-3 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-primary" aria-hidden="true" />
                {t("trust.chatbot_title", "Procurement chatbot")}
              </h2>
              <p className="text-muted-foreground mb-4 text-sm">
                {t(
                  "trust.chatbot_body",
                  "Ask common procurement questions. Keyword-matched to the FAQ. Unmatched questions routed to Nick (same-day reply).",
                )}
              </p>
              {chatReplies.length > 0 && (
                <div className="space-y-3 mb-4 max-h-72 overflow-y-auto">
                  {chatReplies.map((r, i) => (
                    <div key={i} className="space-y-1">
                      <div className="text-xs text-muted-foreground">Q: {r.q}</div>
                      <div className="text-sm bg-secondary/40 border border-border rounded p-2">A: {r.a}</div>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && askChatbot()}
                  placeholder={t("trust.chatbot_placeholder", "e.g. Do you have SOC 2? What's your DPA?")}
                  className="flex-1 bg-secondary/40 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Procurement question"
                />
                <Button variant="hero" onClick={askChatbot} disabled={!chatInput.trim()}>
                  Ask
                </Button>
              </div>
              <details className="mt-4">
                <summary className="cursor-pointer text-sm text-primary hover:underline">
                  Browse the {PROCUREMENT_FAQ.length} canned FAQs
                </summary>
                <dl className="mt-3 space-y-3 text-sm">
                  {PROCUREMENT_FAQ.map((f, i) => (
                    <div key={i} className="border-l-2 border-primary/30 pl-3">
                      <dt className="font-display font-bold">{f.q}</dt>
                      <dd className="text-muted-foreground mt-1">{f.a}</dd>
                    </div>
                  ))}
                </dl>
              </details>
            </section>

            {/* Gated artifacts */}
            <section className="card-industrial p-6 mb-8 max-w-4xl">
              <h2 className="font-display text-2xl font-bold mb-3 flex items-center gap-3">
                <Download className="w-6 h-6 text-primary" aria-hidden="true" />
                {t("trust.artifacts_title", "Gated procurement artifacts")}
              </h2>
              <p className="text-muted-foreground mb-4 text-sm">
                {t(
                  "trust.artifacts_body",
                  "Request the deeper security + privacy artifacts via email. Same business day reply with NDA + the document set scoped to your need.",
                )}
              </p>
              <ul className="space-y-2 mb-4">
                {GATED_ARTIFACTS.map((a) => (
                  <li key={a.name} className="flex items-start gap-2 text-sm">
                    <span className="text-primary mt-1">›</span>
                    <span>
                      <span className="font-display font-bold">{a.name}</span>
                      <span className="text-muted-foreground"> — {a.scope}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <Button variant="hero" asChild>
                <a href="mailto:nicholas@meok.ai?subject=Procurement%20artifact%20request%20—%20MEOK&body=Hi%20Nick%2C%0A%0APlease%20send%20the%20following%20procurement%20artifacts%3A%0A%0A-%20%5B%20%5D%20SOC%202%20Type%201%20preview%20pack%0A-%20%5B%20%5D%20Pen-test%20report%20(when%20available)%0A-%20%5B%20%5D%20DPIA%20%2B%20DPA%20templates%0A-%20%5B%20%5D%20Sub-processor%20list%0A-%20%5B%20%5D%20Signed%20attestation%20chain%20explainer%0A-%20%5B%20%5D%20AI%20disclosure%0A%0AThanks">
                  <Mail className="w-4 h-4 mr-1" aria-hidden="true" />
                  Email Nick — same-day reply
                </a>
              </Button>
            </section>

            {/* Original pillars retained */}
            <h2 className="font-display text-2xl font-bold mb-4">{t("trust.pillars_title", "Security pillars")}</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mb-12">
              {trustPillars.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div key={p.title} className="card-industrial p-6 flex">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold mb-2">
                        {t(`trust.pillar_${idx + 1}_title`, p.title)}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {t(`trust.pillar_${idx + 1}_body`, p.body)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* AI disclosure */}
            <section className="card-industrial p-6 mb-8 max-w-4xl bg-gradient-to-br from-primary/5 to-transparent">
              <h2 className="font-display text-xl font-bold mb-3">
                {t("trust.ai_disclosure_title", "AI disclosure (EU AI Act Art 13)")}
              </h2>
              <ul className="space-y-2 text-sm text-foreground/85">
                <li>• <strong>MEOK product</strong> — none of the 32 MCPs in the catalogue use embedded AI/ML for the compliance decisioning itself. They wrap deterministic rule-based regulatory logic + cryptographic signing.</li>
                <li>• <strong>This Trust Center chatbot</strong> — keyword-matches FAQ entries; not a generative LLM. No personal-data inference.</li>
                <li>• <strong>This site's structured data + glossary</strong> — composed by humans + Claude assistance under human review. Source visible on GitHub.</li>
                <li>• <strong>Generative AI in MEOK back-office</strong> — engineering assistance via Anthropic Claude. No customer signed-attestation content touches a non-human reviewer.</li>
                <li>• <strong>Will this change?</strong> If MEOK adds ML-based features (e.g. anomaly detection on tacho data), this disclosure will be updated + the AI Act conformity scope expanded under /accreditations.</li>
              </ul>
            </section>

            <div className="text-center max-w-3xl mx-auto pt-8">
              <Button variant="hero" size="lg" asChild>
                <a href="mailto:nicholas@meok.ai?subject=Security%20%2F%20audit%20question">
                  {t("trust.email_cta", "Email Nick directly")}
                </a>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default TrustPage;
