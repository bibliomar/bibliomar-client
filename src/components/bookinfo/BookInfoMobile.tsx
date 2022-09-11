import BookInfoCover from "./bookInfoSub/BookInfoCover";
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
import BookInfoAuthors from "./bookInfoSub/BookInfoAuthors";
import BookInfoLibraryButtons from "./bookInfoSub/BookInfoLibraryActions/BookInfoLibraryButtons";

export default function BookInfoMobile({
    bookInfo,
    setBookInfo,
    downloadLinks,
    downloadLinksError,
    savedBook,
}: BookInfoSubProps) {
    return (
        <div className="d-flex flex-wrap justify-content-center bg-opacity-10">
            <div className="d-flex flex-wrap justify-content-center">
                <div
                    id="cover-download-section"
                    className="mt-4 mb-4 book-info-cover-section"
                >
                    <div className="d-flex flex-wrap justify-content-center w-100">
                        <BookInfoCover book={bookInfo} md5={bookInfo.md5} />
                    </div>
                </div>

                <div
                    id="info-section"
                    className="ms-3 mt-4 mb-4 me-3 book-info-section"
                >
                    <div className="d-flex flex-wrap justify-content-start">
                        <BookInfoTitle book={bookInfo} />
                        <Break />
                        <BookInfoAuthors book={bookInfo} />
                        <Break className="mb-1" />
                        <SmallLine flexGrow />
                        <Break className="mb-2" />
                        <BookInfoLibraryButtons
                            book={bookInfo}
                            setBookInfo={setBookInfo}
                        />
                        <Break className="mb-2" />
                        <BookInfoFile book={bookInfo} />
                        <Break className="mb-3" />
                        <BookInfoBadges savedBook={savedBook} book={bookInfo} />
                        <Break className="mb-4" />
                        <BookInfoDescription
                            description={bookInfo.description!}
                        />
                        <Break className="mb-5" />
                        <BookInfoDownload
                            downloadLinks={downloadLinks}
                            error={downloadLinksError}
                        />
                    </div>
                </div>
            </div>
            <Break />
            <SmallLine flexGrow className="me-4 ms-4" />
            <Break className="mt-2" />
            <BookInfoReadOnline
                savedBook={savedBook}
                book={bookInfo}
                downloadLinks={downloadLinks}
            />
        </div>
    );
}
