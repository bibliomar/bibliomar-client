import { MDBCol, MDBContainer } from "mdb-react-ui-kit";
import BookInfoCover from "./info/BookInfoCover";
import { Metadata } from "../general/helpers/generalTypes";
import BookInfoDownload from "./info/BookInfoDownload";
import { BookInfoSubProps } from "./BookInfoScreen";
import React, { useRef } from "react";
import Break from "../general/Break";
import SmallLine from "../general/SmallLine";
import BookInfoTitle from "./info/BookInfoTitle";
import BookInfoBadges from "./info/BookInfoBadges";
import BookInfoDescription from "./info/BookInfoDescription";
import BookInfoFile from "./info/BookInfoFile";
import BookInfoAuthors from "./info/BookInfoAuthors";
import BookInfoLibraryAdd from "./info/BookInfoLibraryAdd";
import MetadataInfoSimilarScreen from "./similar/MetadataInfoSimilarScreen";

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
                    className="ms-3 mt-4 mb-4 metadata-cover-section"
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
                    className="ms-3 mt-4 mb-4 me-3 metadata-info-section"
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
                        <Break className="mb-1" />
                        <BookInfoDescription
                            description={metadata.description}
                        />
                        <Break />
                    </div>
                </div>
            </div>
            <Break className="mb-4" />
            <div className="p-3 w-100">
                <MetadataInfoSimilarScreen metadata={metadata} />
            </div>
        </div>
    );
}
