import BookFigure from "./BookFigure";
import Break from "../../general/Break";
import React, { SetStateAction, useState } from "react";
import { Book } from "../../general/helpers/generalTypes";
import { RequestStatus } from "../helpers/searchTypes";

interface Props {
    results: Book[];
}

export default function SearchResultsContent(props: Props) {
    function addBreak(i: number) {
        if (i % 3 === 0) {
            return <Break key={i * Math.random() * 100} />;
        }
    }

    return (
        <>
            {props.results.map((ele, i) => {
                let timeout: number;
                if (i === 0) {
                    timeout = 1500;
                } else {
                    timeout = i * 1500;
                }
                addBreak(i);
                return (
                    <BookFigure
                        book={ele}
                        timeout={timeout}
                        key={i * Math.random() * 100}
                    />
                );
            })}
        </>
    );
}
