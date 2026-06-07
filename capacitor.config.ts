import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Capacitor config — wraps the haulage.app PWA for iOS + Android native shells.
 *
 * The native shells point at the production site URL by default so updates
 * push instantly without an app-store review. Set `bundledWebDir` instead if
 * you'd rather ship a bundled offline-first build.
 *
 * Deep links:
 *   meok://verify?sig=...      → opens /v/<id>
 *   https://haulage.app/v/<id> → opens app via universal link
 */
const config: CapacitorConfig = {
  appId: "ai.meok.haulage",
  appName: "Haulage.app",
  webDir: "dist",
  bundledWebRuntime: false,
  server: {
    // Live URL — instant updates, no app-store review per content change.
    url: "https://haulage.app",
    cleartext: false,
    androidScheme: "https",
  },
  ios: {
    contentInset: "automatic",
    backgroundColor: "#0a0a0a",
    scheme: "meok",
    // Add associated domains entitlement for universal links.
    // Set the Apple Team ID in Xcode after `npx cap open ios`.
    preferredContentMode: "mobile",
  },
  android: {
    backgroundColor: "#0a0a0a",
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: true,
      backgroundColor: "#0a0a0a",
      androidSplashResourceName: "splash",
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: "DARK",
      backgroundColor: "#0a0a0a",
    },
    Keyboard: {
      resize: "body",
      resizeOnFullScreen: true,
    },
  },
};

export default config;
