import MetadataInfoCover from "./info/MetadataInfoCover";
import MetadataInfoDownload from "./info/MetadataInfoDownload";
import { BookInfoSubProps } from "./MetadataInfoScreen";
import React from "react";
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

export default function MetadataInfoMobile({
    metadata,
    updateMetadata,
}: BookInfoSubProps) {
    return (
        <div className="d-flex flex-wrap justify-content-center bg-opacity-10">
            <div className="d-flex flex-wrap justify-content-center">
                <div
                    id="cover-download-section"
                    className="mt-4 mb-4 metadata-cover-section"
                >
                    <div className="d-flex flex-wrap justify-content-center w-100">
                        <MetadataInfoCover metadata={metadata} />
                    </div>
                </div>

                <div
                    id="info-section"
                    className="mt-4 mb-4 p-3 metadata-info-section"
                >
                    <div className="d-flex flex-wrap justify-content-start">
                        <MetadataInfoTitle metadata={metadata} />
                        <Break />
                        <MetadataInfoAuthors metadata={metadata} />
                        <Break className="mb-1" />
                        <SmallLine flexGrow />
                        <Break className="mb-4" />
                        <MetadataInfoFile metadata={metadata} />
                        <Break className="mb-1" />
                        <MetadataInfoSearch metadata={metadata} />
                        <Break className="mb-3" />
                        <MetadataInfoBadges metadata={metadata} />
                        <Break />
                        <MetadataInfoLibraryAdd
                            metadata={metadata}
                            updateMetadata={updateMetadata}
                        />
                        <Break className="mb-4" />
                        <MetadataInfoDescription
                            description={metadata.description}
                        />
                        <Break className="mb-5" />
                        <MetadataInfoDownload metadata={metadata} />

                        <Break className="mb-4" />
                    </div>
                </div>
            </div>
            <Break className="mb-4" />
            <div className="similar-results-container">
                <MetadataInfoSimilarScreen metadata={metadata} />
            </div>
        </div>
    );
}
