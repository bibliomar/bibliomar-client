import SearchResultsContent from "./SearchResultsContent";
import React from "react";
import SearchPagination from "../SearchPagination";
import Break from "../../general/Break";
import { Book } from "../../general/helpers/generalTypes";

interface ResultScreenProps {
    results: Book[];
    pageChangeHandler: (evt: any) => void;
    pageCount: number;
}

export default function SearchResultScreen(props: ResultScreenProps) {
    return (
        <div className="d-flex flex-wrap justify-content-center mt-5 ms-lg-4">
            {props.results.length > 0 ? (
                <>
                    <SearchResultsContent results={props.results} />
                    <Break />
                    <SearchPagination
                        pageChangeHandler={props.pageChangeHandler}
                        pageCount={props.pageCount}
                    />
                </>
            ) : null}
        </div>
    );
}
