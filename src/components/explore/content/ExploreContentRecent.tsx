import { useTranslation } from "react-i18next";
import { Metadata } from "../../general/helpers/generalTypes";
import { useEffect, useRef, useState } from "react";
import makeSearch from "../../search/helpers/makeSearch";
import ExploreContentPagination from "./ExploreContentPagination";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import BlankLoadingSpinner from "../../general/BlankLoadingSpinner";
import { getMetadataInfoPath } from "../../general/helpers/generalFunctions";
import ExploreContentFigure from "./ExploreContentFigure";
import { ManticoreSearchResponse } from "../../search/helpers/searchTypes";
import useSlicedMetadatas from "../../general/helpers/useSlicedMetadatas";
import { useWindowSize } from "../../general/helpers/useWindowSize";
import { useFormik } from "formik";

interface RecentFormValues {
    language: string;
}

function buildSearchObject(values: RecentFormValues) {
    const searchObject = {
        index: "libgen",
        query: {
            query_string: "",
        },
        sort: [
            {
                timeadded: "desc",
            },
        ],
        limit: 100,
    };

    if (values.language != undefined && values.language !== "any") {
        searchObject.query.query_string = `@language ${values.language}`;
    }
    return searchObject;
}

export default function ExploreContentRecent() {
    const { t } = useTranslation();
    const { width } = useWindowSize();
    const [requestError, setRequestError] = useState<boolean>(false);
    const [requestDone, setRequestDone] = useState<boolean>(false);

    const formik = useFormik<RecentFormValues>({
        initialValues: {
            language: "any",
        },
        onSubmit: async (values) => {
            setRequestDone(false);
            setRequestError(false);
            const searchObject = buildSearchObject(values);
            const response = await makeSearch(searchObject);
            if (response) {
                setRequestDone(true);
                console.log(response);
                recentContent.current = response;
                if (recentContent.current == null) {
                    return;
                }

                const searchHits = recentContent.current.hits.hits;
                if (searchHits == undefined || searchHits.length === 0) {
                    setRequestError(true);
                    setRequestDone(true);
                    return;
                }

                const paginableItems = searchHits.length;
                setVisibleContent(searchHits.slice(0, itemsPerPage));
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                setPageCount(Math.ceil(paginableItems / itemsPerPage));
            } else {
                setRequestDone(true);
                setRequestError(true);
            }
        },
    });

    // IMPORTANT: This counts the total items available in the ManticoreIndex.
    // Not to be confused with the length of the search result.
    // Do NOT use this to set the page count.
    const totalItems = useRef<number>(0);
    const recentContent = useRef<ManticoreSearchResponse | undefined>(
        undefined
    );
    const [visibleContent, setVisibleContent] = useState<Metadata[]>([]);

    let itemsPerRow = 6;
    if (width < 768) {
        itemsPerRow = 2;
    } else if (width < 992) {
        itemsPerRow = 3;
    }

    const slicedContent = useSlicedMetadatas(visibleContent, itemsPerRow);

    // Pagination
    const [pageCount, setPageCount] = useState<number>(0);
    const itemsPerPage = 24;
    const bootstrapColSize = 12;

    const handlePageClick = (evt: any) => {
        if (recentContent.current == undefined) {
            return;
        }
        const searchHits = recentContent.current.hits.hits;
        if (searchHits == undefined || searchHits.length === 0) {
            return;
        }
        const newOffset = (evt.selected * itemsPerPage) % searchHits.length;
        setVisibleContent(
            searchHits.slice(newOffset, newOffset + itemsPerPage)
        );
    };

    const renderRecentContent = () => {
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
                            const timeout = internalCounter * 750;
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
            {recentContent.current != undefined ? (
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
            {renderRecentContent()}
            {slicedContent.length > 0 ? (
                <div className="d-flex w-100">
                    <ExploreContentPagination
                        pageChangeHandler={handlePageClick}
                        pageCount={pageCount}
                    />
                </div>
            ) : null}
        </MDBContainer>
    );
}
