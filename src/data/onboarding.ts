/**
 * Self-serve onboarding wizard data — Move #32.
 *
 * Flow:
 *   1. Pick fleet size           → narrows pricing recommendation
 *   2. Pick verticals (1-N)      → selects MCP bundle
 *   3. Pick regulators of concern → fine-tunes which MCPs to surface first
 *   4. Optional: email          → triggers welcome + Stripe link tailored to step 1
 *
 * Replaces the "email nicholas@meok.ai → manual triage" funnel. Lets the site
 * handle the first 200 signups/week without Nick's inbox being the gating step.
 */

export interface OnboardingStep {
  id: "fleet_size" | "verticals" | "regulators" | "summary";
  title: string;
  subtitle: string;
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: "fleet_size",
    title: "How big is your operation?",
    subtitle: "Drives which tier we suggest first.",
  },
  {
    id: "verticals",
    title: "Which trade verticals do you operate?",
    subtitle: "Pick all that apply. We'll pre-select the matching MCPs.",
  },
  {
    id: "regulators",
    title: "Which regulators are biting?",
    subtitle: "We'll surface those MCPs at the top of your dashboard.",
  },
  {
    id: "summary",
    title: "Your starter bundle",
    subtitle: "Review + checkout. No commitment beyond the first month.",
  },
];

export type FleetSize = "1-5" | "6-25" | "26-100" | "101-500" | "500+";

export const FLEET_SIZES: { value: FleetSize; label: string; recommendedTier: string; stripeUrl: string }[] = [
  {
    value: "1-5",
    label: "1-5 vehicles (sole trader / micro fleet)",
    recommendedTier: "Starter £29/mo",
    stripeUrl: "https://buy.stripe.com/4gMbJ3fsM28a381fL28k844",
  },
  {
    value: "6-25",
    label: "6-25 vehicles (small fleet)",
    recommendedTier: "Pro £79/mo",
    stripeUrl: "https://buy.stripe.com/14A4gB3K4eUWgYR56o8k836",
  },
  {
    value: "26-100",
    label: "26-100 vehicles (mid-market)",
    recommendedTier: "Pro £79/mo",
    stripeUrl: "https://buy.stripe.com/14A4gB3K4eUWgYR56o8k836",
  },
  {
    value: "101-500",
    label: "101-500 vehicles (large operator)",
    recommendedTier: "Fleet £499/mo",
    stripeUrl: "mailto:nicholas@meok.ai?subject=Fleet%20tier%20interest%20(101-500%20vehicles)",
  },
  {
    value: "500+",
    label: "500+ vehicles (Tier-1 / national)",
    recommendedTier: "Enterprise (POA)",
    stripeUrl: "mailto:nicholas@meok.ai?subject=Enterprise%20interest%20(500%2B%20vehicles)",
  },
];

export interface VerticalOption {
  value: string;
  label: string;
  mcps: string[];
}

export const VERTICAL_OPTIONS: VerticalOption[] = [
  {
    value: "uk-road-haulage",
    label: "UK road haulage",
    mcps: ["haulage-uk-compliance-mcp", "meok-tacho-audit-mcp", "meok-dvsa-olicence-mcp", "meok-fors-clocs-mcp"],
  },
  {
    value: "crane-hiab",
    label: "Crane / hiab / lifting equipment",
    mcps: ["meok-bs7121-mcp", "meok-allmi-hiab-mcp", "meok-cpa-contract-lift-mcp"],
  },
  {
    value: "skip-waste",
    label: "Skip hire / waste / muckaway",
    mcps: ["skip-hire-ai-mcp", "nrswa-ai-mcp"],
  },
  {
    value: "ev-car-transport",
    label: "EV / car / battery transport",
    mcps: ["meok-ev-recall-transport-mcp", "meok-vehicle-handover-mcp"],
  },
  {
    value: "eu-cross-border",
    label: "EU cross-border + cabotage",
    mcps: ["meok-eu-mobility-package-mcp", "meok-iru-tir-international-mcp"],
  },
  {
    value: "air-cargo",
    label: "Air cargo / dangerous goods",
    mcps: ["meok-iata-dgr-air-cargo-mcp"],
  },
  {
    value: "marine",
    label: "Marine / shipping",
    mcps: ["meok-imo-marpol-marine-mcp"],
  },
  {
    value: "rail-freight",
    label: "Rail freight",
    mcps: ["meok-rail-freight-uk-mcp"],
  },
  {
    value: "cold-chain-pharma",
    label: "Cold-chain pharma / temperature-controlled",
    mcps: ["meok-cold-chain-pharma-mcp"],
  },
  {
    value: "livestock",
    label: "Livestock welfare in transit",
    mcps: ["meok-livestock-welfare-transport-mcp"],
  },
  {
    value: "us",
    label: "US / FMCSA HOS",
    mcps: ["meok-fmcsa-hours-of-service-mcp"],
  },
  {
    value: "australia",
    label: "Australia / NHVR CoR",
    mcps: ["meok-nhvr-australia-mcp"],
  },
  {
    value: "canada",
    label: "Canada / Transport Canada HOS",
    mcps: ["meok-transport-canada-hos-mcp"],
  },
  {
    value: "uae",
    label: "UAE / RTA",
    mcps: ["meok-uae-rta-transport-mcp"],
  },
];

export interface RegulatorOption {
  value: string;
  label: string;
  boostMcps: string[];
}

export const REGULATOR_OPTIONS: RegulatorOption[] = [
  { value: "dvsa-ocrs", label: "DVSA OCRS forecast", boostMcps: ["meok-tacho-audit-mcp"] },
  { value: "fors-bronze", label: "FORS Bronze / Silver / Gold prep", boostMcps: ["meok-fors-clocs-mcp"] },
  { value: "smart-tacho-2", label: "Smart Tachograph 2 (Jul 2026)", boostMcps: ["meok-tacho-audit-mcp", "meok-eu-mobility-package-mcp"] },
  { value: "bs-7121", label: "BS 7121 lift plans + LOLER", boostMcps: ["meok-bs7121-mcp"] },
  { value: "eu-ai-act", label: "EU AI Act Annex III conformity", boostMcps: ["meok-haulage-governance-bridge-mcp"] },
  { value: "uk-ai-bill-22c", label: "UK AI Bill Article 22c (ADM)", boostMcps: ["meok-haulage-governance-bridge-mcp"] },
  { value: "iso-42001", label: "ISO/IEC 42001 AI management", boostMcps: ["meok-haulage-governance-bridge-mcp"] },
  { value: "iata-dgr", label: "IATA DGR dangerous goods", boostMcps: ["meok-iata-dgr-air-cargo-mcp"] },
  { value: "marpol", label: "IMO MARPOL marine emissions", boostMcps: ["meok-imo-marpol-marine-mcp"] },
  { value: "gdp-pharma", label: "GDP cold-chain pharma", boostMcps: ["meok-cold-chain-pharma-mcp"] },
];

export interface OnboardingResult {
  fleetSize: FleetSize;
  verticals: string[];
  regulators: string[];
  recommendedMCPs: string[];
  recommendedTier: { label: string; stripeUrl: string };
}

export function computeRecommendation(
  fleetSize: FleetSize,
  verticals: string[],
  regulators: string[],
): OnboardingResult {
  const tier = FLEET_SIZES.find((f) => f.value === fleetSize) ?? FLEET_SIZES[1];
  const verticalMcps = verticals.flatMap(
    (v) => VERTICAL_OPTIONS.find((vo) => vo.value === v)?.mcps ?? [],
  );
  const regulatorBoosts = regulators.flatMap(
    (r) => REGULATOR_OPTIONS.find((ro) => ro.value === r)?.boostMcps ?? [],
  );
  // De-dup + prioritise regulator boosts at the top.
  const all = [...new Set([...regulatorBoosts, ...verticalMcps])];
  return {
    fleetSize,
    verticals,
    regulators,
    recommendedMCPs: all,
    recommendedTier: { label: tier.recommendedTier, stripeUrl: tier.stripeUrl },
  };
}
