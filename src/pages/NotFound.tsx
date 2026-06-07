import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Home, Mail } from "lucide-react";

const NotFound = () => {
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <SEO
        title={t("seo.not_found_title")}
        description={t("seo.not_found_description")}
        noIndex={true}
      />

      <div className="min-h-screen bg-background">
        <Header />

        <main id="main" className="pt-20">
          <section className="py-24 md:py-32">
            <div className="container mx-auto px-6 text-center">
              <span className="text-primary font-display text-8xl md:text-9xl font-bold">{t("not_found.code")}</span>
              <h1 className="font-display text-3xl md:text-4xl font-bold mt-6 mb-4">
                {t("not_found.title_prefix")} <span className="text-gradient">{t("not_found.title_highlight")}</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-md mx-auto mb-8">
                {t("not_found.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/" className="flex items-center gap-2">
                    <Home className="w-5 h-5" aria-hidden="true" />
                    {t("not_found.cta_home")}
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/mcps" className="flex items-center gap-2">
                    {t("not_found.cta_browse")}
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="mailto:nicholas@meok.ai" className="flex items-center gap-2">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                    {t("not_found.cta_email")}
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

export default NotFound;
