import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, ExternalLink, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  FLEET_SIZES,
  ONBOARDING_STEPS,
  REGULATOR_OPTIONS,
  VERTICAL_OPTIONS,
  computeRecommendation,
  type FleetSize,
} from "@/data/onboarding";

const OnboardingPage = () => {
  const { t } = useTranslation();
  const [stepIndex, setStepIndex] = useState(0);
  const [fleetSize, setFleetSize] = useState<FleetSize | null>(null);
  const [verticals, setVerticals] = useState<string[]>([]);
  const [regulators, setRegulators] = useState<string[]>([]);

  const recommendation = useMemo(() => {
    if (!fleetSize) return null;
    return computeRecommendation(fleetSize, verticals, regulators);
  }, [fleetSize, verticals, regulators]);

  const step = ONBOARDING_STEPS[stepIndex];
  const canAdvance =
    (step.id === "fleet_size" && fleetSize !== null) ||
    (step.id === "verticals" && verticals.length > 0) ||
    (step.id === "regulators" && regulators.length > 0) ||
    step.id === "summary";

  const next = () => {
    if (stepIndex < ONBOARDING_STEPS.length - 1 && canAdvance) setStepIndex(stepIndex + 1);
  };
  const back = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };
  const toggle = (list: string[], setList: (v: string[]) => void, value: string) => {
    if (list.includes(value)) setList(list.filter((x) => x !== value));
    else setList([...list, value]);
  };

  return (
    <>
      <SEO
        title={t("onboarding.seo_title", "Set up MEOK in 60 seconds | Haulage.app")}
        description={t(
          "onboarding.seo_description",
          "Pick fleet size + verticals + regulators of concern. Get the right MCP bundle + Stripe checkout link in 60 seconds. No demo call needed.",
        )}
        canonical="https://haulage.app/onboarding"
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

            <div className="max-w-3xl mx-auto">
              {/* Progress dots */}
              <ol className="flex items-center justify-center gap-2 mb-8" aria-label="Progress">
                {ONBOARDING_STEPS.map((s, i) => (
                  <li key={s.id} className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-display ${
                        i < stepIndex
                          ? "bg-primary text-primary-foreground"
                          : i === stepIndex
                            ? "bg-primary/20 text-primary border border-primary"
                            : "bg-secondary text-muted-foreground"
                      }`}
                      aria-current={i === stepIndex ? "step" : undefined}
                    >
                      {i < stepIndex ? <Check className="w-4 h-4" aria-hidden="true" /> : i + 1}
                    </div>
                    {i < ONBOARDING_STEPS.length - 1 && (
                      <ChevronRight className="w-4 h-4 text-muted-foreground/30" aria-hidden="true" />
                    )}
                  </li>
                ))}
              </ol>

              {/* Heading */}
              <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-3">
                {step.title}
              </h1>
              <p className="text-muted-foreground text-center mb-12">{step.subtitle}</p>

              {/* Step body */}
              <div className="card-industrial p-8 mb-8">
                {step.id === "fleet_size" && (
                  <div className="space-y-2">
                    {FLEET_SIZES.map((f) => (
                      <button
                        key={f.value}
                        type="button"
                        onClick={() => setFleetSize(f.value)}
                        className={`w-full flex items-center justify-between p-4 rounded-md border text-left transition-colors ${
                          fleetSize === f.value
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary"
                        }`}
                      >
                        <div>
                          <div className="font-display font-bold">{f.label}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Recommended: {f.recommendedTier}
                          </div>
                        </div>
                        {fleetSize === f.value && <Check className="w-5 h-5 text-primary" aria-hidden="true" />}
                      </button>
                    ))}
                  </div>
                )}

                {step.id === "verticals" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {VERTICAL_OPTIONS.map((v) => {
                      const selected = verticals.includes(v.value);
                      return (
                        <button
                          key={v.value}
                          type="button"
                          onClick={() => toggle(verticals, setVerticals, v.value)}
                          className={`flex items-center justify-between p-3 rounded-md border text-left text-sm transition-colors ${
                            selected ? "border-primary bg-primary/10" : "border-border hover:border-primary"
                          }`}
                          aria-pressed={selected}
                        >
                          <span>{v.label}</span>
                          {selected && <Check className="w-4 h-4 text-primary" aria-hidden="true" />}
                        </button>
                      );
                    })}
                  </div>
                )}

                {step.id === "regulators" && (
                  <div className="space-y-2">
                    {REGULATOR_OPTIONS.map((r) => {
                      const selected = regulators.includes(r.value);
                      return (
                        <button
                          key={r.value}
                          type="button"
                          onClick={() => toggle(regulators, setRegulators, r.value)}
                          className={`w-full flex items-center justify-between p-3 rounded-md border text-left text-sm transition-colors ${
                            selected ? "border-primary bg-primary/10" : "border-border hover:border-primary"
                          }`}
                          aria-pressed={selected}
                        >
                          <span>{r.label}</span>
                          {selected && <Check className="w-4 h-4 text-primary" aria-hidden="true" />}
                        </button>
                      );
                    })}
                  </div>
                )}

                {step.id === "summary" && recommendation && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-display text-2xl font-bold mb-2">
                        {recommendation.recommendedTier.label}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Fleet size: {recommendation.fleetSize} · {recommendation.verticals.length} vertical(s)
                        · {recommendation.regulators.length} regulator(s)
                      </p>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold mb-3">
                        Recommended MCPs ({recommendation.recommendedMCPs.length})
                      </h3>
                      <ul className="space-y-1 text-sm">
                        {recommendation.recommendedMCPs.map((m) => (
                          <li key={m} className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-primary" aria-hidden="true" />
                            <code className="text-foreground">{m}</code>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                      <Button variant="hero" size="lg" asChild>
                        <a href={recommendation.recommendedTier.stripeUrl} target="_blank" rel="noopener noreferrer">
                          Continue to checkout
                          <ExternalLink className="w-4 h-4 ml-1" aria-hidden="true" />
                        </a>
                      </Button>
                      <Button variant="outline" size="lg" asChild>
                        <Link to="/docs/quickstart">Skip — read the 5-min quickstart</Link>
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground pt-2">
                      LAUNCH50 = 50% off the first 6 months of Pro tier. Code auto-applies via the
                      Stripe link above.
                    </p>
                  </div>
                )}
              </div>

              {/* Step nav */}
              <div className="flex items-center justify-between">
                <Button variant="outline" onClick={back} disabled={stepIndex === 0}>
                  <ArrowLeft className="w-4 h-4 mr-1" aria-hidden="true" />
                  Back
                </Button>
                {step.id !== "summary" && (
                  <Button variant="hero" onClick={next} disabled={!canAdvance}>
                    Next
                    <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default OnboardingPage;
