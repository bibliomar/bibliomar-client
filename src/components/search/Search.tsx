import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Bibliologo from "../general/Bibliologo";
import SearchOptions from "./SearchOptions";
import SearchBar from "./SearchBar";
import Greeting from "./Greeting";
import SearchResultScreen from "./results/SearchResultScreen";
import Navbar from "../general/navbar/Navbar";
import { Book } from "../general/helpers/generalTypes";
import RecommendationScreen from "./recommendations/RecommendationScreen";
import Footer from "../general/Footer";
import {
    ManticoreSearchResponse,
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

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const buildURLParams = (formData: FormData) => {
    const URLParameters = new URLSearchParams();
    for (const [key, value] of formData) {
        const valueStr = value.toString();
        if (key !== "page") {
            URLParameters.append(key, valueStr);
        }
    }
    return URLParameters;
};

function buildSearchObject(
    formData: FormData,
    topicContext: string,
    offset?: number,
    limit?: number
): Promise<object> {
    const type = formData.get("type");
    const query = formData.get("q");
    const format = formData.get("format");
    const language = formData.get("language");
    const fulltext = formData.get("fulltext");

    // PS: Field order is VERY important here.
    // The user query should be at the start of the string, and everything else at the end.
    let finalQueryString = "";

    if (type != null) {
        switch (type) {
            case "title":
                if (finalQueryString.includes("@title")) {
                    finalQueryString.replace("@title", `@title ${query}`);
                } else {
                    finalQueryString += `@title ${query} `;
                }
                break;
            case "author":
                if (finalQueryString.includes("@author")) {
                    finalQueryString.replace("@author", `@author ${query}`);
                } else {
                    finalQueryString += `@author ${query} `;
                }
                break;
            case "any":
                finalQueryString += `${query} `;
                break;
        }
    }

    if (format != null && format !== "any") {
        if (finalQueryString.includes("@extension")) {
            finalQueryString.replace("@extension", `@extension ${format} `);
        } else {
            finalQueryString += `@extension ${format} `;
        }
    }
    if (language != null && language !== "any") {
        if (finalQueryString.includes("@language")) {
            finalQueryString.replace("@language", `@language ${language} `);
        } else {
            finalQueryString += `@language ${language} `;
        }
    }

    if (topicContext === "fiction") {
        finalQueryString += "@topic fiction ";
    } else if (topicContext === "scitech") {
        finalQueryString += "@topic scitech ";
    }

    if (fulltext != null && query) {
        if (typeof query === "string") {
            finalQueryString = query;
        }
    }

    finalQueryString = finalQueryString.trim();

    const searchObject: any = {
        index: "libgen",
        query: {
            query_string: finalQueryString,
        },
    };

    if (offset != null) {
        searchObject.offset = offset;
    } else {
        searchObject.offset = 0;
    }

    if (limit != null) {
        searchObject.limit = limit;
    } else {
        searchObject.limit = 500;
    }

    if (limit != null && offset != null) {
        const maxMatches = offset + limit > 1000 ? 1000 : offset + limit;
        searchObject.max_matches = maxMatches;
    }

    return searchObject;
}

async function getSearchResults(
    topicContext: string,
    formData: FormData,
    offset?: number,
    limit?: number
): Promise<ManticoreSearchResponse | SearchRequestStatusOptions> {
    const requestObject = buildSearchObject(
        formData,
        topicContext,
        offset,
        limit
    );
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
    const query = searchParams.get("q");

    // Paging related states and functions
    const itemsPerPage = 20;
    const pageableResults = useRef<number>(0);
    const totalItems = useRef<number>(0);
    const currentOffset = useRef<number>(0);
    const visibleOffset =
        currentOffset.current === 0 ? 1 : currentOffset.current;

    let visibleLimit = 0;
    if (currentOffset.current + itemsPerPage > pageableResults.current) {
        visibleLimit = pageableResults.current;
    } else {
        visibleLimit = currentOffset.current + itemsPerPage;
    }
    const [tookTime, setTookTime] = useState<number>(0);

    const [pageCount, setPageCount] = useState<number>(0);

    const handlePaginationClick = async (evt: any) => {
        // Current page in index format (starts at 0)
        const currentPageIndex = evt.selected;
        const currentPageNum = currentPageIndex + 1;

        const newOffset =
            (currentPageIndex * itemsPerPage) % pageableResults.current;

        currentOffset.current = newOffset;

        await makePaginationRequest();
    };

    useEffect(() => {
        if (initialRequestMade.current) {
            return;
        }

        const submit = setTimeout(async () => {
            if (query != null && query !== "") {
                formRef.current!.dispatchEvent(
                    new Event("submit", { bubbles: true, cancelable: true })
                );
            }
            // 200ms gives enough time for everything to render.
        }, 200);

        return () => clearTimeout(submit);
    }, [searchParams]);

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
        formData: FormData
    ): Promise<SearchRequestStatusOptions | undefined> => {
        // Appends the current page to the formData object.
        let resultsList: Book[] = [];
        const q = formData.get("q");

        if (q == null) {
            return SearchRequestStatusOptions.BAD_QUERY;
        } else if (typeof q === "string" && q.trim().length < 3) {
            return SearchRequestStatusOptions.BAD_QUERY;
        }

        const request = await getSearchResults(
            topicContext,
            formData,
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

        pageableResults.current =
            totalItems.current > 1000 ? 1000 : totalItems.current;

        setPageCount(Math.ceil(pageableResults.current / itemsPerPage));

        resultsList = request.hits.hits;

        if (resultsList.length > 0) {
            setSearchResults(resultsList);
            return;
        } else {
            return SearchRequestStatusOptions.BAD_REQUEST;
        }
    };

    const makeSearchRequest = async () => {
        resetSearchState(false);
        initialRequestMade.current = true;
        const requestType = SearchRequestType.SEARCH;
        const formData = new FormData(formRef.current!);
        const URLParameters = buildURLParams(formData);
        setSearchParameters(URLParameters, { replace: false });

        setRequestStatus({
            type: requestType,
            status: SearchRequestStatusOptions.SENDING,
        });

        // The function responsible for setting states and making the actual request.
        // Returns enum value (number) if the request fails.
        const searchRequest = await requestOrganizer(formData);
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

    const makePaginationRequest = async () => {
        resetSearchState(true);
        const requestType = SearchRequestType.PAGINATION;
        const formData = new FormData(formRef.current!);
        const URLParameters = buildURLParams(formData);
        setSearchParameters(URLParameters, { replace: false });
        setRequestStatus({
            type: requestType,
            status: SearchRequestStatusOptions.SENDING,
        });
        const searchRequest = await requestOrganizer(formData);

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
            <div className="container-fluid">
                <div className="row ">
                    <div className="col mt-3">
                        <Navbar activeItem="home" />
                    </div>
                </div>

                <Bibliologo />
                <Greeting />
                <form
                    ref={formRef}
                    onSubmit={async (evt) => {
                        evt.preventDefault();
                        await makeSearchRequest();
                    }}
                >
                    <SearchOptions
                        hidden={optionsHidden}
                        topicContext={topicContext}
                        setTopicContext={setTopicContext}
                        setPageNumber={setPageCount}
                    />
                    <SearchBar
                        setOptionsHidden={setOptionsHidden}
                        topicContext={topicContext}
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
                            paginableResults={pageableResults.current}
                            offset={visibleOffset}
                            limit={visibleLimit}
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

                <RecommendationScreen disabled={initialRequestMade.current} />
                <Footer />
            </div>
        </div>
    );
}

export default Search;
