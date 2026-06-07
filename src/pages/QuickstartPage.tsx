import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Copy, Check, Terminal, Settings, Send, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

interface CodeBlockProps {
  code: string;
  label?: string;
}

const CodeBlock = ({ code, label }: CodeBlockProps) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };
  return (
    <div className="relative my-4">
      {label && (
        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1.5 font-display">
          {label}
        </div>
      )}
      <div className="relative">
        <pre className="bg-secondary/50 border border-border rounded-lg p-4 pr-12 overflow-x-auto text-sm leading-relaxed">
          <code className="text-foreground">{code}</code>
        </pre>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? t("quickstart.copied", { defaultValue: "Copied" }) : t("quickstart.copy", { defaultValue: "Copy code" })}
          className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-background/50 transition-colors"
        >
          {copied ? (
            <Check className="w-4 h-4 text-primary" aria-hidden="true" />
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground hover:text-primary" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
};

const QuickstartPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <SEO
        title={t("quickstart.seo_title", "Quickstart | Haulage.app | MEOK AI Labs")}
        description={t(
          "quickstart.seo_description",
          "Install your first MEOK trade-compliance MCP server in 5 minutes. Configure Claude Desktop, make your first signed compliance attestation, verify against the public API."
        )}
        canonical="https://haulage.app/docs/quickstart"
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
              {t("quickstart.back_link", "Back to Haulage.app")}
            </Link>
            <div className="max-w-3xl mx-auto">
              <span className="text-primary font-display uppercase tracking-wider text-sm">
                {t("quickstart.eyebrow", "Quickstart")}
              </span>
              <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 mb-6">
                {t("quickstart.title_prefix", "Five minutes to your")}{" "}
                <span className="text-gradient">
                  {t("quickstart.title_highlight", "first attestation")}
                </span>
                {t("quickstart.title_period", ".")}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-12">
                {t("quickstart.intro_part_1", "This walkthrough installs")}{" "}
                <code className="text-primary">meok-tacho-audit-mcp</code>{" "}
                {t(
                  "quickstart.intro_part_2",
                  "(UK DVSA tachograph + OCRS), configures Claude Desktop, runs your first signed compliance check, and verifies the signature against the public attestation API."
                )}
              </p>

              <section className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Terminal className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <h2 className="font-display text-2xl font-bold">
                    {t("quickstart.step_1_title", "Step 1 — Install via pip")}
                  </h2>
                </div>
                <p className="text-muted-foreground mb-2">
                  {t("quickstart.step_1_desc", "Any Python ≥ 3.10. We recommend a fresh virtualenv.")}
                </p>
                <CodeBlock
                  label="Terminal"
                  code={`python3 -m venv .venv && source .venv/bin/activate
pip install meok-tacho-audit-mcp`}
                />
              </section>

              <section className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Settings className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <h2 className="font-display text-2xl font-bold">
                    {t("quickstart.step_2_title", "Step 2 — Wire into Claude Desktop")}
                  </h2>
                </div>
                <p className="text-muted-foreground mb-2">
                  {t("quickstart.step_2_desc_prefix", "Open")}{" "}
                  <code className="text-primary">~/Library/Application Support/Claude/claude_desktop_config.json</code>{" "}
                  {t("quickstart.step_2_desc_mid", "(macOS) or")}{" "}
                  <code className="text-primary">%APPDATA%\Claude\claude_desktop_config.json</code>{" "}
                  {t("quickstart.step_2_desc_suffix", "(Windows).")}
                </p>
                <CodeBlock
                  label="claude_desktop_config.json"
                  code={`{
  "mcpServers": {
    "tacho-audit": {
      "command": "uvx",
      "args": ["meok-tacho-audit-mcp"],
      "env": {
        "MEOK_HMAC_SECRET": "your-org-secret-here"
      }
    }
  }
}`}
                />
                <p className="text-muted-foreground mt-3 text-sm">
                  {t("quickstart.step_2_post", "Restart Claude Desktop. The tools appear in the right-hand sidebar.")}
                </p>
              </section>

              <section className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Send className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <h2 className="font-display text-2xl font-bold">
                    {t("quickstart.step_3_title", "Step 3 — Make your first call")}
                  </h2>
                </div>
                <p className="text-muted-foreground mb-2">
                  {t("quickstart.step_3_desc", "Ask Claude in plain English. The tool fires automatically.")}
                </p>
                <CodeBlock
                  label="Claude prompt"
                  code={`Forecast my OCRS score 90 days out.
Current points: 18. Trend: 0.4 per week. Fleet: 40 trucks.`}
                />
                <p className="text-muted-foreground mt-3 text-sm">
                  {t("quickstart.step_3_label_response", "You'll get back something like:")}
                </p>
                <CodeBlock
                  code={`{
  "tool": "forecast_ocrs_90_day",
  "current_points": 18,
  "current_score_pct": 4.5,
  "forecast_90d_band": "GREEN",
  "weeks_to_red_estimate": 84.2,
  "ts": "2026-06-07T17:42:30Z",
  "sig": "a4f8c2b6e9d3...",
  "issuer": "meok-tacho-audit-mcp",
  "version": "1.0.0"
}`}
                />
              </section>

              <section className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" aria-hidden="true" />
                  </div>
                  <h2 className="font-display text-2xl font-bold">
                    {t("quickstart.step_4_title", "Step 4 — Verify the signature")}
                  </h2>
                </div>
                <p className="text-muted-foreground mb-2">
                  {t(
                    "quickstart.step_4_desc",
                    "Anyone (auditor, regulator, customer) can independently verify the signature against the public attestation API:"
                  )}
                </p>
                <CodeBlock
                  label="Terminal"
                  code={`curl -X POST https://meok-attestation-api.vercel.app/verify \\
  -H "Content-Type: application/json" \\
  -d '{"sig":"a4f8c2b6e9d3...","payload":{...}}'`}
                />
                <p className="text-muted-foreground mt-3 text-sm">
                  {t("quickstart.step_4_post_prefix", "Returns")}{" "}
                  <code className="text-primary">{`{"valid": true, "issuer": "meok-tacho-audit-mcp"}`}</code>{" "}
                  {t("quickstart.step_4_post_suffix", "if the chain is intact. Use this in your audit packs.")}
                </p>
              </section>

              <section className="card-industrial p-6 mt-8">
                <h2 className="font-display text-xl font-bold mb-4">
                  {t("quickstart.next_steps_heading", "Next steps")}
                </h2>
                <ul className="space-y-3">
                  <li>
                    <Link to="/map" className="text-primary hover:underline inline-flex items-center gap-2">
                      {t("quickstart.next_step_map", "Browse the coverage map")} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>{" "}
                    <span className="text-muted-foreground text-sm">
                      {t("quickstart.next_step_map_note", "— which jurisdictions you can cover.")}
                    </span>
                  </li>
                  <li>
                    <Link to="/governance" className="text-primary hover:underline inline-flex items-center gap-2">
                      {t("quickstart.next_step_governance", "Add the governance bridge")} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>{" "}
                    <span className="text-muted-foreground text-sm">
                      {t("quickstart.next_step_governance_note", "— auto-bridge every attestation to EU AI Act + UK AI Bill.")}
                    </span>
                  </li>
                  <li>
                    <Link to="/pricing" className="text-primary hover:underline inline-flex items-center gap-2">
                      {t("quickstart.next_step_pricing", "Upgrade to Pro/Fleet")} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>{" "}
                    <span className="text-muted-foreground text-sm">
                      {t("quickstart.next_step_pricing_note", "— central signing, multi-user, SLA.")}
                    </span>
                  </li>
                  <li>
                    <a
                      href="https://meok-attestation-api.vercel.app/docs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-2"
                    >
                      {t("quickstart.next_step_api_docs", "Interactive API docs (Swagger UI)")} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </a>{" "}
                    <span className="text-muted-foreground text-sm">
                      {t("quickstart.next_step_api_docs_note", "— try sign + verify from the browser.")}
                    </span>
                  </li>
                  <li>
                    <a
                      href="https://github.com/CSOAI-ORG"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-2"
                    >
                      {t("quickstart.next_step_github", "Issues + PRs on GitHub")} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </a>{" "}
                    <span className="text-muted-foreground text-sm">
                      {t("quickstart.next_step_github_note", "— every MCP is open source.")}
                    </span>
                  </li>
                </ul>
              </section>

              <div className="text-center mt-12">
                <p className="text-muted-foreground mb-4">
                  {t("quickstart.stuck_text", "Stuck? Same-day reply guaranteed.")}
                </p>
                <Button variant="hero" size="lg" asChild>
                  <a href="mailto:nicholas@meok.ai?subject=Quickstart%20help">
                    {t("quickstart.email_cta", "Email Nick")}
                  </a>
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

export default QuickstartPage;
