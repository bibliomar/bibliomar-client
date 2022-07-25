import { MDBRipple, MDBSpinner } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Book } from "../../../helpers/types";
import { SavedBooks } from "../downloader/ReaderDownloader";
import { Size, useWindowSize } from "../../general/useWindowSize";
import ReaderBookFigureMobile from "./ReaderBookFigureMobile";
import ReaderBookFigureDesktop from "./ReaderBookFigureDesktop";
import ReaderBookFigureSpotlight from "./ReaderBookFigureSpotlight";

interface Props {
    book: Book;
    timeout: number;
    itemNumber: number;
    arrayBuffer: ArrayBuffer;
    spotlight?: boolean;
}

async function getCover(md5: string, itemNum: number) {
    let reqUrl = `https://biblioterra.herokuapp.com/v1/cover/${md5}`;
    let request;
    try {
        request = await axios.get(reqUrl);
    } catch (e: any) {
        // 500 errors means Biblioterra couldn't find a cover.
        return null;
    }
    if (request?.data) {
        const thisCoverInfo = {
            md5: md5,
            cover: request?.data,
        };

        localStorage.setItem(
            `${itemNum}-reader-cover`,
            JSON.stringify(thisCoverInfo)
        );
        return request?.data;
    }
    return null;
}

export default function (props: Props) {
    const book: Book = props.book;
    let navigate = useNavigate();
    const size: Size = useWindowSize();
    const [cover, setCover] = useState<string>(
        "https://libgen.rocks/img/blank.png"
    );
    const [coverDone, setCoverDone] = useState<boolean>(false);

    useEffect(() => {
        let coverSetTimeout: number;
        let possibleCachedCover = localStorage.getItem(
            `${props.itemNumber}-reader-cover`
        ) as string;

        if (possibleCachedCover) {
            let cachedCoverInfo = JSON.parse(possibleCachedCover);
            if (cachedCoverInfo.md5 === book.md5) {
                setCoverDone(true);
                setCover(cachedCoverInfo.cover);
                return;
            }
        } else {
            coverSetTimeout = setTimeout(() => {
                getCover(book.md5, props.itemNumber).then((r) => {
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
                    arrayBuffer={props.arrayBuffer}
                />
            ) : null}
            {size.width! < 600 && !props.spotlight ? (
                <ReaderBookFigureMobile
                    book={book}
                    cover={cover}
                    coverDone={coverDone}
                    arrayBuffer={props.arrayBuffer}
                />
            ) : size.width! > 600 && !props.spotlight ? (
                <ReaderBookFigureDesktop
                    book={book}
                    cover={cover}
                    coverDone={coverDone}
                    arrayBuffer={props.arrayBuffer}
                />
            ) : null}
        </>
    );
}
