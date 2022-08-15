import React, { MouseEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Book } from "../../general/helpers/generalTypes";
import { Size, useWindowSize } from "../../general/helpers/useWindowSize";
import ReaderBookFigureResponsive from "./ReaderBookFigureResponsive";
import ReaderBookFigureSpotlight from "./ReaderBookFigureSpotlight";
import { PossibleReaderScreenState } from "../helpers/readerTypes";
import { getCover } from "../../general/helpers/generalFunctions";

interface Props {
    book: Book;
    timeout: number;
    itemNumber: number;
    arrayBuffer: ArrayBuffer;
    spotlight?: boolean;
}

export default function ReaderBookFigure(props: Props) {
    const book: Book = props.book;
    let navigate = useNavigate();
    const [cover, setCover] = useState<string>(
        "https://libgen.rocks/img/blank.png"
    );
    const [coverDone, setCoverDone] = useState<boolean>(false);

    /**
     * It's a function that takes an event, and then navigates to the reader screen with the book information and the
     * arrayBuffer
     * @param evt - The event that triggered the function.
     */
    const onClickHandler: MouseEventHandler = (evt) => {
        evt.preventDefault();
        // This is the state to be passed to /reader/:bookname, which is the actual reader.
        const readerScreenState: PossibleReaderScreenState = {
            arrayBuffer: props.arrayBuffer,
            onlineFile: props.book,
            localFile: undefined,
        };

        navigate(`${book.title}`, {
            state: readerScreenState,
        });
    };

    useEffect(() => {
        let coverSetTimeout: number | undefined;
        getCover(book.md5, setCover, setCoverDone, props.timeout).then(
            (r) => (coverSetTimeout = r)
        );
        return () => {
            clearTimeout(coverSetTimeout);
        };
    }, []);

    return (
        <>
            <ReaderBookFigureSpotlight
                book={book}
                cover={cover}
                coverDone={coverDone}
                onClickFunction={onClickHandler}
            />
        </>
    );
}
