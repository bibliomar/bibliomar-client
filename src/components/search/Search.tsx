import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Bibliologo from "../general/Bibliologo";
import SearchOptions from "./SearchOptions";
import SearchBar from "./SearchBar";
import Greeting from "./Greeting";
import ResultScreen from "./results/ResultScreen";
import LoadingScreen from "./loading/LoadingScreen";
import axios, { AxiosResponse } from "axios";
import Navbar from "../general/navbar/Navbar";
import { Book } from "../general/helpers/generalTypes";
import { Auth } from "../general/helpers/generalContext";
import RecommendationScreen from "./recommendations/RecommendationScreen";
import Footer from "../general/Footer";

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * It takes a FormData object, and returns a string that can be used to make a request to the API
 * @param {FormData} form - FormData - the form data from the search form
 * @param category
 * @returns A string
 */

function requestConstructor(form: FormData, category: string) {
    let request = "";
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
    const [isUserLoggedContext, setIsUserLoggedContext] =
        useState<boolean>(false);
    let [searchResults, setSearchResults] = useState<Book[]>([]);
    const [optionsHidden, setOptionsHidden] = useState<boolean>(
        optionsHiddenSetting ? optionsHiddenSetting === "true" : true
    );
    let [page, setPage] = useState(1);
    let [ajaxStatus, setAjaxStatus] = useState("");
    let [errorType, setErrorType] = useState<string | undefined>(undefined);
    let [categoryContext, setCategoryContext] = useState("any");
    let formRef = useRef<HTMLFormElement>(null);
    let [searchParams, setSearchParameters] = useSearchParams();
    let query = searchParams.get("q");

    useEffect(() => {
        let submit = setTimeout(async () => {
            if (query != null && query !== "") {
                formRef.current!.dispatchEvent(
                    new Event("submit", { bubbles: true, cancelable: true })
                );
            }
            // ~1000ms gives enough time for everything to render.
        }, 100);
        return () => clearTimeout(submit);
    }, [page, searchParams]);

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
        } else if (status === 800) {
            setAjaxStatus("error");
            setErrorType("yellow-page");
            setTimeout(() => {
                if (page < 1) {
                    setPage(1);
                } else if (page !== 1 && page > 1) {
                    setPage(page - 1);
                }
            }, 2500);
            return;
        } else {
            setAjaxStatus("error");
            setErrorType("red");
            return;
        }
    }

    async function getSearchResults(formData: FormData, category: string) {
        let requestParameters = requestConstructor(formData, category);
        if (requestParameters == null) {
            return 700;
        }

        let req: AxiosResponse;
        try {
            req = await axios.get(
                `https://biblioterra.herokuapp.com/v1/search/${requestParameters}`
            );
        } catch (e: any) {
            if (page !== 1) {
                return 800;
            }
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

    const submitHandler = async (formElement: HTMLFormElement) => {
        setSearchResults([]);
        setAjaxStatus("");
        setErrorType(undefined);

        let resultsList = [];
        let formData = new FormData(formElement);
        let formDataString = JSON.stringify(formData);
        let URLParameters = new URLSearchParams();

        for (let [key, value] of formData) {
            let valueStr = value.toString();
            URLParameters.append(key, valueStr);
        }

        if (sessionStorage.getItem(formDataString)) {
            let resultsListString = sessionStorage.getItem(
                formDataString
            ) as string;
            resultsList = JSON.parse(resultsListString);
        }

        setSearchParameters(URLParameters, { replace: false });
        setAjaxStatus("sending");

        if (categoryContext !== "any") {
            let request = await getSearchResults(formData, categoryContext);
            if (Number.isInteger(request)) {
                errorHandler(request);
                return;
            }
            resultsList = request;
        } else {
            // Means categoryContext === "any", so we are doing a dual request.
            let request1 = await getSearchResults(formData, "fiction");
            // Waits 4 seconds so libgen doesn't get mad at us.
            await sleep(3000);
            let request2 = await getSearchResults(formData, "sci-tech");
            if (Number.isInteger(request1) && Number.isInteger(request2)) {
                errorHandler(request2);
                return;
            } else if (
                !Number.isInteger(request1) &&
                !Number.isInteger(request2)
            ) {
                resultsList = [...request1, ...request2];
            } else if (
                !Number.isInteger(request1) &&
                Number.isInteger(request2)
            ) {
                resultsList = request1;
            } else if (
                Number.isInteger(request1) &&
                !Number.isInteger(request2)
            ) {
                resultsList = request2;
            }
        }
        console.log(resultsList);
        setAjaxStatus("waiting");
        setSearchResults(resultsList);
        let resultsListString = JSON.stringify(resultsList);
        sessionStorage.setItem(formDataString, resultsListString);
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
                        await submitHandler(evt.currentTarget);
                    }}
                >
                    <SearchOptions
                        hidden={optionsHidden}
                        categoryContext={categoryContext}
                        setCategoryContext={setCategoryContext}
                        page={page}
                    />
                    <SearchBar
                        setOptionsHidden={setOptionsHidden}
                        categoryContext={categoryContext}
                    />
                </form>
                <LoadingScreen status={ajaxStatus} errorType={errorType} />
                <ResultScreen
                    results={searchResults}
                    page={page}
                    setAjaxStatus={setAjaxStatus}
                    setPage={setPage}
                />
                <RecommendationScreen disabled={searchResults.length !== 0} />
                <Footer />
            </div>
        </div>
    );
}

export default Search;
