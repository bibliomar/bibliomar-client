import { MDBInput } from "mdb-react-ui-kit";
import { useSearchParams } from "react-router-dom";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import axios from "axios";
import Fuse from "fuse.js";
import { Size, useWindowSize } from "../general/helpers/useWindowSize";
import { backendUrl } from "../general/helpers/generalFunctions";
import { useTranslation } from "react-i18next";
import { Book } from "../general/helpers/generalTypes";
import makeSearch from "./helpers/makeSearch";
import { ManticoreSearchResponse } from "./helpers/searchTypes";

type IndexesResponse = {
    indexes: string[];
};

interface Props {
    topicContext: string;
    setOptionsHidden: React.Dispatch<SetStateAction<boolean>>;
}

function buildAutocompleteSearchObject(
    topicContext: string,
    query: string
): object {
    // Important: Infixing must be enabled in manticore indexes for this to work:
    // https://manual.manticoresearch.com/Creating_a_table/NLP_and_tokenization/Wildcard_searching_settings#min_infix_len
    let finalQueryString = `@title ${query}* `;

    if (topicContext !== "any") {
        finalQueryString += `@topic ${topicContext}`;
    }

    finalQueryString = finalQueryString.trim();

    const searchObject = {
        index: "libgen",
        query: {
            query_string: finalQueryString,
        },
        limit: 5,
        max_matches: 10,
    };

    return searchObject;
}

async function getAutocomplete(
    topicContext: string,
    query: string
): Promise<ManticoreSearchResponse | null> {
    try {
        const searchObject = buildAutocompleteSearchObject(topicContext, query);
        const response = await makeSearch(searchObject);
        console.log(response);
        return response;
    } catch (e: unknown) {
        // eslint-disable-next-line no-console
        console.error(e);
        return null;
    }
}

export default function SearchBar({ topicContext, setOptionsHidden }: Props) {
    const { t } = useTranslation();
    const width = useWindowSize().width;
    const [searchParameters, _] = useSearchParams();
    const [query, setQuery] = useState("");
    const [indexes, setIndexes] = useState<Book[]>([]);
    const queryInputChange = useRef<number>(0);

    useEffect(() => {
        const q = searchParameters.get("q");
        if (q != null && q.length >= 3) {
            setQuery(q);
        }
    }, [searchParameters]);

    async function handleInput(input: HTMLInputElement) {
        setQuery(input.value);
        queryInputChange.current += 1;
        if (query.trim().length > 3 && queryInputChange.current >= 3) {
            const indexes = await getAutocomplete(topicContext, query);
            if (indexes != null) {
                if (
                    indexes.hits &&
                    indexes.hits.hits &&
                    indexes.hits.hits.length > 0
                ) {
                    setIndexes(indexes.hits.hits);
                }
            }
            queryInputChange.current = 0;
        }
    }

    return (
        <div className="input-group d-flex justify-content-center mt-5 mb-4">
            <div className="searchfield">
                <datalist id="indexes">
                    {indexes.map((el, i) => {
                        if (el != null && i < 5) {
                            if (el.title.length > 40) {
                                return (
                                    <option
                                        value={
                                            el.title.substring(0, 40) + "..."
                                        }
                                    />
                                );
                            }
                            return <option value={el.title} key={i} />;
                        }
                    })}
                </datalist>

                <MDBInput
                    placeholder={t("search:placeholder") as string}
                    value={query}
                    onChange={(evt) => handleInput(evt.currentTarget)}
                    list="indexes"
                    type="search"
                    className="search-input undefined"
                    wrapperClass={"d-flex flex-nowrap flex-row"}
                    label={t("search:pesquisar")}
                    labelStyle={{ position: "absolute", top: "8%" }}
                    name="q"
                >
                    <div className="d-flex flex-column justify-content-center">
                        <i
                            className="me-3 fas fa-bars fa-lg"
                            onClick={() => {
                                setOptionsHidden((prev) => {
                                    localStorage.setItem(
                                        "options-hidden",
                                        !prev ? "true" : "false"
                                    );
                                    return !prev;
                                });
                            }}
                        />
                    </div>
                </MDBInput>
            </div>

            <button type="submit" className="btn btn-primary search-button">
                <i className="fas fa-search fa-lg"></i>
            </button>
        </div>
    );
}
