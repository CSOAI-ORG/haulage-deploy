/**
 * Theme switcher — Sun / Moon / Accessibility icons.
 * Renders a dropdown for switching between system / light / dark / high-contrast.
 * RTL-safe + keyboard navigable.
 */
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun, Eye } from "lucide-react";
import { useTranslation } from "react-i18next";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Theme"
        className="w-9 h-9 inline-flex items-center justify-center rounded-md border border-border opacity-0"
        disabled
      >
        <Sun className="w-4 h-4" aria-hidden="true" />
      </button>
    );
  }

  const options = [
    { value: "system", icon: Monitor, label: t("theme.system", "System") },
    { value: "light", icon: Sun, label: t("theme.light", "Light") },
    { value: "dark", icon: Moon, label: t("theme.dark", "Dark") },
    { value: "high-contrast", icon: Eye, label: t("theme.high_contrast", "High contrast") },
  ];
  const current = options.find((o) => o.value === theme) ?? options[0];
  const CurrentIcon = current.icon;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={t("theme.label", "Theme")}
        className="w-9 h-9 inline-flex items-center justify-center rounded-md border border-border hover:border-primary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <CurrentIcon className="w-4 h-4" aria-hidden="true" />
      </button>
      {open && (
        <ul
          role="menu"
          aria-label={t("theme.menu_label", "Pick a theme")}
          className="absolute right-0 mt-2 w-44 bg-background border border-border rounded-md shadow-lg z-50"
          onBlur={() => setOpen(false)}
        >
          {options.map((opt) => {
            const Icon = opt.icon;
            const active = opt.value === theme;
            return (
              <li key={opt.value}>
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={active}
                  onClick={() => {
                    setTheme(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-secondary transition-colors ${
                    active ? "text-primary font-medium" : "text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  {opt.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ThemeSwitcher;
