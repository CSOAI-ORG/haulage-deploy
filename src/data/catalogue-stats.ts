// Single source of truth for catalogue stats — keep these consts in sync
// with the actual mcps.ts entries + the live PyPI catalogue.
// Updated 2026-06-07.

export const MCP_COUNT = 32;             // total in catalogue (live + queued + scaffolded)
export const MCP_LIVE_COUNT = 21;        // built + tested wheels ready (4 LIVE on PyPI, rest queued)
export const TOOL_COUNT = 172;           // sum of @mcp.tool() across built MCPs (this turn)
export const TEST_COUNT = 586;           // tests passing across built MCPs (this turn)
export const VERTICAL_COUNT = 9;         // plant, grab, muckaway, car-transport, crane, hiab, haulage, rail, livestock
export const JURISDICTION_COUNT = 7;     // UK, EU, US, AU, CA, MENA, 78-country TIR
export const MODE_COUNT = 4;             // road + air + sea + rail
export const HAULAGE_DOMAIN = "https://haulage.app";
