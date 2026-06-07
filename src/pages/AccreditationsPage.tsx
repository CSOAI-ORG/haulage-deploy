import { Link } from "react-router-dom";
import { ArrowLeft, BadgeCheck, Clock, AlertCircle, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

type AccreditationStatus = "live" | "in-progress" | "planned";

interface Accreditation {
  name: string;
  status: AccreditationStatus;
  issuer: string;
  scope: string;
  evidence?: string;
  expected?: string;
  url?: string;
  notes?: string;
}

const ACCREDITATIONS: Accreditation[] = [
  {
    name: "MIT licence on all 32 MCPs",
    status: "live",
    issuer: "Open Source Initiative",
    scope: "Every MEOK MCP + the attestation API + SDKs (Python, TypeScript, Go) + CLI + VS Code extension",
    evidence: "github.com/CSOAI-ORG repos (LICENSE in each)",
    url: "https://github.com/CSOAI-ORG",
  },
  {
    name: "Companies House registration",
    status: "live",
    issuer: "Companies House (England + Wales)",
    scope: "CSOAI LTD, trading as MEOK AI Labs — registration 16939677",
    evidence: "find-and-update.company-information.service.gov.uk",
    url: "https://find-and-update.company-information.service.gov.uk/company/16939677",
  },
  {
    name: "HMAC-SHA256 signed attestation chain",
    status: "live",
    issuer: "MEOK self-attestation + publicly verifiable",
    scope: "Every signed tool result + audit ledger chain verifiable at /verify",
    evidence: "meok-attestation-api.vercel.app/docs (Swagger) + /api/audit (chain query)",
    url: "https://meok-attestation-api.vercel.app/docs",
  },
  {
    name: "DVSA Earned Recognition — vehicle maintenance + drivers' hours IT vendor",
    status: "in-progress",
    issuer: "DVSA (Driver and Vehicle Standards Agency)",
    scope: "Listed on .gov.uk as approved software for ER operator KPI feed",
    expected: "Q3 2026 — application path + SLA TBD via direct DVSA contact",
    url: "https://www.gov.uk/government/publications/dvsa-earned-recognition-it-or-software-you-need/vehicle-operator-it-systems-and-software-that-work-with-dvsa-earned-recognition",
    notes: "Lives on .gov.uk alongside Truckfile, FleetCheck, Convey, Distinctive Systems, CheckedSafe, Chevin, Vehocheck, Prolius. Non-negotiable UK trust signal.",
  },
  {
    name: "SOC 2 Type 1 (Vanta + AssuranceLab path)",
    status: "in-progress",
    issuer: "AssuranceLab (audit) + Vanta (continuous-control platform)",
    scope: "Information security + availability + confidentiality controls for the attestation API + MCP catalogue",
    expected: "90-day plan — Q3 2026 letter targeted",
    url: "https://www.vanta.com",
    notes: "Full plan at ~/clawd/SOC2_TYPE1_PLAN.md — £8k Y1 envelope",
  },
  {
    name: "ISO/IEC 42001:2023 AI management system",
    status: "planned",
    issuer: "Accredited ISO certifier (TBD)",
    scope: "AI management system covering the 32-MCP catalogue + governance bridge",
    expected: "Q4 2026 — ~50% overlap with SOC 2 controls, adds ~£3k + 30 days",
    notes: "Strong fit since MEOK ships AI governance compliance tooling",
  },
  {
    name: "WCAG 2.2 Level AAA (external audit)",
    status: "in-progress",
    issuer: "Hassell Inclusion (UK)",
    scope: "haulage.app + meok-attestation-api.vercel.app/docs + meok-compliance.vercel.app",
    expected: "Q3 2026 — opens UK + EU public-sector procurement",
    notes: "Plan at ~/clawd/haulage-deploy/WCAG_AAA_AUDIT_PLAN.md — ~£5k total",
  },
  {
    name: "EU AI Act conformity self-assessment (Annex III)",
    status: "planned",
    issuer: "MEOK self-attestation per Art 47 + notified-body where required",
    scope: "Internal AI systems used in MEOK product (e.g. routing/scoring/classification helpers)",
    expected: "Before Dec 2027 Annex III deadline (Digital Omnibus delay)",
    notes: "Most MEOK MCPs are tools (not AI systems themselves) — narrow conformity scope",
  },
  {
    name: "FORS Bronze / Silver / Gold (own operations)",
    status: "planned",
    issuer: "FORS (Fleet Operator Recognition Scheme)",
    scope: "MEOK's own demonstrator fleet (when one exists) — not for customers",
    expected: "Post-customer-fleet acquisition",
    notes: "Means we eat our own dogfood. Currently not applicable (no vehicles).",
  },
  {
    name: "ICO data-protection registration",
    status: "live",
    issuer: "Information Commissioner's Office (UK)",
    scope: "MEOK as data controller for customer email, Stripe data, signed-attestation metadata",
    evidence: "ico.org.uk register",
    url: "https://ico.org.uk/ESDWebPages/Search",
  },
];

const STATUS_LABELS: Record<AccreditationStatus, { label: string; className: string; Icon: typeof BadgeCheck }> = {
  live: {
    label: "Live",
    className: "bg-green-500/10 text-green-500 border-green-500/30",
    Icon: BadgeCheck,
  },
  "in-progress": {
    label: "In progress",
    className: "bg-amber-500/10 text-amber-500 border-amber-500/30",
    Icon: Clock,
  },
  planned: {
    label: "Planned",
    className: "bg-blue-500/10 text-blue-500 border-blue-500/30",
    Icon: AlertCircle,
  },
};

const AccreditationsPage = () => {
  const { t } = useTranslation();
  const grouped = ACCREDITATIONS.reduce<Record<AccreditationStatus, Accreditation[]>>(
    (acc, a) => {
      (acc[a.status] = acc[a.status] || []).push(a);
      return acc;
    },
    { live: [], "in-progress": [], planned: [] },
  );

  return (
    <>
      <SEO
        title={t(
          "accreditations.seo_title",
          "Accreditations + certifications — DVSA ER, SOC 2, ISO 42001, WCAG AAA",
        )}
        description={t(
          "accreditations.seo_description",
          "Transparent live status of every MEOK accreditation: live (MIT, Companies House, ICO, signed-chain), in-progress (DVSA ER, SOC 2 Type 1, WCAG 2.2 AAA), planned (ISO 42001, EU AI Act conformity).",
        )}
        canonical="https://haulage.app/accreditations"
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
                {t("accreditations.eyebrow", "Accreditations + certifications")}
              </span>
              <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 mb-4">
                {t("accreditations.title_prefix", "What we hold,")}{" "}
                <span className="text-gradient">
                  {t("accreditations.title_highlight", "what we're building.")}
                </span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t(
                  "accreditations.intro",
                  "Public-facing accreditation status. We list both live AND in-progress AND planned — radical transparency. If a customer asks for evidence we don't have yet, you'll know.",
                )}
              </p>
            </div>

            {(["live", "in-progress", "planned"] as AccreditationStatus[]).map((status) => {
              const items = grouped[status];
              if (!items?.length) return null;
              const meta = STATUS_LABELS[status];
              const Icon = meta.Icon;
              return (
                <section key={status} className="mb-12 max-w-4xl">
                  <h2 className="font-display text-2xl font-bold mb-4 flex items-center gap-3">
                    <Icon className="w-6 h-6" aria-hidden="true" />
                    {meta.label} ({items.length})
                  </h2>
                  <div className="space-y-3">
                    {items.map((a) => (
                      <article key={a.name} className="card-industrial p-5">
                        <header className="flex items-start justify-between gap-3 mb-2">
                          <h3 className="font-display font-bold text-lg">{a.name}</h3>
                          <span
                            className={`text-xs px-2 py-0.5 rounded border ${meta.className}`}
                          >
                            {meta.label}
                          </span>
                        </header>
                        <p className="text-sm text-muted-foreground mb-2">{a.scope}</p>
                        <dl className="grid sm:grid-cols-2 gap-2 text-xs mt-3">
                          <div>
                            <dt className="text-muted-foreground uppercase tracking-wider text-[10px]">
                              Issuer
                            </dt>
                            <dd className="text-foreground">{a.issuer}</dd>
                          </div>
                          {a.evidence && (
                            <div>
                              <dt className="text-muted-foreground uppercase tracking-wider text-[10px]">
                                Evidence
                              </dt>
                              <dd className="text-foreground">{a.evidence}</dd>
                            </div>
                          )}
                          {a.expected && (
                            <div>
                              <dt className="text-muted-foreground uppercase tracking-wider text-[10px]">
                                Expected
                              </dt>
                              <dd className="text-foreground">{a.expected}</dd>
                            </div>
                          )}
                        </dl>
                        {a.notes && (
                          <p className="text-xs text-muted-foreground mt-3 italic">{a.notes}</p>
                        )}
                        {a.url && (
                          <a
                            href={a.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-primary hover:underline text-xs mt-3"
                          >
                            Source <ExternalLink className="w-3 h-3" aria-hidden="true" />
                          </a>
                        )}
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}

            <div className="card-industrial p-6 max-w-3xl mx-auto bg-gradient-to-br from-primary/5 to-transparent">
              <h2 className="font-display text-xl font-bold mb-3">
                {t("accreditations.evidence_title", "Need evidence for procurement?")}
              </h2>
              <p className="text-muted-foreground mb-4 text-sm">
                {t(
                  "accreditations.evidence_body",
                  "Email Nick directly — he replies same day with the exact artefact your procurement team needs. SOC 2 stub + DPIA + sub-processor list + DPA template all ready.",
                )}
              </p>
              <Button variant="hero" asChild>
                <a href="mailto:nicholas@meok.ai?subject=Accreditations%20+%20procurement%20evidence">
                  Email Nick — same-day reply
                </a>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AccreditationsPage;
