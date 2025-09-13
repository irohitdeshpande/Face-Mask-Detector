import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

import translationEn from "./locales/en/translation.json";
import translationEs from "./locales/es/translation.json";

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .init({
    debug: false,
    lng: "en",
    fallbackLng: "en",

    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },

    resources: {
      en: translationEn,
      es: translationEs,
    },
    ns: [],
    defaultNS: undefined,
  });

export default i18n;