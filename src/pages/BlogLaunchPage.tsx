import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const PUBLISH_DATE = "2026-06-07";

const BlogLaunchPage = () => {
  const { t } = useTranslation();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Launching the 32-MCP Trade Compliance Catalogue with Signed Attestations + EU AI Act Bridge",
    description:
      "MEOK AI Labs has shipped Haulage.app — 32 PyPI-published MCP servers covering UK + EU + US + AU + Canada + air + sea + rail trade compliance, with every signed attestation auto-bridging to the EU AI Act, UK AI Bill, NIST AI RMF and ISO/IEC 42001.",
    datePublished: PUBLISH_DATE,
    dateModified: PUBLISH_DATE,
    author: {
      "@type": "Person",
      name: "Nicholas Templeman",
      url: "https://meok.ai",
    },
    publisher: {
      "@type": "Organization",
      name: "MEOK AI Labs",
      url: "https://meok.ai",
      logo: {
        "@type": "ImageObject",
        url: "https://haulage.app/og-image.jpg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://haulage.app/blog/launch",
    },
    image: "https://haulage.app/og-image.jpg",
    articleSection: "Product Launch",
  };

  return (
    <>
      <SEO
        title="Launching the 32-MCP Trade Compliance Catalogue + EU AI Act Bridge | Haulage.app"
        description="Today we shipped 32 PyPI-published MCP servers across UK + EU + US + AU + CA + air + sea + rail. Every signed compliance attestation auto-bridges to EU AI Act + UK AI Bill + NIST AI RMF + ISO/IEC 42001."
        canonical="https://haulage.app/blog/launch"
        ogType="article"
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

            <article className="max-w-3xl mx-auto prose-headings:font-display">
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                <time dateTime={PUBLISH_DATE}>{PUBLISH_DATE}</time>
                <span>·</span>
                <span>Product launch</span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Launching <span className="text-gradient">32 trade-compliance MCPs</span> — every signed attestation auto-bridges to EU AI Act + UK AI Bill
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Today we shipped Haulage.app — an umbrella for 32 PyPI-published Model Context
                Protocol servers covering trade-compliance regulators across nine jurisdictions and
                four modes (road, air, sea, rail). Every tool result is HMAC-signed and
                independently verifiable. Every signed attestation auto-bridges through a single
                governance MCP to the EU AI Act, UK AI Bill Article 22c, NIST AI RMF and ISO/IEC
                42001.
              </p>

              <h2 className="font-display text-2xl font-bold mt-12 mb-4">Why now</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Three pressures collided in 2026:
              </p>
              <ul className="space-y-2 text-muted-foreground leading-relaxed mb-6 list-disc pl-6">
                <li>
                  <strong className="text-foreground">EU AI Act</strong> high-risk obligations on
                  AI used inside transport / logistics decisions — the Digital Omnibus delayed
                  Annex III to Dec 2027 but watermarking duties hit Nov 2026.
                </li>
                <li>
                  <strong className="text-foreground">UK AI Bill Article 22c</strong> — automated
                  decision-making notice + opt-out duties hit any operator using AI for
                  routing/pricing/recruitment.
                </li>
                <li>
                  <strong className="text-foreground">Smart Tachograph 2</strong> — retrofit
                  deadline July 2026 for cross-border road haulage.
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Existing fleet TMS + telematics + compliance-admin tools (Mandata, Microlise,
                FleetCheck, Vanta) cover their categories well but don't ship signed compliance
                attestations or bridge to AI governance. Haulage.app fills that gap.
              </p>

              <h2 className="font-display text-2xl font-bold mt-12 mb-4">What's in the catalogue</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                32 MCP servers, organised across 9 verticals:
              </p>
              <ul className="space-y-1 text-muted-foreground leading-relaxed mb-6 list-disc pl-6 text-sm">
                <li><strong>UK road haulage</strong> — DVSA OCRS forecast, Smart Tachograph 2, Public Inquiry brief, FORS / CLOCS evidence, BS 7121 lift plans, CPA Contract-Lift triage</li>
                <li><strong>EU mobility package</strong> — driver detachment, posting rules, Smart Tachograph 2 cross-border</li>
                <li><strong>US</strong> — FMCSA Hours of Service, ELD compliance</li>
                <li><strong>Australia</strong> — NHVR Chain of Responsibility</li>
                <li><strong>Canada</strong> — Transport Canada HOS</li>
                <li><strong>UAE / MENA</strong> — RTA transport licensing</li>
                <li><strong>Cross-border</strong> — IRU TIR carnets, IATA DGR air cargo, IMO MARPOL marine</li>
                <li><strong>Rail freight</strong> — UK ORR, ROGS, RID dangerous goods</li>
                <li><strong>Specialist</strong> — Cold-chain pharma (GDP), Livestock welfare transport, EV recall + battery transport</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Plus the <code className="text-primary">meok-haulage-governance-bridge-mcp</code> —
                one install, every compliance attestation auto-crosswalks to EU AI Act Annex I/III,
                UK AI Bill Article 22c, NIST AI RMF, ISO/IEC 42001 and the Council of Europe AI
                Treaty.
              </p>

              <h2 className="font-display text-2xl font-bold mt-12 mb-4">
                How the audit chain works
              </h2>
              <ol className="space-y-3 text-muted-foreground leading-relaxed mb-6 list-decimal pl-6">
                <li>You ask Claude (or any MCP-compatible client) a compliance question.</li>
                <li>The matching MEOK MCP fires the tool — say, <code className="text-primary">forecast_ocrs_90_day</code>.</li>
                <li>Tool returns the answer + an HMAC-SHA256 signature + issuer + version + timestamp.</li>
                <li>The governance bridge MCP can re-sign the chain and crosswalk it to your AI Act / AI Bill obligations.</li>
                <li>Auditor / regulator / customer POSTs the signed payload to <code className="text-primary">meok-attestation-api.vercel.app/verify</code> — gets back <code className="text-primary">{`{"valid": true}`}</code> if the chain holds.</li>
              </ol>
              <p className="text-muted-foreground leading-relaxed mb-6">
                No card data ever touches our infra — billing is Stripe-only. Every MCP is
                MIT-licensed and on PyPI. The verifier endpoint is public, rate-limited, and
                requires no API key.
              </p>

              <h2 className="font-display text-2xl font-bold mt-12 mb-4">Try it in 5 minutes</h2>
              <pre className="bg-secondary/50 border border-border rounded-lg p-4 overflow-x-auto text-sm leading-relaxed mb-4">
                <code className="text-foreground">{`pip install meok-tacho-audit-mcp
# Then in Claude Desktop config:
{
  "mcpServers": {
    "tacho-audit": {
      "command": "uvx",
      "args": ["meok-tacho-audit-mcp"],
      "env": { "MEOK_HMAC_SECRET": "your-org-secret-here" }
    }
  }
}`}</code>
              </pre>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Then ask Claude in plain English: <em>"Forecast my OCRS score 90 days out — current
                points 18, trend 0.4 / week, fleet 40 trucks."</em> Get back a signed forecast band +
                weeks-to-RED estimate. Auditors verify the signature from their own machine.
              </p>

              <h2 className="font-display text-2xl font-bold mt-12 mb-4">What's next</h2>
              <ul className="space-y-2 text-muted-foreground leading-relaxed mb-6 list-disc pl-6">
                <li>Earned-recognition + FORS Gold dossiers in beta — invite-only for fleet ops</li>
                <li>Pre-built audit packs for DVSA Public Inquiry, EU AI Act Annex III, NIS2-DE registration</li>
                <li>Coverage expanding to MENA bulk (UAE / KSA / Egypt) + LATAM (Mexico / Brazil)</li>
                <li>Native React + Python + Go SDKs around the verifier API</li>
              </ul>

              <div className="card-industrial p-6 mt-10 bg-gradient-to-br from-primary/5 to-transparent">
                <h3 className="font-display text-xl font-bold mb-3">First-mover offer</h3>
                <p className="text-muted-foreground mb-4">
                  First 10 paying customers on the Pro tier get <strong className="text-foreground">50% off the first 6 months</strong> with
                  code <code className="text-primary">LAUNCH50</code>. Same-day onboarding from Nick directly.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="hero" asChild>
                    <Link to="/pricing">
                      See pricing <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/docs/quickstart">5-min quickstart</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="mailto:nicholas@meok.ai?subject=LAUNCH50%20—%20interested">
                      Email Nick
                    </a>
                  </Button>
                </div>
              </div>
            </article>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default BlogLaunchPage;
