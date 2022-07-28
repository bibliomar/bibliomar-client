import React, { MouseEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Book } from "../../../helpers/generalTypes";
import { Size, useWindowSize } from "../../general/useWindowSize";
import ReaderBookFigureMobile from "./ReaderBookFigureMobile";
import ReaderBookFigureDesktop from "./ReaderBookFigureDesktop";
import ReaderBookFigureSpotlight from "./ReaderBookFigureSpotlight";
import { PossibleReaderScreenStates } from "../helpers/readerTypes";

interface Props {
    book: Book;
    timeout: number;
    itemNumber: number;
    arrayBuffer: ArrayBuffer;
    spotlight?: boolean;
}

async function getCover(md5: string) {
    let reqUrl = `https://biblioterra.herokuapp.com/v1/cover/${md5}`;
    let request;
    try {
        request = await axios.get(reqUrl);
    } catch (e: any) {
        // 500 errors means Biblioterra couldn't find a cover.
        return null;
    }
    if (request?.data) {
        sessionStorage.setItem(`${md5}-cover`, request?.data);
        return request?.data;
    }
    return null;
}

export default function ReaderBookFigure(props: Props) {
    const book: Book = props.book;
    let navigate = useNavigate();
    const size: Size = useWindowSize();
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
        const readerScreenState: PossibleReaderScreenStates = {
            arrayBuffer: props.arrayBuffer,
            onlineFile: props.book,
            localFile: undefined,
        };

        navigate(`${book.title}`, {
            state: readerScreenState,
        });
    };

    useEffect(() => {
        let coverSetTimeout: number;
        let possibleCachedCover = sessionStorage.getItem(`${book.md5}-cover`);

        if (possibleCachedCover) {
            setCover(possibleCachedCover);
            setCoverDone(true);
            return;
        } else {
            coverSetTimeout = setTimeout(() => {
                getCover(book.md5).then((r) => {
                    if (r == null) {
                        setCoverDone(true);
                        return;
                    }
                    setCoverDone(true);
                    setCover(r);
                });
            }, props.timeout);
            return () => clearTimeout(coverSetTimeout);
        }
    }, []);

    return (
        <>
            {props.spotlight ? (
                <ReaderBookFigureSpotlight
                    book={book}
                    cover={cover}
                    coverDone={coverDone}
                    onClickFunction={onClickHandler}
                />
            ) : null}
            {size.width! < 600 && !props.spotlight ? (
                <ReaderBookFigureMobile
                    book={book}
                    cover={cover}
                    coverDone={coverDone}
                    onClickFunction={onClickHandler}
                />
            ) : size.width! > 600 && !props.spotlight ? (
                <ReaderBookFigureDesktop
                    book={book}
                    cover={cover}
                    coverDone={coverDone}
                    onClickFunction={onClickHandler}
                />
            ) : null}
        </>
    );
}
