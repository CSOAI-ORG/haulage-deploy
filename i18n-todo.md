# i18n TODO — strings needing re-translation across 7 locales

The en.json source was updated 2026-06-07 with these new strings. The other 7 locales
still contain the old English-source's translations. Re-translate when you can:

| key | en value (new) |
|-----|----------------|
| seo.home_description | "Global trade compliance + AI governance platform — UK, EU, US, AU, CA, MENA + air + sea + rail. 32 MCP servers across 9 verticals + governance bridge." |
| seo.about_description | "Haulage.app is the umbrella for global trade SaaS — ... and 32 PyPI MCP servers + AI governance bridge..." |
| about.intro | "Nine real UK trade markets — ... — wrapped in one platform... 32 PyPI-published MCP servers..." |
| about.try_description | "Pro tier unlocks all 32 MCPs and access to the trade SaaS apps for £79/mo. No contracts." |

Numeric values (about.stat_verticals_value, about.stat_mcps_value) auto-patched
in all 8 locales because they're language-neutral.
