import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MeokWorldMap from "@/components/MeokWorldMap";
import { regulators, governanceFrameworks } from "@/data/jurisdictions";

const MapPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <SEO
        title={t(
          "map_page.seo_title",
          "Compliance Coverage Map | Haulage.app | MEOK AI Labs"
        )}
        description={t(
          "map_page.seo_description",
          "32 MCP servers across UK + EU + US + AU + CA + UAE + air + sea + rail. Interactive map of every regulator, jurisdiction and AI governance framework covered."
        )}
        canonical="https://haulage.app/map"
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
                {t("map_page.eyebrow", "Coverage Map")}
              </span>
              <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 mb-6">
                {t("map_page.title_prefix", "Where MEOK")}{" "}
                <span className="text-gradient">
                  {t("map_page.title_highlight", "Covers Trade")}
                </span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t(
                  "map_page.intro",
                  "MEOK MCPs sit above every major trade-compliance regulator across 9 jurisdictions and 4 modes (road, air, sea, rail). The governance bridge MCP then cross-walks every signed compliance attestation to the EU AI Act, UK AI Bill, NIST AI RMF, and ISO/IEC 42001."
                )}
              </p>
            </div>
          </div>
          <MeokWorldMap />

          <div className="container mx-auto px-6 mt-16">
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div>
                <h2 className="font-display text-2xl font-bold mb-4">
                  {t("map_page.regulators_heading", "Regulators covered")}
                </h2>
                <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                  {regulators.map(r => (
                    <div
                      key={r.code}
                      className="card-industrial p-3 flex items-start justify-between gap-3"
                    >
                      <div>
                        <code className="text-sm font-bold text-primary">{r.code}</code>
                        <p className="text-xs text-muted-foreground mt-1">{r.full}</p>
                      </div>
                      <span className="text-xs whitespace-nowrap text-muted-foreground">
                        {r.jurisdiction}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold mb-4">
                  {t("map_page.frameworks_heading", "AI Governance frameworks")}
                </h2>
                <div className="space-y-2">
                  {governanceFrameworks.map(g => (
                    <div
                      key={g.code}
                      className="card-industrial p-3 flex items-start justify-between gap-3"
                    >
                      <div>
                        <code className="text-sm font-bold text-primary">{g.code}</code>
                        <p className="text-xs text-muted-foreground mt-1">{g.full}</p>
                      </div>
                      <span className="text-xs whitespace-nowrap text-muted-foreground">
                        {g.jurisdiction}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="card-industrial p-5 mt-6">
                  <h3 className="font-display text-lg font-bold mb-2">
                    {t("map_page.bridge_heading", "The bridge")}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(
                      "map_page.bridge_body_prefix",
                      "Every signed compliance attestation from the 21 trade MCPs is crosswalked to the governance frameworks above via the"
                    )}{" "}
                    <Link to="/governance" className="text-primary hover:underline">
                      meok-haulage-governance-bridge-mcp
                    </Link>
                    .{" "}
                    {t(
                      "map_page.bridge_body_suffix",
                      "One install, one audit chain, both sides."
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MapPage;
