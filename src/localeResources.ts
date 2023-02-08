import { Resource } from "i18next";

import searchPT from "../locales/pt/search.json";
import aboutPT from "../locales/pt/about.json";
import navbarPT from "../locales/pt/navbar.json";
import figurePT from "../locales/pt/figure.json";
import bookinfoPT from "../locales/pt/bookinfo.json";
import libraryPT from "../locales/pt/library.json";
import faqPT from "../locales/pt/faq.json";
import generalPT from "../locales/pt/general.json";
import userPT from "../locales/pt/user.json";

import searchEN from "../locales/en/search.json";
import aboutEN from "../locales/en/about.json";
import navbarEN from "../locales/en/navbar.json";
import figureEN from "../locales/en/figure.json";
import bookinfoEN from "../locales/en/bookinfo.json";
import libraryEN from "../locales/en/library.json";
import faqEN from "../locales/en/faq.json";
import generalEN from "../locales/en/general.json";
import userEN from "../locales/en/user.json";

const resources: Resource = {
    pt: {
        search: searchPT,
        about: aboutPT,
        navbar: navbarPT,
        figure: figurePT,
        bookinfo: bookinfoPT,
        library: libraryPT,
        faq: faqPT,
        general: generalPT,
        user: userPT,
    },

    en: {
        search: searchEN,
        about: aboutEN,
        navbar: navbarEN,
        figure: figureEN,
        bookinfo: bookinfoEN,
        library: libraryEN,
        faq: faqEN,
        general: generalEN,
        user: userEN,
    },
};

export default resources;
