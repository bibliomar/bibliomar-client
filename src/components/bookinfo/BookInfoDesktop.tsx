import { MDBCol, MDBContainer } from "mdb-react-ui-kit";
import BookInfoCover from "./bookInfoSub/BookInfoCover";
import { Book } from "../general/helpers/generalTypes";
import BookInfoDownload from "./bookInfoSub/BookInfoDownload";
import { BookInfoSubProps } from "./BookInfoScreen";
import React from "react";
import Break from "../general/Break";
import SmallLine from "../general/SmallLine";
import BookInfoTitle from "./bookInfoSub/BookInfoTitle";
import BookInfoBadges from "./bookInfoSub/BookInfoBadges";

export default function BookInfoDesktop({
    book,
    userLogged,
    downloadLinks,
    error,
    description,
}: BookInfoSubProps) {
    return (
        <div className="d-flex">
            <div
                id="cover-download-section"
                className="ms-3 mt-4 mb-5 book-info-cover-section"
            >
                <div className="d-flex flex-wrap justify-content-center w-100">
                    <BookInfoCover md5={book.md5} />
                    <Break />
                    <Break />
                    <BookInfoDownload
                        downloadLinks={downloadLinks}
                        error={error}
                    />
                </div>
            </div>

            <div
                id="info-section"
                className="ms-3 mt-4 mb-5 me-3 book-info-section"
            >
                <div className="d-flex flex-wrap justify-content-start">
                    <BookInfoTitle book={book} />
                    <Break />
                    <SmallLine flexGrow />
                    <Break className="mb-2" />
                    <BookInfoBadges book={book} />
                </div>
            </div>
        </div>
    );
}
