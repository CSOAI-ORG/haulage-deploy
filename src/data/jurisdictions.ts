// MEOK Compliance Coverage Map — jurisdiction × MCP matrix.
// Used by /map and the homepage coverage strip.

export interface Jurisdiction {
  id: string;
  name: string;
  flag: string;
  region: "europe" | "north-america" | "oceania" | "mena" | "asia" | "global";
  countriesCovered: number;
  mcps: string[];
  highlight?: boolean;        // for the regional map
  centroid?: [number, number]; // [longitude, latitude] for future geographic plotting
}

export const jurisdictions: Jurisdiction[] = [
  {
    id: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    region: "europe",
    countriesCovered: 1,
    mcps: [
      "meok-tacho-audit-mcp",
      "meok-bs7121-mcp",
      "meok-vehicle-handover-mcp",
      "meok-ev-recall-transport-mcp",
      "meok-fors-clocs-mcp",
      "meok-allmi-hiab-mcp",
      "meok-dvsa-olicence-mcp",
      "meok-cpa-contract-lift-mcp",
      "meok-rail-freight-uk-mcp",
      "meok-livestock-welfare-transport-mcp",
      "meok-cold-chain-pharma-mcp",
      "meok-uk-phv-tfl-mcp",
    ],
    highlight: true,
    centroid: [-2, 54],
  },
  {
    id: "eu",
    name: "European Union",
    flag: "🇪🇺",
    region: "europe",
    countriesCovered: 27,
    mcps: ["meok-eu-mobility-package-mcp", "meok-livestock-welfare-transport-mcp", "meok-cold-chain-pharma-mcp"],
    highlight: true,
    centroid: [10, 50],
  },
  {
    id: "us",
    name: "United States",
    flag: "🇺🇸",
    region: "north-america",
    countriesCovered: 1,
    mcps: ["meok-fmcsa-hours-of-service-mcp"],
    highlight: true,
    centroid: [-98, 39],
  },
  {
    id: "ca",
    name: "Canada",
    flag: "🇨🇦",
    region: "north-america",
    countriesCovered: 1,
    mcps: ["meok-transport-canada-hos-mcp"],
    highlight: true,
    centroid: [-95, 60],
  },
  {
    id: "au",
    name: "Australia",
    flag: "🇦🇺",
    region: "oceania",
    countriesCovered: 1,
    mcps: ["meok-nhvr-australia-mcp"],
    highlight: true,
    centroid: [134, -25],
  },
  {
    id: "uae",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    region: "mena",
    countriesCovered: 1,
    mcps: ["meok-uae-rta-transport-mcp"],
    highlight: true,
    centroid: [54, 24],
  },
  {
    id: "tir",
    name: "TIR (78 countries)",
    flag: "🌍",
    region: "global",
    countriesCovered: 78,
    mcps: ["meok-iru-tir-international-mcp"],
    highlight: true,
    centroid: [25, 35],
  },
  {
    id: "air",
    name: "Air cargo (global)",
    flag: "✈",
    region: "global",
    countriesCovered: 193,
    mcps: ["meok-iata-dgr-air-cargo-mcp"],
    centroid: [0, 0],
  },
  {
    id: "sea",
    name: "Marine (global)",
    flag: "⚓",
    region: "global",
    countriesCovered: 175,
    mcps: ["meok-imo-marpol-marine-mcp"],
    centroid: [0, 0],
  },
  {
    id: "governance",
    name: "Governance Bridge (global)",
    flag: "🛡",
    region: "global",
    countriesCovered: 27, // EU AI Act + UK AI Bill + countries adopting NIST RMF + ISO 42001
    mcps: ["meok-haulage-governance-bridge-mcp"],
    centroid: [0, 0],
  },
];

export const totalJurisdictions = jurisdictions.length;
export const totalCountriesCovered = Array.from(
  new Set(jurisdictions.flatMap(j => Array(j.countriesCovered).fill(j.id)))
).length;

export const regulators: { code: string; full: string; jurisdiction: string }[] = [
  { code: "DVSA",   full: "Driver & Vehicle Standards Agency",            jurisdiction: "🇬🇧 UK" },
  { code: "ORR",    full: "Office of Rail and Road",                       jurisdiction: "🇬🇧 UK" },
  { code: "MHRA",   full: "Medicines & Healthcare products Regulatory Agency", jurisdiction: "🇬🇧 UK" },
  { code: "TfL",    full: "Transport for London",                          jurisdiction: "🇬🇧 UK" },
  { code: "APHA",   full: "Animal & Plant Health Agency",                  jurisdiction: "🇬🇧 UK" },
  { code: "FORS",   full: "Fleet Operator Recognition Scheme",             jurisdiction: "🇬🇧 UK" },
  { code: "CLOCS",  full: "Construction Logistics & Community Safety",     jurisdiction: "🇬🇧 UK" },
  { code: "ALLMI",  full: "Association of Lorry Loader Manufacturers",     jurisdiction: "🇬🇧 UK" },
  { code: "CPA",    full: "Construction Plant-hire Association",           jurisdiction: "🇬🇧 UK" },
  { code: "DG-MOVE", full: "EU Directorate-General for Mobility & Transport", jurisdiction: "🇪🇺 EU" },
  { code: "IMI",    full: "EU Internal Market Information System",         jurisdiction: "🇪🇺 EU" },
  { code: "FMCSA",  full: "Federal Motor Carrier Safety Administration",   jurisdiction: "🇺🇸 US" },
  { code: "NHVR",   full: "National Heavy Vehicle Regulator",              jurisdiction: "🇦🇺 AU" },
  { code: "NSC",    full: "Canadian National Safety Code",                 jurisdiction: "🇨🇦 CA" },
  { code: "RTA",    full: "UAE Roads & Transport Authority",               jurisdiction: "🇦🇪 UAE" },
  { code: "IRU",    full: "International Road Transport Union",            jurisdiction: "🌍 78 countries" },
  { code: "IATA",   full: "International Air Transport Association",       jurisdiction: "✈ 193 countries" },
  { code: "IMO",    full: "International Maritime Organization",           jurisdiction: "⚓ 175 countries" },
  { code: "ICAO",   full: "International Civil Aviation Organization",     jurisdiction: "✈ Global" },
];

export const governanceFrameworks: { code: string; full: string; jurisdiction: string }[] = [
  { code: "EU AI Act",        full: "Regulation (EU) 2024/1689",            jurisdiction: "🇪🇺 EU-27" },
  { code: "UK AI Bill Art 22c", full: "Automated Decision-Making transparency", jurisdiction: "🇬🇧 UK" },
  { code: "NIST AI RMF",      full: "NIST AI Risk Management Framework v1.0", jurisdiction: "🇺🇸 US (and global)" },
  { code: "ISO 42001",        full: "ISO/IEC 42001:2023 AI Management Systems", jurisdiction: "🌍 Global" },
  { code: "CoE AI Treaty",    full: "Council of Europe AI Treaty 2024",     jurisdiction: "🌍 46 countries" },
];
