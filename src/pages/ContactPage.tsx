import { Mail, Github, Globe, MapPin } from "lucide-react";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const ContactPage = () => {
  return (
    <>
      <SEO
        title="Contact Haulage.app | MEOK AI Labs"
        description="Email Nick at MEOK AI Labs about Haulage.app, the 9 trade MCPs, or any of the trade SaaS apps. Solo founder, London-based, replies same-day."
        canonical="https://haulage.app/contact"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-20">
          <section className="py-16 md:py-24 bg-secondary relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
            <div className="container mx-auto px-6 relative z-10">
              <div className="max-w-3xl">
                <span className="text-primary font-display uppercase tracking-wider text-sm">Contact</span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6">
                  Talk to <span className="text-gradient">Nick</span>
                </h1>
                <p className="text-muted-foreground text-lg md:text-xl">
                  Solo founder. London-based. Replies within one business day. No SDR funnel — just email.
                </p>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-24">
            <div className="container mx-auto px-6">
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="card-industrial p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold mb-1">Email</h3>
                    <a href="mailto:nicholas@meok.ai" className="text-primary text-xl font-bold hover:underline">nicholas@meok.ai</a>
                    <p className="text-muted-foreground text-sm mt-1">Reply within 24h, often same-day</p>
                  </div>
                  <Button variant="hero" size="sm" asChild><a href="mailto:nicholas@meok.ai">Email</a></Button>
                </div>
                <div className="card-industrial p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Github className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold mb-1">GitHub</h3>
                    <a href="https://github.com/CSOAI-ORG" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">github.com/CSOAI-ORG</a>
                    <p className="text-muted-foreground text-sm mt-1">Issues + PRs welcome on any MCP</p>
                  </div>
                </div>
                <div className="card-industrial p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold mb-1">MEOK.ai</h3>
                    <a href="https://meok.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">meok.ai</a>
                    <p className="text-muted-foreground text-sm mt-1">All MEOK products + the trust bar</p>
                  </div>
                </div>
                <div className="card-industrial p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold mb-1">HQ</h3>
                    <p className="text-foreground">London, UK</p>
                    <p className="text-muted-foreground text-sm mt-1">CSOAI LTD · Companies House 16939677</p>
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
