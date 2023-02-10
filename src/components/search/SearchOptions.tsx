import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
    MDBCheckbox,
    MDBCol,
    MDBCollapse,
    MDBRadio,
    MDBSwitch,
    MDBTooltip,
} from "mdb-react-ui-kit";
import { Trans, useTranslation } from "react-i18next";

interface SearchOptionsProps {
    topicContext: string;
    setTopicContext: Dispatch<SetStateAction<string>>;
    setPageNumber: Dispatch<SetStateAction<number>>;
    hidden: boolean;
}

// TODO: Implement formik usage.

function SearchOptions({
    topicContext,
    setTopicContext,
    setPageNumber,
    hidden,
}: SearchOptionsProps) {
    const { t } = useTranslation();
    let [searchParams, setSearchParams] = useSearchParams();
    let [type, setType] = useState("any");
    let [formatSelect, setFormatSelect] = useState("any");
    let [languageSelect, setLanguageSelect] = useState("any");
    let [fulltextOn, setFulltextOn] = useState(false);

    const topic = searchParams.get("topic");
    const searchType = searchParams.get("any");
    const format = searchParams.get("format");
    const language = searchParams.get("language");
    const fulltext = searchParams.get("fulltext");

    // Change based on URL
    useEffect(() => {
        if (
            topic != null &&
            topic !== topicContext &&
            ["fiction", "sci-tech"].includes(topic)
        ) {
            setTopicContext(topic);
        }
        if (
            searchType != null &&
            searchType !== type &&
            ["title", "author", "any"].includes(searchType)
        ) {
            setType(searchType);
        }
        if (
            format != null &&
            format !== formatSelect &&
            ["any", "epub", "pdf", "mobi"].includes(format)
        ) {
            setFormatSelect(format);
        }
        if (
            language != null &&
            language !== languageSelect &&
            ["any", "english", "portuguese"].includes(language)
        ) {
            setLanguageSelect(language);
        }
        if (fulltext != null && fulltext.trim() === "on") {
            setFulltextOn(true);
        }
    }, [searchParams]);

    // noinspection AllyJsxHardcodedStringInspection
    return (
        <MDBCollapse show={!hidden}>
            <div className="row d-flex flex-row justify-content-center">
                <div className="col-lg-2 col-5">
                    <div id="searchcat">
                        <label className="" htmlFor="searchcat">
                            {t("search:topico")}
                        </label>
                        <div className="form-check form-check">
                            <input
                                type="radio"
                                value="any"
                                className="form-check-input"
                                name="topic"
                                id="searchcatany"
                                checked={topicContext === "any"}
                                onChange={() => {
                                    setTopicContext("any");
                                }}
                                disabled={fulltextOn}
                            />
                            <label htmlFor="searchcatany" className="mb-1">
                                <Trans
                                    ns="search"
                                    i18nKey="todas"
                                    components={{
                                        b: <br />,
                                    }}
                                />
                            </label>
                        </div>
                        <div className="form-check form-check">
                            <input
                                type="radio"
                                value="scitech"
                                className="form-check-input"
                                name="topic"
                                id="searchcatnonfiction"
                                checked={topicContext === "scitech"}
                                onChange={() => {
                                    setTopicContext("scitech");
                                }}
                                disabled={fulltextOn}
                            />
                            <label
                                htmlFor="searchcatnonfiction"
                                className="mb-1"
                            >
                                {t("search:nonfiction")}
                            </label>
                        </div>
                        <div className="form-check form-check">
                            <input
                                type="radio"
                                value="fiction"
                                className="form-check-input"
                                name="topic"
                                id="searchcatfiction"
                                checked={topicContext === "fiction"}
                                onChange={() => {
                                    setTopicContext("fiction");
                                }}
                                disabled={fulltextOn}
                            />
                            <label htmlFor="searchcatfiction " className="mb-1">
                                {t("search:fiction")}
                            </label>
                        </div>
                    </div>
                </div>

                <div className="col-lg-2 col-5">
                    <div id="searchby" className="">
                        <label htmlFor="searchby">
                            {t("search:pesquisarPor")}
                        </label>
                        <div className="form-check form-check">
                            <input
                                type="radio"
                                value="any"
                                className="form-check-input"
                                name="type"
                                id="searchbyany"
                                checked={type === "any"}
                                onChange={() => {
                                    setType("any");
                                }}
                                disabled={fulltextOn}
                            />
                            <label htmlFor="searchbytitle" className="mb-1">
                                {t("search:todos2")}
                            </label>
                        </div>
                        <div className="form-check form-check">
                            <input
                                type="radio"
                                value="title"
                                className="form-check-input"
                                name="type"
                                id="searchbytitle"
                                checked={type === "title"}
                                onChange={() => {
                                    setType("title");
                                }}
                                disabled={fulltextOn}
                            />
                            <label htmlFor="searchbytitle" className="mb-1">
                                {t("search:title")}
                            </label>
                        </div>
                        <div className="form-check form-check">
                            <input
                                type="radio"
                                value="author"
                                className="form-check-input"
                                name="type"
                                id="searchbyauthorinput"
                                checked={type === "author"}
                                onChange={() => {
                                    setType("author");
                                }}
                                disabled={fulltextOn}
                            />
                            <label
                                id="searchbyauthorlabel"
                                htmlFor="searchbyauthorinput"
                            >
                                {t("search:author")}
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4 d-flex flex-row justify-content-center">
                <div className="col-lg-2 col-5">
                    <label htmlFor="format">{t("search:formato")}</label>
                    <select
                        value={formatSelect}
                        onChange={(e) => setFormatSelect(e.target.value)}
                        className="form-control form-select"
                        name="format"
                        id="format"
                        disabled={fulltextOn}
                    >
                        <option className="text-dark" value="any">
                            {t("search:todos2")}
                        </option>
                        <option value="epub" className="text-dark">
                            EPUB
                        </option>
                        <option value="pdf" className="text-dark">
                            PDF
                        </option>
                        <option value="mobi" className="text-dark">
                            MOBI
                        </option>
                    </select>
                </div>

                <div className="col-lg-2 col-5">
                    <label className="" htmlFor="searchlang">
                        {t("search:linguagem")}
                    </label>

                    <select
                        value={languageSelect}
                        onChange={(e) => setLanguageSelect(e.target.value)}
                        className="form-control form-select"
                        name="language"
                        id="searchlang"
                        disabled={fulltextOn}
                    >
                        <option value="any">{t("search:qualquer")}</option>
                        <option value="portuguese">
                            {t("search:portugus")}
                        </option>
                        <option value="english">{t("search:ingls")}</option>
                    </select>
                </div>
            </div>
            <div className="row mt-4 d-flex flex-row flex-wrap justify-content-center">
                <div className="mt-1 d-flex justify-content-center">
                    <MDBSwitch
                        name="fulltext"
                        checked={fulltextOn}
                        onChange={() => {
                            setFulltextOn(!fulltextOn);
                        }}
                        label={t("search:enableFulltext")}
                    />
                </div>
            </div>
        </MDBCollapse>
    );
}

export default SearchOptions;
