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
import BookInfoDescription from "./bookInfoSub/BookInfoDescription";
import BookInfoFile from "./bookInfoSub/BookInfoFile";
import BookInfoReadOnline from "./bookInfoSub/BookInfoReadOnline";

export default function BookInfoDesktop({
    book,
    userLogged,
    downloadLinks,
    error,
    description,
}: BookInfoSubProps) {
    return (
        // Two flex containers because we want one to wrap and the other one not to.
        <div className="d-flex flex-wrap justify-content-center">
            <div className="d-flex">
                <div
                    id="cover-download-section"
                    className="ms-3 mt-4 mb-4 book-info-cover-section"
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
                    className="ms-3 mt-4 mb-4 me-3 book-info-section"
                >
                    <div className="d-flex flex-wrap justify-content-start">
                        <BookInfoTitle book={book} />
                        <Break />
                        <SmallLine flexGrow />
                        <Break className="mb-2" />
                        <BookInfoFile book={book} />
                        <Break className="mb-2" />
                        <BookInfoBadges book={book} />
                        <Break className="mb-4" />
                        <BookInfoDescription description={description} />
                    </div>
                </div>
            </div>
            <Break />
            <SmallLine flexGrow className="me-4 ms-4" />
            <Break className="mt-2" />
            <BookInfoReadOnline book={book} downloadLinks={downloadLinks} />
        </div>
    );
}
