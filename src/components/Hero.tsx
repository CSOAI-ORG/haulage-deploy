import { ArrowRight, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/excavator-hero.jpg";

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20">
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt=""
          role="presentation"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-block mb-6 animate-fade-in">
            <span className="bg-primary/20 text-primary px-4 py-2 rounded-full font-display text-sm uppercase tracking-wider border border-primary/30">
              {t("hero.tagline")}
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-none animate-slide-up">
            <span className="text-foreground">{t("hero.title_line_1")}</span><br />
            <span className="text-gradient">{t("hero.title_line_2")}</span><br />
            <span className="text-foreground">{t("hero.title_line_3")}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl animate-slide-up" style={{ animationDelay: "0.1s" }}>
            {t("hero.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <Button variant="hero" size="xl" asChild>
              <a href="#trade-verticals">{t("hero.cta_primary")}<ArrowRight className="w-5 h-5 ml-2" /></a>
            </Button>
            <Button variant="industrial" size="xl" asChild>
              <Link to="/mcps"><Package className="w-5 h-5 mr-2" />{t("hero.cta_secondary")}</Link>
            </Button>
          </div>
          <div className="mt-12 flex flex-wrap gap-8 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-primary">9</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">{t("hero.stat_verticals_label")}</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-primary">32</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">{t("hero.stat_mcps_label")}</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-primary">{t("hero.stat_tools_value")}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">{t("hero.stat_tools_label")}</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-primary">{t("hero.stat_license_value")}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">{t("hero.stat_license_label")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
