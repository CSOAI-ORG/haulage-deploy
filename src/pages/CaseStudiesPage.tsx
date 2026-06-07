import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CASE_STUDIES, getPublishedCaseStudies } from "@/data/case-studies";

const CaseStudiesPage = () => {
  const { t } = useTranslation();
  const published = getPublishedCaseStudies();
  const allWaiting = published.length === 0;

  return (
    <>
      <SEO
        title={t("case_studies.seo_title", "Case studies | Haulage.app — MEOK AI Labs")}
        description={t(
          "case_studies.seo_description",
          "How fleet operators + compliance officers use MEOK's 32 trade-compliance MCPs to forecast OCRS, prep FORS dossiers, and prove EU AI Act conformity. Signed evidence on every check.",
        )}
        canonical="https://haulage.app/case-studies"
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

            <div className="max-w-4xl">
              <span className="text-primary font-display uppercase tracking-wider text-sm">
                {t("case_studies.eyebrow", "Customer stories")}
              </span>
              <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 mb-6">
                {t("case_studies.title_prefix", "How fleet ops + compliance officers")}{" "}
                <span className="text-gradient">
                  {t("case_studies.title_highlight", "actually use MEOK.")}
                </span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-12">
                {t(
                  "case_studies.intro",
                  "Real outcomes from real operators. Every case study links to the signed attestation chain so you can verify the numbers yourself.",
                )}
              </p>
            </div>

            {allWaiting ? (
              <div className="card-industrial p-10 max-w-3xl mx-auto text-center">
                <Quote className="w-12 h-12 text-primary mx-auto mb-4" aria-hidden="true" />
                <h2 className="font-display text-2xl font-bold mb-4">
                  {t("case_studies.early_days", "We're brand new — be one of our first")}
                </h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  {t(
                    "case_studies.early_days_body",
                    "Haulage.app launched 7 June 2026. We're holding off on testimonials until the first cohort of paying customers has 30 days under their belt. Want to be customer #1? You'll get LAUNCH50 (50% off 6 months) + your logo here.",
                  )}
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button variant="hero" size="lg" asChild>
                    <Link to="/pricing">See pricing</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="mailto:nicholas@meok.ai?subject=LAUNCH50%20-%20interested">Email Nick</a>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-6">
                  {t(
                    "case_studies.transparency_note",
                    "We considered shipping placeholder testimonials. We won't — your trust matters more than landing-page polish.",
                  )}
                </p>

                {/* Sample shape of upcoming case-study cards — render as muted previews so visitors see what's coming. */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                  {CASE_STUDIES.slice(0, 3).map((c) => (
                    <div key={c.slug} className="border border-dashed border-border rounded-lg p-4 opacity-50">
                      <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                        Coming soon — {c.industry}
                      </div>
                      <div className="font-display text-sm font-bold mb-1">{c.metricHeadline}</div>
                      <div className="text-xs text-muted-foreground">{c.fleetSize} · {c.region}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {published.map((c) => (
                  <article key={c.slug} className="card-industrial p-6 flex flex-col">
                    <div className="flex items-center gap-3 mb-4">
                      <img
                        src={c.logoUrl}
                        alt={`${c.companyName} logo`}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div>
                        <div className="font-display font-bold">{c.companyName}</div>
                        <div className="text-xs text-muted-foreground">{c.industry} · {c.region}</div>
                      </div>
                    </div>
                    <blockquote className="text-sm text-foreground/80 italic mb-4 flex-grow">
                      <Quote className="inline w-4 h-4 mr-1 text-primary" aria-hidden="true" />
                      {c.quote}
                    </blockquote>
                    <div className="border-t border-border pt-3 mt-auto">
                      <div className="text-primary font-display font-bold text-sm">{c.metricHeadline}</div>
                      {c.metricSecondary && (
                        <div className="text-xs text-muted-foreground mt-1">{c.metricSecondary}</div>
                      )}
                      <div className="text-xs text-muted-foreground mt-3">— {c.attribution}</div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <div className="text-center mt-12">
              <Button variant="outline" asChild>
                <Link to="/trust">
                  How signing works <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default CaseStudiesPage;
