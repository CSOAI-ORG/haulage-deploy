/**
 * MEOK i18n setup — 14 locales (~80% of global trade volume).
 *
 * Light-weight i18next config — locales bundled at build time so we don't pay
 * a runtime fetch on first paint. Browser language detected, persisted in
 * localStorage. RTL applied for Arabic via the <html dir=...> attribute.
 */
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./en.json";
import fr from "./fr.json";
import de from "./de.json";
import es from "./es.json";
import it from "./it.json";
import pl from "./pl.json";
import ar from "./ar.json";
import zh from "./zh.json";
import ja from "./ja.json";
import ko from "./ko.json";
import ptBR from "./pt-BR.json";
import ru from "./ru.json";
import hi from "./hi.json";
import tr from "./tr.json";

export const LOCALES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "pl", label: "Polski", flag: "🇵🇱" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "pt-BR", label: "Português (BR)", flag: "🇧🇷" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
] as const;

export type LocaleCode = (typeof LOCALES)[number]["code"];

export const RTL_LOCALES: LocaleCode[] = ["ar"];

const resources = {
  en: { translation: en },
  fr: { translation: fr },
  de: { translation: de },
  es: { translation: es },
  it: { translation: it },
  pl: { translation: pl },
  ar: { translation: ar },
  zh: { translation: zh },
  ja: { translation: ja },
  ko: { translation: ko },
  "pt-BR": { translation: ptBR },
  ru: { translation: ru },
  hi: { translation: hi },
  tr: { translation: tr },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: LOCALES.map((l) => l.code),
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupLocalStorage: "haulage_locale",
    },
    react: { useSuspense: false },
  });

// Set <html lang> + <html dir> on language change
const syncHtmlAttrs = (lng: string) => {
  if (typeof document === "undefined") return;
  document.documentElement.lang = lng;
  document.documentElement.dir = (RTL_LOCALES as string[]).includes(lng) ? "rtl" : "ltr";
};

i18n.on("languageChanged", syncHtmlAttrs);
// Apply on first load too:
if (typeof document !== "undefined" && i18n.language) {
  syncHtmlAttrs(i18n.language);
}

export default i18n;
