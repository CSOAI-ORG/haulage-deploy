import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { LOCALES, RTL_LOCALES } from "@/i18n";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
  /** Optional additional JSON-LD payloads emitted alongside the default Organization schema. */
  extraJsonLd?: object | object[];
}

const BASE_URL = "https://haulage.app";

const SEO = ({
  title,
  description,
  canonical,
  ogImage = "/og-image.jpg",
  ogType = "website",
  noIndex = false,
  extraJsonLd,
}: SEOProps) => {
  const { i18n } = useTranslation();
  const siteName = "Haulage.app";
  const fullTitle = title.includes("Haulage") ? title : `${title} | ${siteName}`;
  const absoluteOgImage = ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`;

  // Compute path-without-domain so we can build per-locale alternate URLs.
  // canonical might be e.g. https://haulage.app/mcps; for alternates we strip
  // the host and prefix /<lang>.
  const canonicalPath = canonical
    ? canonical.replace(BASE_URL, "")
    : typeof window !== "undefined"
      ? window.location.pathname
      : "/";

  const currentLang = i18n.language || "en";
  const isRtl = (RTL_LOCALES as string[]).includes(currentLang);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Haulage.app — MEOK AI Labs",
    description:
      "Global trade compliance + AI governance platform — UK, EU, US, AU, CA, MENA + air + sea + rail. 32 MCP servers across 9 verticals + governance bridge.",
    url: canonical || BASE_URL,
    logo: `${BASE_URL}/og-image.jpg`,
    sameAs: [
      "https://meok.ai",
      "https://councilof.ai",
      "https://muckaway.ai",
      "https://planthire.ai",
      "https://grabhire.ai",
      "https://github.com/CSOAI-ORG",
    ],
    knowsLanguage: LOCALES.map(l => l.code),
  };

  // Site-wide SoftwareApplication — emitted on every page so the
  // SaaS metadata (price, rating-free, free trial) appears alongside
  // page-specific JSON-LD. Per research finding: SoftwareApplication
  // is one of the schemas LLMs surface most for SaaS discovery.
  const softwareApplicationLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "MEOK Haulage.app — 32 MCP trade-compliance catalogue",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "ComplianceManagement",
    operatingSystem: "Cross-platform (MCP-compatible: Claude, ChatGPT, VS Code Copilot, Goose, Postman)",
    url: BASE_URL,
    publisher: {
      "@type": "Organization",
      name: "MEOK AI Labs / CSOAI LTD",
      url: "https://meok.ai",
    },
    offers: [
      { "@type": "Offer", name: "Free", price: "0", priceCurrency: "GBP", category: "subscription" },
      { "@type": "Offer", name: "Pro", price: "19", priceCurrency: "GBP", category: "subscription" },
      { "@type": "Offer", name: "Team", price: "99", priceCurrency: "GBP", category: "subscription" },
    ],
    featureList: [
      "32 MCP servers across 9 trade-compliance verticals",
      "Signed-by-default attestation chain (HMAC-SHA256)",
      "Public verifier endpoint",
      "EU AI Act + UK AI Bill bridge",
      "DVSA Earned Recognition path",
      "OpenAPI 3.1 + Swagger UI",
      "14-language localisation incl. RTL",
      "PWA + offline-capable",
    ],
    softwareVersion: "1.x",
    isAccessibleForFree: true,
  };

  // Always-on FAQ JSON-LD — the most-cited buyer questions, kept terse so
  // they don't bloat the page. Specific FAQ pages (FAQPage / DefinedTermSet)
  // are supplied via extraJsonLd by individual routes.
  const siteFaqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Haulage.app?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A 32-MCP catalogue + ecosystem for global trade compliance (UK/EU/US/AU/CA/MENA + air + sea + rail). Every MCP signs its attestations with HMAC-SHA256 and bridges to EU AI Act + UK AI Bill governance.",
        },
      },
      {
        "@type": "Question",
        name: "Who is MEOK AI Labs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "CSOAI LTD (Companies House 16939677), trading as MEOK AI Labs. UK-based, MIT-licensed open-source publisher of 271+ MCP servers on PyPI.",
        },
      },
      {
        "@type": "Question",
        name: "Is there a free tier?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — Free plan covers personal + small fleet usage. Pro at £19/mo + Team at £99/mo for fleets needing audit-ready signed attestations + governance bridge.",
        },
      },
      {
        "@type": "Question",
        name: "How are attestations verified?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "POST the payload + signature to meok-attestation-api.vercel.app/verify. No SDK required. Public, free, deterministic.",
        },
      },
    ],
  };

  return (
    <Helmet htmlAttributes={{ lang: currentLang, dir: isRtl ? "rtl" : "ltr" }}>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="author" content={siteName} />
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* hreflang alternates — same URL for every locale; the SPA reads
          haulage_locale localStorage to set page language. Search engines
          following these alternates land on the same content but the page
          rerenders in the matching locale. */}
      {LOCALES.map(loc => (
        <link
          key={loc.code}
          rel="alternate"
          hrefLang={loc.code}
          href={`${BASE_URL}${canonicalPath}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}${canonicalPath}`} />

      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={currentLang} />
      {LOCALES.filter(l => l.code !== currentLang).map(loc => (
        <meta key={loc.code} property="og:locale:alternate" content={loc.code} />
      ))}
      {canonical && <meta property="og:url" content={canonical} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteOgImage} />

      <meta name="theme-color" content="#F97316" />
      <meta name="format-detection" content="telephone=yes" />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      <script type="application/ld+json">{JSON.stringify(softwareApplicationLd)}</script>
      <script type="application/ld+json">{JSON.stringify(siteFaqLd)}</script>
      {extraJsonLd &&
        (Array.isArray(extraJsonLd) ? extraJsonLd : [extraJsonLd]).map((node, idx) => (
          <script key={`extra-jsonld-${idx}`} type="application/ld+json">
            {JSON.stringify(node)}
          </script>
        ))}
    </Helmet>
  );
};

export default SEO;
