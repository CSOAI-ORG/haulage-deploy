/**
 * Partner / reseller program data — Move #33.
 *
 * Three partner archetypes — each gets a different commission split + go-to-market kit.
 */

export interface PartnerTier {
  slug: "auditor" | "consultant" | "agency" | "platform";
  label: string;
  ideal: string;
  commission: string;
  perks: string[];
  cta: string;
}

export const PARTNER_TIERS: PartnerTier[] = [
  {
    slug: "auditor",
    label: "Auditors + DPOs",
    ideal: "Independent fleet auditors, GDPR DPOs, compliance consultancies advising 5+ haulage clients.",
    commission: "25% lifetime rev-share",
    perks: [
      "Dedicated audit-prep MCP bundle (incl. governance bridge)",
      "Co-branded signed evidence reports",
      "Quarterly office hours with Nick",
      "Featured listing on /partners",
    ],
    cta: "mailto:nicholas@meok.ai?subject=MEOK%20Auditor%20Partner%20Program",
  },
  {
    slug: "consultant",
    label: "Transport consultants",
    ideal: "DVSA / FORS / O-licence consultants who hold the operator's hand through compliance crises.",
    commission: "20% lifetime rev-share",
    perks: [
      "White-label OCRS forecasts to ship to your clients",
      "FORS Gold dossier templates pre-loaded with your branding",
      "Reseller dashboard tracking client signups + MRR",
      "Co-marketing kit (case studies, decks, one-pagers)",
    ],
    cta: "mailto:nicholas@meok.ai?subject=MEOK%20Consultant%20Partner%20Program",
  },
  {
    slug: "agency",
    label: "Marketing + digital agencies",
    ideal: "Agencies building SaaS / Vercel sites for trade clients — refer them to install MEOK MCPs.",
    commission: "15% lifetime rev-share (one-time bonus on first paid month)",
    perks: [
      "Drop-in React widgets for MCP install flows",
      "Lead-tracking via ?ref=<partner-slug> query param",
      "Pre-written content for client newsletters / blogs",
      "Quarterly partner spotlight on /blog",
    ],
    cta: "mailto:nicholas@meok.ai?subject=MEOK%20Agency%20Partner%20Program",
  },
  {
    slug: "platform",
    label: "TMS + telematics platforms",
    ideal: "Mandata, Microlise, FleetCheck — operators already paying you who'd benefit from a compliance-attestation layer.",
    commission: "Revenue-share negotiated per integration",
    perks: [
      "Co-built native integration (we ship the MCP wrapper, you ship the UI)",
      "Shared go-to-market with Nick co-signing customer pitches",
      "Pre-launch access to new regulator-MCPs",
      "Joint case studies + analyst briefings",
    ],
    cta: "mailto:nicholas@meok.ai?subject=MEOK%20Platform%20Partnership",
  },
];

export function getPartner(slug: string): PartnerTier | undefined {
  return PARTNER_TIERS.find((p) => p.slug === slug);
}
