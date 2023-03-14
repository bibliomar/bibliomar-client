import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Bibliologo from "../general/Bibliologo";
import SearchOptions from "./SearchOptions";
import SearchBar from "./searchbar/SearchBar";
import SearchGreeting from "./SearchGreeting";
import SearchResults from "./results/SearchResults";
import Navbar from "../general/navbar/Navbar";
import { Metadata } from "../general/helpers/generalTypes";
import RecommendationScreen from "./recommendations/RecommendationScreen";
import Footer from "../general/Footer";
import {
    ManticoreSearchResponse,
    SearchFormFields,
    SearchRequestStatus,
    SearchRequestStatusOptions,
    SearchRequestType,
} from "./helpers/searchTypes";
import makeSearch from "./helpers/makeSearch";
import "./search.scss";
import SearchMessageScreen from "./loading/SearchMessageScreen";
import SearchPagination from "./SearchPagination";
import Break from "../general/Break";
import SearchStatistics from "./SearchStatistics";
import { FormikProps, useFormik } from "formik";
import { buildSearchObject } from "./helpers/searchFunctions";
import { useWindowSize } from "../general/helpers/useWindowSize";
import { Helmet } from "react-helmet";
import SearchTips from "./SearchTips";

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const buildURLParams = (values: SearchFormFields) => {
    const URLParameters = new URLSearchParams();
    for (const [key, value] of Object.entries(values)) {
        const valueStr = value.toString();
        if (key !== "page") {
            URLParameters.append(key, valueStr);
        }
    }
    return URLParameters;
};

async function populateSearchParams(
    formik: FormikProps<SearchFormFields>,
    searchParams: URLSearchParams
) {
    const queryOnParams = searchParams.get("q");
    const topicOnParams = searchParams.get("topic");
    const languageOnParams = searchParams.get("language");
    const formatOnParams = searchParams.get("format");
    const typeOnParams = searchParams.get("type");
    const fulltextOnParams = searchParams.get("fulltext");

    if (
        queryOnParams != null &&
        queryOnParams !== "" &&
        queryOnParams.length > 3
    ) {
        // Due to setFieldValue async nature (it takes way longer than what it should), and also because of
        // The way the AsyncTypeahead component works on the SearchBar, we need to set the query value directly.
        // Do keep in mind that this doesn't trigger a re-render, so formik.isValid won't be updated.
        formik.values.q = queryOnParams;
    }

    if (
        topicOnParams != null &&
        topicOnParams !== formik.values.topic &&
        ["fiction", "sci-tech"].includes(topicOnParams)
    ) {
        await formik.setFieldValue("topic", topicOnParams, false);
    }

    if (
        typeOnParams != null &&
        typeOnParams !== formik.values.type &&
        ["title", "author", "any"].includes(typeOnParams)
    ) {
        await formik.setFieldValue("type", typeOnParams, false);
    }

    if (
        formatOnParams != null &&
        formatOnParams !== formik.values.format &&
        ["any", "epub", "pdf", "mobi"].includes(formatOnParams)
    ) {
        await formik.setFieldValue("format", formatOnParams, false);
    }

    if (
        languageOnParams != null &&
        languageOnParams !== formik.values.language &&
        ["any", "english", "portuguese"].includes(languageOnParams)
    ) {
        await formik.setFieldValue("language", languageOnParams, false);
    }
    if (
        fulltextOnParams != null &&
        ["true", "false"].includes(fulltextOnParams)
    ) {
        await formik.setFieldValue(
            "fulltext",
            fulltextOnParams === "true",
            false
        );
    }
}

async function getSearchResults(
    values: SearchFormFields,
    topicContext: string,
    offset?: number,
    limit?: number
): Promise<ManticoreSearchResponse | SearchRequestStatusOptions> {
    const requestObject = buildSearchObject(values, offset, limit);

    try {
        const response = await makeSearch(requestObject);
        if (response == null || response.hits == null) {
            return SearchRequestStatusOptions.CONNECTION_ERROR;
        } else if (
            response.hits.total === 0 ||
            response.hits.hits?.length === 0
        ) {
            return SearchRequestStatusOptions.BAD_REQUEST;
        }
        console.log(response);
        return response;
    } catch (e: unknown) {
        console.error(e);
        return SearchRequestStatusOptions.CONNECTION_ERROR;
    }
}

function Search() {
    const { width } = useWindowSize();
    const [helmetTitle, setHelmetTitle] = useState<string | undefined>(
        undefined
    );
    const [optionsHidden, setOptionsHidden] = useState<boolean>(true);

    // Query related states
    const initialRequestMade = useRef<boolean>(false);
    const [searchResults, setSearchResults] = useState<Metadata[]>([]);
    const [requestStatus, setRequestStatus] = useState<
        SearchRequestStatus | undefined
    >(undefined);
    const [topicContext, setTopicContext] = useState("any");
    const formRef = useRef<HTMLFormElement>(null);
    const [searchParams, setSearchParameters] = useSearchParams();

    // Paging related states and functions
    const itemsPerPage = 24;
    let itemsPerRow = 6;
    if (width < 768) {
        itemsPerRow = 2;
    } else if (width < 992) {
        itemsPerRow = 4;
    }
    const paginableResults = useRef<number>(0);
    const totalItems = useRef<number>(0);
    const currentOffset = useRef<number>(0);

    const [tookTime, setTookTime] = useState<number>(0);

    const [pageCount, setPageCount] = useState<number>(0);

    // Formik
    const formik = useFormik<SearchFormFields>({
        initialValues: {
            q: "",
            topic: "any",
            type: "any",
            format: "any",
            language: "any",
            fulltext: false,
        },

        onSubmit: async (values) => {
            await makeSearchRequest(values);
        },
    });

    useEffect(() => {
        let ignore = false;
        if (pageCount > 0 || ignore) {
            return;
        }

        let submit: number | undefined = undefined;
        populateSearchParams(formik, searchParams).then(() => {
            if (formik.values.q.length < 3 || ignore) {
                return;
            }

            submit = window.setTimeout(async () => {
                if (!ignore) {
                    await formik.submitForm();
                }

                // 500ms gives enough time for everything to render.
            }, 500);
        });

        return () => {
            ignore = true;
            clearTimeout(submit);
        };
    }, [searchParams]);

    const handlePaginationClick = async (evt: any) => {
        // Current page in index format (starts at 0)
        const currentPageIndex = evt.selected;
        const currentPageNum = currentPageIndex + 1;

        const newOffset =
            (currentPageIndex * itemsPerPage) % paginableResults.current;

        currentOffset.current = newOffset;

        await makePaginationRequest(formik.values);
    };

    const resetSearchState = (paginationRequest: boolean) => {
        // Resets relevant values to their initial values
        if (!paginationRequest) {
            currentOffset.current = 0;
            totalItems.current = 0;
            setPageCount(0);
            setHelmetTitle(undefined);
        }
        setSearchResults([]);
        setTookTime(0);
        setRequestStatus(undefined);
    };

    // Organizes the API request, setups and retrieves results from cache.
    // This will use the currentOffset and itemsPerPage variables to determine the offset to use.
    const requestOrganizer = async (
        values: SearchFormFields
    ): Promise<SearchRequestStatusOptions | undefined> => {
        // Appends the current page to the formData object.
        let resultsList: Metadata[] = [];
        const q = values.q;
        if (q == null || q.trim().length < 3) {
            return SearchRequestStatusOptions.BAD_QUERY;
        }

        const request = await getSearchResults(
            values,
            topicContext,
            currentOffset.current,
            currentOffset.current + itemsPerPage
        );

        if (typeof request === "number") {
            return request;
        }
        if (request == null) {
            return SearchRequestStatusOptions.CONNECTION_ERROR;
        }

        if (
            request.hits == null ||
            request.hits.hits == null ||
            request.hits.hits.length === 0
        ) {
            return SearchRequestStatusOptions.BAD_REQUEST;
        }

        if (request.took != null) {
            setTookTime(request.took);
        }

        if (request.hits.total != null) {
            totalItems.current = request.hits.total;
        }

        paginableResults.current =
            totalItems.current > 1000 ? 1000 : totalItems.current;

        setPageCount(Math.ceil(paginableResults.current / itemsPerPage));

        resultsList = request.hits.hits;

        if (resultsList.length > 0) {
            setSearchResults(resultsList);
            return;
        } else {
            return SearchRequestStatusOptions.BAD_REQUEST;
        }
    };

    const makeSearchRequest = async (values: SearchFormFields) => {
        resetSearchState(false);
        initialRequestMade.current = true;
        const requestType = SearchRequestType.SEARCH;
        const URLParameters = buildURLParams(values);
        // The searchParameters on the first search request should be set
        // to overwrite search history. This keeps the back history clean for some actions.
        // (e.g. when selecting a recommendation)
        setSearchParameters(URLParameters, { replace: true });
        setRequestStatus({
            type: requestType,
            status: SearchRequestStatusOptions.SENDING,
        });

        // The function responsible for setting states and making the actual request.
        // Returns enum value (number) if the request fails.
        const searchRequest = await requestOrganizer(values);
        if (searchRequest != null && typeof searchRequest === "number") {
            setRequestStatus({
                type: requestType,
                status: searchRequest,
            });
            return;
        }
        // Sets window title to current search query.
        setHelmetTitle(values.q);
        /**
         * The "LOADING" state makes the search experience arbitraty slower.
         * There's no real file loading progress being tracked, or even a "file loading" process at all.
         setRequestStatus({
            type: requestType,
            status: SearchRequestStatusOptions.LOADING,
        });

         await sleep(2000);
         */

        setRequestStatus((prevState) => {
            const newRequestStatus = {
                type: requestType,
                status: SearchRequestStatusOptions.SUCCESS,
            };
            if (prevState != undefined) {
                if (prevState.type === SearchRequestType.SEARCH) {
                    // Nested for better readability.
                    if (
                        prevState.status ===
                            SearchRequestStatusOptions.SENDING ||
                        prevState.status === SearchRequestStatusOptions.LOADING
                    ) {
                        return newRequestStatus;
                    }
                }
            }
            // If the checks fail.
            return prevState;
        });

        // Since we are doing async forced waiting and there's a chance that another component may change the requestStatus,
        // it's recommended to implement checks in the setState callback.
        // Be mindful that state changes are async by nature.

        await sleep(3000);

        setRequestStatus((prevState) => {
            if (prevState != undefined) {
                if (prevState.type === SearchRequestType.SEARCH) {
                    // Nested for better readability.
                    if (
                        prevState.status ===
                            SearchRequestStatusOptions.LOADING ||
                        prevState.status === SearchRequestStatusOptions.SUCCESS
                    ) {
                        return undefined;
                    }
                }
            }
            // If the cheks fail.
            return prevState;
        });
    };

    const makePaginationRequest = async (values: SearchFormFields) => {
        resetSearchState(true);
        const requestType = SearchRequestType.PAGINATION;
        const URLParameters = buildURLParams(values);
        setSearchParameters(URLParameters, { replace: false });
        setRequestStatus({
            type: requestType,
            status: SearchRequestStatusOptions.SENDING,
        });
        const searchRequest = await requestOrganizer(values);

        if (Array.isArray(searchRequest)) {
            setSearchResults(searchRequest);
        } else if (typeof searchRequest === "number") {
            setRequestStatus({
                type: requestType,
                status: searchRequest,
            });
            return;
        }
        setRequestStatus(undefined);
    };

    return (
        <div className="container-fluid min-vh-100 d-flex flex-column">
            <Helmet>
                {helmetTitle ? <title>{helmetTitle} - Bibliomar</title> : null}
            </Helmet>
            <div className="row ">
                <div className="col mt-3">
                    <Navbar activeItem="home" />
                </div>
            </div>

            <Bibliologo />
            <SearchGreeting />
            <SearchTips />
            <form ref={formRef} onSubmit={formik.handleSubmit}>
                <SearchOptions
                    hidden={optionsHidden}
                    topicContext={topicContext}
                    setTopicContext={setTopicContext}
                    setPageNumber={setPageCount}
                    formik={formik}
                />
                <SearchBar
                    setOptionsHidden={setOptionsHidden}
                    topicContext={topicContext}
                    formik={formik}
                />
            </form>

            <div className="d-flex justify-content-center w-100">
                <div className="d-flex flex-wrap justify-content-center search-results-container">
                    <SearchMessageScreen requestStatus={requestStatus} />
                    <Break />
                    <SearchStatistics
                        disabled={searchResults.length === 0}
                        totalResults={totalItems.current}
                        tookTime={tookTime}
                        paginableResults={paginableResults.current}
                        offset={currentOffset.current}
                        itemsPerPage={itemsPerPage}
                    />
                    <Break />
                    <SearchResults
                        visibleResults={searchResults}
                        itemsPerRow={itemsPerRow}
                    />
                    <Break />
                    <SearchPagination
                        pageChangeHandler={handlePaginationClick}
                        pageCount={pageCount}
                    />
                </div>
            </div>

            <RecommendationScreen disabled={pageCount > 0} />
            <Footer />
        </div>
    );
}

export default Search;
