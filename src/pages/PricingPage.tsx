import { Link } from "react-router-dom";
import { ArrowLeft, Check, Server, Package, Shield, Crown } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { proStripeUrl } from "@/data/mcps";

interface Tier {
  id: string;
  name: string;
  price: string;
  period: string;
  summary: string;
  features: string[];
  cta: string;
  href: string;
  external: boolean;
  highlight?: boolean;
  icon: typeof Server;
}

const PricingPage = () => {
  const { t } = useTranslation();

  const tiers: Tier[] = [
    {
      id: "free",
      icon: Server,
      name: "Free",
      price: "£0",
      period: "/forever",
      summary: "MIT-licensed self-host, single MCP, run-it-yourself.",
      features: [
        "Pick any 1 MCP from the catalogue",
        "MIT source on PyPI + GitHub",
        "Self-signed HMAC attestations",
        "Community support (Issues / Discord)",
      ],
      cta: "Install via pip",
      href: "/mcps",
      external: false,
    },
    {
      id: "starter",
      icon: Server,
      name: "Starter",
      price: "£29",
      period: "/mo",
      summary: "One MCP with central attestation signing + email support.",
      features: [
        "Single MCP of your choice",
        "Centrally-signed compliance receipts",
        "1,000 tool calls / month",
        "Email support (24h SLA)",
      ],
      cta: "Pick an MCP",
      href: "/mcps",
      external: false,
    },
    {
      id: "pro",
      icon: Package,
      name: "Pro",
      price: "£79",
      period: "/mo",
      summary: "All 32 MCPs in your vertical + the SaaS umbrella + multi-user.",
      features: [
        "All 32 MCPs unlocked across all 9 verticals",
        "muckaway.ai / planthire.ai / grabhire.ai access",
        "50,000 tool calls / month",
        "Slack support (4h business-hour SLA)",
        "Multi-user (up to 10 seats)",
      ],
      cta: "Subscribe Pro £79/mo",
      href: proStripeUrl,
      external: true,
      highlight: true,
    },
    {
      id: "fleet",
      icon: Shield,
      name: "Fleet",
      price: "£499",
      period: "/mo",
      summary: "50+ trucks, audit-export, governance bridge fully wired, SLA.",
      features: [
        "All 32 MCPs across all jurisdictions",
        "AI Governance Bridge chained attestations",
        "Audit export (PDF + JSON) for DVSA / FMCSA / NHVR",
        "Unlimited tool calls",
        "99.9% SLA + named CSM",
        "Multi-tenant (sub-operator accounts)",
      ],
      cta: "Talk to Nick",
      href: "mailto:nicholas@meok.ai?subject=Fleet%20tier%20enquiry",
      external: true,
    },
    {
      id: "er",
      icon: Crown,
      name: "Earned Recognition",
      price: "£1,499",
      period: "/mo",
      summary: "DVSA ER data-feed integration, 99.99% SLA, custom MCP, on-prem option.",
      features: [
        "DVSA Earned Recognition automated 4-weekly data feed",
        "Custom MCP for your specific operation",
        "SAML / SSO + audit-log retention 7 years",
        "Self-hosted option (your AWS / Azure / GCP)",
        "99.99% SLA + 24×7 escalation",
        "Quarterly compliance review with named consultant",
      ],
      cta: "Contact sales",
      href: "mailto:nicholas@meok.ai?subject=Earned%20Recognition%20tier%20enquiry",
      external: true,
    },
  ];

  return (
    <>
      <SEO
        title="Pricing | Haulage.app | MEOK AI Labs"
        description="Transparent pricing for the MEOK compliance + AI governance MCP catalogue. Free MIT self-host, £29 Starter, £79 Pro, £499 Fleet, £1,499 Earned Recognition. No contracts."
        canonical="https://haulage.app/pricing"
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
              {t("mcps_page.back_link")}
            </Link>
            <div className="max-w-3xl mb-12">
              <span className="text-primary font-display uppercase tracking-wider text-sm">
                Pricing
              </span>
              <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 mb-6">
                One catalogue. <span className="text-gradient">Five tiers.</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Open-source by default. The paid tiers add centrally-signed attestations, a customer
                dashboard, multi-user seats, audit export, and SLAs. No contracts, monthly billing,
                cancel any time.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
              {tiers.map(tier => {
                const Icon = tier.icon;
                return (
                  <div
                    key={tier.id}
                    className={`card-industrial p-5 flex flex-col ${
                      tier.highlight ? "border-primary lg:scale-[1.04] lg:shadow-2xl" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                      <h2 className="font-display text-lg font-bold">{tier.name}</h2>
                      {tier.highlight && (
                        <span className="ml-auto text-[10px] bg-primary text-primary-foreground px-2 py-0.5 rounded font-display uppercase tracking-wider">
                          Best value
                        </span>
                      )}
                    </div>
                    <div className="font-display text-3xl font-bold mb-1">
                      {tier.price}
                      <span className="text-sm text-muted-foreground font-normal">{tier.period}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-4">{tier.summary}</p>
                    <ul className="space-y-2 mb-6 flex-grow">
                      {tier.features.map(f => (
                        <li key={f} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    {tier.external ? (
                      <Button variant={tier.highlight ? "hero" : "outline"} size="sm" className="w-full" asChild>
                        <a href={tier.href} target="_blank" rel="noopener noreferrer">
                          {tier.cta}
                        </a>
                      </Button>
                    ) : (
                      <Button variant={tier.highlight ? "hero" : "outline"} size="sm" className="w-full" asChild>
                        <Link to={tier.href}>{tier.cta}</Link>
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="card-industrial p-6 mb-6">
                <h2 className="font-display text-xl font-bold mb-3">FAQ</h2>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-semibold text-foreground mb-1">
                      Can I self-host for free and upgrade later?
                    </p>
                    <p className="text-muted-foreground">
                      Yes — every MCP is MIT-licensed on PyPI. You only need a paid tier if you want
                      centrally-signed attestations (where MEOK signs with the production HMAC key so any
                      auditor or regulator can verify against the public verifier), the customer dashboard,
                      audit export, or an SLA.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Are prices in GBP?</p>
                    <p className="text-muted-foreground">
                      Yes — Stripe-billed in GBP. EUR / USD / AUD / CAD / AED billing for Fleet + Earned
                      Recognition tiers via direct invoice on request.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">
                      Do I need a Pro or Fleet tier to use the Governance Bridge?
                    </p>
                    <p className="text-muted-foreground">
                      No — the bridge is part of the free MIT catalogue. The paid Fleet tier just chains
                      every compliance + governance attestation through{" "}
                      <a
                        href="https://meok-attestation-api.vercel.app"
                        className="text-primary hover:underline"
                      >
                        meok-attestation-api
                      </a>{" "}
                      so the receipts are independently verifiable.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Refunds + cancellation?</p>
                    <p className="text-muted-foreground">
                      Cancel any time from the customer portal. Pro-rated refunds for the first 30 days,
                      no questions asked. After 30 days the unused portion stays as credit toward another
                      MCP / SaaS app.
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-industrial p-6 text-center">
                <h2 className="font-display text-xl font-bold mb-3">Not sure which tier?</h2>
                <p className="text-muted-foreground text-sm mb-4">
                  Email Nick with what you need to audit + which jurisdictions you operate in. Same-day
                  reply with a recommendation, no SDR funnel.
                </p>
                <Button variant="hero" size="lg" asChild>
                  <a href="mailto:nicholas@meok.ai?subject=Pricing%20question">
                    Email nicholas@meok.ai
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

export default PricingPage;
