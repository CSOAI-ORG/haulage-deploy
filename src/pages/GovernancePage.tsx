import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Shield, GitBranch, FileCheck, Globe2, Lock, Network } from "lucide-react";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { governanceFrameworks } from "@/data/jurisdictions";

const GovernancePage = () => {
  const flow = [
    {
      step: "1",
      icon: FileCheck,
      title: "Compliance MCP signs an attestation",
      body:
        "Any of the 21 trade-compliance MCPs (DVSA, FMCSA, BS 7121, IATA DGR, IMO MARPOL, EU 561/2006...) returns its result with an HMAC-SHA256 signature, a timestamp, and an issuer field.",
    },
    {
      step: "2",
      icon: Network,
      title: "Bridge maps it to AI Act obligations",
      body:
        "meok-haulage-governance-bridge-mcp identifies the AI use case (OCRS forecast, lift-plan AI, EV-recall routing, etc.), classifies risk tier (High / Limited / Minimal), surfaces the applicable Articles (Art 9, 10, 11, 12, 13, 14, 26, 27) and the deployer's obligations.",
    },
    {
      step: "3",
      icon: GitBranch,
      title: "Chains compliance ↔ governance",
      body:
        "Both signatures are chained into a single audit record. The trade-compliance attestation proves WHAT was verified; the governance attestation proves UNDER WHAT FRAMEWORKS. Auditor receives both as a single signed record.",
    },
    {
      step: "4",
      icon: Globe2,
      title: "Crosswalks to NIST + ISO + UK AI Bill",
      body:
        "The same record satisfies EU AI Act conformity assessment, NIST AI RMF (GOVERN/MAP/MEASURE/MANAGE), ISO/IEC 42001:2023 AIMS clauses, and UK AI Bill Article 22c ADM transparency. One install, four frameworks, global coverage.",
    },
  ];

  return (
    <>
      <SEO
        title="AI Governance Bridge | Haulage.app | MEOK AI Labs"
        description="Every haulage compliance attestation auto-bridges to EU AI Act + UK AI Bill + NIST AI RMF + ISO/IEC 42001:2023. One install, four governance frameworks, audit-ready on both sides."
        canonical="https://haulage.app/governance"
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
              Back to Haulage.app
            </Link>

            <div className="max-w-3xl mb-12">
              <span className="text-primary font-display uppercase tracking-wider text-sm">
                AI Governance Bridge
              </span>
              <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 mb-6">
                Compliance + Governance. <span className="text-gradient">One Signed Record.</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Every UK haulier now uses AI — route planning, fatigue prediction, OCRS forecasting,
                lift-plan generation. Under the <strong>EU AI Act (effective 2 Aug 2026)</strong> most
                of these are high-risk under Annex III §2 (transport infrastructure). Get it wrong: up to
                <strong> €35m or 7% global turnover</strong>.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mt-4">
                MEOK is the only player with both vertical trade compliance{" "}
                <strong>and</strong> horizontal AI governance — chained.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button variant="hero" size="lg" asChild>
                  <a
                    href="https://pypi.org/project/meok-haulage-governance-bridge-mcp/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    pip install meok-haulage-governance-bridge-mcp
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/map">See coverage map</Link>
                </Button>
              </div>
            </div>
          </div>

          <section className="py-16 bg-secondary/30">
            <div className="container mx-auto px-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
                The chain <span className="text-gradient">in four steps</span>
              </h2>
              <div className="grid lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {flow.map(s => {
                  const Icon = s.icon;
                  return (
                    <div key={s.step} className="card-industrial p-6 relative">
                      <div className="text-xs text-primary font-display uppercase tracking-wider mb-3">
                        Step {s.step}
                      </div>
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                      </div>
                      <h3 className="font-display text-lg font-bold mb-3">{s.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="container mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                <div>
                  <h2 className="font-display text-3xl font-bold mb-4">
                    The 4 frameworks it cross-walks
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    A single signed record proves conformity against four parallel governance regimes.
                  </p>
                  <ul className="space-y-3">
                    {governanceFrameworks.map(g => (
                      <li key={g.code} className="card-industrial p-4 flex items-center justify-between gap-3">
                        <div>
                          <code className="text-sm font-bold text-primary">{g.code}</code>
                          <p className="text-xs text-muted-foreground mt-1">{g.full}</p>
                        </div>
                        <span className="text-xs whitespace-nowrap text-muted-foreground">
                          {g.jurisdiction}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="font-display text-3xl font-bold mb-4">
                    The 10 callable tools
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Each one returns a signed attestation. Call from Claude Desktop, an Agent SDK app, or curl.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "crosswalk_to_ai_act",
                      "classify_ai_risk_tier",
                      "list_provider_obligations",
                      "list_deployer_obligations",
                      "generate_fria_inputs",
                      "generate_ifu_skeleton",
                      "crosswalk_to_nist_rmf",
                      "crosswalk_to_iso_42001",
                      "chain_attestations",
                      "check_uk_ai_bill_art_22c",
                    ].map(tool => (
                      <li key={tool} className="card-industrial p-3 flex items-center gap-3">
                        <Lock className="w-4 h-4 text-primary flex-shrink-0" aria-hidden="true" />
                        <code className="text-sm text-foreground break-all">{tool}</code>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-secondary/30">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-display text-3xl font-bold mb-8 text-center">
                  Why this is <span className="text-gradient">a moat</span>
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 font-display uppercase tracking-wider text-xs">
                          Player
                        </th>
                        <th className="text-left p-3 font-display uppercase tracking-wider text-xs">
                          Trade compliance
                        </th>
                        <th className="text-left p-3 font-display uppercase tracking-wider text-xs">
                          AI governance
                        </th>
                        <th className="text-left p-3 font-display uppercase tracking-wider text-xs">
                          Multi-jurisdiction
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-border/50">
                        <td className="p-3 text-foreground font-semibold">Mandata</td>
                        <td className="p-3">UK TMS</td>
                        <td className="p-3 text-red-400">✗</td>
                        <td className="p-3">UK only</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="p-3 text-foreground font-semibold">Microlise</td>
                        <td className="p-3">UK telematics</td>
                        <td className="p-3 text-red-400">✗</td>
                        <td className="p-3">UK + some EU</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="p-3 text-foreground font-semibold">FleetCheck</td>
                        <td className="p-3">UK walkaround only</td>
                        <td className="p-3 text-red-400">✗</td>
                        <td className="p-3">UK</td>
                      </tr>
                      <tr className="border-b border-border/50">
                        <td className="p-3 text-foreground font-semibold">Vanta / Drata</td>
                        <td className="p-3 text-red-400">✗</td>
                        <td className="p-3">SOC 2 / ISO 27001 only</td>
                        <td className="p-3">Global</td>
                      </tr>
                      <tr className="bg-primary/5">
                        <td className="p-3 text-primary font-bold">MEOK</td>
                        <td className="p-3 text-primary font-bold">All trade × 9 verticals</td>
                        <td className="p-3 text-primary font-bold">
                          EU AI Act + UK AI Bill + NIST + ISO 42001
                        </td>
                        <td className="p-3 text-primary font-bold">
                          🇬🇧🇪🇺🇺🇸🇦🇺🇨🇦🇦🇪 + 78 TIR
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16">
            <div className="container mx-auto px-6 text-center">
              <Shield className="w-16 h-16 text-primary mx-auto mb-6" aria-hidden="true" />
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                Ready to install?
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                The bridge is MIT-licensed. Install via pip, configure in Claude Desktop, get signed
                attestations back from every tool.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" asChild>
                  <a
                    href="https://pypi.org/project/meok-haulage-governance-bridge-mcp/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Install from PyPI
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/pricing">See pricing</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="mailto:nicholas@meok.ai?subject=Governance%20bridge%20enquiry">
                    Talk to Nick
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default GovernancePage;
