import BookFigure from "./BookFigure";
import Break from "../../general/Break";
import React, { SetStateAction, useState } from "react";
import { Book } from "../../general/helpers/generalTypes";
import { SearchRequestStatus } from "../helpers/searchTypes";

interface Props {
    visibleResults: Book[];
}

export default function SearchResultsContent(props: Props) {
    return (
        <>
            {props.visibleResults.map((ele, i) => {
                let timeout: number;
                if (i === 0) {
                    timeout = 250;
                } else {
                    timeout = i * 500;
                }
                return <BookFigure book={ele} timeout={timeout} key={i} />;
            })}
        </>
    );
}
