import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Bibliologo from "../general/Bibliologo";
import SearchOptions from "./SearchOptions";
import SearchBar from "./searchbar/SearchBar";
import Greeting from "./Greeting";
import SearchResultScreen from "./results/SearchResultScreen";
import Navbar from "../general/navbar/Navbar";
import { Book } from "../general/helpers/generalTypes";
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
import "./search.css";
import SearchMessageScreen from "./loading/SearchMessageScreen";
import SearchPagination from "./SearchPagination";
import Break from "../general/Break";
import SearchStatistics from "./SearchStatistics";
import { buildSearchObject } from "../general/helpers/generalFunctions";
import { FormikProps, useFormik } from "formik";

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
    if (
        queryOnParams != null &&
        queryOnParams !== "" &&
        queryOnParams.length > 3
    ) {
        await formik.setFieldValue("q", queryOnParams, false);
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
    const optionsHiddenSetting = localStorage.getItem("options-hidden");
    const [optionsHidden, setOptionsHidden] = useState<boolean>(
        optionsHiddenSetting ? optionsHiddenSetting === "true" : true
    );

    // Query related states
    const initialRequestMade = useRef<boolean>(false);
    const [searchResults, setSearchResults] = useState<Book[]>([]);
    const [requestStatus, setRequestStatus] = useState<
        SearchRequestStatus | undefined
    >(undefined);
    const [topicContext, setTopicContext] = useState("any");
    const formRef = useRef<HTMLFormElement>(null);
    const [searchParams, setSearchParameters] = useSearchParams();

    // Paging related states and functions
    const itemsPerPage = 20;
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
        validate: (values) => {
            const errors: Partial<typeof values> = {};
            if (!values.q) {
                errors.q = "Required";
            } else if (values.q.length > 100) {
                errors.q = "Must be 100 characters or less";
            } else if (values.q.length < 3) {
                errors.q = "Must be 3 characters or more";
            }
            return errors;
        },

        onSubmit: async (values) => {
            await makeSearchRequest(values);
        },
    });

    useEffect(() => {
        if (initialRequestMade.current) {
            return;
        }

        let submit: number | undefined = undefined;

        populateSearchParams(formik, searchParams).then(() => {
            submit = window.setTimeout(async () => {
                await formik.submitForm();

                // 500ms gives enough time for everything to render.
            }, 500);
        });

        return () => clearTimeout(submit);
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

    const resetSearchState = (pagination: boolean) => {
        // Resets relevant values to their initial values
        if (!pagination) {
            currentOffset.current = 0;
            totalItems.current = 0;
            setPageCount(0);
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
        let resultsList: Book[] = [];
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
        setSearchParameters(URLParameters, { replace: false });

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
        <div className="like-body bg-alt">
            <div className="container-fluid min-vh-100 d-flex flex-column">
                <div className="row ">
                    <div className="col mt-3">
                        <Navbar activeItem="home" />
                    </div>
                </div>

                <Bibliologo />
                <Greeting />
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
                    <div className="d-flex flex-wrap justify-content-center search-results-div">
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
                        <SearchResultScreen visibleResults={searchResults} />
                        <Break />
                        <SearchPagination
                            pageChangeHandler={handlePaginationClick}
                            pageCount={pageCount}
                        />
                    </div>
                </div>

                <RecommendationScreen disabled={searchResults.length > 0} />
                <Footer />
            </div>
        </div>
    );
}

export default Search;
