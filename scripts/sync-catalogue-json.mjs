#!/usr/bin/env node
/**
 * sync-catalogue-json.mjs
 *
 * Regenerates public/catalogue.json from src/data/mcps.ts so AI crawlers and
 * search engines can fetch the full 32-MCP catalogue without executing JS.
 *
 * Run as `npm run sync:catalogue` or automatically via the `prebuild` script
 * in package.json.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const src = resolve(root, "src/data/mcps.ts");
const out = resolve(root, "public/catalogue.json");

const text = readFileSync(src, "utf-8");

// Regex extracts each MCP block. We deliberately keep this conservative:
// if the source format drifts, the script throws so we know to update it
// rather than emit a silently-wrong file.
const re = new RegExp(
  [
    "\\{\\s*id:\\s*\"([^\"]+)\",",
    "\\s*name:\\s*\"([^\"]+)\",",
    "\\s*tagline:\\s*\"([^\"]+)\",",
    "\\s*pypi:\\s*\"([^\"]+)\",",
    "\\s*install:\\s*\"([^\"]+)\",",
    "\\s*tools:\\s*(\\d+),",
    "\\s*starterStripe:\\s*(null|\"[^\"]*\"),",
    "\\s*starterPrice:\\s*\"([^\"]*)\",",
    "\\s*icon:\\s*\\w+,",
    "\\s*pairs:\\s*\\[([^\\]]+)\\]",
  ].join(""),
  "g"
);

const mcps = [];
for (const m of text.matchAll(re)) {
  const pairs = m[9]
    .split(",")
    .map((p) => p.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
  const starterStripeUrl = m[7] === "null" ? null : m[7].replace(/^"|"$/g, "");
  mcps.push({
    id: m[1],
    name: m[2],
    tagline: m[3],
    pypi: m[4],
    install: m[5],
    tools: Number(m[6]),
    starterStripeUrl,
    starterPrice: m[8],
    domains: pairs,
  });
}

if (mcps.length < 30) {
  console.error(
    `[sync-catalogue-json] Parsed only ${mcps.length} MCPs from mcps.ts — refusing to overwrite catalogue.json. The source format probably changed; update the regex in this script.`
  );
  process.exit(1);
}

// Ground-truth PyPI status — keep this in sync with `pip index versions` reality.
// When you publish a new MCP to PyPI, add its id here so catalogue.json reflects
// reality on the next build.
const LIVE_ON_PYPI = new Set([
  "haulage-uk-compliance",
  "skip-hire",
  "nrswa",
  "vehicle-handover",
  "tacho-audit",
  "bs7121",
  "ev-recall-transport",
]);

for (const m of mcps) {
  m.published = LIVE_ON_PYPI.has(m.id);
}
const liveCount = mcps.filter((m) => m.published).length;

const catalogue = {
  "@version": "1.0",
  site: "haulage.app",
  operator: "MEOK AI Labs / CSOAI LTD",
  license: "MIT",
  signing: "HMAC-SHA256",
  verifierEndpoint: "https://meok-attestation-api.vercel.app/verify",
  governanceBridge: "meok-haulage-governance-bridge-mcp",
  frameworks: [
    "EU AI Act",
    "UK AI Bill Article 22c",
    "NIST AI RMF",
    "ISO/IEC 42001",
    "CoE AI Treaty",
  ],
  totalMCPs: mcps.length,
  liveMCPs: liveCount,
  pendingMCPs: mcps.length - liveCount,
  disclosure:
    `${mcps.length} MCPs in the catalogue. ${liveCount} confirmed pip-installable today; ` +
    `${mcps.length - liveCount} are built + wheel-ready, queued for PyPI publish ` +
    `(429-rate-limited new-account batch). ` +
    "Email nicholas@meok.ai for early-access wheels to any unreleased MCP.",
  mcps,
};

if (!existsSync(dirname(out))) mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(catalogue, null, 2) + "\n", "utf-8");
console.log(
  `[sync-catalogue-json] Wrote ${out} — ${mcps.length} MCPs (${JSON.stringify(catalogue).length} bytes uncompressed)`
);
