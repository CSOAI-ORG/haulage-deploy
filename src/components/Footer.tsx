import { ArrowRight, Github, Globe, Mail, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CsoaiBanner from "./CsoaiBanner";

const Footer = () => {
  const { t } = useTranslation();
  const trades = [
    { label: t("footer.trade_plant_hire"), href: "https://planthire.ai", external: true },
    { label: t("footer.trade_grab_hire"), href: "https://grabhire.ai", external: true },
    { label: t("footer.trade_muckaway"), href: "https://muckaway.ai", external: true },
    { label: "Coverage Map", href: "/map", external: false },
    { label: t("footer.trade_all_mcps"), href: "/mcps", external: false },
  ];
  const stack = [
    { label: t("footer.link_meok_labs"), href: "https://meok.ai" },
    { label: t("footer.link_council"), href: "https://councilof.ai" },
    { label: t("footer.link_compliance"), href: "https://meok-compliance.vercel.app" },
    { label: t("footer.link_attestation_api"), href: "https://meok-attestation-api.vercel.app" },
  ];
  const links = [
    { label: t("footer.nav_home"), href: "/" },
    { label: t("footer.nav_mcps"), href: "/mcps" },
    { label: t("footer.nav_trust", "Trust & Security"), href: "/trust" },
    { label: t("footer.nav_onboarding", "Onboarding"), href: "/onboarding" },
    { label: t("footer.nav_case_studies", "Case studies"), href: "/case-studies" },
    { label: t("footer.nav_partners", "Partners"), href: "/partners" },
    { label: t("footer.nav_about"), href: "/about" },
    { label: t("footer.nav_contact"), href: "/contact" },
  ];
  const legalLinks = [
    { label: t("footer.legal_privacy", "Privacy"), href: "/legal/privacy" },
    { label: t("footer.legal_terms", "Terms"), href: "/legal/terms" },
    { label: t("footer.legal_dpa", "DPA"), href: "/legal/dpa" },
    { label: t("footer.legal_cookies", "Cookies"), href: "/legal/cookies" },
  ];

  return (
    <footer className="bg-tr8-charcoal border-t border-border">
      <CsoaiBanner />
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Package className="w-7 h-7 text-primary" />
              <div className="font-display text-2xl font-bold">
                <span className="text-foreground">Haulage</span><span className="text-primary">.app</span>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              {t("footer.intro")}
            </p>
            <div className="flex gap-3">
              <a href="https://github.com/CSOAI-ORG" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary transition-colors group" aria-label="GitHub">
                <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground" />
              </a>
              <a href="https://meok.ai" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary transition-colors group" aria-label="MEOK AI Labs">
                <Globe className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-display text-lg font-bold mb-6 text-foreground">{t("footer.trade_verticals_heading")}</h3>
            <ul className="space-y-3">
              {trades.map((l) => l.external ? (
                <li key={l.label}><a href={l.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"><ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />{l.label}</a></li>
              ) : (
                <li key={l.label}><Link to={l.href} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"><ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-lg font-bold mb-6 text-foreground">{t("footer.stack_heading")}</h3>
            <ul className="space-y-3">
              {stack.map((l) => (
                <li key={l.href}><a href={l.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"><ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-lg font-bold mb-6 text-foreground">{t("footer.site_heading")}</h3>
            <ul className="space-y-3 mb-6">
              {links.map((l) => (
                <li key={l.href}><Link to={l.href} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group"><ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />{l.label}</Link></li>
              ))}
            </ul>
            <a href="mailto:nicholas@meok.ai" className="flex items-center gap-3 text-primary font-display hover:text-accent transition-colors">
              <Mail className="w-5 h-5" />nicholas@meok.ai
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm text-center md:text-left">{t("footer.copyright_prefix")} {new Date().getFullYear()} {t("footer.copyright_suffix")}</p>
            <nav aria-label="Legal" className="flex flex-wrap gap-x-4 gap-y-2 justify-center text-xs">
              {legalLinks.map((l) => (
                <Link key={l.href} to={l.href} className="text-muted-foreground hover:text-primary transition-colors">{l.label}</Link>
              ))}
              <a
                href="https://status.haulage.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                title="Service status (Better Stack)"
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500" aria-hidden="true" />
                {t("footer.status_label", "Status")}
              </a>
            </nav>
          </div>
          <p className="text-muted-foreground text-xs text-center md:text-right mt-4">{t("footer.summary_tags")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
