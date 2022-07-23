import BookFigure from "./BookFigure";
import Break from "../../general/Break";
import React, { useState } from "react";

type Book = {
    [key: string]: any;
};

interface Props {
    results: Book[];
    setAjaxStatus: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchResults(props: Props) {
    function addBreak(i: number) {
        if (i % 3 === 0) {
            return <Break key={i + 1} />;
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
                                lastElement={i + 1 === props.results.length}
                                setAjaxStatus={props.setAjaxStatus}
                                key={i}
                            />
                        );
                    })}
                </>
            );
        }
    }

    return <>{renderBasedOnResults()}</>;
}
