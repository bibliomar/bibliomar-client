import { MDBInput } from "mdb-react-ui-kit";
import { useSearchParams } from "react-router-dom";
import React, { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import Fuse from "fuse.js";
import { Size, useWindowSize } from "../general/helpers/useWindowSize";
import { backendUrl } from "../general/helpers/generalFunctions";
import { useTranslation } from "react-i18next";

type IndexesResponse = {
    indexes: string[];
};

interface Props {
    topicContext: string;
    setOptionsHidden: React.Dispatch<SetStateAction<boolean>>;
}

function buildAutocompleteSearchObject(topicContext: string, query: string) {
    // Important: Infixing must be enabled in manticore indexes for this to work:
    // https://manual.manticoresearch.com/Creating_a_table/NLP_and_tokenization/Wildcard_searching_settings#min_infix_len

    const searchObject = {
        index: "libgen",
        query: {
            match: {
                title: `${query}*`,
            },
        },
    };
}

async function getAutocomplete(topicContext: string) {
    if (topicContext !== "any") {
        return;
    }
}

export default function SearchBar({ topicContext, setOptionsHidden }: Props) {
    const { t } = useTranslation();
    const width = useWindowSize().width;
    let [searchParameters, _] = useSearchParams();
    let [query, setQuery] = useState("");
    let [indexes, setIndexes] = useState([]);
    let [relevantIndexes, setRelevantIndexes] = useState<any[]>([]);

    useEffect(() => {
        let q = searchParameters.get("q");
        if (q != null) {
            setQuery(q);
        }
    }, [searchParameters]);

    async function handleInput(input: HTMLInputElement) {
        setQuery(input.value);
        /** Temporarily disabled for performance reasons
         if (query.length >= 3) {
            let fuse = new Fuse(indexes, { keys: ["title"] });
            let search = fuse.search(input.value);
            setRelevantIndexes(search);
        }
         */
    }

    return (
        <div className="input-group d-flex justify-content-center mt-5 mb-4">
            <div className="searchfield">
                <datalist id="indexes">
                    {relevantIndexes.map((el, i) => {
                        if (el != null && i < 5) {
                            return <option value={el.item.title} key={i} />;
                        }
                    })}
                </datalist>

                <MDBInput
                    placeholder={t("search:placeholder") as string}
                    value={query}
                    onChange={(evt) => handleInput(evt.currentTarget)}
                    list="indexes"
                    type="text"
                    className="search-input"
                    label={t("search:pesquisar")}
                    labelStyle={{ position: "absolute", top: "8%" }}
                    name="q"
                    autoComplete="true"
                >
                    <i
                        className="fas fa-bars fa-lg"
                        style={{
                            position: "absolute",
                            top: "38%",
                            marginLeft: width <= 768 ? "86%" : "94%",
                            cursor: "pointer",
                            zIndex: "30",
                        }}
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
                </MDBInput>
            </div>

            <button type="submit" className="btn btn-primary search-button">
                <i className="fas fa-search fa-lg"></i>
            </button>
        </div>
    );
}
