/**
 * Sentry initialisation — error tracking + perf + session replay.
 *
 * Set VITE_SENTRY_DSN at build/runtime to enable. Without it, this is a no-op
 * and ships zero bytes via tree-shaking.
 *
 * @see https://docs.sentry.io/platforms/javascript/guides/react/
 */
import * as Sentry from "@sentry/react";

const DSN = import.meta.env.VITE_SENTRY_DSN as string | undefined;
const ENVIRONMENT = (import.meta.env.MODE ?? "production") as string;
const RELEASE =
  (import.meta.env.VITE_RELEASE as string | undefined) ?? "haulage-app@0.0.1";

let _ready = false;

export function initSentry() {
  if (_ready) return;
  if (!DSN) {
    // No DSN configured → ship nothing. Avoid noise in dev.
    if (ENVIRONMENT === "development") {
      // eslint-disable-next-line no-console
      console.info("[sentry] VITE_SENTRY_DSN not set — skipping init");
    }
    return;
  }
  Sentry.init({
    dsn: DSN,
    environment: ENVIRONMENT,
    release: RELEASE,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        // Mask PII text by default — auditor + customer screens may carry
        // VRNs, fleet codes, regulator emails.
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    // Sample rates — keep low in prod, full in dev.
    tracesSampleRate: ENVIRONMENT === "development" ? 1.0 : 0.1,
    replaysSessionSampleRate: 0.05,
    replaysOnErrorSampleRate: 1.0,
    // Don't fingerprint URL changes that just swap the locale.
    beforeSend(event) {
      if (event.request?.url) {
        try {
          const u = new URL(event.request.url);
          // Strip ?locale= so similar errors group together.
          u.searchParams.delete("locale");
          event.request.url = u.toString();
        } catch {
          // ignore
        }
      }
      return event;
    },
    // Ignore noisy known-benign errors.
    ignoreErrors: [
      // ResizeObserver loop limit exceeded — browser quirk, not actionable.
      "ResizeObserver loop limit exceeded",
      "ResizeObserver loop completed with undelivered notifications",
      // Network errors that are user-network not our infra.
      "Network request failed",
      "Failed to fetch",
      "Load failed",
    ],
  });
  _ready = true;
}

export { Sentry };
