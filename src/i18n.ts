import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import resources from "./localeResources";

i18n.use(initReactI18next).use(I18nextBrowserLanguageDetector).init({
    fallbackLng: "pt",
    defaultNS: false,
    resources: resources,
});
