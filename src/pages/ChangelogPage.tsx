import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Entry {
  date: string;
  scope: "regulator" | "product" | "industry";
  title: string;
  body: string;
  source?: string;
  source_url?: string;
}

const CHANGELOG: Entry[] = [
  {
    date: "2026-06-07",
    scope: "product",
    title: "MEOK ecosystem 33-move push complete",
    body:
      "Shipped 32 routes on haulage.app + 16 OpenAPI paths + 14 locales + 3 SDKs (Python/TS/Go) + CLI + VS Code ext + Slack + Teams + Anthropic Skill + ChatGPT GPT + Microsoft Copilot + Zapier + n8n + Make + signed audit ledger + signed webhooks + ACP endpoint + PWA + theme + Capacitor mobile shells. 81 E2E tests passing.",
    source: "haulage.app/blog/launch",
    source_url: "https://haulage.app/blog/launch",
  },
  {
    date: "2026-06-07",
    scope: "product",
    title: "Glossary + controls library + status + integrations pages live",
    body:
      "Added /glossary (106 trade-compliance terms, schema.org DefinedTermSet), /controls (25 controls across 6 frameworks: EU AI Act + ISO 42001 + NIST AI RMF + UK DUAA + SOC 2 + GDPR), /status (live probes), /integrations (every MCP × every surface).",
  },
  {
    date: "2026-01-26",
    scope: "industry",
    title: "MCP Apps spec (SEP-1865) ratified — AI hosts render interactive UI from MCP tools",
    body:
      "Model Context Protocol Apps spec ratified. MCP servers now serve UI Resources via ui:// URI scheme, declared per-tool via _meta.ui.resourceUri. Rendered in sandboxed iframes inside Claude, ChatGPT, VS Code Copilot, Goose. Bidirectional postMessage JSON-RPC for tool calls from in-chat UI. MEOK MCPs will adopt — every customer-facing tool ships an interactive dashboard.",
    source: "modelcontextprotocol.io",
    source_url: "https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/",
  },
  {
    date: "2025-11-25",
    scope: "industry",
    title: "MCP standardised OAuth 2.1 + RFC 8707 Resource Indicators + CIMD",
    body:
      "Model Context Protocol authorisation spec (2025-11-25) requires OAuth 2.1 (MUST), RFC 8707 Resource Indicators (MUST), CIMD (Client ID Metadata Documents) as default registration. Streamable HTTP transport for remote MCPs. Enables unified SaaS dashboard ↔ local MCP identity.",
    source: "modelcontextprotocol.io",
    source_url: "https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization",
  },
  {
    date: "2026-12-31",
    scope: "regulator",
    title: "EU AI Act Annex III — high-risk AI obligations (delayed from Aug 2026 to Dec 2027)",
    body:
      "Digital Omnibus delayed EU AI Act Annex III high-risk obligations to 31 Dec 2027 (Annex I to Aug 2027). Watermarking duties hit Nov 2026 — nearest cliff. MEOK governance-bridge-mcp auto-crosswalks every signed compliance attestation to Annex III + UK AI Bill Art 22c + NIST AI RMF + ISO 42001.",
  },
  {
    date: "2026-07-01",
    scope: "regulator",
    title: "Smart Tachograph 2 retrofit deadline for international/cabotage operators",
    body:
      "EC 165/2014 Smart Tachograph 2 retrofit deadline 1 July 2026 for any UK/EU heavy goods vehicle doing international or cabotage operations. Retrofitted units required to register driver detachment + GNSS positions. meok-tacho-audit-mcp + meok-eu-mobility-package-mcp check readiness + forecast risk.",
  },
  {
    date: "2026-11-01",
    scope: "regulator",
    title: "EU AI Act watermarking + transparency obligations come into force",
    body:
      "Article 50 transparency obligations for synthetic content + interactions with AI systems hit November 2026. Applies to chatbot, deepfake, emotion-recognition systems. Operators using AI for routing / scoring / hiring need to surface the right notices.",
  },
];

const ChangelogPage = () => {
  const { t } = useTranslation();
  const entries = [...CHANGELOG].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <SEO
        title={t("changelog.seo_title", "Regulator + product changelog — UK haulier compliance + EU AI Act")}
        description={t(
          "changelog.seo_description",
          "Weekly feed of UK fleet regulator changes (DVSA, FORS, BS 7121, EU AI Act, MARPOL, IATA DGR) + MEOK product releases. Citation-ready. Subscribe to never miss a deadline.",
        )}
        canonical="https://haulage.app/changelog"
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

            <div className="max-w-3xl mb-10">
              <span className="text-primary font-display uppercase tracking-wider text-sm">
                {t("changelog.eyebrow", "Changelog")}
              </span>
              <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 mb-4">
                {t("changelog.title_prefix", "What changed,")}{" "}
                <span className="text-gradient">
                  {t("changelog.title_highlight", "when, what it means.")}
                </span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t(
                  "changelog.intro",
                  "UK fleet regulator + EU AI Act + MEOK product changes — chronological. Subscribe to the RSS feed to never miss a deadline.",
                )}
              </p>
            </div>

            <div className="space-y-4 max-w-3xl">
              {entries.map((e, i) => (
                <article key={i} className="card-industrial p-6">
                  <header className="flex items-center gap-3 mb-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" aria-hidden="true" />
                    <time dateTime={e.date}>{e.date}</time>
                    <span>·</span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs ${
                        e.scope === "regulator"
                          ? "bg-amber-500/10 text-amber-500 border border-amber-500/30"
                          : e.scope === "product"
                            ? "bg-primary/10 text-primary border border-primary/30"
                            : "bg-blue-500/10 text-blue-500 border border-blue-500/30"
                      }`}
                    >
                      {e.scope}
                    </span>
                  </header>
                  <h2 className="font-display text-lg font-bold mb-2">{e.title}</h2>
                  <p className="text-sm text-foreground/85 leading-relaxed">{e.body}</p>
                  {e.source && (
                    <div className="text-xs text-muted-foreground mt-2">
                      Source:{" "}
                      {e.source_url ? (
                        <a
                          href={e.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline inline-flex items-center gap-1"
                        >
                          {e.source} <ExternalLink className="w-3 h-3" aria-hidden="true" />
                        </a>
                      ) : (
                        e.source
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>

            <div className="mt-12 text-center max-w-3xl mx-auto text-sm text-muted-foreground">
              <p>
                Want this as RSS? Subscribe at{" "}
                <a
                  href="https://haulage.app/changelog.rss"
                  className="text-primary hover:underline"
                >
                  haulage.app/changelog.rss
                </a>{" "}
                (coming soon). Or email{" "}
                <a href="mailto:nicholas@meok.ai?subject=Subscribe%20to%20changelog" className="text-primary hover:underline">
                  nicholas@meok.ai
                </a>{" "}
                to join the weekly digest.
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ChangelogPage;
