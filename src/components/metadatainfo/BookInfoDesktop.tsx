import { MDBCol, MDBContainer } from "mdb-react-ui-kit";
import BookInfoCover from "./bookInfoSub/BookInfoCover";
import { Metadata } from "../general/helpers/generalTypes";
import BookInfoDownload from "./bookInfoSub/BookInfoDownload";
import { BookInfoSubProps } from "./BookInfoScreen";
import React, { useRef } from "react";
import Break from "../general/Break";
import SmallLine from "../general/SmallLine";
import BookInfoTitle from "./bookInfoSub/BookInfoTitle";
import BookInfoBadges from "./bookInfoSub/BookInfoBadges";
import BookInfoDescription from "./bookInfoSub/BookInfoDescription";
import BookInfoFile from "./bookInfoSub/BookInfoFile";
import BookInfoAuthors from "./bookInfoSub/BookInfoAuthors";
import BookInfoLibraryAdd from "./bookInfoSub/BookInfoLibraryActions/BookInfoLibraryAdd";

export default function BookInfoDesktop({
    metadata,
    updateMetadata,
    downloadLinks,
    downloadLinksError,
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
                        <BookInfoCover metadata={metadata} />
                        <Break />
                        <BookInfoDownload
                            downloadLinks={downloadLinks}
                            error={downloadLinksError}
                        />
                    </div>
                </div>

                <div
                    id="info-section"
                    className="ms-3 mt-4 mb-4 me-3 book-info-section"
                >
                    <div className="d-flex flex-wrap justify-content-start">
                        <div className="d-flex w-100">
                            <div className="d-flex flex-wrap w-50">
                                <BookInfoTitle metadata={metadata} />
                                <Break />
                                <BookInfoAuthors metadata={metadata} />
                            </div>
                            <div
                                className="d-flex flex-wrap ms-auto me-4"
                                style={{ height: "fit-content" }}
                            >
                                <BookInfoLibraryAdd
                                    metadata={metadata}
                                    updateMetadata={updateMetadata}
                                />
                            </div>
                        </div>

                        <Break />

                        <Break />
                        <SmallLine flexGrow />
                        <Break className="mb-2" />
                        <BookInfoFile metadata={metadata} />
                        <Break className="mb-3" />
                        <BookInfoBadges metadata={metadata} />
                        <Break className="mb-4" />
                        <BookInfoDescription
                            description={metadata.description}
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
