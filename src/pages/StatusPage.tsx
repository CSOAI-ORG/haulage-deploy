import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Circle, CheckCircle2, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import SEO from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ENDPOINTS = [
  { name: "haulage.app", url: "https://haulage.app/", description: "Marketing site + dashboard" },
  { name: "Attestation API — /health", url: "https://meok-attestation-api.vercel.app/health", description: "Sign + verify backend" },
  { name: "OpenAPI 3.1 spec", url: "https://meok-attestation-api.vercel.app/openapi.json", description: "Machine-readable API contract (16 paths)" },
  { name: "Swagger UI", url: "https://meok-attestation-api.vercel.app/docs", description: "Interactive API docs" },
  { name: "Audit ledger", url: "https://meok-attestation-api.vercel.app/api/audit", description: "Signed-chain ledger query" },
  { name: "Catalogue JSON", url: "https://haulage.app/catalogue.json", description: "32-MCP structured catalogue" },
  { name: "llms.txt", url: "https://haulage.app/llms.txt", description: "AI-crawler identity feed" },
  { name: "Sitemap", url: "https://haulage.app/sitemap.xml", description: "Search-engine sitemap" },
  { name: "Compliance app", url: "https://meok-compliance.vercel.app/", description: "Companion compliance app" },
  { name: "Plant Hire SaaS", url: "https://planthire.ai/", description: "Vertical SaaS" },
  { name: "Grab Hire SaaS", url: "https://grabhire.ai/", description: "Vertical SaaS" },
  { name: "Muckaway SaaS", url: "https://muckaway.ai/", description: "Vertical SaaS" },
];

interface Probe {
  url: string;
  status: "ok" | "down" | "checking";
  ms?: number;
  err?: string;
}

const StatusPage = () => {
  const { t } = useTranslation();
  const [probes, setProbes] = useState<Record<string, Probe>>(
    () => Object.fromEntries(ENDPOINTS.map((e) => [e.url, { url: e.url, status: "checking" as const }])),
  );

  useEffect(() => {
    let cancelled = false;
    const probe = async (url: string) => {
      const start = performance.now();
      try {
        await fetch(url, { method: "GET", mode: "no-cors", cache: "no-store" });
        const ms = Math.round(performance.now() - start);
        if (cancelled) return;
        setProbes((prev) => ({ ...prev, [url]: { url, status: "ok", ms } }));
      } catch (e) {
        if (cancelled) return;
        setProbes((prev) => ({ ...prev, [url]: { url, status: "down", err: String(e) } }));
      }
    };
    ENDPOINTS.forEach((e) => probe(e.url));
    return () => {
      cancelled = true;
    };
  }, []);

  const okCount = Object.values(probes).filter((p) => p.status === "ok").length;
  const totalCount = ENDPOINTS.length;
  const allOk = okCount === totalCount;

  return (
    <>
      <SEO
        title={t("status.seo_title", "Service status — haulage.app + MEOK attestation API")}
        description={t(
          "status.seo_description",
          "Real-time status of every MEOK ecosystem endpoint. haulage.app + attestation API + verifier + audit ledger + 4 vertical SaaS sites. Better Stack incident history at status.haulage.app.",
        )}
        canonical="https://haulage.app/status"
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
                {t("status.eyebrow", "Service status")}
              </span>
              <h1 className="font-display text-5xl md:text-6xl font-bold mt-4 mb-4 flex items-center gap-4">
                {allOk ? (
                  <span className="inline-flex items-center gap-3">
                    <span className="inline-block w-4 h-4 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                    <span>{t("status.all_systems_operational", "All systems operational")}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-3">
                    <span className="inline-block w-4 h-4 rounded-full bg-amber-500 animate-pulse" aria-hidden="true" />
                    <span>{okCount}/{totalCount} {t("status.partial", "operational")}</span>
                  </span>
                )}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {t(
                  "status.intro",
                  "Live browser-side probe of every public MEOK endpoint. For SLA-grade incident history + paging, see Better Stack status page (when status.haulage.app DNS lands).",
                )}
              </p>
            </div>

            <div className="card-industrial overflow-hidden max-w-4xl">
              <table className="w-full text-sm">
                <thead className="border-b border-border bg-secondary/30">
                  <tr>
                    <th className="text-left p-3 font-display">Endpoint</th>
                    <th className="text-left p-3 font-display">What</th>
                    <th className="text-right p-3 font-display">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ENDPOINTS.map((e) => {
                    const p = probes[e.url];
                    return (
                      <tr key={e.url} className="border-b border-border/50 last:border-0">
                        <td className="p-3">
                          <a
                            href={e.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline inline-flex items-center gap-1"
                          >
                            {e.name}
                            <ExternalLink className="w-3 h-3" aria-hidden="true" />
                          </a>
                        </td>
                        <td className="p-3 text-muted-foreground">{e.description}</td>
                        <td className="p-3 text-right">
                          {p.status === "checking" && (
                            <span className="inline-flex items-center gap-1 text-muted-foreground">
                              <Circle className="w-3 h-3 animate-pulse" aria-hidden="true" />
                              checking
                            </span>
                          )}
                          {p.status === "ok" && (
                            <span className="inline-flex items-center gap-1 text-green-500">
                              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                              ok {p.ms && <span className="text-xs text-muted-foreground">({p.ms}ms)</span>}
                            </span>
                          )}
                          {p.status === "down" && (
                            <span className="inline-flex items-center gap-1 text-red-500">
                              <span className="w-3 h-3 bg-red-500 rounded-full" aria-hidden="true" />
                              unreachable
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="mt-8 max-w-3xl mx-auto text-sm text-muted-foreground text-center space-y-2">
              <p>
                Browser-side probes use <code>fetch</code> with <code>mode: "no-cors"</code> — CORS errors
                still show as "ok" if the server responds at all. For authoritative status with full
                response codes + incident history, subscribe to{" "}
                <a
                  href="https://status.haulage.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  status.haulage.app
                </a>{" "}
                (Better Stack — DNS CNAME pending).
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default StatusPage;
