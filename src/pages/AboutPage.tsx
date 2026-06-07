import { Link } from "react-router-dom";
import { Mail, Shield, Award, Users, Clock, Package, Server, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { proStripeUrl } from "@/data/mcps";

const AboutPage = () => {
  const { t } = useTranslation();
  const stats = [
    { icon: Package, value: t("about.stat_verticals_value"), label: t("about.stat_verticals_label") },
    { icon: Server, value: t("about.stat_mcps_value"), label: t("about.stat_mcps_label") },
    { icon: Globe, value: t("about.stat_pypi_value"), label: t("about.stat_pypi_label") },
    { icon: Shield, value: t("about.stat_mit_value"), label: t("about.stat_mit_label") },
  ];

  const values = [
    { icon: Shield, title: t("about.value_compliance_title"), description: t("about.value_compliance_description") },
    { icon: Award, title: t("about.value_open_title"), description: t("about.value_open_description") },
    { icon: Users, title: t("about.value_operator_title"), description: t("about.value_operator_description") },
    { icon: Clock, title: t("about.value_eu_act_title"), description: t("about.value_eu_act_description") },
  ];

  return (
    <>
      <SEO
        title={t("seo.about_title")}
        description={t("seo.about_description")}
        canonical="https://haulage.app/about"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main id="main" className="pt-20">
          <section className="py-16 md:py-24 bg-secondary relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
            <div className="container mx-auto px-6 relative z-10">
              <div className="max-w-3xl">
                <span className="text-primary font-display uppercase tracking-wider text-sm">{t("about.eyebrow")}</span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
                  {t("about.title_prefix")} <span className="text-gradient">{t("about.title_highlight")}</span>
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl mb-8">
                  {t("about.intro")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="hero" size="lg" asChild><Link to="/mcps">{t("about.cta_browse")}</Link></Button>
                  <Button variant="outline" size="lg" asChild><Link to="/contact">{t("about.cta_contact")}</Link></Button>
                </div>
              </div>
            </div>
          </section>
          <section className="py-8 bg-primary">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="text-center">
                      <Icon className="w-8 h-8 mx-auto mb-2 text-primary-foreground/80" aria-hidden="true" />
                      <p className="font-display text-2xl font-bold text-primary-foreground">{stat.value}</p>
                      <p className="text-primary-foreground/80 text-sm">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-6">
              <div className="max-w-3xl mx-auto text-center mb-16">
                <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6">
                  {t("about.problem_title_prefix")} <span className="text-gradient">{t("about.problem_title_highlight")}</span> {t("about.problem_title_suffix")}
                </h2>
                <p className="text-muted-foreground text-lg">
                  {t("about.problem_description")}
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((v, idx) => {
                  const Icon = v.icon;
                  return (
                    <div key={idx} className="card-industrial p-6 text-center">
                      <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-7 h-7 text-primary" aria-hidden="true" />
                      </div>
                      <h3 className="font-display text-xl font-bold mb-3">{v.title}</h3>
                      <p className="text-muted-foreground text-sm">{v.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          <section className="py-16 md:py-24 bg-secondary">
            <div className="container mx-auto px-6">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                  {t("about.nine_trades_title_prefix")} <span className="text-gradient">{t("about.nine_trades_title_highlight")}</span>
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {[
                  { href: "https://muckaway.ai", name: "MuckAway.ai", icon: Package, blurb: t("about.trade_muckaway_blurb") },
                  { href: "https://planthire.ai", name: "PlantHire.ai", icon: Award, blurb: t("about.trade_planthire_blurb") },
                  { href: "https://grabhire.ai", name: "GrabHire.ai", icon: Shield, blurb: t("about.trade_grabhire_blurb") },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="text-center group">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-8 h-8 text-primary" aria-hidden="true" />
                      </div>
                      <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors">{s.name}</h3>
                      <p className="text-muted-foreground text-sm">{s.blurb}</p>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-6 text-center">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
                {t("about.try_title_prefix")} <span className="text-gradient">{t("about.try_title_highlight")}</span>{t("about.try_title_suffix")}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                {t("about.try_description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" asChild>
                  <a href={proStripeUrl} target="_blank" rel="noopener noreferrer">{t("about.cta_subscribe")}</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="mailto:nicholas@meok.ai" className="flex items-center gap-2">
                    <Mail className="w-5 h-5" aria-hidden="true" />{t("about.cta_email_nick")}
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AboutPage;
