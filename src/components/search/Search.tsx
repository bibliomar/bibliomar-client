import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Bibliologo from "../general/Bibliologo";
import SearchOptions from "./SearchOptions";
import SearchBar from "./SearchBar";
import Greeting from "./Greeting";
import SearchResultScreen from "./results/SearchResultScreen";
import LoadingScreen from "./loading/LoadingScreen";
import axios, { AxiosResponse } from "axios";
import Navbar from "../general/navbar/Navbar";
import { Book } from "../general/helpers/generalTypes";
import { Auth } from "../general/helpers/generalContext";
import RecommendationScreen from "./recommendations/RecommendationScreen";
import Footer from "../general/Footer";
import { backendUrl } from "../general/helpers/generalFunctions";
import Paginator from "../general/Paginator";
import SearchPagination from "./SearchPagination";

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

function Search() {
    const optionsHiddenSetting = localStorage.getItem("options-hidden");
    const [optionsHidden, setOptionsHidden] = useState<boolean>(
        optionsHiddenSetting ? optionsHiddenSetting === "true" : true
    );
    // Query related states
    const searchResults = useRef<Book[]>([]);

    const queryPage = useRef<number>(1);
    let [ajaxStatus, setAjaxStatus] = useState("");
    let [errorType, setErrorType] = useState<string | undefined>(undefined);
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
                queryPage >= lastErrorPage
            ) {
                console.log("Avoiding duplicate prefetch request.");
                return;
            }
            queryPage.current += 1;
            await requestHandler(formRef.current!, false);
        }
    };

    useEffect(() => {
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
        setVisibleBooks([]);
        setItemOffset(0);
        setPageCount(0);
        setAjaxStatus("");
        setErrorType(undefined);
    };

    function errorHandler(status: number) {
        if (status === 400) {
            setAjaxStatus("error");
            setErrorType("yellow");
            return;
        } else if (status === 429) {
            setAjaxStatus("error");
            setErrorType("red-rate");
            return;
        } else if (status === 500) {
            setAjaxStatus("error");
            setErrorType("red");
            return;
            // Below conditionals are not for HTTP errors.
        } else if (status === 700) {
            setAjaxStatus("error");
            setErrorType("blue");
            return;
        } else {
            setAjaxStatus("error");
            setErrorType("red");
            return;
        }
    }

    async function getSearchResults(
        formData: FormData,
        category: string
    ): Promise<Book[] | number> {
        let requestParameters = requestConstructor(formData, category);
        if (requestParameters == null) {
            return 700;
        }

        let req: AxiosResponse;
        try {
            req = await axios.get(
                `${backendUrl}/v1/search/${requestParameters}`
            );
        } catch (e: any) {
            return e.response.status;
        }

        if (category === "sci-tech") {
            let possibleResults = sciTechFiltering(req?.data.results, formData);
            if (possibleResults == null) {
                return 400;
            }
            return possibleResults;
        } else {
            return req?.data.results;
        }
    }

    const requestHandler = async (
        formElement: HTMLFormElement,
        initialRequest: boolean
    ) => {
        if (initialRequest) {
            resetSearchState();
        }

        let resultsList: Book[] = [];
        let formData = new FormData(formElement);
        console.log(...formData);
        if (initialRequest) {
            // Builds a URLParameters instance and changes the URL for the user.
            let URLParameters = new URLSearchParams();
            for (let [key, value] of formData) {
                let valueStr = value.toString();
                URLParameters.append(key, valueStr);
            }
            setSearchParameters(URLParameters, { replace: false });
            setAjaxStatus("sending");
        }

        formData.set("page", queryPage.current.toString());

        let formDataString = JSON.stringify(formData);

        const possibleResultsList = sessionStorage.getItem(
            `${formDataString}-${queryPage.current.toString()}-search`
        );
        if (possibleResultsList) {
            resultsList = JSON.parse(possibleResultsList);
        }

        if (resultsList.length === 0) {
            if (categoryContext !== "any") {
                let request = await getSearchResults(formData, categoryContext);
                if (typeof request === "number") {
                    errorHandler(request);
                    return;
                }
                resultsList = request;
            } else {
                // Means categoryContext === "any", so we are doing a dual request.
                let request1 = await getSearchResults(formData, "fiction");
                // Waits 3 seconds so libgen doesn't get mad at us.
                await sleep(3000);
                let request2 = await getSearchResults(formData, "sci-tech");
                const requests = [request1, request2];

                requests.forEach((req) => {
                    if (typeof req === "object") {
                        resultsList = [...resultsList, ...req];
                    }
                });
                if (resultsList.length === 0) {
                    lastErrorPage.current = queryPage.current;
                    // Only shows errors and warnings if this is the first request made.
                    if (initialRequest) {
                        if (typeof request2 === "number") {
                            errorHandler(request2);
                            return;
                        } else if (typeof request1 === "number") {
                            // This is an extreme edge case and shouldn't possibly happen. But better safe than sorry.
                            errorHandler(request1);
                            return;
                        }
                    }
                }
            }
        }

        console.log(resultsList);
        let resultsListString = JSON.stringify(resultsList);
        sessionStorage.setItem(
            `${formDataString}-${queryPage.current.toString()}-search`,
            resultsListString
        );
        const oldSearchResults = searchResults.current;
        searchResults.current = [...oldSearchResults, ...resultsList];
        if (initialRequest) {
            setAjaxStatus("waiting");
            setTimeout(() => {
                setAjaxStatus("done");
            }, 2000);
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
                        await requestHandler(evt.currentTarget, true);
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
                <LoadingScreen status={ajaxStatus} errorType={errorType} />
                <SearchResultScreen
                    results={visibleBooks}
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
