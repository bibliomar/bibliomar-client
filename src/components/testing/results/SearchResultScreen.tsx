import SearchResultsContent from "./SearchResultsContent";
import React, { SetStateAction } from "react";
import SearchPagination from "../SearchPagination";
import Break from "../../general/Break";
import { Book } from "../../general/helpers/generalTypes";
import { RequestStatus } from "../helpers/searchTypes";
import SearchLoadingScreen from "../loading/SearchLoadingScreen";

interface ResultScreenProps {
    results: Book[];
    requestStatus: RequestStatus | undefined;
    pageChangeHandler: (evt: any) => void;
    pageCount: number;
}

export default function SearchTestingResultScreen(props: ResultScreenProps) {
    return (
        <div className="d-flex flex-wrap justify-content-center mt-5 ms-lg-4">
            {props.requestStatus ? (
                <SearchLoadingScreen requestStatus={props.requestStatus} />
            ) : null}
            <Break />

            {props.results.length > 0 ? (
                <SearchResultsContent results={props.results} />
        
            ) : null}
        </div>
    );
}
