import BookFigure from "./BookFigure";
import Break from "../../general/Break";
import React, { useState } from "react";
import { Book } from "../../general/helpers/generalTypes";

interface Props {
    results: Book[];
    setAjaxStatus: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchResults(props: Props) {
    function addBreak(i: number) {
        if (i % 3 === 0) {
            return <Break key={i * Math.random() * 100} />;
        }
    }

    function renderBasedOnResults() {
        if (props.results.length === 0) {
            return <></>;
        } else if (props.results.length > 0) {
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
                                result={ele}
                                timeout={timeout}
                                key={i * Math.random() * 100}
                            />
                        );
                    })}
                </>
            );
        }
    }

    return <>{renderBasedOnResults()}</>;
}
