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
    let URLParameters = new URLSearchParams();
    for (let [key, value] of formData) {
        let valueStr = value.toString();
        if (key !== "page") {
            URLParameters.append(key, valueStr);
        }
    }
    return URLParameters;
};

function buildSearchObject(formData: FormData, topic: string): Promise<object> {
    const type = formData.get("type");
    const query = formData.get("q");
    const format = formData.get("format");
    const language = formData.get("language");
    const fulltext = formData.get("fulltext");

    let finalQueryString = "";

    let index;
    if (topic === "fiction") {
        index = "fiction";
    } else {
        index = "scitech";
    }

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

    if (fulltext != null && query) {
        if (typeof query === "string") {
            finalQueryString = query;
        }
    }

    finalQueryString = finalQueryString.trim();

    let searchObject: any = {
        index: index,
        query: {
            query_string: finalQueryString,
        },
    };

    const limit = 500;

    searchObject.limit = limit;

    searchObject.max_matches = limit;

    return searchObject;
}

async function getSearchResults(
    topic: string,
    formData: FormData
): Promise<ManticoreSearchResponse | SearchRequestStatusOptions> {
    const requestObject = buildSearchObject(formData, topic);
    try {
        const response = await makeSearch(topic, requestObject);
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
    const searchResults = useRef<Book[]>([]);
    const [visibleSearchResults, setVisibleSearchResults] = useState<Book[]>(
        []
    );
    const [searchResultsTime, setSearchResultsTime] = useState<number>(0);
    let [requestStatus, setRequestStatus] = useState<
        SearchRequestStatus | undefined
    >(undefined);
    let [topicContext, setTopicContext] = useState("any");
    let formRef = useRef<HTMLFormElement>(null);
    let [searchParams, setSearchParameters] = useSearchParams();
    let query = searchParams.get("q");
    const page = searchParams.get("page");

    // Paging related states and functions
    const itemsPerPage = 20;
    const totalItems = useRef<number>(0);
    const [pageCount, setPageCount] = useState<number>(0);

    const handlePaginationClick = async (evt: any) => {
        // Current page in index format (starts at 0)
        const currentPageIndex = evt.selected;
        const currentPageNum = currentPageIndex + 1;

        const newOffset =
            (currentPageIndex * itemsPerPage) % searchResults.current.length;

        // Sets the new visible books slice
        const booksSlice = searchResults.current.slice(
            newOffset,
            newOffset + itemsPerPage
        );
        console.log(
            "New pagination visible results: ",
            newOffset,
            newOffset + itemsPerPage
        );
        console.log(booksSlice);

        setVisibleSearchResults(booksSlice);
    };

    useEffect(() => {
        if (initialRequestMade.current) {
            return;
        }

        let submit = setTimeout(async () => {
            if (query != null && query !== "") {
                formRef.current!.dispatchEvent(
                    new Event("submit", { bubbles: true, cancelable: true })
                );
            }
            // 200ms gives enough time for everything to render.
        }, 200);

        return () => clearTimeout(submit);
    }, [searchParams]);

    const resetSearchState = () => {
        // Resets relevant values to their initial values
        searchResults.current = [];
        totalItems.current = 0;

        setPageCount(0);
        setSearchResultsTime(0);
        setVisibleSearchResults([]);
        setRequestStatus(undefined);
    };

    // Organizes the API request, setups and retrieves results from cache.
    const requestOrganizer = async (
        formData: FormData
    ): Promise<SearchRequestStatusOptions | undefined> => {
        // Appends the current page to the formData object.
        let resultsList: Book[] = [];

        if (topicContext !== "any") {
            let request = await getSearchResults(topicContext, formData);
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
                setSearchResultsTime(request.took);
            }

            if (request.hits.total != null) {
                totalItems.current = request.hits.total;
            }
            setPageCount(Math.ceil(request.hits.hits.length / itemsPerPage));

            resultsList = request.hits.hits;
        } else {
            // Contidion means topicContext === "any", so we are doing a dual request.

            let scitechRequest = await getSearchResults("scitech", formData);
            // Waits 500ms to avoid overloading the server.
            // await sleep(500);

            let fictionRequest = await getSearchResults("fiction", formData);
            const requests = [scitechRequest, fictionRequest];

            let tookTime: number = 0;
            let totalPaginableItems: number = 0;

            requests.forEach((possibleValidRequest) => {
                if (
                    possibleValidRequest &&
                    typeof possibleValidRequest !== "number"
                ) {
                    if (
                        possibleValidRequest.hits != null &&
                        possibleValidRequest.hits.hits != null &&
                        possibleValidRequest.hits.hits.length > 0
                    ) {
                        if (possibleValidRequest.took != null) {
                            setSearchResultsTime(
                                (prev) => prev + possibleValidRequest.took
                            );
                            totalPaginableItems +=
                                possibleValidRequest.hits.hits.length;
                        }
                        if (possibleValidRequest.hits.total != null) {
                            totalItems.current +=
                                possibleValidRequest.hits.total;
                        }
                        if (possibleValidRequest.took != null) {
                            tookTime += possibleValidRequest.took;
                        }
                        resultsList = [
                            ...resultsList,
                            ...possibleValidRequest.hits.hits,
                        ];
                    }
                }
            });

            if (resultsList.length === 0) {
                if (typeof scitechRequest === "number") {
                    return scitechRequest;
                } else if (typeof fictionRequest === "number") {
                    return fictionRequest;
                } else {
                    return SearchRequestStatusOptions.CONNECTION_ERROR;
                }
            } else {
                setPageCount(Math.ceil(totalPaginableItems / itemsPerPage));
            }
        }

        if (resultsList.length > 0) {
            searchResults.current = resultsList;
            console.log("Total results: ", searchResults.current);
            const resultsSlice = searchResults.current.slice(0, itemsPerPage);
            console.log("Visible results: ", resultsSlice);
            setVisibleSearchResults(resultsSlice);
            return;
        } else {
            return SearchRequestStatusOptions.BAD_REQUEST;
        }
    };

    const makeSearchRequest = async () => {
        resetSearchState();
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

        setRequestStatus({
            type: requestType,
            status: SearchRequestStatusOptions.LOADING,
        });

        // Since we are doing async forced waiting and there's a chance that another component may change the requestStatus,
        // it's recommended to implement checks in the setState callback.
        // Be mindful that state changes are async by nature.

        await sleep(2000);

        setRequestStatus((prevState) => {
            const newRequestStatus = {
                type: requestType,
                status: SearchRequestStatusOptions.SUCCESS,
            };
            if (prevState != undefined) {
                if (
                    prevState.type === SearchRequestType.SEARCH &&
                    prevState.status === SearchRequestStatusOptions.LOADING
                ) {
                    return newRequestStatus;
                }
            }
            // If the checks fail.
            return prevState;
        });

        await sleep(3000);
        setRequestStatus((prevState) => {
            if (prevState != undefined) {
                if (
                    prevState.type === SearchRequestType.SEARCH &&
                    prevState.status === SearchRequestStatusOptions.SUCCESS
                ) {
                    return undefined;
                }
            }
            // If the cheks fail.
            return prevState;
        });
    };

    const makePaginationRequest = async () => {
        resetSearchState();
        const requestType = SearchRequestType.PAGINATION;
        const formData = new FormData(formRef.current!);
        const URLParameters = buildURLParams(formData);
        setSearchParameters(URLParameters, { replace: false });
        setSearchParameters(URLParameters, { replace: false });
        setRequestStatus({
            type: requestType,
            status: SearchRequestStatusOptions.SENDING,
        });
        const searchRequest = await requestOrganizer(formData);

        if (Array.isArray(searchRequest)) {
            setVisibleSearchResults(searchRequest);
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
                        categoryContext={topicContext}
                    />
                </form>
                <SearchStatistics
                    disabled={visibleSearchResults.length === 0}
                    total={totalItems.current}
                    took={searchResultsTime}
                />
                <div className="d-flex justify-content-center w-100">
                    <div className="d-flex flex-wrap justify-content-center mt-3 search-results-div">
                        <SearchMessageScreen requestStatus={requestStatus} />
                        <Break />
                        <SearchResultScreen
                            visibleResults={visibleSearchResults}
                        />
                        <Break />
                        <SearchPagination
                            pageChangeHandler={handlePaginationClick}
                            pageCount={pageCount}
                        />
                    </div>
                </div>

                <RecommendationScreen disabled={totalItems.current > 0} />
                <Footer />
            </div>
        </div>
    );
}

export default Search;
