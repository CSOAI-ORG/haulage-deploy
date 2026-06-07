/**
 * Theme provider — wraps next-themes for dark / light / high-contrast support.
 *
 * Default = system (follows the user's OS-level prefers-color-scheme).
 * Persisted in localStorage under `meok_theme`.
 * Includes a `high-contrast` option for low-vision users + UK / EU public-sector
 * procurement requirements (WCAG 2.2 AAA contrast targets).
 */
import { ThemeProvider as NextThemeProvider } from "next-themes";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ThemeProvider = ({ children }: Props) => (
  <NextThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    storageKey="meok_theme"
    themes={["light", "dark", "high-contrast", "system"]}
    disableTransitionOnChange
  >
    {children}
  </NextThemeProvider>
);

export default ThemeProvider;
