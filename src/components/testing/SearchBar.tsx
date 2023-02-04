import { MDBInput } from "mdb-react-ui-kit";
import { useSearchParams } from "react-router-dom";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import axios from "axios";
import Fuse from "fuse.js";
import { Size, useWindowSize } from "../general/helpers/useWindowSize";
import { backendUrl } from "../general/helpers/generalFunctions";
import {getBooksFromHits, getManticoreSearchApi} from "./manticoreUtils"
import { Book } from "../general/helpers/generalTypes";


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
    let requestObject = buildAutocompleteRequest(category, query);
    let response = await searchApi.search(requestObject);
    console.log(response);
    if (response.hits){
        const response_hits = response.hits.hits;
        const books = getBooksFromHits(category, response_hits);
        return books;

    }
    
    return null;
}

export default function SearchTestingBar({
    categoryContext,
    setOptionsHidden,
}: Props) {
    const width = useWindowSize().width;
    let [searchParameters, _] = useSearchParams();
    let [query, setQuery] = useState("");
    let [relevantIndexes, setRelevantIndexes] = useState<Book[]>([]);
    const charactersInputChange = useRef(0);
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
        if (input.value.length > 3 && charactersInputChange.current >= 3){
            let books = await getAutocomplete(searchApi, categoryContext, input.value);
            if (books){
                setRelevantIndexes(books);
            }
            charactersInputChange.current = 0;

        }
       
    }

    return (
        <div className="input-group d-flex justify-content-center mt-5 mb-4">
            <div className="searchfield">
                {query.length > 3 ? (
                    <datalist id="indexes">
                        {relevantIndexes.map((el, i) => {
                            if (el != null) {
                                console.log(el);
                                return <option value={el.title} key={i} />;

                            }
                            
                        })}
                    </datalist>
                ) : null}

                <MDBInput
                    value={query}
                    onChange={(evt) => handleInput(evt.currentTarget)}
                    list="indexes"
                    type="text"
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
