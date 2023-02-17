import { Resource } from "i18next";

import searchPT from "../locales/pt/search.json";
import aboutPT from "../locales/pt/about.json";
import navbarPT from "../locales/pt/navbar.json";
import figurePT from "../locales/pt/figure.json";
import metadatainfoPT from "../locales/pt/metadatainfo.json";
import libraryPT from "../locales/pt/library.json";
import faqPT from "../locales/pt/faq.json";
import generalPT from "../locales/pt/general.json";
import userPT from "../locales/pt/user.json";
import readerPT from "../locales/pt/reader.json";

import searchEN from "../locales/en/search.json";
import aboutEN from "../locales/en/about.json";
import navbarEN from "../locales/en/navbar.json";
import figureEN from "../locales/en/figure.json";
import metadatainfoEN from "../locales/en/metadatainfo.json";
import libraryEN from "../locales/en/library.json";
import faqEN from "../locales/en/faq.json";
import generalEN from "../locales/en/general.json";
import userEN from "../locales/en/user.json";
import readerEN from "../locales/en/reader.json";

const resources: Resource = {
    pt: {
        search: searchPT,
        about: aboutPT,
        navbar: navbarPT,
        figure: figurePT,
        metadatainfo: metadatainfoPT,
        library: libraryPT,
        faq: faqPT,
        general: generalPT,
        user: userPT,
        reader: readerPT,
    },

    en: {
        search: searchEN,
        about: aboutEN,
        navbar: navbarEN,
        figure: figureEN,
        metadatainfo: metadatainfoEN,
        library: libraryEN,
        faq: faqEN,
        general: generalEN,
        user: userEN,
        reader: readerEN,
    },
};

export default resources;
