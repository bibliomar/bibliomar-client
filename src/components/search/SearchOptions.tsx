import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SmoothCollapse from "react-smooth-collapse";
import { MDBSwitch } from "mdb-react-ui-kit";
import { Trans, useTranslation } from "react-i18next";
import { FormikConfig, FormikProps } from "formik";
import { SearchFormFields } from "./helpers/searchTypes";

interface SearchOptionsProps {
    topicContext: string;
    setTopicContext: Dispatch<SetStateAction<string>>;
    setPageNumber: Dispatch<SetStateAction<number>>;
    formik: FormikProps<SearchFormFields>;
    hidden: boolean;
}

// TODO: Implement formik usage.

function SearchOptions({
    topicContext,
    setTopicContext,
    hidden,
    formik,
}: SearchOptionsProps) {
    const { t } = useTranslation();
    const fulltextOn = formik.values.fulltext;

    return (
        <SmoothCollapse expanded={!hidden} eagerRender>
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
                                id="topicAny"
                                checked={formik.values.topic === "any"}
                                onChange={formik.handleChange}
                                disabled={formik.values.fulltext}
                            />
                            <label htmlFor="topicAny" className="mb-1">
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
                                id="topicAny"
                                checked={formik.values.topic === "scitech"}
                                onChange={formik.handleChange}
                                disabled={fulltextOn}
                            />
                            <label htmlFor="topicAny" className="mb-1">
                                {t("search:nonfiction")}
                            </label>
                        </div>
                        <div className="form-check form-check">
                            <input
                                type="radio"
                                value="fiction"
                                className="form-check-input"
                                name="topic"
                                id="topicFiction"
                                checked={formik.values.topic === "fiction"}
                                onChange={formik.handleChange}
                                disabled={fulltextOn}
                            />
                            <label htmlFor="topicFiction " className="mb-1">
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
                                checked={formik.values.type === "any"}
                                onChange={formik.handleChange}
                                disabled={formik.values.fulltext}
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
                                checked={formik.values.type === "title"}
                                onChange={formik.handleChange}
                                disabled={formik.values.fulltext}
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
                                checked={formik.values.type === "author"}
                                onChange={formik.handleChange}
                                disabled={formik.values.fulltext}
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
                        value={formik.values.format}
                        onChange={formik.handleChange}
                        className="form-control form-select"
                        name="format"
                        id="format"
                        disabled={formik.values.fulltext}
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
                        value={formik.values.language}
                        onChange={formik.handleChange}
                        className="form-control form-select"
                        name="language"
                        id="searchlang"
                        disabled={formik.values.fulltext}
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
                        checked={formik.values.fulltext}
                        onChange={formik.handleChange}
                        label={t("search:enableFulltext")}
                    />
                </div>
            </div>
        </SmoothCollapse>
    );
}

export default SearchOptions;
