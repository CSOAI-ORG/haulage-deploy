/**
 * Competitor comparison data for /vs/<slug> SEO money pages.
 * Targets high-buyer-intent search queries like "Mandata alternative" or "Microlise vs MEOK".
 *
 * Tone rules:
 * - Be honest about where the competitor is strong (we earn credibility for the parts where we win).
 * - Frame MEOK's advantage as a category shift (compliance-as-code + signed attestations), not feature-by-feature.
 * - Never disparage. Compare facts, not vibes.
 */

export interface ComparisonRow {
  feature: string;
  competitor: string | boolean;
  meok: string | boolean;
  meokWins?: boolean;
}

export interface Competitor {
  slug: string;
  competitorName: string;
  competitorTagline: string;
  competitorUrl: string;
  /** Two-sentence positioning summary — what they do, who they sell to. */
  competitorSummary: string;
  /** Title we use on the page. */
  pageTitleSuffix: string;
  /** SEO meta description. */
  metaDescription: string;
  /** One-paragraph honest positioning of why a buyer would pick each. */
  whenToPickThem: string;
  whenToPickMeok: string;
  /** Comparison rows for the table. */
  comparison: ComparisonRow[];
}

export const competitors: Competitor[] = [
  {
    slug: "mandata",
    competitorName: "Mandata",
    competitorTagline: "UK transport management system",
    competitorUrl: "https://www.mandata.co.uk",
    competitorSummary:
      "Mandata is a long-established UK Transport Management System (TMS) — order entry, planning, electronic POD, integrated invoicing, telematics-style driver-app. Strong on operational workflow for haulage SMEs running 10–250 trucks.",
    pageTitleSuffix: "Mandata vs MEOK",
    metaDescription:
      "Mandata alternative — MEOK adds 32 PyPI-published MCP servers, HMAC-signed compliance attestations + EU AI Act + UK AI Bill bridge that Mandata's TMS doesn't ship. Honest side-by-side.",
    whenToPickThem:
      "If you need an end-to-end TMS — order to invoice, planning board, ePOD, driver app — Mandata is a category-leader for UK haulage SMEs. Pick them when your priority is operational throughput, not compliance attestation chains or AI governance.",
    whenToPickMeok:
      "Pick MEOK when your customers (or regulators) demand a signed audit chain — DVSA OCRS forecasting, FORS Bronze→Gold readiness, CLOCS evidence, EU AI Act conformity proof for any AI you use in routing or pricing. MEOK plugs alongside your TMS; we don't replace it.",
    comparison: [
      { feature: "UK transport management (TMS)", competitor: "Core product", meok: "Out of scope — pair with your TMS", meokWins: false },
      { feature: "Order → invoice workflow", competitor: "Yes", meok: "No (use Mandata)", meokWins: false },
      { feature: "ePOD + driver app", competitor: "Yes", meok: "No", meokWins: false },
      { feature: "DVSA OCRS forecasting (90-day band, weeks-to-RED)", competitor: false, meok: "meok-tacho-audit-mcp", meokWins: true },
      { feature: "Smart Tachograph 2 (Jul 2026) readiness", competitor: "Manual", meok: "Tool-callable", meokWins: true },
      { feature: "FORS Bronze→Silver→Gold prep evidence", competitor: false, meok: "meok-fors-clocs-mcp", meokWins: true },
      { feature: "BS 7121 lift-plan compliance (crane / hiab)", competitor: false, meok: "meok-bs7121-mcp", meokWins: true },
      { feature: "HMAC-SHA256 signed attestations", competitor: false, meok: "Every tool result", meokWins: true },
      { feature: "Public verifier API (auditor self-serve)", competitor: false, meok: "meok-attestation-api.vercel.app/verify", meokWins: true },
      { feature: "EU AI Act conformity bridge", competitor: false, meok: "meok-haulage-governance-bridge-mcp", meokWins: true },
      { feature: "UK AI Bill Article 22c (ADM) crosswalk", competitor: false, meok: "Tool-callable", meokWins: true },
      { feature: "NIST AI RMF / ISO 42001 crosswalk", competitor: false, meok: "Yes", meokWins: true },
      { feature: "Open source MCP servers (MIT)", competitor: false, meok: "All 32 on PyPI + GitHub", meokWins: true },
      { feature: "Pricing entry-point", competitor: "Enterprise (POA)", meok: "£29/mo Starter", meokWins: true },
      { feature: "Setup time", competitor: "Weeks — implementation", meok: "5 minutes — pip install", meokWins: true },
    ],
  },
  {
    slug: "microlise",
    competitorName: "Microlise",
    competitorTagline: "UK fleet telematics + performance management",
    competitorUrl: "https://www.microlise.com",
    competitorSummary:
      "Microlise is the dominant UK telematics + fleet-performance platform for large operators (Asda, Eddie Stobart, Royal Mail). Real-time tracking, driver behaviour scoring, planning, fuel and CO₂ telemetry. PLC, listed on AIM.",
    pageTitleSuffix: "Microlise vs MEOK",
    metaDescription:
      "Microlise alternative — Microlise is the telematics layer. MEOK is the compliance attestation layer. We crosswalk every signed attestation to EU AI Act + UK AI Bill. Use together, not against each other.",
    whenToPickThem:
      "Microlise is the right choice if you need a battle-tested enterprise-grade telematics + planning platform with hundreds of integrations and a dedicated UK-based implementation team. Tier-1 operators run on Microlise for a reason.",
    whenToPickMeok:
      "MEOK doesn't compete with telematics — we sit beside it. Pick MEOK when an auditor / regulator / Tier-1 customer asks for compliance evidence: signed OCRS forecasts, FORS dossiers, EU AI Act conformity, traceable AI-decision logs. The audit pack writes itself.",
    comparison: [
      { feature: "Real-time vehicle telematics", competitor: "Core product", meok: "Out of scope", meokWins: false },
      { feature: "Driver behaviour + harsh-braking scoring", competitor: "Yes", meok: "No (use Microlise)", meokWins: false },
      { feature: "Fuel + CO₂ telemetry", competitor: "Yes", meok: "No", meokWins: false },
      { feature: "Real-time tracking SLA", competitor: "Industry-leading", meok: "N/A", meokWins: false },
      { feature: "DVSA OCRS forecasting", competitor: "Aggregate score view", meok: "90-day forecast + weeks-to-RED", meokWins: true },
      { feature: "FORS / CLOCS evidence pack", competitor: false, meok: "Auto-generated", meokWins: true },
      { feature: "Signed HMAC-SHA256 attestations", competitor: false, meok: "Every tool result", meokWins: true },
      { feature: "Public verifier endpoint (no API key)", competitor: false, meok: "Yes", meokWins: true },
      { feature: "EU AI Act Annex III conformity", competitor: false, meok: "Tool-callable", meokWins: true },
      { feature: "UK AI Bill Art 22c (ADM) coverage", competitor: false, meok: "Yes", meokWins: true },
      { feature: "BS 7121 lift-plan + LOLER schedule", competitor: false, meok: "meok-bs7121-mcp", meokWins: true },
      { feature: "International scope", competitor: "UK + EU", meok: "UK + EU + US + AU + CA + UAE + air + sea + rail", meokWins: true },
      { feature: "Open source", competitor: false, meok: "All 32 MCPs on PyPI", meokWins: true },
      { feature: "Pricing entry", competitor: "Enterprise (POA)", meok: "£29/mo Starter", meokWins: true },
      { feature: "Setup time", competitor: "Months — hardware install", meok: "5 min — pip install", meokWins: true },
    ],
  },
  {
    slug: "fleetcheck",
    competitorName: "FleetCheck",
    competitorTagline: "UK fleet compliance management software",
    competitorUrl: "https://www.fleetcheck.co.uk",
    competitorSummary:
      "FleetCheck is a UK fleet compliance platform — driver licence checking (DVLA), tachograph analysis, walk-around-check app, MOT/service scheduling. Trusted by ~3,500 UK operators. Strong on the compliance admin workflow.",
    pageTitleSuffix: "FleetCheck vs MEOK",
    metaDescription:
      "FleetCheck alternative — FleetCheck stores compliance docs. MEOK signs every check with HMAC + auto-crosswalks to EU AI Act + UK AI Bill. Different category, side-by-side honest compare.",
    whenToPickThem:
      "FleetCheck wins on the admin-workflow side: DVLA licence-checking integration, intuitive walk-around-check mobile app for drivers, MOT/service scheduling, friendly UK support. Pick them when compliance admin needs to be operationally smooth.",
    whenToPickMeok:
      "Pick MEOK when you need cryptographic proof of compliance — when an auditor, regulator, or Tier-1 customer wants to verify the chain from drivers' hours forecast → OCRS band → FORS Gold dossier. Every tool result is signed; anyone can verify it on a public endpoint.",
    comparison: [
      { feature: "DVLA licence checking", competitor: "Yes (integrated)", meok: "Roadmap", meokWins: false },
      { feature: "Walk-around check mobile app", competitor: "Yes — drivers love it", meok: "No (pair with FleetCheck)", meokWins: false },
      { feature: "MOT/service scheduler", competitor: "Yes", meok: "No", meokWins: false },
      { feature: "Tachograph analysis (basic)", competitor: "Yes", meok: "Forecasting + OCRS prediction", meokWins: true },
      { feature: "DVSA OCRS 90-day forecast", competitor: false, meok: "meok-tacho-audit-mcp", meokWins: true },
      { feature: "Smart Tachograph 2 readiness (Jul 2026)", competitor: false, meok: "Tool-callable", meokWins: true },
      { feature: "BS 7121 lift-plan + LOLER", competitor: false, meok: "Yes", meokWins: true },
      { feature: "HMAC-SHA256 signed evidence", competitor: false, meok: "Every result", meokWins: true },
      { feature: "Public verifier endpoint", competitor: false, meok: "Yes", meokWins: true },
      { feature: "EU AI Act conformity bridge", competitor: false, meok: "Yes", meokWins: true },
      { feature: "Open source MCPs (MIT)", competitor: false, meok: "All 32", meokWins: true },
      { feature: "International scope", competitor: "UK only", meok: "9 jurisdictions + air + sea + rail", meokWins: true },
      { feature: "Pricing entry", competitor: "Per-vehicle subscription", meok: "£29/mo Starter (flat)", meokWins: true },
      { feature: "Setup time", competitor: "Days", meok: "5 minutes", meokWins: true },
    ],
  },
  {
    slug: "vanta",
    competitorName: "Vanta",
    competitorTagline: "US-led SOC 2 / ISO 27001 compliance automation",
    competitorUrl: "https://www.vanta.com",
    competitorSummary:
      "Vanta is the US-led leader in security compliance automation — SOC 2, ISO 27001, HIPAA, GDPR. Continuous control monitoring, evidence collection, auditor portal. Used by 8,000+ companies.",
    pageTitleSuffix: "Vanta vs MEOK",
    metaDescription:
      "Vanta alternative for transport / fleet / trade compliance. Vanta = SOC 2 / ISO 27001. MEOK = DVSA / FORS / EU AI Act / BS 7121 + signed attestations. Different domain — honest compare.",
    whenToPickThem:
      "Vanta is the clear pick if you need SOC 2 / ISO 27001 / HIPAA / GDPR for a SaaS or B2B-tech business. Continuous control monitoring, auditor portal, 200+ pre-built integrations — Vanta is the market standard. Don't replace it for security compliance.",
    whenToPickMeok:
      "Pick MEOK when your compliance load is trade / transport / road / air / sea / rail — DVSA, FORS, CLOCS, BS 7121, IATA DGR, MARPOL, EU AI Act. Vanta covers the IT-security side of your business; MEOK covers the physical-trade side. Run both.",
    comparison: [
      { feature: "SOC 2 / ISO 27001 / HIPAA", competitor: "Core product", meok: "Out of scope — use Vanta", meokWins: false },
      { feature: "GDPR control monitoring", competitor: "Yes", meok: "Partial (via governance bridge)", meokWins: false },
      { feature: "200+ pre-built tech integrations", competitor: "Yes", meok: "MCP protocol (any Claude-compatible client)", meokWins: false },
      { feature: "Auditor portal", competitor: "Yes", meok: "Public verifier endpoint", meokWins: false },
      { feature: "DVSA / FORS / CLOCS coverage", competitor: false, meok: "Native MCPs", meokWins: true },
      { feature: "Smart Tachograph 2 + OCRS forecast", competitor: false, meok: "meok-tacho-audit-mcp", meokWins: true },
      { feature: "BS 7121 lift-plan + LOLER", competitor: false, meok: "meok-bs7121-mcp", meokWins: true },
      { feature: "IATA DGR (air cargo)", competitor: false, meok: "meok-iata-dgr-air-cargo-mcp", meokWins: true },
      { feature: "MARPOL (marine)", competitor: false, meok: "meok-imo-marpol-marine-mcp", meokWins: true },
      { feature: "EU AI Act Annex I + III", competitor: "Maps to ISO 42001 only", meok: "Direct crosswalk", meokWins: true },
      { feature: "UK AI Bill Art 22c (ADM)", competitor: false, meok: "Tool-callable", meokWins: true },
      { feature: "Cold-chain pharma (GDP)", competitor: false, meok: "meok-cold-chain-pharma-mcp", meokWins: true },
      { feature: "Livestock welfare transport", competitor: false, meok: "meok-livestock-welfare-transport-mcp", meokWins: true },
      { feature: "Open source", competitor: false, meok: "All 32 MCPs MIT-licensed", meokWins: true },
      { feature: "Pricing entry", competitor: "$8K-$50K/yr typical", meok: "£29/mo Starter", meokWins: true },
    ],
  },
];

export const getCompetitor = (slug: string): Competitor | undefined =>
  competitors.find((c) => c.slug === slug);
