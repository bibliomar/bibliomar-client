import SearchResults from "./SearchResults";
import React from "react";
import Pagination from "../pagination/Pagination";
import Break from "../../general/Break";

interface ResultsInterface {
    results: any;
    page: any;
    setAjaxStatus: React.Dispatch<React.SetStateAction<string>>;
    setPage: any;
}

export default function ResultScreen(props: ResultsInterface) {
    return (
        <div className="d-flex flex-wrap justify-content-center mt-5 ms-lg-4">
            <SearchResults
                setAjaxStatus={props.setAjaxStatus}
                results={props.results}
            />
            <Break />
            {props.results.length > 0 ? (
                <Pagination
                    page={props.page}
                    setPage={props.setPage}
                    resultsLength={props.results.length}
                />
            ) : (
                <> </>
            )}
        </div>
    );
}
