import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calculator, TrendingDown, PoundSterling } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

/**
 * ROI calculator — Move #N from 90-day content roadmap.
 * Mandata's headline conversion lever is "up to 30% cost reduction". We use the
 * same framing — quantified ROI is what moves fleet ops + CFO buyers.
 */

const formatGBP = (n: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(n);

const RoiCalculatorPage = () => {
  const { t } = useTranslation();
  const [vehicles, setVehicles] = useState(40);
  const [adminHoursPerWeek, setAdminHoursPerWeek] = useState(20);
  const [hourlyRate, setHourlyRate] = useState(35);
  const [auditCostsPerYear, setAuditCostsPerYear] = useState(15000);

  const annualAdminCost = adminHoursPerWeek * 52 * hourlyRate;

  // Conservative — admin time saved 40% (signed evidence chain auto-builds the dossier)
  // Mandata claims 30% operational cost; ours focuses on compliance admin specifically.
  const adminSavingsRate = 0.4;
  const auditSavingsRate = 0.25; // Less duplicate-work in audit prep

  const result = useMemo(() => {
    const adminSaved = annualAdminCost * adminSavingsRate;
    const auditSaved = auditCostsPerYear * auditSavingsRate;
    const totalSaved = adminSaved + auditSaved;
    const meokTier = vehicles <= 5 ? 29 : vehicles <= 25 ? 79 : vehicles <= 100 ? 79 : 499;
    const meokAnnual = meokTier * 12;
    const netSaved = totalSaved - meokAnnual;
    const roi = (netSaved / meokAnnual) * 100;
    return {
      adminSaved,
      auditSaved,
      totalSaved,
      meokAnnual,
      meokTier,
      netSaved,
      roi,
      paybackMonths: meokAnnual / Math.max(1, totalSaved / 12),
    };
  }, [vehicles, annualAdminCost, auditCostsPerYear]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "MEOK ROI Calculator",
    applicationCategory: "BusinessApplication",
    description:
      "Calculator estimating compliance-admin savings + audit-prep savings from adopting MEOK trade-compliance MCPs.",
    url: "https://haulage.app/roi",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "GBP",
    },
  };

  return (
    <>
      <SEO
        title={t("roi.seo_title", "ROI calculator — what MEOK saves your fleet vs Mandata + Microlise")}
        description={t(
          "roi.seo_description",
          "Plug in fleet size, weekly compliance admin hours, hourly rate, current audit costs. See annual compliance savings + ROI vs MEOK subscription tier.",
        )}
        canonical="https://haulage.app/roi"
        extraJsonLd={jsonLd}
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
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calculator className="w-6 h-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-primary font-display uppercase tracking-wider text-sm">
                    {t("roi.eyebrow", "ROI calculator")}
                  </span>
                  <h1 className="font-display text-4xl md:text-5xl font-bold mt-2 mb-3">
                    {t("roi.title_prefix", "How much MEOK saves your fleet —")}{" "}
                    <span className="text-gradient">
                      {t("roi.title_highlight", "honest maths.")}
                    </span>
                  </h1>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {t(
                      "roi.intro",
                      "Plug in your fleet size + current compliance burden. We show the conservative case (40% admin time saved, 25% audit prep saved). No magic 30% number we can't back up.",
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
              <div className="card-industrial p-6 space-y-5">
                <h2 className="font-display text-lg font-bold mb-1">Your numbers</h2>
                <Field label="Vehicles in fleet" value={vehicles} onChange={setVehicles} min={1} max={5000} />
                <Field
                  label="Weekly compliance admin hours (across the team)"
                  value={adminHoursPerWeek}
                  onChange={setAdminHoursPerWeek}
                  min={0}
                  max={500}
                  suffix="hrs/week"
                />
                <Field
                  label="Average loaded hourly rate of compliance/admin staff"
                  value={hourlyRate}
                  onChange={setHourlyRate}
                  min={15}
                  max={200}
                  prefix="£"
                  suffix="/hr"
                />
                <Field
                  label="Annual audit + DVSA-prep cost (external consultants, dossier prep, software fees)"
                  value={auditCostsPerYear}
                  onChange={setAuditCostsPerYear}
                  min={0}
                  max={500000}
                  prefix="£"
                  suffix="/yr"
                />
              </div>

              <div className="card-industrial p-6 bg-gradient-to-br from-primary/5 to-transparent">
                <h2 className="font-display text-lg font-bold mb-4 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-primary" aria-hidden="true" />
                  Your savings (conservative)
                </h2>
                <dl className="space-y-3 text-sm">
                  <Row label="Annual admin time cost (current)" value={formatGBP(annualAdminCost)} />
                  <Row
                    label="Admin time saved (40%)"
                    value={formatGBP(result.adminSaved)}
                    positive
                  />
                  <Row label="Audit prep saved (25%)" value={formatGBP(result.auditSaved)} positive />
                  <hr className="border-border" />
                  <Row
                    label="Total saved / year"
                    value={formatGBP(result.totalSaved)}
                    positive
                    bold
                  />
                  <Row
                    label={`MEOK ${result.meokTier === 29 ? "Starter" : result.meokTier === 79 ? "Pro" : "Fleet"} (£${result.meokTier}/mo)`}
                    value={formatGBP(result.meokAnnual)}
                  />
                  <hr className="border-border" />
                  <Row label="Net saved / year" value={formatGBP(result.netSaved)} positive bold />
                  <Row label="ROI" value={`${Math.round(result.roi)}%`} positive bold />
                  <Row
                    label="Payback period"
                    value={`${result.paybackMonths < 1 ? "<1" : Math.round(result.paybackMonths)} month${result.paybackMonths < 1 || result.paybackMonths >= 2 ? "s" : ""}`}
                    positive
                  />
                </dl>

                <div className="mt-6 pt-4 border-t border-border space-y-3">
                  <Button variant="hero" size="lg" className="w-full" asChild>
                    <Link to="/onboarding">
                      Start the 4-step onboarding → Pro £79/mo
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="w-full" asChild>
                    <Link to="/docs/quickstart">5-min quickstart</Link>
                  </Button>
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-8 max-w-3xl mx-auto text-center">
              We deliberately use a conservative 40% admin savings figure. Mandata advertises up to 30%
              total operational cost reduction in their materials. The MEOK savings we model focus
              specifically on compliance admin + audit prep (the parts our signed-attestation MCPs
              directly automate) — not total fleet operational cost.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

const Field = ({
  label,
  value,
  onChange,
  min,
  max,
  prefix,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  prefix?: string;
  suffix?: string;
}) => (
  <label className="block">
    <span className="text-sm font-display uppercase tracking-wider text-muted-foreground">{label}</span>
    <div className="mt-1 flex items-center gap-2">
      {prefix && <span className="text-primary">{prefix}</span>}
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="flex-grow bg-secondary/40 border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      />
      {suffix && <span className="text-muted-foreground text-sm">{suffix}</span>}
    </div>
  </label>
);

const Row = ({
  label,
  value,
  positive,
  bold,
}: {
  label: string;
  value: string;
  positive?: boolean;
  bold?: boolean;
}) => (
  <div className="flex items-baseline justify-between gap-3">
    <dt className={`${bold ? "font-display font-bold" : "text-muted-foreground"} text-sm`}>{label}</dt>
    <dd
      className={`${bold ? "font-display font-bold text-lg" : "text-sm"} ${
        positive ? "text-primary" : "text-foreground"
      }`}
    >
      {value}
    </dd>
  </div>
);

export default RoiCalculatorPage;
