import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Bibliologo from "../general/Bibliologo";
import SearchOptions from "./SearchOptions";
import SearchBar from "./SearchBar";
import Greeting from "./Greeting";
import SearchResultScreen from "./results/SearchResultScreen";
import axios, { AxiosResponse } from "axios";
import Navbar from "../general/navbar/Navbar";
import { Book } from "../general/helpers/generalTypes";
import RecommendationScreen from "./recommendations/RecommendationScreen";
import Footer from "../general/Footer";
import { backendUrl } from "../general/helpers/generalFunctions";
import {
    RequestStatus,
    RequestStatusOptions,
    RequestType,
} from "./helpers/searchTypes";

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * It takes a FormData object, and returns a string that can be used to make a request to the API
 * @param {FormData} form - FormData - the form data from the search form
 * @param category
 * @returns A string
 */

function requestConstructor(form: FormData, category: string) {
    let request: string | null = null;
    let query = form.get("q") as string;
    let type = form.get("type");
    let format = form.get("format");
    let language = form.get("language");
    let page = form.get("page");

    query = query.trim();
    if (query == null || query.length < 3) {
        return null;
    }

    if (language === "any") {
        language = "";
    }
    if (format === "any") {
        format = "";
    }
    if (page == null) {
        page = "1";
    }

    if (category === "fiction") {
        if (type === "author") {
            type = "authors";
        }
        request = `${category}?q=${query}&criteria=${type}&format=${format}&language=${language}&page=${page}`;
    } else {
        request = `${category}?q=${query}&page=${page}`;
    }
    return request;
}

/**
 * It filters a list of books based on the language and format of the book
 * @param {Book[]} results - Book[] - The list of books to filter.
 * @param {FormData} form - FormData - The form data from the search form.
 * @returns A list of books that meet the criteria.
 */

function sciTechFiltering(results: Book[], form: FormData) {
    // This is kinda of an excerpt from /filter on Biblioterra API.
    // It's harder to filter sciTech results on the backend, so we need to do it here.
    let results_list: Book[] = [];
    let language = form.get("language") as string;
    let format = form.get("format") as string;
    results.forEach((element: Book) => {
        let elExtension = element.extension;
        let elLanguage = element.language;
        let meetsCriteria = true;
        if (format != null && format != "any") {
            if (elExtension !== format) {
                meetsCriteria = false;
            }
        }
        if (language != null && language != "any") {
            language = `${language.charAt(0).toUpperCase()}${language.slice(
                1,
                language.length
            )}`;

            if (elLanguage !== language) {
                meetsCriteria = false;
            }
        }
        if (meetsCriteria) {
            results_list.push(element);
        }
    });
    if (results_list.length === 0) {
        return null;
    }
    return results_list;
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
    let requestParameters = requestConstructor(formData, category);
    if (requestParameters == null) {
        return RequestStatusOptions.BAD_QUERY;
    }

    let req: AxiosResponse;
    try {
        req = await axios.get(`${backendUrl}/v1/search/${requestParameters}`);
    } catch (e: any) {
        if (e.response) {
            return requestErrorAsStatus(e.response.status);
        }
        return RequestStatusOptions.BAD_REQUEST;
    }
    if (req == null) {
        return RequestStatusOptions.BAD_REQUEST;
    }
    if (category === "sci-tech") {
        let possibleResults = sciTechFiltering(req.data.results, formData);
        if (possibleResults == null) {
            return RequestStatusOptions.BAD_REQUEST;
        }
        return possibleResults;
    } else {
        return req.data.results;
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
        const possibleResultsList = sessionStorage.getItem(
            `${formDataString}-search`
        );
        if (possibleResultsList) {
            resultsList = JSON.parse(possibleResultsList);
        }

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
                // Waits 3 seconds so libgen doesn't get mad at us.
                await sleep(3000);
                let request2 = await getSearchResults(formData, "sci-tech");
                const requests = [request1, request2];

                requests.forEach((possibleValidRequest) => {
                    if (typeof possibleValidRequest === "object") {
                        resultsList = [...resultsList, ...possibleValidRequest];
                    }
                });

                if (resultsList.length === 0) {
                    lastErrorPage.current = queryPage.current;
                    if (typeof request2 === "number") {
                        return request2;
                    } else {
                        return request1;
                    }
                }
            }
        }
        if (resultsList.length > 0) {
            let resultsListString = JSON.stringify(resultsList);
            sessionStorage.setItem(
                `${formDataString}-search`,
                resultsListString
            );
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

        // The book figure component is responsible for setting the RequestStatus.status to Done and then back to undefined.
        // Check /results/BookFigure.tsx for more info.

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
                <Greeting />
                <form
                    ref={formRef}
                    onSubmit={async (evt) => {
                        evt.preventDefault();
                        await makeSearchRequest(evt.currentTarget);
                    }}
                >
                    <SearchOptions
                        hidden={optionsHidden}
                        categoryContext={categoryContext}
                        setCategoryContext={setCategoryContext}
                    />
                    <SearchBar
                        setOptionsHidden={setOptionsHidden}
                        categoryContext={categoryContext}
                    />
                </form>

                <SearchResultScreen
                    results={visibleBooks}
                    requestStatus={requestStatus}
                    pageCount={pageCount}
                    pageChangeHandler={handlePageClick}
                />

                <RecommendationScreen
                    disabled={searchResults.current.length !== 0}
                />
                <Footer />
            </div>
        </div>
    );
}

export default Search;
