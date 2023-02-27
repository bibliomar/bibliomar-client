import { MDBCol, MDBContainer } from "mdb-react-ui-kit";
import MetadataInfoCover from "./info/MetadataInfoCover";
import { Metadata } from "../general/helpers/generalTypes";
import MetadataInfoDownload from "./info/MetadataInfoDownload";
import { BookInfoSubProps } from "./MetadataInfoScreen";
import React, { useRef } from "react";
import Break from "../general/Break";
import SmallLine from "../general/SmallLine";
import MetadataInfoTitle from "./info/MetadataInfoTitle";
import MetadataInfoBadges from "./info/MetadataInfoBadges";
import MetadataInfoDescription from "./info/MetadataInfoDescription";
import MetadataInfoFile from "./info/MetadataInfoFile";
import MetadataInfoAuthors from "./info/MetadataInfoAuthors";
import MetadataInfoLibraryAdd from "./info/MetadataInfoLibraryAdd";
import MetadataInfoSimilarScreen from "./similar/MetadataInfoSimilarScreen";
import MetadataInfoSearch from "./info/MetadataInfoSearch";

export default function MetadataInfoDesktop({
    metadata,
    updateMetadata,
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
                        <MetadataInfoCover metadata={metadata} />
                        <Break />
                        <MetadataInfoDownload metadata={metadata} />
                    </div>
                </div>

                <div
                    id="info-section"
                    className="ms-3 mt-4 mb-4 me-3 metadata-info-section"
                >
                    <div className="d-flex flex-wrap justify-content-start">
                        <div className="d-flex w-100">
                            <div className="d-flex flex-wrap w-50">
                                <MetadataInfoTitle metadata={metadata} />
                                <Break />
                                <MetadataInfoAuthors metadata={metadata} />
                            </div>
                            <div
                                className="d-flex flex-wrap ms-auto me-4"
                                style={{ height: "fit-content" }}
                            >
                                <MetadataInfoLibraryAdd
                                    metadata={metadata}
                                    updateMetadata={updateMetadata}
                                />
                            </div>
                        </div>

                        <Break />

                        <Break />
                        <SmallLine flexGrow />
                        <Break className="mb-2" />
                        <MetadataInfoFile metadata={metadata} />
                        <Break className="mb-1" />
                        <MetadataInfoSearch metadata={metadata} />
                        <Break className="mb-3" />
                        <MetadataInfoBadges metadata={metadata} />
                        <Break className="mb-1" />
                        <MetadataInfoDescription
                            description={metadata.description}
                        />
                        <Break className="mb-2" />
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
