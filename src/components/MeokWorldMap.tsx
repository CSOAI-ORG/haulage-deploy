import { useState } from "react";
import { jurisdictions, type Jurisdiction } from "@/data/jurisdictions";

/**
 * MEOK Compliance Coverage Map.
 *
 * Stylised regional map (not a literal Mercator projection — too heavy + too
 * detail-poor at this resolution). Each region is a clickable card; on hover
 * a tooltip shows which MCPs cover that jurisdiction.
 */
const MeokWorldMap = () => {
  const [selected, setSelected] = useState<Jurisdiction | null>(null);

  const regions: { id: string; label: string; ids: string[] }[] = [
    { id: "north-america", label: "North America", ids: ["us", "ca"] },
    { id: "europe", label: "Europe", ids: ["uk", "eu"] },
    { id: "mena", label: "MENA", ids: ["uae"] },
    { id: "oceania", label: "Oceania", ids: ["au"] },
    { id: "global", label: "Cross-border + Modes", ids: ["tir", "air", "sea", "governance"] },
  ];

  return (
    <section className="py-16 md:py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-primary font-display uppercase tracking-wider text-sm">
            MEOK Compliance Map
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-3 mb-4">
            One Layer. <span className="text-gradient">Every Major Jurisdiction.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            32 MCP servers across 9 jurisdictions + air + sea + rail. Click a region
            to see which compliance MCPs cover it.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-6">
            {regions.map(region => {
              const regionJurisdictions = jurisdictions.filter(j => region.ids.includes(j.id));
              const totalMcps = new Set(regionJurisdictions.flatMap(j => j.mcps)).size;
              return (
                <div key={region.id} className="card-industrial p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display text-lg font-bold">{region.label}</h3>
                    <span className="text-xs text-primary font-display uppercase tracking-wider">
                      {totalMcps} MCP{totalMcps !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {regionJurisdictions.map(j => (
                      <button
                        key={j.id}
                        type="button"
                        onClick={() => setSelected(j)}
                        onMouseEnter={() => setSelected(j)}
                        className={`flex flex-col items-center gap-1 p-3 rounded-lg border transition-colors text-left ${
                          selected?.id === j.id
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50 hover:bg-secondary/50"
                        }`}
                        aria-label={`${j.name} — ${j.mcps.length} MCP${j.mcps.length !== 1 ? "s" : ""}`}
                      >
                        <span className="text-2xl" aria-hidden="true">{j.flag}</span>
                        <span className="text-xs font-medium text-center leading-tight">{j.name}</span>
                        <span className="text-xs text-primary font-display">
                          {j.mcps.length}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="card-industrial p-6 lg:sticky lg:top-24 lg:self-start">
            {selected ? (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl" aria-hidden="true">{selected.flag}</span>
                  <div>
                    <h3 className="font-display text-xl font-bold">{selected.name}</h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      {selected.countriesCovered} {selected.countriesCovered === 1 ? "country" : "countries"} covered
                    </p>
                  </div>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                    {selected.mcps.length} MCP{selected.mcps.length !== 1 ? "s" : ""}
                  </p>
                  <ul className="space-y-2 max-h-80 overflow-y-auto pr-1">
                    {selected.mcps.map(mcp => (
                      <li key={mcp} className="text-sm">
                        <code className="text-xs bg-secondary/50 text-foreground px-2 py-1 rounded break-all">
                          {mcp}
                        </code>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <span className="text-6xl block mb-4" aria-hidden="true">🗺️</span>
                <p className="text-muted-foreground">
                  Click or hover any region to see the MCPs that cover it.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeokWorldMap;
