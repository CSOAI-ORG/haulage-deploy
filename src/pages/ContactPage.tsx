import { Mail, Github, Globe, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const ContactPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <SEO
        title={t("seo.contact_title")}
        description={t("seo.contact_description")}
        canonical="https://haulage.app/contact"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main id="main" className="pt-20">
          <section className="py-16 md:py-24 bg-secondary relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
            <div className="container mx-auto px-6 relative z-10">
              <div className="max-w-3xl">
                <span className="text-primary font-display uppercase tracking-wider text-sm">{t("contact.eyebrow")}</span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
                  {t("contact.title_prefix")} <span className="text-gradient">{t("contact.title_highlight")}</span>
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl">
                  {t("contact.intro")}
                </p>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24">
            <div className="container mx-auto px-6">
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="card-industrial p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold mb-1">{t("contact.email_label")}</h3>
                    <a href="mailto:nicholas@meok.ai" className="text-primary text-xl font-bold hover:underline">nicholas@meok.ai</a>
                    <p className="text-muted-foreground text-sm mt-1">{t("contact.email_reply_time")}</p>
                  </div>
                  <Button variant="hero" size="sm" asChild><a href="mailto:nicholas@meok.ai">{t("contact.email_button")}</a></Button>
                </div>
                <div className="card-industrial p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Github className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold mb-1">{t("contact.github_label")}</h3>
                    <a href="https://github.com/CSOAI-ORG" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">github.com/CSOAI-ORG</a>
                    <p className="text-muted-foreground text-sm mt-1">{t("contact.github_caption")}</p>
                  </div>
                </div>
                <div className="card-industrial p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold mb-1">{t("contact.meok_label")}</h3>
                    <a href="https://meok.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">meok.ai</a>
                    <p className="text-muted-foreground text-sm mt-1">{t("contact.meok_caption")}</p>
                  </div>
                </div>
                <div className="card-industrial p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold mb-1">{t("contact.hq_label")}</h3>
                    <p className="text-foreground">{t("contact.hq_location")}</p>
                    <p className="text-muted-foreground text-sm mt-1">{t("contact.hq_legal")}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
