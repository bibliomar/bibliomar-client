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
import { useWindowSize } from "../../general/helpers/useWindowSize";
import { useTranslation } from "react-i18next";
import { Metadata } from "../../general/helpers/generalTypes";
import makeSearch from "../helpers/makeSearch";
import {
    ManticoreSearchResponse,
    SearchFormFields,
} from "../helpers/searchTypes";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import { Option } from "react-bootstrap-typeahead/types/types";
import SearchBarInput from "./SearchBarInput";
import SearchBarItemExpanded from "./SearchBarItemExpanded";
import SearchBarItemSimple from "./SearchBarItemSimple";
import { FormikProps } from "formik";
import { buildSearchObject } from "../helpers/searchFunctions";

interface Props {
    topicContext: string;
    setOptionsHidden: React.Dispatch<SetStateAction<boolean>>;
    formik: FormikProps<SearchFormFields>;
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

export default function SearchBar({ setOptionsHidden, formik }: Props) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { width } = useWindowSize();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selected, setSelected] = useState<Option[]>([]);
    const [indexes, setIndexes] = useState<Option[]>([]);

    async function handleSearch(query: string) {
        setIsLoading(true);
        const searchObject = buildSearchObject(
            {
                ...formik.values,
                q: query,
            },
            0,
            5,
            true
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
            <div className="search-field d-flex flex-nowrap">
                <AsyncTypeahead
                    /*
                    Very important: Do not put anything async-related inside this component's
                    onInput. It will cause the component to break.
                     */
                    id="search-bar"
                    renderInput={(inputProps) => {
                        return (
                            <SearchBarInput
                                inputProps={inputProps}
                                setOptionsHidden={setOptionsHidden}
                                formik={formik}
                            />
                        );
                    }}
                    renderMenuItemChildren={(option, props, index) => {
                        const book = option as Metadata;

                        return <SearchBarItemExpanded metadata={book} />;
                    }}
                    isLoading={isLoading}
                    onSearch={handleSearch}
                    onChange={async (selected) => {
                        if (selected.length > 0) {
                            const book = selected[0] as Metadata;
                            if (formik.values.type === "author") {
                                formik.setFieldValue("q", book.author);
                            } else {
                                formik.setFieldValue("q", book.title);
                            }
                            await formik.submitForm();
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
                    minLength={4}
                    selected={selected}
                    className="w-100 d-flex"
                    options={indexes}
                    labelKey="title"
                    useCache={true}
                    maxResults={5}
                />
                <button
                    type="submit"
                    className="btn btn-primary search-button"
                    disabled={formik.isSubmitting}
                >
                    <i className="fas fa-search fa-lg"></i>
                </button>
            </div>
        </div>
    );
}
