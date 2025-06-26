import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import arInstitute from "./locale/ar/institute.json";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {},
    },
    ar: { translation: arInstitute },
  },
});

export default i18n;
