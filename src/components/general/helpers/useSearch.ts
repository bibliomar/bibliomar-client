import { useEffect, useState } from "react";
import { Metadata } from "./generalTypes";
import makeSearch from "../../search/helpers/makeSearch";
import { ManticoreSearchResponse } from "../../search/helpers/searchTypes";
import { AxiosError } from "axios";

export default function useSearch(searchObject: object | undefined) {
    const [searchResults, setSearchResults] = useState<
        ManticoreSearchResponse | undefined
    >(undefined);
    const [searchLoading, setSearchLoading] = useState<boolean>(false);
    const [searchError, setSearchError] = useState<AxiosError | undefined>(
        undefined
    );

    useEffect(() => {
        if (searchObject == undefined) {
            setSearchResults(undefined);
            return;
        }
        setSearchLoading(true);
        makeSearch(searchObject)
            .then((result) => {
                if (result) {
                    setSearchResults(result);
                } else {
                    setSearchResults(undefined);
                }
                setSearchLoading(false);
            })
            .catch((err) => {
                setSearchError(err);
                setSearchLoading(false);
            });
    }, [searchObject]);

    return { searchResults, searchLoading, searchError };
}
