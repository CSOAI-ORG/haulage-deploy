import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Code, Eye, Zap, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

/**
 * MCP Apps showcase — the biggest research-derived leverage point.
 *
 * MCP Apps spec (SEP-1865, ratified 2026-01-26) lets MCP servers serve
 * sandboxed HTML/JS UI Resources via ui:// URIs that render in-chat in
 * Claude, ChatGPT, VS Code Copilot, Goose. First-mover SEO bait + recruiter signal.
 */

const SHOWCASE_MCPS = [
  {
    name: "meok-tacho-audit-mcp",
    tagline: "OCRS forecast in-chat",
    description:
      "Tool returns a UI Resource that renders a 90-day OCRS forecast chart with weeks-to-RED estimate. User drives the inputs via in-chat form; tool fires signed sign() call on commit.",
    uiResource: "ui://meok/tacho-audit/forecast",
    sampleScreen: "OCRS forecast band (GREEN/AMBER/RED) + weeks-to-RED + signed-by-MEOK badge",
  },
  {
    name: "meok-bs7121-mcp",
    tagline: "Lift plan generator in-chat",
    description:
      "BS 7121 lift plan wizard: load, crane, site, AP. Returns signed lift plan + LOLER refresh schedule rendered as a form in Claude / ChatGPT / VS Code Copilot.",
    uiResource: "ui://meok/bs7121/lift-plan",
    sampleScreen: "Lift plan form → signed plan + Appointed Person sign-off + exclusion-zone diagram",
  },
  {
    name: "meok-haulage-governance-bridge-mcp",
    tagline: "EU AI Act risk classifier in-chat",
    description:
      "Interactive EU AI Act Annex I/III risk-classification wizard. Determines whether a fleet AI use-case is high-risk + generates the matching DPIA/FRIA scaffold signed by MEOK.",
    uiResource: "ui://meok/governance-bridge/ai-act-classifier",
    sampleScreen: "Decision tree → risk tier → Annex citation + FRIA template + bridge-to-ISO-42001 mapping",
  },
];

const HOSTS_SUPPORTED = [
  { name: "Claude (Anthropic)", surfaces: ["claude.ai (web)", "Claude Desktop"], url: "https://claude.ai" },
  { name: "ChatGPT (OpenAI)", surfaces: ["chat.openai.com", "ChatGPT Desktop"], url: "https://chat.openai.com" },
  { name: "VS Code Copilot", surfaces: ["GitHub Copilot Chat in VS Code", "Copilot Insiders"], url: "https://github.com/features/copilot" },
  { name: "Goose (Block)", surfaces: ["Goose Desktop"], url: "https://block.github.io/goose/" },
  { name: "Postman", surfaces: ["Postman AI extension"], url: "https://www.postman.com/" },
  { name: "MCPJam", surfaces: ["Browser inspector"], url: "https://mcpjam.com/" },
  { name: "Archestra", surfaces: ["Agent runtime"], url: "https://archestra.ai/" },
];

const McpAppsShowcasePage = () => {
  const { t } = useTranslation();
  return (
    <>
      <SEO
        title={t(
          "mcp_apps.seo_title",
          "MCP Apps — interactive UI from MEOK MCPs rendered in Claude, ChatGPT, VS Code Copilot, Goose",
        )}
        description={t(
          "mcp_apps.seo_description",
          "MEOK MCPs ship interactive UI Resources per MCP Apps spec (SEP-1865, ratified 2026-01-26). Each tool can return a sandboxed HTML/JS dashboard that renders in-chat across Claude, ChatGPT, VS Code Copilot, Goose — no per-client integration required.",
        )}
        canonical="https://haulage.app/mcp-apps"
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
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-7 h-7 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-primary font-display uppercase tracking-wider text-sm">
                    {t("mcp_apps.eyebrow", "MCP Apps showcase")}
                  </span>
                  <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-3">
                    {t("mcp_apps.title_prefix", "Compliance dashboards,")}{" "}
                    <span className="text-gradient">
                      {t("mcp_apps.title_highlight", "rendered in your AI chat.")}
                    </span>
                  </h1>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {t(
                      "mcp_apps.intro",
                      "MCP Apps spec ratified 26 Jan 2026 (SEP-1865). Every MEOK MCP returns sandboxed HTML/JS UI rendered in Claude, ChatGPT, VS Code Copilot, Goose, Postman, MCPJam, Archestra. No per-client custom work.",
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Showcased MCPs */}
            <section className="mb-16">
              <h2 className="font-display text-2xl font-bold mb-6">
                {t("mcp_apps.showcase_title", "MEOK MCPs that ship UI Resources")}
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {SHOWCASE_MCPS.map((m) => (
                  <article key={m.name} className="card-industrial p-6 flex flex-col">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <Eye className="w-5 h-5 text-primary" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-lg font-bold mb-1 break-all">{m.name}</h3>
                    <p className="text-primary text-sm font-medium mb-3">{m.tagline}</p>
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">{m.description}</p>
                    <div className="text-xs space-y-1 pt-3 border-t border-border">
                      <div>
                        <span className="text-muted-foreground">UI URI:</span>{" "}
                        <code className="text-primary">{m.uiResource}</code>
                      </div>
                      <div>
                        <span className="text-muted-foreground">What renders:</span>{" "}
                        <span className="text-foreground/80">{m.sampleScreen}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* How it works */}
            <section className="mb-16 max-w-4xl">
              <h2 className="font-display text-2xl font-bold mb-6">
                {t("mcp_apps.how_title", "How MCP Apps work")}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <article className="card-industrial p-6">
                  <Code className="w-6 h-6 text-primary mb-2" aria-hidden="true" />
                  <h3 className="font-display font-bold mb-2">Tool declares UI</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Each MCP tool advertises a UI Resource via{" "}
                    <code className="text-primary">_meta.ui.resourceUri</code> pointing to a{" "}
                    <code className="text-primary">ui://</code> URI.
                  </p>
                  <pre className="bg-secondary/40 border border-border rounded p-3 text-xs overflow-x-auto">
                    <code>{`{
  "name": "forecast_ocrs_90_day",
  "description": "...",
  "_meta": {
    "ui": {
      "resourceUri": "ui://meok/tacho-audit/forecast"
    }
  }
}`}</code>
                  </pre>
                </article>
                <article className="card-industrial p-6">
                  <Zap className="w-6 h-6 text-primary mb-2" aria-hidden="true" />
                  <h3 className="font-display font-bold mb-2">Host renders sandboxed iframe</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Claude / ChatGPT / VS Code Copilot / Goose fetches the UI Resource (mime:{" "}
                    <code className="text-primary">text/html;profile=mcp-app</code>), renders in a
                    sandboxed iframe, exposes a postMessage JSON-RPC bridge for tool calls.
                  </p>
                  <pre className="bg-secondary/40 border border-border rounded p-3 text-xs overflow-x-auto">
                    <code>{`// in-iframe code:
postMessage({
  jsonrpc: "2.0",
  method: "tools/call",
  params: {
    name: "sign_attestation",
    args: { ... }
  }
})`}</code>
                  </pre>
                </article>
              </div>
            </section>

            {/* Hosts */}
            <section className="mb-16 max-w-4xl">
              <h2 className="font-display text-2xl font-bold mb-6">
                {t("mcp_apps.hosts_title", "Where MCP Apps render today")}
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                {HOSTS_SUPPORTED.map((h) => (
                  <a
                    key={h.name}
                    href={h.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-industrial p-4 hover:border-primary transition-colors group"
                  >
                    <div className="font-display font-bold text-sm group-hover:text-primary inline-flex items-center gap-1">
                      {h.name}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                    </div>
                    <ul className="text-xs text-muted-foreground mt-1 list-disc pl-4">
                      {h.surfaces.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </a>
                ))}
              </div>
            </section>

            {/* Trust signal */}
            <div className="card-industrial p-8 max-w-4xl mx-auto text-center bg-gradient-to-br from-primary/5 to-transparent">
              <h2 className="font-display text-3xl font-bold mb-4">
                {t("mcp_apps.cta_title", "First-mover on MCP Apps for trade compliance")}
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                {t(
                  "mcp_apps.cta_body",
                  "MEOK is shipping signed-attestation UI Resources for the 32-MCP catalogue. Your fleet ops team gets compliance dashboards inside whichever AI host they prefer — no per-client custom integration.",
                )}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/docs/quickstart">5-min quickstart</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a
                    href="https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read the spec <ExternalLink className="w-4 h-4 ml-1" aria-hidden="true" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/integrations">See all integrations</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default McpAppsShowcasePage;
