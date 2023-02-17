import BookFigure from "./BookFigure";
import Break from "../../general/Break";
import React, { SetStateAction, useState } from "react";
import { Metadata } from "../../general/helpers/generalTypes";
import { SearchRequestStatus } from "../helpers/searchTypes";

interface Props {
    visibleResults: Metadata[];
}

export default function SearchResultsContent(props: Props) {
    return (
        <>
            {props.visibleResults.map((ele, i) => {
                if (ele === null) return null;

                let timeout: number;
                if (i === 0) {
                    timeout = 500;
                } else {
                    timeout = i * 750;
                }
                return <BookFigure metadata={ele} timeout={timeout} key={i} />;
            })}
        </>
    );
}
