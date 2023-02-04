import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Bibliologo from "../general/Bibliologo";
import SearchTestingOptions from "./SearchOptions";
import SearchTestingBar from "./SearchBar";
import SearchTestingResultScreen from "./results/SearchResultScreen";
import axios, { AxiosResponse } from "axios";
import Navbar from "../general/navbar/Navbar";
import { Book } from "../general/helpers/generalTypes";
import Footer from "../general/Footer";
import { backendUrl } from "../general/helpers/generalFunctions";
import {
    RequestStatus,
    RequestStatusOptions,
    RequestType,
} from "./helpers/searchTypes";

import { getBooksFromHits, getManticoreSearchApi } from "./manticoreUtils";

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * It takes a FormData object, and returns a string that can be used to make a request to the API
 * @param {FormData} form - FormData - the form data from the search form
 * @param category
 * @returns A string
 */

function requestConstructor(form: FormData, category: string) {
    let request: object | null = null;
    let query = form.get("q") as string;
    let type = form.get("type");
    let format = form.get("format");
    let language = form.get("language");
    let page = form.get("page");

    query = query.trim();
    if (query == null || query.length < 3) {
        return null;
    }

    if (category === "fiction") {
        request = {
            index: "fiction",
            query: {
                query_string: query,
            },
        };
    } else {
        request = {
            index: "scitech",
            query: {
                query_string: query,
            },
        };
    }

    return request;
}

function requestErrorAsStatus(status: number): RequestStatusOptions {
    if (status === 400) {
        return RequestStatusOptions.BAD_REQUEST;
    } else if (status === 429) {
        return RequestStatusOptions.TOO_MANY_REQUESTS;
    } else if (status === 500) {
        return RequestStatusOptions.CONNECTION_ERROR;
    } else {
        return RequestStatusOptions.CONNECTION_ERROR;
    }
}

// Makes the actual request to Biblioterra API.
// Don't call this directly. Call searchOrganizer() first.
async function getSearchResults(
    formData: FormData,
    category: string
): Promise<Book[] | RequestStatusOptions> {
    let requestObject = requestConstructor(formData, category);
    if (requestObject == null) {
        return RequestStatusOptions.BAD_QUERY;
    }

    const searchApi = getManticoreSearchApi();
    let response: any;
    try {
        response = await searchApi.search(requestObject);
    } catch (e: any) {
        if (e.response) {
            return requestErrorAsStatus(e.response.status);
        }
        return RequestStatusOptions.BAD_REQUEST;
    }
    if (response == null || response.hits == null) {
        console.log("Response is null");
        return RequestStatusOptions.BAD_REQUEST;
    }
    const books = getBooksFromHits(category, response.hits.hits);
    if (books.length == 0) {
        return RequestStatusOptions.BAD_REQUEST;
    }
    console.log(getBooksFromHits(category, response.hits.hits));
    return books;
}

function SearchTesting() {
    const optionsHiddenSetting = localStorage.getItem("options-hidden");
    const [optionsHidden, setOptionsHidden] = useState<boolean>(false);
    // Query related states
    const initialRequestMade = useRef<boolean>(false);
    const searchResults = useRef<Book[]>([]);

    const queryPage = useRef<number>(1);
    let [requestStatus, setRequestStatus] = useState<RequestStatus | undefined>(
        undefined
    );
    let [categoryContext, setCategoryContext] = useState("any");
    let formRef = useRef<HTMLFormElement>(null);
    let [searchParams, setSearchParameters] = useSearchParams();
    let query = searchParams.get("q");

    // Paging related states and functions
    const itemsPerPage = 8;
    // Tracks the last page in which a request error ocurred.
    const lastErrorPage = useRef<number | undefined>(undefined);
    const [visibleBooks, setVisibleBooks] = useState<Book[]>([]);
    const [pageCount, setPageCount] = useState<number>(0);
    const [itemOffset, setItemOffset] = useState<number>(0);

    const handlePageClick = async (evt: any) => {
        // Current page in index format (starts at 0)
        const currentPageIndex = evt.selected;
        const currentPageNum = currentPageIndex + 1;

        const newOffset =
            (currentPageIndex * itemsPerPage) % searchResults.current.length;
        setItemOffset(newOffset);

        if (
            searchResults.current.length >= 25 &&
            currentPageNum === pageCount
        ) {
            if (
                typeof lastErrorPage.current === "number" &&
                queryPage.current >= lastErrorPage.current
            ) {
                console.log("Avoiding duplicate prefetch request.");
                return;
            }
            queryPage.current += 1;
            await makePaginationRequest(formRef);
        }
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
            // 100ms gives enough time for everything to render.
        }, 100);
        return () => clearTimeout(submit);
    }, [queryPage, searchParams]);

    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setPageCount(Math.ceil(searchResults.current.length / itemsPerPage));
        setVisibleBooks(searchResults.current.slice(itemOffset, endOffset));
    }, [itemOffset, searchResults.current]);

    const resetSearchState = () => {
        // Resets relevant values to their initial values
        searchResults.current = [];
        queryPage.current = 1;
        lastErrorPage.current = undefined;
        setItemOffset(0);
        setVisibleBooks([]);
        setPageCount(0);
        setRequestStatus(undefined);
    };

    // Organizes the API request, setups and retrieves results from cache.
    const requestOrganizer = async (
        formData: FormData
    ): Promise<Book[] | RequestStatusOptions> => {
        // Appends the current page to the formData object.
        formData.set("page", queryPage.current.toString());
        let resultsList: Book[] = [];
        let formDataString = "";

        for (let [key, value] of formData) {
            let valueStr = value.toString();
            formDataString += `${key}=${valueStr}&`;
        }

        /**
         * Code for getting results from cache.
         * Temporarily disabled in testing phase.
         * 
        const possibleResultsList = sessionStorage.getItem(
            `${formDataString}-search`
        );
        if (possibleResultsList) {
            resultsList = JSON.parse(possibleResultsList);
        }
         */

        if (resultsList.length === 0) {
            if (categoryContext !== "any") {
                let request = await getSearchResults(formData, categoryContext);
                if (typeof request === "number") {
                    return request;
                }
                resultsList = request;
            } else {
                // Contidion means categoryContext === "any", so we are doing a dual request.

                let request1 = await getSearchResults(formData, "fiction");
                await sleep(1000);
                let request2 = await getSearchResults(formData, "sci-tech");
                const requests = [request1, request2];

                requests.forEach((possibleValidRequest) => {
                    if (typeof possibleValidRequest === "object") {
                        resultsList = [...resultsList, ...possibleValidRequest];
                    }
                });

                if (resultsList.length === 0) {
                    lastErrorPage.current = queryPage.current;
                    // Meaning a request is a instance of RequestStatusOptions.
                    if (typeof request2 === "number") {
                        return request2;
                    } else {
                        return request1;
                    }
                }
            }
        }
        if (resultsList.length > 0) {
            /*
            Code for caching results.
            Disabled in testing phase.

            
            let resultsListString = JSON.stringify(resultsList);
            
            
            sessionStorage.setItem(
                `${formDataString}-search`,
                resultsListString
            );
            */
            return resultsList;
        } else {
            return RequestStatusOptions.BAD_REQUEST;
        }
    };

    const makeSearchRequest = async (formElement: HTMLFormElement) => {
        resetSearchState();
        initialRequestMade.current = true;
        const requestType = RequestType.SEARCH;
        const formData = new FormData(formElement);
        let URLParameters = new URLSearchParams();
        for (let [key, value] of formData) {
            let valueStr = value.toString();
            if (key !== "page") {
                URLParameters.append(key, valueStr);
            }
        }
        setSearchParameters(URLParameters, { replace: false });
        setRequestStatus({
            type: requestType,
            status: RequestStatusOptions.SENDING,
        });

        const searchRequest = await requestOrganizer(formData);
        if (typeof searchRequest === "number") {
            setRequestStatus({
                type: requestType,
                status: searchRequest,
            });
            return;
        }

        setRequestStatus({
            type: requestType,
            status: RequestStatusOptions.LOADING,
        });

        if (Array.isArray(searchRequest)) {
            searchResults.current = searchRequest;
        } else {
            setRequestStatus({
                type: requestType,
                status: RequestStatusOptions.BAD_REQUEST,
            });
        }
        // Since we are doing async forced waiting and there's a chance that another component may change the requestStatus,
        // it's recommended to implement checks in the setState callback.
        // Be mindful that state changes are async by nature.

        await sleep((searchResults.current.length * 500) / 2);

        setRequestStatus((prevState) => {
            const newRequestStatus = {
                type: requestType,
                status: RequestStatusOptions.SUCCESS,
            };
            if (prevState != undefined) {
                if (
                    prevState.type === RequestType.SEARCH &&
                    prevState.status === RequestStatusOptions.LOADING
                ) {
                    return newRequestStatus;
                }
            }
            // If the checks fail.
            return prevState;
        });
        // Wait time for the "Done" message.
        await sleep(3000);
        setRequestStatus((prevState) => {
            if (prevState != undefined) {
                if (
                    prevState.type === RequestType.SEARCH &&
                    prevState.status === RequestStatusOptions.SUCCESS
                ) {
                    return undefined;
                }
            }
            // If the cheks fail.
            return prevState;
        });
    };

    const makePaginationRequest = async (
        formElementRef: React.RefObject<HTMLFormElement>
    ) => {
        if (formElementRef.current == null) {
            return;
        }
        const requestType = RequestType.PAGINATION;
        const formData = new FormData(formElementRef.current);
        setRequestStatus({
            type: requestType,
            status: RequestStatusOptions.SENDING,
        });
        const paginationRequest = await requestOrganizer(formData);
        console.log("pagination request", paginationRequest);
        if (Array.isArray(paginationRequest)) {
            const previousSearchResults = searchResults.current;
            searchResults.current = [
                ...previousSearchResults,
                ...paginationRequest,
            ];
            setRequestStatus(undefined);
        }
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
                <form
                    ref={formRef}
                    onSubmit={async (evt) => {
                        evt.preventDefault();
                        await makeSearchRequest(evt.currentTarget);
                    }}
                >
                    <SearchTestingOptions
                        hidden={optionsHidden}
                        categoryContext={categoryContext}
                        setCategoryContext={setCategoryContext}
                    />
                    <SearchTestingBar
                        setOptionsHidden={setOptionsHidden}
                        categoryContext={categoryContext}
                    />
                </form>

                <SearchTestingResultScreen
                    results={visibleBooks}
                    requestStatus={requestStatus}
                    pageCount={pageCount}
                    pageChangeHandler={handlePageClick}
                />
            </div>
        </div>
    );
}

export default SearchTesting;
