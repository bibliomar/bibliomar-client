import { MDBInput } from "mdb-react-ui-kit";
import { useSearchParams } from "react-router-dom";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import axios from "axios";
import Fuse from "fuse.js";
import { Size, useWindowSize } from "../general/helpers/useWindowSize";
import { backendUrl } from "../general/helpers/generalFunctions";
import {getBooksFromHits, getManticoreSearchApi} from "./manticoreUtils"
import { Book } from "../general/helpers/generalTypes";
import { sleep } from "./SearchTesting";


interface Props {
    categoryContext: string;
    setOptionsHidden: React.Dispatch<SetStateAction<boolean>>;
}

function buildAutocompleteRequest(category: string, query: string) {
    return {
        index: category === "fiction" ? "fiction" : "scitech",
        query: {
            match: {
                "*": {
                    query: `^${query}*`,
                    operator: "and",
                },
            },
        },
        limit: 5,
    };
}

async function getAutocomplete(searchApi: any, category: string, query: string): Promise<Book[] | null> {
    let resultsList: Book[] = [];

    if (category !== "any"){
        const request = buildAutocompleteRequest(category, query);
        const response = await searchApi.search(request);
        if (response != null && response.hits != null){
            resultsList = getBooksFromHits(category, response.hits.hits);
        }
    } else {
        const fictionRequest = buildAutocompleteRequest("fiction", query);
        const scitechRequest = buildAutocompleteRequest("scitech", query);
        const fictionResponse = await searchApi.search(fictionRequest);
        await sleep(250);
        const scitechResponse = await searchApi.search(scitechRequest);
        if (fictionResponse != null && fictionResponse.hits != null){
            resultsList = [...resultsList, ...getBooksFromHits("fiction", fictionResponse.hits.hits)];
        }
        if (scitechResponse != null && scitechResponse.hits != null){
            resultsList = [...resultsList, ...getBooksFromHits("scitech", scitechResponse.hits.hits)];
        }
    }

    if (resultsList.length === 0){
        return null;
    }

    return resultsList;
}

function populateDatalist(relevantIndexes: Book[]){
    if (relevantIndexes == null || relevantIndexes.length === 0){
        return null;
    }
    let relevantIndexesList: JSX.Element[] = [];

    relevantIndexes.map((el, i) => {
        if (el != null && typeof el === "object") {
            relevantIndexesList.push(<option value={el.title} key={i} />);
        }

    });

    return relevantIndexesList;

}


export default function SearchTestingBar({
    categoryContext,
    setOptionsHidden,
}: Props) {
    const width = useWindowSize().width;
    let [searchParameters, _] = useSearchParams();
    let [query, setQuery] = useState("");
    let [relevantIndexes, setRelevantIndexes] = useState<Book[]>([]);
    const charactersInputChange = useRef<number>(0);
    const awaitingAutocompleteResponse = useRef<boolean>(false);
    const searchApi = getManticoreSearchApi();

    useEffect(() => {
        let q = searchParameters.get("q");
        if (q != null) {
            setQuery(q);
        }
    }, [searchParameters]);

    async function handleInput(input: HTMLInputElement) {
        setQuery(input.value);
        charactersInputChange.current += 1;
        const trimmedInput = input.value.trim();
        if (trimmedInput.length > 3){
            if (awaitingAutocompleteResponse.current){
                return;
            }

            awaitingAutocompleteResponse.current = true;
            let books = await getAutocomplete(searchApi, categoryContext, input.value);
            if (books){
                setRelevantIndexes(books);
            }

            awaitingAutocompleteResponse.current = false;

            charactersInputChange.current = 0;

        }
       
    }

    return (
        <div className="input-group d-flex justify-content-center mt-5 mb-4">
            <div className="searchfield">
                
                <datalist id="indexes">
                    {populateDatalist(relevantIndexes)}
                </datalist>
                

                <MDBInput
                    value={query}
                    onChange={(evt) => handleInput(evt.currentTarget)}
                    list="indexes"
                    type="search"
                    className="search-input"
                    label="Pesquisar"
                    labelStyle={{ position: "absolute", top: "8%" }}
                    name="q"
                    autoComplete="true"
                >
                    
                </MDBInput>
            </div>

            <button type="submit" className="btn btn-primary search-button">
                <i className="fas fa-search fa-lg"></i>
            </button>
        </div>
    );

}
