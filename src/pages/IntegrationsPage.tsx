import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { mcps } from "@/data/mcps";

/**
 * Integrations directory — Vanta-style page treating every MCP + every surface
 * (Slack, Teams, ChatGPT, Claude, Copilot, Zapier, n8n, Make, VS Code, CLI,
 * SDKs, MCP Apps UI Resources) as an "integration".
 */

const SURFACES = [
  { name: "Anthropic Claude", category: "agent-runtime", icon: "🤖", url: "https://www.anthropic.com/claude", description: "Skill manifest at github.com/CSOAI-ORG/meok-skills/anthropic" },
  { name: "OpenAI ChatGPT", category: "agent-runtime", icon: "💬", url: "https://chat.openai.com/", description: "GPT manifest imports OpenAPI from meok-attestation-api.vercel.app/openapi.json" },
  { name: "Microsoft Copilot", category: "agent-runtime", icon: "🪟", url: "https://copilot.microsoft.com/", description: "Declarative agent + connector for Copilot Studio + M365 Copilot" },
  { name: "Goose (Block)", category: "agent-runtime", icon: "🦢", url: "https://block.github.io/goose/", description: "MCP Apps UI Resources render natively in Goose" },
  { name: "Slack", category: "messaging", icon: "💬", url: "https://api.slack.com/apps", description: "/meok verify | sign | catalogue | health (Vercel Edge)" },
  { name: "Microsoft Teams", category: "messaging", icon: "📞", url: "https://teams.microsoft.com/", description: "Same surface as Slack — bot + message extension" },
  { name: "Zapier", category: "automation", icon: "⚡", url: "https://zapier.com/", description: "Native app auto-imports our OpenAPI spec" },
  { name: "n8n", category: "automation", icon: "🔗", url: "https://n8n.io/", description: "n8n-nodes-meok-trade-compliance community node" },
  { name: "Make.com", category: "automation", icon: "🔧", url: "https://www.make.com/", description: "Custom app with 5 modules (verify/sign/provision/health/openapi)" },
  { name: "VS Code", category: "dev-tool", icon: "🧩", url: "https://marketplace.visualstudio.com/", description: "MEOK Compliance Lens — hover hints for 12+ regulator articles" },
  { name: "Python SDK", category: "sdk", icon: "🐍", url: "https://pypi.org/project/meok-sdk/", description: "pip install meok-sdk — sync + async clients" },
  { name: "TypeScript SDK", category: "sdk", icon: "🟦", url: "https://www.npmjs.com/package/@meok/sdk", description: "npm install @meok/sdk — edge-runtime ready" },
  { name: "Go SDK", category: "sdk", icon: "🐹", url: "https://pkg.go.dev/github.com/CSOAI-ORG/meok-go", description: "go get github.com/CSOAI-ORG/meok-go" },
  { name: "CLI (meok)", category: "dev-tool", icon: "💻", url: "https://pypi.org/project/meok-cli/", description: "pip install meok-cli — verify, sign, openapi, mcp catalogue" },
  { name: "REST API (OpenAPI 3.1)", category: "api", icon: "📡", url: "https://meok-attestation-api.vercel.app/docs", description: "16 paths — sign, verify, ACP, audit, webhooks" },
  { name: "ACP Server", category: "api", icon: "🤝", url: "https://meok-attestation-api.vercel.app/acp", description: "Agent Communication Protocol endpoint — agent-to-agent" },
  { name: "Webhooks", category: "api", icon: "📬", url: "https://meok-attestation-api.vercel.app/docs#tag/lifecycle", description: "Signed customer webhooks for sign + verify events" },
  { name: "Stripe", category: "billing", icon: "💳", url: "https://stripe.com/", description: "Token-on-checkout flow + 100% of customer billing" },
  { name: "Vercel", category: "infra", icon: "▲", url: "https://vercel.com/", description: "Edge + serverless hosting for both haulage.app + attestation API" },
  { name: "Upstash Redis", category: "infra", icon: "🔴", url: "https://upstash.com/", description: "Audit ledger + webhook storage (when configured)" },
  { name: "Sentry", category: "observability", icon: "🛡️", url: "https://sentry.io/", description: "Error tracking + replay (zero bytes when DSN unset)" },
  { name: "Better Stack", category: "observability", icon: "📊", url: "https://betterstack.com/", description: "status.haulage.app uptime + incidents (when configured)" },
];

const SURFACE_CATEGORIES: Record<string, string> = {
  "agent-runtime": "AI agent runtimes",
  messaging: "Messaging",
  automation: "Workflow automation",
  "dev-tool": "Developer tools",
  sdk: "SDKs",
  api: "API surface",
  billing: "Billing",
  infra: "Infrastructure",
  observability: "Observability",
};

const IntegrationsPage = () => {
  const { t } = useTranslation();

  const surfacesByCategory = SURFACES.reduce<Record<string, typeof SURFACES>>((acc, s) => {
    (acc[s.category] = acc[s.category] || []).push(s);
    return acc;
  }, {});

  return (
    <>
      <SEO
        title={t(
          "integrations.seo_title",
          "Integrations — 32 MCPs × every agent runtime, IDE, workflow tool",
        )}
        description={t(
          "integrations.seo_description",
          "Every MEOK MCP plus every surface we ship to: Claude, ChatGPT, Copilot, Goose, Slack, Teams, Zapier, n8n, Make, VS Code, Python/TS/Go SDKs, CLI, REST API, ACP, webhooks.",
        )}
        canonical="https://haulage.app/integrations"
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
                {t("integrations.eyebrow", "Integrations directory")}
              </span>
              <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 mb-4">
                {t("integrations.title_prefix", "32 compliance MCPs ×")}{" "}
                <span className="text-gradient">
                  {t("integrations.title_highlight", "every place agents live.")}
                </span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t(
                  "integrations.intro",
                  "Each MEOK MCP is an integration. Each runtime / IDE / messaging app / automation tool we ship to is a surface. Combine to install MEOK where your team already works.",
                )}
              </p>
            </div>

            {/* Surfaces section */}
            <section className="mb-16">
              <h2 className="font-display text-3xl font-bold mb-4">
                {t("integrations.surfaces_title", "Surfaces")}
                <span className="text-muted-foreground text-sm font-normal ml-2">
                  ({SURFACES.length})
                </span>
              </h2>
              <div className="space-y-8 max-w-5xl">
                {Object.entries(SURFACE_CATEGORIES).map(([code, label]) => {
                  const items = surfacesByCategory[code] ?? [];
                  if (items.length === 0) return null;
                  return (
                    <div key={code}>
                      <h3 className="font-display text-lg font-bold mb-3 text-primary">
                        {label} ({items.length})
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {items.map((s) => (
                          <a
                            key={s.name}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="card-industrial p-4 hover:border-primary transition-colors group"
                          >
                            <div className="flex items-start gap-3">
                              <div className="text-2xl" aria-hidden="true">
                                {s.icon}
                              </div>
                              <div className="flex-grow">
                                <div className="font-display font-bold text-sm group-hover:text-primary transition-colors flex items-center gap-1">
                                  {s.name}
                                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {s.description}
                                </div>
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* MCP catalogue (deep-linked from /mcps) */}
            <section className="mb-12">
              <h2 className="font-display text-3xl font-bold mb-4">
                {t("integrations.mcps_title", "MCP servers")}
                <span className="text-muted-foreground text-sm font-normal ml-2">
                  ({mcps.length} — see full catalogue)
                </span>
              </h2>
              <p className="text-muted-foreground mb-6 max-w-3xl">
                {t(
                  "integrations.mcps_intro",
                  "Each MCP is published on PyPI (or queued for publish), signs every tool result, and runs locally or as a remote Streamable HTTP server.",
                )}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl">
                {mcps.slice(0, 12).map((m) => {
                  const Icon = m.icon;
                  return (
                    <a
                      key={m.id}
                      href={m.pypi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card-industrial p-3 hover:border-primary transition-colors group"
                    >
                      <div className="flex items-start gap-2">
                        <Icon className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-display text-xs font-bold break-all group-hover:text-primary transition-colors">
                            {m.name}
                          </div>
                          <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                            {m.tagline}
                          </div>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
              <div className="text-center mt-6">
                <Link
                  to="/mcps"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <Zap className="w-4 h-4" aria-hidden="true" />
                  See all 32 MCPs
                </Link>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default IntegrationsPage;
