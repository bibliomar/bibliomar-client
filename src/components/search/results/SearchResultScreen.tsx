import SearchResultsContent from "./SearchResultsContent";
import React, { SetStateAction } from "react";
import SearchPagination from "../SearchPagination";
import Break from "../../general/Break";
import { Metadata } from "../../general/helpers/generalTypes";
import { SearchRequestStatus } from "../helpers/searchTypes";
import SearchMessageScreen from "../loading/SearchMessageScreen";
import { el } from "date-fns/locale";

interface ResultScreenProps {
    visibleResults: Metadata[];
}

export default function SearchResultScreen(props: ResultScreenProps) {
    const renderBasedOnResults = () => {
        if (props.visibleResults.length === 0) {
            return null;
        } else {
            return (
                <SearchResultsContent visibleResults={props.visibleResults} />
            );
        }
    };
    return (
        <div className="d-flex flex-wrap justify-content-center">
            {renderBasedOnResults()}
        </div>
    );
}
