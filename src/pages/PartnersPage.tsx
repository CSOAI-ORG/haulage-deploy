import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Handshake, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { PARTNER_TIERS } from "@/data/partners";

const PartnersPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <SEO
        title={t("partners.seo_title", "Partner program | Haulage.app — MEOK AI Labs")}
        description={t(
          "partners.seo_description",
          "Auditors, consultants, agencies, and platforms — earn 15-25% lifetime rev-share by reselling MEOK trade-compliance MCPs. Same-day onboarding.",
        )}
        canonical="https://haulage.app/partners"
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
                {t("partners.eyebrow", "Partner program")}
              </span>
              <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 mb-6">
                {t("partners.title_prefix", "Sell MEOK to your clients.")}{" "}
                <span className="text-gradient">
                  {t("partners.title_highlight", "Keep 15-25% for life.")}
                </span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t(
                  "partners.intro",
                  "Audit firms + transport consultants + digital agencies + TMS platforms earn lifetime revenue share by reselling MEOK trade-compliance MCPs. One sale + signup = recurring income while we handle the product, infra, and customer support.",
                )}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-5xl">
              {PARTNER_TIERS.map((p) => (
                <article key={p.slug} className="card-industrial p-6 flex flex-col">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Handshake className="w-5 h-5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-bold">{p.label}</h2>
                      <div className="text-primary text-sm font-medium mt-1">{p.commission}</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{p.ideal}</p>
                  <ul className="space-y-2 text-sm mb-6 flex-grow">
                    {p.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full" asChild>
                    <a href={p.cta}>
                      Apply now <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
                    </a>
                  </Button>
                </article>
              ))}
            </div>

            <div className="card-industrial p-8 max-w-4xl mx-auto text-center bg-gradient-to-br from-primary/5 to-transparent">
              <h2 className="font-display text-3xl font-bold mb-4">
                {t("partners.how_it_works_title", "How it works")}
              </h2>
              <div className="grid md:grid-cols-3 gap-6 text-left mt-8">
                <div>
                  <div className="font-display text-4xl font-bold text-primary mb-2">01</div>
                  <h3 className="font-display font-bold mb-2">Apply</h3>
                  <p className="text-sm text-muted-foreground">
                    Email Nick. Same-day reply. 15-min intro call to confirm fit + share the kit.
                  </p>
                </div>
                <div>
                  <div className="font-display text-4xl font-bold text-primary mb-2">02</div>
                  <h3 className="font-display font-bold mb-2">Get your link</h3>
                  <p className="text-sm text-muted-foreground">
                    Unique tracking URL (e.g. <code>haulage.app/?ref=acme</code>). All checkouts via that
                    URL are attributed to you forever.
                  </p>
                </div>
                <div>
                  <div className="font-display text-4xl font-bold text-primary mb-2">03</div>
                  <h3 className="font-display font-bold mb-2">Get paid monthly</h3>
                  <p className="text-sm text-muted-foreground">
                    Stripe Connect payouts. Dashboard shows MRR + churn + LTV per referred customer.
                  </p>
                </div>
              </div>
              <div className="mt-10">
                <Button variant="hero" size="lg" asChild>
                  <a href="mailto:nicholas@meok.ai?subject=MEOK%20Partner%20Program%20application">
                    Apply for the partner program
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

export default PartnersPage;
