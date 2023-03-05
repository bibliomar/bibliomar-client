import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
} from "mdb-react-ui-kit";
import axios, { AxiosRequestConfig } from "axios";
import {
    getMetadataInfoPath,
    serverUrl,
} from "../../general/helpers/generalFunctions";
import { Metadata } from "../../general/helpers/generalTypes";
import { useEffect, useRef, useState } from "react";
import ExploreContentPagination from "./ExploreContentPagination";
import { useWindowSize } from "../../general/helpers/useWindowSize";
import useSlicedMetadatas from "../../general/helpers/useSlicedMetadatas";
import BlankLoadingSpinner from "../../general/BlankLoadingSpinner";
import MetadataHoverableFigure from "../../general/figure/MetadataHoverableFigure";
import ExploreContentFigure from "./ExploreContentFigure";
import { useTranslation } from "react-i18next";
import { ManticoreSearchResponse } from "../../search/helpers/searchTypes";
import { useFormik } from "formik";
import makeSearch from "../../search/helpers/makeSearch";
import search from "../../search/Search";

interface PopularFormValues {
    language: string;
}

function buildSearchObject(values: PopularFormValues) {
    const searchObject = {
        index: "statistics",
        query: {
            query_string: "",
        },
        sort: [
            {
                views: "desc",
            },
            {
                downloads: "desc",
            },
        ],
        limit: 100,
    };

    if (values.language != undefined && values.language !== "any") {
        searchObject.query.query_string = `@language ${values.language}`;
    }
    return searchObject;
}

export default function ExploreContentPopular() {
    const { t } = useTranslation();
    const { width } = useWindowSize();
    const [requestError, setRequestError] = useState<boolean>(false);
    const [requestDone, setRequestDone] = useState<boolean>(true);
    const topContent = useRef<ManticoreSearchResponse | undefined>(undefined);
    const [visibleContent, setVisibleContent] = useState<Metadata[]>([]);

    const formik = useFormik<PopularFormValues>({
        initialValues: {
            language: "any",
        },
        onSubmit: async (values) => {
            setRequestDone(false);
            setRequestError(false);
            const searchObject = buildSearchObject(values);
            const response = await makeSearch(searchObject);
            if (response) {
                console.log(response);
                topContent.current = response;
                if (
                    topContent.current == undefined ||
                    topContent.current.hits == undefined
                ) {
                    return;
                }

                const searchHits = topContent.current.hits.hits;
                if (searchHits == undefined || searchHits.length === 0) {
                    setRequestError(true);
                    setRequestDone(true);
                    return;
                }

                const paginableItems = searchHits.length;
                setVisibleContent(searchHits.slice(0, itemsPerPage));
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                setPageCount(Math.ceil(paginableItems / itemsPerPage));
                setRequestDone(true);
            } else {
                setRequestDone(true);
                setRequestError(true);
            }
        },
    });

    let itemsPerRow = 6;
    if (width < 768) {
        itemsPerRow = 2;
    } else if (width < 992) {
        itemsPerRow = 3;
    }

    const slicedContent = useSlicedMetadatas(visibleContent, itemsPerRow);

    // Pagination
    const [pageCount, setPageCount] = useState<number>(0);
    const itemsPerPage = 12;
    const bootstrapColSize = 12;

    const handlePageClick = (evt: any) => {
        if (
            topContent.current == undefined ||
            topContent.current.hits == undefined
        ) {
            return;
        }
        const searchHits = topContent.current.hits.hits;
        if (searchHits == undefined || searchHits.length === 0) {
            return;
        }
        const newOffset = (evt.selected * itemsPerPage) % searchHits.length;
        setVisibleContent(
            searchHits.slice(newOffset, newOffset + itemsPerPage)
        );
    };

    const renderTopContent = () => {
        let internalCounter = 0;
        if (!requestDone) {
            return <BlankLoadingSpinner />;
        } else if (requestError) {
            return <p>{t("explore:nenhumResultadoEncontrado")}</p>;
        } else if (visibleContent.length > 0 && slicedContent.length > 0) {
            return slicedContent.map((metadatas, rowIndex) => {
                return (
                    <MDBRow
                        key={rowIndex}
                        className="d-flex flex-nowrap w-100 gx-2"
                    >
                        {metadatas.map((metadata, eleIndex) => {
                            const href = getMetadataInfoPath(
                                metadata.topic,
                                metadata.md5
                            );
                            internalCounter++;
                            const timeout = internalCounter * 1000;
                            return (
                                <MDBCol
                                    size={Math.ceil(
                                        bootstrapColSize / itemsPerRow
                                    )}
                                    key={eleIndex}
                                >
                                    <ExploreContentFigure
                                        metadata={metadata}
                                        href={href}
                                        timeout={timeout}
                                    />
                                </MDBCol>
                            );
                        })}
                    </MDBRow>
                );
            });
        }
    };

    useEffect(() => {
        if (formik.isSubmitting) {
            return;
        } else {
            formik.submitForm().then();
        }
    }, [formik.values]);

    return (
        <MDBContainer fluid className="p-1">
            {topContent.current != undefined ? (
                <form className="w-100">
                    <div className="d-flex flex-nowrap w-100 ms-2 me-2 mb-3">
                        <div className="d-flex flex-column justify-content-center">
                            <label className="me-2" htmlFor="language">
                                {t("search:linguagem")}
                            </label>
                        </div>
                        <div className="col-6 col-md-4 col-lg-2">
                            <select
                                onChange={formik.handleChange}
                                value={formik.values.language}
                                className="form-control form-select"
                                name="language"
                                id="language"
                            >
                                <option value="any">
                                    {t("search:qualquer")}
                                </option>
                                <option value="portuguese">
                                    {t("search:portugus")}
                                </option>
                                <option value="english">
                                    {t("search:ingls")}
                                </option>
                                <option value="spanish">
                                    {t("search:espanhol")}
                                </option>
                                <option value="french">
                                    {t("search:francs")}
                                </option>
                            </select>
                        </div>
                    </div>
                </form>
            ) : null}
            {renderTopContent()}
            {requestDone && !requestError && slicedContent.length > 0 ? (
                <div className="d-flex w-100 mt-auto">
                    <ExploreContentPagination
                        pageChangeHandler={handlePageClick}
                        pageCount={pageCount}
                    />
                </div>
            ) : null}
        </MDBContainer>
    );
}
