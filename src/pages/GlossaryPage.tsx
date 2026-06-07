import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import glossary from "@/data/glossary.json";

interface Term {
  slug: string;
  term: string;
  full_name?: string;
  category: string;
  definition: string;
  see_also?: string[];
  regulator?: string;
  applies_to?: string;
  url?: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  "uk-road": "UK road haulage",
  "uk-rail": "UK rail freight",
  eu: "EU mobility + cabotage",
  us: "US FMCSA",
  intl: "Cross-border + air + sea",
  "ai-governance": "AI governance",
  lifting: "Lifting + crane",
  safety: "FORS / CLOCS / safety",
  data: "Data + GDPR + signing",
  specialist: "Specialist (pharma / livestock / drone)",
};

const GlossaryPage = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const terms = (glossary as { terms: Term[] }).terms;

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return terms.filter((tm) => {
      if (activeCategory !== "all" && tm.category !== activeCategory) return false;
      if (!q) return true;
      return (
        tm.term.toLowerCase().includes(q) ||
        tm.full_name?.toLowerCase().includes(q) ||
        tm.definition.toLowerCase().includes(q) ||
        tm.regulator?.toLowerCase().includes(q)
      );
    });
  }, [terms, query, activeCategory]);

  const byCategory = useMemo(() => {
    const buckets: Record<string, Term[]> = {};
    for (const tm of filtered) {
      (buckets[tm.category] = buckets[tm.category] || []).push(tm);
    }
    return buckets;
  }, [filtered]);

  // schema.org DefinedTermSet for AI Overview eligibility
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "MEOK Trade Compliance Glossary",
    description:
      "Definitions of UK fleet, EU AI Act, FORS, BS 7121, GDP cold-chain, and trade-compliance terms.",
    url: "https://haulage.app/glossary",
    hasDefinedTerm: terms.map((tm) => ({
      "@type": "DefinedTerm",
      "@id": `https://haulage.app/glossary#${tm.slug}`,
      name: tm.term,
      alternateName: tm.full_name,
      description: tm.definition,
      inDefinedTermSet: "https://haulage.app/glossary",
      url: tm.url || undefined,
    })),
  };

  return (
    <>
      <SEO
        title={t("glossary.seo_title", "Trade-compliance glossary — DVSA + EU AI Act + FORS + BS 7121")}
        description={t(
          "glossary.seo_description",
          "100+ definitions covering UK road haulage, EU AI Act, FORS Bronze→Gold, BS 7121, GDP cold-chain pharma, GDPR Art 22, NIST AI RMF, and more — plain English, 2-line max."
        )}
        canonical="https://haulage.app/glossary"
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

            <div className="max-w-3xl mb-10">
              <span className="text-primary font-display uppercase tracking-wider text-sm">
                {t("glossary.eyebrow", "Glossary")}
              </span>
              <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 mb-4">
                {t("glossary.title_prefix", "Every compliance term we touch,")}{" "}
                <span className="text-gradient">{t("glossary.title_highlight", "in plain English.")}</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t(
                  "glossary.intro",
                  "100+ definitions across UK road haulage, AI governance, FORS, BS 7121, GDP cold-chain, GDPR, NIST AI RMF. Two-line max each. Click through to the source regulator where one exists."
                )}
              </p>
            </div>

            {/* Search + category filter */}
            <div className="card-industrial p-4 mb-8">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    aria-label={t("glossary.search", "Search the glossary")}
                    placeholder={t("glossary.search", "Search the glossary")}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-secondary/40 border border-border rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <select
                  aria-label={t("glossary.filter_category", "Filter by category")}
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="bg-secondary/40 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">{t("glossary.all_categories", "All categories")}</option>
                  {Object.entries(CATEGORY_LABELS).map(([code, label]) => (
                    <option key={code} value={code}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {filtered.length} of {terms.length} terms
              </p>
            </div>

            {/* Terms grouped by category */}
            <div className="space-y-12 max-w-4xl">
              {Object.keys(CATEGORY_LABELS)
                .filter((code) => byCategory[code]?.length)
                .map((code) => (
                  <section key={code}>
                    <h2 className="font-display text-2xl font-bold mb-4 text-primary">
                      {CATEGORY_LABELS[code]}
                      <span className="text-muted-foreground text-sm font-normal ml-2">
                        ({byCategory[code].length})
                      </span>
                    </h2>
                    <dl className="space-y-4">
                      {byCategory[code].map((tm) => (
                        <div
                          key={tm.slug}
                          id={tm.slug}
                          className="card-industrial p-4 scroll-mt-32"
                        >
                          <dt className="font-display font-bold">
                            {tm.term}
                            {tm.full_name && tm.full_name !== tm.term && (
                              <span className="text-muted-foreground font-normal ml-2">
                                — {tm.full_name}
                              </span>
                            )}
                          </dt>
                          <dd className="text-sm text-foreground/80 mt-1 leading-relaxed">
                            {tm.definition}
                          </dd>
                          <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-muted-foreground">
                            {tm.regulator && <span>📘 {tm.regulator}</span>}
                            {tm.applies_to && <span>🎯 {tm.applies_to}</span>}
                            {tm.url && (
                              <a
                                href={tm.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-primary hover:underline"
                              >
                                Source <ExternalLink className="w-3 h-3" aria-hidden="true" />
                              </a>
                            )}
                          </div>
                          {tm.see_also && tm.see_also.length > 0 && (
                            <div className="mt-2 text-xs">
                              <span className="text-muted-foreground">See also: </span>
                              {tm.see_also.map((slug, i) => (
                                <span key={slug}>
                                  <a
                                    href={`#${slug}`}
                                    className="text-primary hover:underline"
                                  >
                                    {slug}
                                  </a>
                                  {i < (tm.see_also?.length ?? 0) - 1 && ", "}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </dl>
                  </section>
                ))}
            </div>
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-12">
                {t("glossary.no_results", "No matching terms. Try a broader query or different category.")}
              </p>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default GlossaryPage;
