import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, X, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getCompetitor } from "@/data/competitors";

/**
 * Renders honest side-by-side comparisons for high-buyer-intent search.
 * Route: /vs/:slug → maps to one entry in src/data/competitors.ts.
 */
const ComparisonPage = () => {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const c = slug ? getCompetitor(slug) : undefined;
  if (!c) return <Navigate to="/" replace />;

  const renderCell = (value: string | boolean, winning: boolean) => {
    if (value === true) return <Check className={`w-5 h-5 inline ${winning ? "text-primary" : "text-muted-foreground"}`} aria-label="Yes" />;
    if (value === false) return <X className="w-5 h-5 inline text-muted-foreground/60" aria-label="No" />;
    return <span className={winning ? "text-primary font-medium" : "text-muted-foreground"}>{value}</span>;
  };

  // SoftwareApplication JSON-LD for both products in this comparison.
  const comparisonJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${c.competitorName} vs MEOK`,
    description: c.metaDescription,
    url: `https://haulage.app/vs/${c.slug}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "SoftwareApplication",
            name: c.competitorName,
            description: c.competitorSummary,
            url: c.competitorUrl,
            applicationCategory: "BusinessApplication",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "SoftwareApplication",
            name: "MEOK Haulage Trade-Compliance MCPs",
            description: "32 MCP servers shipping HMAC-signed compliance attestations across UK + EU + US + AU + Canada + air + sea + rail. Auto-bridges every check to EU AI Act + UK AI Bill.",
            url: "https://haulage.app/mcps",
            applicationCategory: "BusinessApplication",
            offers: { "@type": "Offer", price: "29", priceCurrency: "GBP" },
          },
        },
      ],
    },
  };

  return (
    <>
      <SEO
        title={`${c.pageTitleSuffix} — Honest Side-by-Side Comparison`}
        description={c.metaDescription}
        canonical={`https://haulage.app/vs/${c.slug}`}
        extraJsonLd={comparisonJsonLd}
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

            <div className="max-w-4xl mb-12">
              <span className="text-primary font-display uppercase tracking-wider text-sm">
                Honest comparison
              </span>
              <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 mb-6">
                {c.competitorName} <span className="text-muted-foreground">vs</span>{" "}
                <span className="text-gradient">MEOK</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                {c.competitorSummary}
              </p>
              <p className="text-foreground/80 text-sm">
                <strong className="text-foreground">TL;DR:</strong> {c.competitorName} and MEOK solve different problems — they're complementary, not competitive. Use both for the strongest compliance position.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-5xl">
              <div className="card-industrial p-6">
                <h2 className="font-display text-xl font-bold mb-3">
                  When to pick {c.competitorName}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.whenToPickThem}</p>
                <a
                  href={c.competitorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline mt-4 text-sm"
                >
                  Visit {c.competitorName} <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              </div>
              <div className="card-industrial p-6 border-primary">
                <h2 className="font-display text-xl font-bold mb-3">
                  When to pick MEOK
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.whenToPickMeok}</p>
                <Link
                  to="/trust"
                  className="inline-flex items-center gap-1 text-primary hover:underline mt-4 text-sm"
                >
                  See how MEOK signs every result <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="card-industrial p-6 mb-12 max-w-5xl overflow-x-auto">
              <h2 className="font-display text-2xl font-bold mb-4">
                Feature comparison
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Where MEOK wins, we mark it in primary colour. Where {c.competitorName} wins, we mark it
                in muted — credit where credit's due.
              </p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-4 font-display font-bold">Feature</th>
                    <th className="text-left py-3 pr-4 font-display font-bold">{c.competitorName}</th>
                    <th className="text-left py-3 font-display font-bold">MEOK</th>
                  </tr>
                </thead>
                <tbody>
                  {c.comparison.map((row, idx) => (
                    <tr key={idx} className="border-b border-border/50 last:border-0">
                      <td className="py-3 pr-4 text-foreground">{row.feature}</td>
                      <td className="py-3 pr-4">{renderCell(row.competitor, !row.meokWins)}</td>
                      <td className="py-3">{renderCell(row.meok, !!row.meokWins)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="card-industrial p-8 max-w-4xl mx-auto text-center bg-gradient-to-br from-primary/5 to-transparent">
              <h2 className="font-display text-3xl font-bold mb-4">
                Try MEOK in 5 minutes — keep {c.competitorName}
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                MEOK MCPs install via <code className="text-primary">pip</code> and plug into Claude
                Desktop. No replacement, no data migration. Start with one signed compliance check;
                see the audit chain holding.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/docs/quickstart">
                    5-min quickstart <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/pricing">See pricing</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="mailto:nicholas@meok.ai?subject=MEOK%20vs%20${c.competitorName}%20question">
                    Ask Nick
                  </a>
                </Button>
              </div>
            </div>

            <div className="text-center mt-12 text-sm text-muted-foreground">
              <p>
                Comparing other platforms:{" "}
                {["mandata", "microlise", "fleetcheck", "vanta"]
                  .filter((s) => s !== c.slug)
                  .map((s, i, arr) => (
                    <span key={s}>
                      <Link to={`/vs/${s}`} className="text-primary hover:underline capitalize">
                        {s}
                      </Link>
                      {i < arr.length - 1 && " · "}
                    </span>
                  ))}
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ComparisonPage;
