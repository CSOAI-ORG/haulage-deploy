import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Equipment from "@/components/Equipment";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <SEO
        title="Haulage.app — Global Trade Compliance + AI Governance | MEOK AI Labs"
        description="Global trade compliance + AI governance attestation layer. 32 PyPI-published MCP servers across UK + EU + US + AU + CA + UAE + air + sea + rail. Every signed compliance attestation auto-bridges to EU AI Act, UK AI Bill, NIST AI RMF, and ISO 42001."
        canonical="https://haulage.app"
      />
      <div className="min-h-screen bg-background">
        <Header />
        <main id="main">
          <Hero />
          <Services />
          <Equipment />
          <About />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
