# Mobile (iOS + Android) build guide

Capacitor wraps the haulage.app PWA into native iOS + Android shells so we can
ship to the App Store + Play Store with the same codebase.

## One-time setup (per platform)

### iOS

```bash
# From haulage-deploy/
npm run build              # produces dist/
npx cap add ios            # creates ios/ folder
npx cap sync ios           # copies dist/ → ios/App/App/public
npx cap open ios           # opens Xcode
```

In Xcode:
1. **Signing & Capabilities** → set Apple Team ID
2. Add **Associated Domains** capability → `applinks:haulage.app`
3. Choose a simulator or device → ⌘+R

For TestFlight:
```bash
# Xcode → Product → Archive → Distribute App → TestFlight
```

### Android

```bash
npx cap add android
npx cap sync android
npx cap open android       # opens Android Studio
```

In Android Studio:
1. Set `applicationId = ai.meok.haulage` (already in capacitor.config.ts)
2. Add deep-link intent-filter in `AndroidManifest.xml`:
   ```xml
   <intent-filter android:autoVerify="true">
     <action android:name="android.intent.action.VIEW"/>
     <category android:name="android.intent.category.DEFAULT"/>
     <category android:name="android.intent.category.BROWSABLE"/>
     <data android:scheme="https" android:host="haulage.app"/>
   </intent-filter>
   ```
3. Build → Generate Signed Bundle / APK
4. Upload to Play Console

## Update flow

The native shells point to **https://haulage.app** by default. That means **any
content change you ship to Vercel is live on iOS + Android within minutes** —
no app-store review per content update.

If you want offline-first instead, comment out the `server.url` line in
`capacitor.config.ts` and ship `webDir = "dist"`. Then every change requires
`npx cap sync` + a new app-store build.

## Universal links / deep links

- `meok://verify?sig=abc123` → opens the app to `/v/abc123`
- `https://haulage.app/v/abc123` → opens the app via universal link

Universal link verification:
- iOS: file at `https://haulage.app/.well-known/apple-app-site-association`
- Android: file at `https://haulage.app/.well-known/assetlinks.json`

We'll ship those in a follow-up PR once the Apple Team ID + Android package
signature digest are confirmed.

## Native features the PWA already has

Because Capacitor wraps a PWA, the following work out-of-the-box:

- ✅ Service worker + offline cache (from `vite-plugin-pwa`)
- ✅ Web Share API
- ✅ Clipboard
- ✅ Camera (via getUserMedia) — used in /docs/quickstart for OCRS cert scan
- ✅ Notification permission prompt
- ✅ Add to Home Screen (Android Chrome already supports without Capacitor)

## Native-only features (require Capacitor plugins)

Add as needed:

```bash
npm install @capacitor/camera @capacitor/share @capacitor/preferences
npm install @capacitor/push-notifications @capacitor/local-notifications
```

## Branding assets

| Asset             | Source                                     | Sizes needed                                        |
|-------------------|--------------------------------------------|-----------------------------------------------------|
| App icon          | `public/og-image.jpg` (replace with 1024px) | iOS: 1024×1024 / Android: 512×512 + adaptive       |
| Splash screen     | gen from icon                              | iOS LaunchScreen / Android splash drawable         |
| Notification icon | small white-on-transparent                 | 24×24 + 36×36 + 48×48 + 72×72 + 96×96              |

Use [capacitor-resources](https://github.com/ionic-team/capacitor-assets):

```bash
npx @capacitor/assets generate --iconBackgroundColor "#0a0a0a"
```

## What this gives us

- 🎯 1 codebase, 3 surfaces: web + iOS + Android
- ⚡ Push updates without app-store review
- 🔐 Deep links + universal links land on the right route
- 🌍 8-locale i18n works the same in native shells (i18next reads from localStorage)
- 📱 PWA install prompt still works in browsers
