import i18n, { Resource } from "i18next";
import { initReactI18next } from "react-i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";

import searchPT from "../locales/pt/search.json";
import aboutPT from "../locales/pt/about.json";

import searchEN from "../locales/en/search.json";
import aboutEN from "../locales/en/about.json";

const resources: Resource = {
    pt: {
        search: searchPT,
        about: aboutPT,
    },
    en: {
        search: searchEN,
        about: aboutEN,
    },
};

i18n.use(initReactI18next).use(I18nextBrowserLanguageDetector).init({
    fallbackLng: "pt",
    lng: "pt",
    defaultNS: false,
    resources: resources,
});
