import { MDBInput } from "mdb-react-ui-kit";
import { useSearchParams } from "react-router-dom";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import axios from "axios";
import Fuse from "fuse.js";
import { Size, useWindowSize } from "../../general/helpers/useWindowSize";
import { backendUrl } from "../../general/helpers/generalFunctions";
import { useTranslation } from "react-i18next";
import { Book } from "../../general/helpers/generalTypes";
import makeSearch from "../helpers/makeSearch";
import { ManticoreSearchResponse } from "../helpers/searchTypes";
import { AsyncTypeahead, Highlighter, Hint } from "react-bootstrap-typeahead";
import Typeahead from "react-bootstrap-typeahead/types/core/Typeahead";
import { useToggle } from "../../general/helpers/useToggle";
import { Option } from "react-bootstrap-typeahead/types/types";
import SearchBarInput from "./SearchBarInput";
import SearchBarFigure from "./SearchBarFigure";

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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selected, setSelected] = useState<Option[]>([]);
    const queryRef = useRef<string>("");
    const [searchParameters, _] = useSearchParams();
    const [indexes, setIndexes] = useState<Option[]>([]);

    useEffect(() => {
        const q = searchParameters.get("q");
        if (q != null && q.length >= 3) {
            queryRef.current = q;
        }
    }, [searchParameters]);

    async function handleSearch(query: string) {
        setIsLoading(true);

        const indexes = await getAutocomplete(topicContext, query);
        if (indexes != null) {
            if (
                indexes.hits &&
                indexes.hits.hits &&
                indexes.hits.hits.length > 0
            ) {
                console.log(indexes.hits.hits);
                setIndexes(indexes.hits.hits);
            }
        }

        setIsLoading(false);
    }

    return (
        <div className="input-group d-flex justify-content-center mt-5 mb-4">
            <div className="searchfield">
                <AsyncTypeahead
                    id="searchbar"
                    renderInput={(inputProps) => {
                        return (
                            <SearchBarInput
                                inputProps={inputProps}
                                queryRef={queryRef}
                                setOptionsHidden={setOptionsHidden}
                            />
                        );
                    }}
                    renderMenuItemChildren={(option, props, index) => {
                        const book = option as Book;
                        const timeout = index === 0 ? 250 : index * 250;
                        return (
                            <SearchBarFigure
                                text={props.text}
                                book={book}
                                timeout={timeout}
                            />
                        );
                    }}
                    isLoading={isLoading}
                    onSearch={handleSearch}
                    onChange={(selected) => {
                        if (selected.length > 0) {
                            const book = selected[0] as Book;
                            queryRef.current = book.title;
                        }
                        setSelected(selected);
                    }}
                    minLength={3}
                    selected={selected}
                    className="search-input"
                    options={indexes}
                    labelKey="title"
                    useCache={false}
                ></AsyncTypeahead>
            </div>

            <button type="submit" className="btn btn-primary search-button">
                <i className="fas fa-search fa-lg"></i>
            </button>
        </div>
    );
}
