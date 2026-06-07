import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, FileSearch, Lock, Globe, KeyRound, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const trustPillars = [
  {
    icon: KeyRound,
    title: "HMAC-SHA256 signing",
    body: "Every tool result from every MEOK MCP is signed with HMAC-SHA256 using your organisation's secret. The signature, issuer, version and timestamp are emitted alongside the payload. No exceptions.",
  },
  {
    icon: ShieldCheck,
    title: "Public verifier endpoint",
    body: "Anyone — auditor, regulator, customer — can verify a signature without installing a single dependency by POSTing the payload + sig to meok-attestation-api.vercel.app/verify. Pass = chain intact.",
  },
  {
    icon: Lock,
    title: "Stripe-only billing",
    body: "Card data never touches MEOK's infrastructure. All checkout flows go through Stripe-hosted payment pages with 3DS strong-customer-auth. We hold no PANs, no CVCs, no card tokens.",
  },
  {
    icon: FileSearch,
    title: "Open source MCPs",
    body: "Every published MCP server is open source on PyPI. Read the code before you install it. Build alongside our team. Issues + PRs on github.com/CSOAI-ORG/.",
  },
  {
    icon: Globe,
    title: "EU AI Act + UK AI Bill bridge",
    body: "Compliance attestations from every trade MCP auto-bridge to EU AI Act Annex III, UK AI Bill Article 22c, NIST AI RMF and ISO/IEC 42001 via meok-haulage-governance-bridge-mcp. One install, both sides.",
  },
];

const TrustPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <SEO
        title={t("trust.seo_title", "Trust & Security | Haulage.app | MEOK AI Labs")}
        description={t(
          "trust.seo_description",
          "How MEOK signs every compliance attestation, why the verifier endpoint is public, and how billing keeps card data off MEOK infrastructure. 32 open source MCPs, EU AI Act bridge, HMAC-SHA256 signing."
        )}
        canonical="https://haulage.app/trust"
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
                {t("trust.eyebrow", "Trust & security")}
              </span>
              <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 mb-6">
                {t("trust.title_prefix", "Built to be")}{" "}
                <span className="text-gradient">
                  {t("trust.title_highlight", "audited.")}
                </span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t(
                  "trust.intro",
                  "Compliance is the product. The same audit chain that gets you to DVSA / FORS / IATA / EU AI Act readiness has to hold up under our own scrutiny first. Here's what that means in practice."
                )}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mb-16">
              {trustPillars.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div key={p.title} className="card-industrial p-6 flex">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-bold mb-2">
                        {t(`trust.pillar_${idx + 1}_title`, p.title)}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {t(`trust.pillar_${idx + 1}_body`, p.body)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="card-industrial p-6 max-w-4xl mb-12">
              <h2 className="font-display text-2xl font-bold mb-4">
                {t("trust.verifier_heading", "Try the verifier yourself")}
              </h2>
              <p className="text-muted-foreground mb-4">
                {t(
                  "trust.verifier_body",
                  "The verifier endpoint is public, rate-limited, and requires no API key. POST a signed payload + signature — get back valid: true|false. That's the whole protocol."
                )}
              </p>
              <pre className="bg-secondary/50 border border-border rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
                <code className="text-foreground">{`curl -X POST https://meok-attestation-api.vercel.app/verify \\
  -H "Content-Type: application/json" \\
  -d '{"sig":"a4f8c2b6e9d3...","payload":{...}}'`}</code>
              </pre>
              <div className="flex flex-wrap gap-3 mt-4">
                <Button variant="outline" asChild>
                  <a
                    href="https://meok-attestation-api.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("trust.verifier_open", "Open the verifier")}
                    <ExternalLink className="w-4 h-4 ml-2" aria-hidden="true" />
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/docs/quickstart">
                    {t("trust.verifier_quickstart", "Read the 5-min quickstart")}
                  </Link>
                </Button>
              </div>
            </div>

            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-display text-3xl font-bold mb-4">
                {t("trust.contact_heading", "Got a sharper question?")}
              </h2>
              <p className="text-muted-foreground mb-6">
                {t(
                  "trust.contact_body",
                  "Security disclosures, audit-pack requests, sub-processor lists — everything routes to one inbox. Same-day reply guaranteed."
                )}
              </p>
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
