import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import controlsData from "@/data/controls-library.json";

interface Framework {
  slug: string;
  name: string;
  regulator: string;
  url: string;
}
interface FrameworkSatisfied {
  framework: string;
  clause: string;
  rationale: string;
}
interface Control {
  id: string;
  title: string;
  category: string;
  description: string;
  uk_regulation: string;
  frameworks_satisfied: FrameworkSatisfied[];
  evidence_pattern: string;
  meok_mcp: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  "uk-road-compliance": "UK road haulage",
  "fors-clocs-er": "FORS / CLOCS / Earned Recognition",
  "lifting-bs7121": "Lifting + BS 7121",
  "ai-governance": "AI governance",
  "data-protection": "Data protection",
  specialist: "Specialist",
};

const ControlsPage = () => {
  const { t } = useTranslation();
  const data = controlsData as { frameworks: Framework[]; controls: Control[] };
  const [activeFramework, setActiveFramework] = useState<string>("all");

  const filtered = useMemo(() => {
    if (activeFramework === "all") return data.controls;
    return data.controls.filter((c) =>
      c.frameworks_satisfied.some((f) => f.framework === activeFramework),
    );
  }, [data.controls, activeFramework]);

  const byCategory = useMemo(() => {
    const buckets: Record<string, Control[]> = {};
    for (const c of filtered) {
      (buckets[c.category] = buckets[c.category] || []).push(c);
    }
    return buckets;
  }, [filtered]);

  // Per-framework coverage stats
  const frameworkCoverage = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of data.controls) {
      for (const f of c.frameworks_satisfied) {
        counts[f.framework] = (counts[f.framework] || 0) + 1;
      }
    }
    return counts;
  }, [data.controls]);

  const fwBySlug = useMemo(
    () => Object.fromEntries(data.frameworks.map((f) => [f.slug, f])),
    [data.frameworks],
  );

  return (
    <>
      <SEO
        title={t(
          "controls.seo_title",
          "Cross-framework controls library — UK fleet → EU AI Act + ISO 42001 + NIST AI RMF + SOC 2",
        )}
        description={t(
          "controls.seo_description",
          "25 trade-compliance controls mapped across 6 frameworks. UK Operator Licence, BS 7121, FORS, GDP cold-chain → EU AI Act, ISO 42001, NIST AI RMF, SOC 2, GDPR. Evidence reused across frameworks via signed attestations.",
        )}
        canonical="https://haulage.app/controls"
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
                {t("controls.eyebrow", "Controls library")}
              </span>
              <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 mb-4">
                {t("controls.title_prefix", "One control,")}{" "}
                <span className="text-gradient">
                  {t("controls.title_highlight", "many frameworks.")}
                </span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t(
                  "controls.intro",
                  "Every MEOK trade-compliance control maps to multiple regulatory + AI governance frameworks. Sign the evidence once via the matching MCP, satisfy ISO 42001 + EU AI Act + NIST AI RMF + SOC 2 + GDPR simultaneously. No duplicated work.",
                )}
              </p>
            </div>

            {/* Framework filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                type="button"
                onClick={() => setActiveFramework("all")}
                className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                  activeFramework === "all"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary text-foreground"
                }`}
              >
                All ({data.controls.length})
              </button>
              {data.frameworks.map((f) => (
                <button
                  key={f.slug}
                  type="button"
                  onClick={() => setActiveFramework(f.slug)}
                  className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                    activeFramework === f.slug
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary text-foreground"
                  }`}
                >
                  {f.name} ({frameworkCoverage[f.slug] ?? 0})
                </button>
              ))}
            </div>

            {/* Controls grouped by category */}
            <div className="space-y-12 max-w-5xl">
              {Object.keys(CATEGORY_LABELS)
                .filter((cat) => byCategory[cat]?.length)
                .map((cat) => (
                  <section key={cat}>
                    <h2 className="font-display text-2xl font-bold mb-4 text-primary">
                      {CATEGORY_LABELS[cat]}{" "}
                      <span className="text-muted-foreground text-sm font-normal">
                        ({byCategory[cat].length})
                      </span>
                    </h2>
                    <div className="space-y-4">
                      {byCategory[cat].map((c) => (
                        <article key={c.id} className="card-industrial p-6">
                          <header className="flex items-start gap-3 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <ShieldCheck className="w-5 h-5 text-primary" aria-hidden="true" />
                            </div>
                            <div>
                              <h3 className="font-display font-bold text-lg">{c.title}</h3>
                              <code className="text-xs text-muted-foreground">{c.id}</code>
                            </div>
                          </header>
                          <p className="text-sm text-foreground/90 mb-3">{c.description}</p>
                          <div className="grid sm:grid-cols-2 gap-3 mb-3 text-xs">
                            <div>
                              <div className="text-muted-foreground uppercase tracking-wider text-[10px] mb-1">
                                UK regulation
                              </div>
                              <div className="text-foreground">{c.uk_regulation}</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground uppercase tracking-wider text-[10px] mb-1">
                                MEOK MCP
                              </div>
                              <code className="text-primary">{c.meok_mcp}</code>
                            </div>
                          </div>
                          <details className="mt-3">
                            <summary className="cursor-pointer text-sm text-primary hover:underline">
                              {c.frameworks_satisfied.length} frameworks satisfied — view mapping
                            </summary>
                            <ul className="mt-3 space-y-2 text-xs">
                              {c.frameworks_satisfied.map((fs) => {
                                const fw = fwBySlug[fs.framework];
                                return (
                                  <li key={fs.framework} className="pl-3 border-l-2 border-primary/30">
                                    <div className="font-display font-bold">
                                      {fw?.name ?? fs.framework}{" "}
                                      <span className="text-muted-foreground font-normal">
                                        — {fs.clause}
                                      </span>
                                    </div>
                                    <div className="text-muted-foreground mt-0.5">{fs.rationale}</div>
                                  </li>
                                );
                              })}
                            </ul>
                          </details>
                          <div className="mt-3 pt-3 border-t border-border text-xs">
                            <span className="text-muted-foreground">Evidence pattern: </span>
                            <span className="text-foreground/80">{c.evidence_pattern}</span>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
                ))}
            </div>

            <div className="mt-12 max-w-3xl mx-auto text-center text-sm text-muted-foreground">
              <p>
                Every control is implemented by one or more MEOK MCPs from the{" "}
                <Link to="/mcps" className="text-primary hover:underline">
                  32-MCP catalogue
                </Link>
                . Auditors verify the chain via the{" "}
                <a
                  href="https://meok-attestation-api.vercel.app/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  public verifier endpoint <ExternalLink className="w-3 h-3 inline" aria-hidden="true" />
                </a>
                .
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ControlsPage;
