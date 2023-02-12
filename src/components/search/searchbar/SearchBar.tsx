import { MDBInput } from "mdb-react-ui-kit";
import { useNavigate, useSearchParams } from "react-router-dom";
import React, {
    MutableRefObject,
    RefObject,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from "react";
import axios from "axios";
import Fuse from "fuse.js";
import { Size, useWindowSize } from "../../general/helpers/useWindowSize";
import {
    backendUrl,
    getBookInfoPath,
} from "../../general/helpers/generalFunctions";
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
import { buildSearchObjectFromForm } from "../../general/helpers/generalFunctions";

interface Props {
    topicContext: string;
    setOptionsHidden: React.Dispatch<SetStateAction<boolean>>;
    // formRef inherited from Search component, to be used in buildSearchObject.
    formRef: RefObject<HTMLFormElement>;
}

async function getAutocomplete(
    searchObject: object
): Promise<ManticoreSearchResponse | null> {
    try {
        const response = await makeSearch(searchObject);
        return response;
    } catch (e: unknown) {
        // eslint-disable-next-line no-console
        console.error(e);
        return null;
    }
}

export default function SearchBar({
    topicContext,
    setOptionsHidden,
    formRef,
}: Props) {
    const navigate = useNavigate();
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

    async function handleSearch() {
        setIsLoading(true);
        if (formRef.current == null) {
            console.error("formRef.current is null at search bar");
            return;
        }

        const formData = new FormData(formRef.current);
        const searchObject = buildSearchObjectFromForm(
            formData,
            topicContext,
            0,
            5
        );

        const response = await getAutocomplete(searchObject);
        if (response != null) {
            if (
                response.hits &&
                response.hits.hits &&
                response.hits.hits.length > 0
            ) {
                console.log(response.hits.hits);
                setIndexes(response.hits.hits);
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
                        const timeout = index === 0 ? 500 : index * 500;
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
                            const bookHref = getBookInfoPath(
                                book.topic,
                                book.md5
                            );
                            console.log("Selected!");
                            if (bookHref) {
                                navigate(bookHref);
                            }
                        }
                        setSelected(selected);
                    }}
                    filterBy={() => {
                        /**
                         * VERY IMPORTANT: Filtering and searching is already done by manticore.
                         * If this is not set to true,
                         * Typeahead will try to filter the returned results, ignoring
                         * some of them.
                         */
                        return true;
                    }}
                    minLength={5}
                    selected={selected}
                    className="search-input"
                    options={indexes}
                    labelKey="title"
                    useCache={false}
                    maxResults={5}
                ></AsyncTypeahead>
            </div>

            <button type="submit" className="btn btn-primary search-button">
                <i className="fas fa-search fa-lg"></i>
            </button>
        </div>
    );
}
