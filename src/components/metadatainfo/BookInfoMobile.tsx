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
import BookInfoAuthors from "./bookInfoSub/BookInfoAuthors";
import BookInfoLibraryAdd from "./bookInfoSub/BookInfoLibraryActions/BookInfoLibraryAdd";

export default function BookInfoMobile({
    metadata,
    downloadLinks,
    downloadLinksError,
    updateMetadata,
}: BookInfoSubProps) {
    return (
        <div className="d-flex flex-wrap justify-content-center bg-opacity-10">
            <div className="d-flex flex-wrap justify-content-center">
                <div
                    id="cover-download-section"
                    className="mt-4 mb-4 book-info-cover-section"
                >
                    <div className="d-flex flex-wrap justify-content-center w-100">
                        <BookInfoCover metadata={metadata} />
                    </div>
                </div>

                <div
                    id="info-section"
                    className="ms-3 mt-4 mb-4 me-3 book-info-section"
                >
                    <div className="d-flex flex-wrap justify-content-start">
                        <BookInfoTitle metadata={metadata} />
                        <Break />
                        <BookInfoAuthors metadata={metadata} />
                        <Break className="mb-1" />
                        <SmallLine flexGrow />
                        <Break className="mb-2" />

                        <Break className="mb-2" />
                        <BookInfoFile metadata={metadata} />
                        <Break className="mb-3" />
                        <BookInfoBadges metadata={metadata} />
                        <Break />
                        <BookInfoLibraryAdd
                            metadata={metadata}
                            updateMetadata={updateMetadata}
                        />
                        <Break className="mb-4" />
                        <BookInfoDescription
                            description={metadata.description}
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
        </div>
    );
}
