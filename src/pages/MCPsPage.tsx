import { Link } from "react-router-dom";
import { ArrowLeft, Package, Server, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Equipment from "@/components/Equipment";
import { Button } from "@/components/ui/button";
import {
  mcps,
  proStripeUrl,
  proPriceAmount,
  proPricePeriod,
  enterprisePriceAmount,
  enterprisePricePeriod,
} from "@/data/mcps";

const MCPsPage = () => {
  const { t } = useTranslation();

  // JSON-LD ItemList of all 32 MCPs — feeds search engines + AI crawlers a
  // structured catalogue without requiring JS execution.
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Haulage.app MCP Catalogue",
    description:
      "32 PyPI-published MCP (Model Context Protocol) servers covering trade-compliance regulators across 9 jurisdictions + 4 modes (road / air / sea / rail), each emitting HMAC-signed compliance attestations.",
    numberOfItems: mcps.length,
    itemListElement: mcps.map((m, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      item: {
        "@type": "SoftwareApplication",
        name: m.name,
        description: m.tagline,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Cross-platform (Python ≥ 3.10)",
        url: m.pypi,
        offers: m.starterStripe
          ? {
              "@type": "Offer",
              price: m.starterPrice.replace(/[^0-9.]/g, ""),
              priceCurrency: "GBP",
              url: m.starterStripe,
              availability: "https://schema.org/InStock",
            }
          : undefined,
        publisher: {
          "@type": "Organization",
          name: "MEOK AI Labs",
          url: "https://meok.ai",
        },
        license: "https://opensource.org/licenses/MIT",
        softwareRequirements: m.install,
      },
    })),
  };

  return (
    <>
      <SEO
        title={t("seo.mcps_title")}
        description={t("seo.mcps_description")}
        canonical="https://haulage.app/mcps"
        extraJsonLd={itemListJsonLd}
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
                {t("mcps_page.eyebrow")}
              </span>
              <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 mb-6">
                {t("mcps_page.title_count")}{" "}
                <span className="text-gradient">{t("mcps_page.title_middle")}</span>{" "}
                {t("mcps_page.title_suffix")}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t("mcps_page.description_part_1")}{" "}
                <a
                  href="https://meok-attestation-api.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  meok-attestation-api
                </a>{" "}
                {t("mcps_page.description_part_2")}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <div className="card-industrial p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <Server className="w-6 h-6 text-primary" aria-hidden="true" />
                  <h3 className="font-display text-xl font-bold">{t("mcps_page.starter_title")}</h3>
                </div>
                <div className="font-display text-4xl font-bold mb-2">
                  {t("mcps_page.starter_price")}
                  <span className="text-base text-muted-foreground">{t("mcps_page.starter_period")}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">{t("mcps_page.starter_summary")}</p>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6 flex-grow">
                  <li>› {t("mcps_page.starter_feature_1")}</li>
                  <li>› {t("mcps_page.starter_feature_2")}</li>
                  <li>› {t("mcps_page.starter_feature_3")}</li>
                </ul>
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <a href="#mcps">{t("mcps_page.starter_cta")}</a>
                </Button>
              </div>
              <div className="card-industrial p-6 border-primary flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <Package className="w-6 h-6 text-primary" aria-hidden="true" />
                  <h3 className="font-display text-xl font-bold">{t("mcps_page.pro_title")}</h3>
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                    {t("mcps_page.pro_badge")}
                  </span>
                </div>
                <div className="font-display text-4xl font-bold mb-2">
                  {proPriceAmount}
                  <span className="text-base text-muted-foreground">/{proPricePeriod}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">{t("mcps_page.pro_summary")}</p>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6 flex-grow">
                  <li>› {t("mcps_page.pro_feature_1")}</li>
                  <li>› {t("mcps_page.pro_feature_2")}</li>
                  <li>› {t("mcps_page.pro_feature_3")}</li>
                  <li>› {t("mcps_page.pro_feature_4")}</li>
                </ul>
                <Button variant="hero" size="lg" className="w-full" asChild>
                  <a href={proStripeUrl} target="_blank" rel="noopener noreferrer">
                    {t("mcps_page.pro_cta")}
                  </a>
                </Button>
              </div>
              <div className="card-industrial p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-primary" aria-hidden="true" />
                  <h3 className="font-display text-xl font-bold">{t("mcps_page.enterprise_title")}</h3>
                </div>
                <div className="font-display text-4xl font-bold mb-2">
                  {enterprisePriceAmount}
                  <span className="text-base text-muted-foreground">/{enterprisePricePeriod}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6">{t("mcps_page.enterprise_summary")}</p>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6 flex-grow">
                  <li>› {t("mcps_page.enterprise_feature_1")}</li>
                  <li>› {t("mcps_page.enterprise_feature_2")}</li>
                  <li>› {t("mcps_page.enterprise_feature_3")}</li>
                  <li>› {t("mcps_page.enterprise_feature_4")}</li>
                </ul>
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <a href="mailto:nicholas@meok.ai?subject=Enterprise%20MCP%20inquiry&body=Hi%20Nick%2C%0A%0AWe%27re%20interested%20in%20the%20Enterprise%20tier.%20Volume%2Frequirements%3A%0A%0A">
                    {t("mcps_page.enterprise_cta")}
                  </a>
                </Button>
              </div>
            </div>
          </div>
          <Equipment />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MCPsPage;
