import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Globe, Check } from "lucide-react";
import { LOCALES } from "@/i18n";

/**
 * Compact language switcher — flag + dropdown.
 * Slot it into the Header (desktop nav) and the mobile nav.
 */
const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const current = LOCALES.find(l => l.code === i18n.language) ?? LOCALES[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border hover:border-primary/50 transition-colors text-sm"
        aria-label={`Change language. Current: ${current.label}`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Globe className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
        <span aria-hidden="true">{current.flag}</span>
        <span className="font-display uppercase tracking-wider text-xs hidden sm:inline">
          {current.code.toUpperCase()}
        </span>
      </button>
      {open && (
        <div
          className="absolute right-0 mt-2 w-44 bg-background border border-border rounded-lg shadow-lg z-50 overflow-hidden"
          role="listbox"
          aria-label="Languages"
        >
          {LOCALES.map(loc => {
            const active = loc.code === i18n.language;
            return (
              <button
                key={loc.code}
                type="button"
                onClick={() => {
                  i18n.changeLanguage(loc.code);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between gap-3 px-3 py-2 text-sm hover:bg-secondary/50 transition-colors ${
                  active ? "bg-primary/10 text-primary" : "text-foreground"
                }`}
                role="option"
                aria-selected={active}
              >
                <span className="flex items-center gap-2">
                  <span aria-hidden="true">{loc.flag}</span>
                  <span>{loc.label}</span>
                </span>
                {active && <Check className="w-4 h-4" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
