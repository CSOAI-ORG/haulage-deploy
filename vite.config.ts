import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.ico",
        "og-image.jpg",
        "robots.txt",
        "llms.txt",
        "catalogue.json",
      ],
      manifest: {
        name: "Haulage.app — MEOK Trade Compliance",
        short_name: "Haulage.app",
        description:
          "32 MCP servers for global trade compliance + HMAC-signed attestations + EU AI Act bridge.",
        theme_color: "#0EA5E9",
        background_color: "#0a0a0a",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "any",
        icons: [
          { src: "/og-image.jpg", sizes: "1200x630", type: "image/jpeg", purpose: "any" },
        ],
        screenshots: [
          { src: "/og-image.jpg", sizes: "1200x630", type: "image/jpeg", form_factor: "wide" },
        ],
        categories: ["business", "productivity", "developer"],
        shortcuts: [
          { name: "MCP catalogue", url: "/mcps", description: "Browse 32 MCP servers" },
          { name: "Quickstart", url: "/docs/quickstart", description: "5-min install" },
          { name: "Trust", url: "/trust", description: "How signing works" },
          { name: "Pricing", url: "/pricing", description: "Plans + LAUNCH50 offer" },
        ],
        lang: "en-GB",
        dir: "ltr",
      },
      workbox: {
        navigateFallbackDenylist: [/^\/api\//, /\.json$/],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/haulage\.app\/(catalogue|llms|robots|sitemap)/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "meok-static-meta",
              expiration: { maxEntries: 16, maxAgeSeconds: 60 * 60 * 24 },
            },
          },
          {
            urlPattern: /^https:\/\/meok-attestation-api\.vercel\.app\/(openapi\.json|llms\.txt)/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "meok-api-meta",
              expiration: { maxEntries: 8, maxAgeSeconds: 60 * 60 * 6 },
            },
          },
        ],
      },
      devOptions: {
        enabled: false, // turn on with VITE_PWA_DEV=1 if you want SW in dev
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Pull heaviest dependencies into their own chunks so the page
          // shell loads first and these can cache independently between deploys.
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "i18n-vendor": ["i18next", "react-i18next", "i18next-browser-languagedetector"],
          "query-vendor": ["@tanstack/react-query"],
          "ui-vendor": ["lucide-react", "react-helmet-async"],
        },
      },
    },
  },
}));
