/**
 * Persona-aware copy variants — Move #22.
 *
 * The homepage hero defaults to a developer-friendly tagline. Switching personas
 * via `?p=tm|co|cfo|aud` rewrites the eyebrow + headline + sub + primary CTA
 * to speak directly to that buyer.
 *
 * - tm  = Transport Manager (UK fleet ops)
 * - co  = Compliance Officer
 * - cfo = Chief Financial Officer
 * - aud = External Auditor / DPO
 *
 * Validates against URLSearchParams + falls back gracefully on unknown values.
 */

export type PersonaCode = "default" | "tm" | "co" | "cfo" | "aud" | "dev";

export interface Persona {
  code: PersonaCode;
  label: string;
  eyebrow: string;
  headlinePrefix: string;
  headlineHighlight: string;
  headlineSuffix: string;
  sub: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
}

export const PERSONAS: Record<PersonaCode, Persona> = {
  default: {
    code: "default",
    label: "Default",
    eyebrow: "The compliance attestation layer",
    headlinePrefix: "Sign every check.",
    headlineHighlight: "Verify any check.",
    headlineSuffix: "",
    sub: "32 PyPI-published MCP servers covering UK + EU + US + AU + Canada + air + sea + rail. Every signed compliance attestation auto-bridges to EU AI Act + UK AI Bill + NIST AI RMF + ISO/IEC 42001.",
    ctaLabel: "See pricing",
    ctaHref: "/pricing",
    secondaryCtaLabel: "5-min quickstart",
    secondaryCtaHref: "/docs/quickstart",
  },
  tm: {
    code: "tm",
    label: "Transport Manager",
    eyebrow: "Fleet operations + DVSA",
    headlinePrefix: "Stop OCRS firefights.",
    headlineHighlight: "Forecast 90 days out.",
    headlineSuffix: "",
    sub: "DVSA OCRS forecast 90 days out + weeks-to-RED estimate per fleet. Smart Tachograph 2 readiness check (deadline July 2026). FORS Bronze→Silver→Gold dossier auto-generated. BS 7121 lift plans + CPA Contract-Lift triage built in.",
    ctaLabel: "Start free DVSA scan",
    ctaHref: "https://haulage.app/docs/quickstart",
    secondaryCtaLabel: "Compare to Mandata / Microlise",
    secondaryCtaHref: "/vs/mandata",
  },
  co: {
    code: "co",
    label: "Compliance Officer",
    eyebrow: "EU AI Act + UK AI Bill",
    headlinePrefix: "Annex III readiness",
    headlineHighlight: "without the lawyer bill.",
    headlineSuffix: "",
    sub: "Every signed compliance attestation auto-crosswalks to EU AI Act Annex III, UK AI Bill Article 22c, NIST AI RMF, and ISO/IEC 42001 via meok-haulage-governance-bridge-mcp. One install, four-framework coverage. Audit pack writes itself.",
    ctaLabel: "See governance bridge",
    ctaHref: "/governance",
    secondaryCtaLabel: "Read about signing",
    secondaryCtaHref: "/trust",
  },
  cfo: {
    code: "cfo",
    label: "CFO",
    eyebrow: "Compliance cost compression",
    headlinePrefix: "Audit prep:",
    headlineHighlight: "weeks → hours.",
    headlineSuffix: "",
    sub: "Fixed cost: £79/mo Pro tier. Replaces ~£15K/year of consultancy hours per regulator scope. Stripe-only billing — no card data ever touches MEOK infra. Audit-grade signed evidence chain holds in front of regulators. SOC 2 Type 1 in progress.",
    ctaLabel: "See pricing",
    ctaHref: "/pricing",
    secondaryCtaLabel: "Read trust + security",
    secondaryCtaHref: "/trust",
  },
  aud: {
    code: "aud",
    label: "Auditor / DPO",
    eyebrow: "Verify without installing",
    headlinePrefix: "Hold the chain.",
    headlineHighlight: "Verify on demand.",
    headlineSuffix: "",
    sub: "Public verifier API at meok-attestation-api.vercel.app/verify — rate-limited, zero auth, no SDK install. POST any signed cert payload + signature → get { valid: true|false }. Open-source MCPs on PyPI; OpenAPI 3.1 spec at /openapi.json; reproducible HMAC chain.",
    ctaLabel: "Try the verifier",
    ctaHref: "https://meok-attestation-api.vercel.app/docs",
    secondaryCtaLabel: "How signing works",
    secondaryCtaHref: "/trust",
  },
  dev: {
    code: "dev",
    label: "Developer",
    eyebrow: "SDKs + CLI + agent skills",
    headlinePrefix: "pip install,",
    headlineHighlight: "go build,",
    headlineSuffix: "npm install.",
    sub: "Native SDKs for Python (meok-sdk), TypeScript (@meok/sdk), Go (meok-go). CLI: `pip install meok-cli`. OpenAPI 3.1 spec + Swagger UI. VS Code extension with regulator-article hover hints. Anthropic Skill + ChatGPT GPT + Microsoft Copilot connectors.",
    ctaLabel: "5-min quickstart",
    ctaHref: "/docs/quickstart",
    secondaryCtaLabel: "OpenAPI spec",
    secondaryCtaHref: "https://meok-attestation-api.vercel.app/openapi.json",
  },
};

export function getPersona(code: string | null | undefined): Persona {
  if (!code) return PERSONAS.default;
  return PERSONAS[code as PersonaCode] ?? PERSONAS.default;
}

/** Read ?p=… from the current URL (browser only). */
export function readPersonaFromURL(): PersonaCode {
  if (typeof window === "undefined") return "default";
  const p = new URLSearchParams(window.location.search).get("p");
  return (p as PersonaCode) in PERSONAS ? (p as PersonaCode) : "default";
}
