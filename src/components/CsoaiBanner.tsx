import { ExternalLink } from "lucide-react";

/**
 * "Part of the CSOAI Ecosystem" footer banner.
 * Mirrors the banner Lovable shipped on muckaway.ai so the brand thread
 * is consistent across haulage.app, muckaway.ai, planthire.ai, grabhire.ai.
 */
const CsoaiBanner = () => {
  return (
    <div className="bg-primary/5 border-y border-primary/20">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <p className="text-muted-foreground">
            <span className="font-display font-semibold text-foreground">
              Part of the CSOAI &amp; LoopFactory AI Ecosystem
            </span>
            <span className="hidden sm:inline mx-2 text-primary">·</span>
            <span className="block sm:inline mt-1 sm:mt-0">
              Haulage.app · MuckAway.ai · GrabHire.ai · PlantHire.ai
            </span>
          </p>
          <a
            href="https://www.csoai.org"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-primary hover:underline font-display text-sm"
          >
            csoai.org
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CsoaiBanner;
