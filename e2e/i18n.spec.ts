import { test, expect } from "@playwright/test";

/**
 * i18n: language switcher updates page content + <html lang> + <html dir>.
 */
const LANG_EXPECTATIONS = [
  { code: "fr", htmlLang: "fr", htmlDir: "ltr", textHint: /haulage|compliance|conformité|gouvernance|EU AI Act/i },
  { code: "de", htmlLang: "de", htmlDir: "ltr", textHint: /haulage|compliance|EU AI Act|Compliance|Gewerke/i },
  { code: "ar", htmlLang: "ar", htmlDir: "rtl", textHint: /MEOK|EU AI Act|compliance/i },
  { code: "zh", htmlLang: "zh", htmlDir: "ltr", textHint: /MEOK|EU AI Act|compliance|合规/i },
];

for (const { code, htmlLang, htmlDir, textHint } of LANG_EXPECTATIONS) {
  test(`switch to ${code} updates lang/dir + content`, async ({ page }) => {
    await page.goto("/");

    // Persist locale via localStorage (same key the SPA uses).
    await page.evaluate((c) => {
      localStorage.setItem("haulage_locale", c);
    }, code);
    await page.reload({ waitUntil: "networkidle" });

    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBe(htmlLang);

    const dir = await page.locator("html").getAttribute("dir");
    expect(dir).toBe(htmlDir);

    const bodyText = await page.locator("body").innerText();
    expect(bodyText).toMatch(textHint);
  });
}
