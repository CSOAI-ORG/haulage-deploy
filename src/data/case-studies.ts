/**
 * Customer case studies + logo wall data — Move #31.
 *
 * STARTING POSITION: zero real testimonials yet. Each entry below is marked
 * `placeholder: true` until a real customer signs off.
 *
 * When a real customer agrees:
 *   1. Replace `companyName`, `logoUrl`, `quote`, `attribution`, `metric*` fields
 *   2. Flip `placeholder` to false
 *   3. Set `caseStudyMarkdown` to the slug of the long-form story at /case-studies/<slug>
 *
 * Never publish a placeholder testimonial without flipping `placeholder=false` —
 * the LogoWall component filters them out by default.
 */

export interface CaseStudy {
  slug: string;
  companyName: string;
  logoUrl: string; // square or wide PNG / SVG
  industry: string;
  region: string;
  fleetSize: string;
  quote: string;
  attribution: string;
  /** Headline outcome — e.g. "OCRS forecast unlocked 4-month notice on AMBER". */
  metricHeadline: string;
  /** Secondary outcome — e.g. "Saved 3 weeks of FORS Bronze prep". */
  metricSecondary?: string;
  /** Set true if not yet a real customer. */
  placeholder: boolean;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "acme-haulage",
    companyName: "ACME Haulage Ltd (placeholder)",
    logoUrl: "https://haulage.app/og-image.jpg",
    industry: "UK road haulage",
    region: "London + South East",
    fleetSize: "47 trucks",
    quote:
      "OCRS forecast crossed AMBER 87 days before our internal review would have caught it. Saved a Public Inquiry by acting on the signed prediction.",
    attribution: "Transport Manager (waiting on logo + name approval)",
    metricHeadline: "87-day early warning on OCRS AMBER",
    metricSecondary: "DVSA audit pack — 2 hours vs 2 weeks",
    placeholder: true,
  },
  {
    slug: "northern-crane-hire",
    companyName: "Northern Crane Hire (placeholder)",
    logoUrl: "https://haulage.app/og-image.jpg",
    industry: "Crane + hiab hire",
    region: "Manchester + North West",
    fleetSize: "12 cranes / 30 lifts/week",
    quote:
      "BS 7121 lift plans used to take 90 minutes each. With meok-bs7121-mcp signing them, my appointed person reviews + signs off in 12 minutes.",
    attribution: "Crane operations director (waiting on approval)",
    metricHeadline: "Lift plan turnaround: 90 min → 12 min",
    metricSecondary: "CPA Contract-Lift triage prevents misclassified hires",
    placeholder: true,
  },
  {
    slug: "uk-skip-collective",
    companyName: "UK Skip Collective (placeholder)",
    logoUrl: "https://haulage.app/og-image.jpg",
    industry: "Skip + waste",
    region: "Nationwide",
    fleetSize: "120 trucks across 8 yards",
    quote:
      "Waste-carrier reg renewals + EWC code audits + duty-of-care chain all on one signed evidence trail. The auditor verified the chain from his laptop without installing anything.",
    attribution: "Compliance officer (waiting on approval)",
    metricHeadline: "Auditor verification: zero install required",
    metricSecondary: "EWC code mis-classification dropped to 0",
    placeholder: true,
  },
];

/** Returns only published (non-placeholder) case studies. Use this in production. */
export const getPublishedCaseStudies = (): CaseStudy[] =>
  CASE_STUDIES.filter((c) => !c.placeholder);

/** Returns all (incl. placeholders) — only for the /case-studies admin preview. */
export const getAllCaseStudies = (): CaseStudy[] => CASE_STUDIES;
