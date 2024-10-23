import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "../../locale/ar.json";
import en from "../../locale/en.json";

const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
};

const defaultLanguage =
  typeof window !== "undefined" && localStorage.getItem("defaultLanguage")
    ? localStorage.getItem("defaultLanguage")
    : "en";

if (typeof window !== "undefined" && !localStorage.getItem("defaultLanguage")) {
  localStorage.setItem("defaultLanguage", "en");
}

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLanguage,
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
