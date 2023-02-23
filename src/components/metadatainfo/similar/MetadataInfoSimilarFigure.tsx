import useCover from "../../general/helpers/useCover";
import { Metadata } from "../../general/helpers/generalTypes";
import { getMetadataInfoPath } from "../../general/helpers/generalFunctions";
import MetadataSelectableFigure from "../../general/figure/MetadataSelectableFigure";
import React from "react";

interface Props {
    metadata: Metadata;
    timeout: number;
}

export default function MetadataInfoSimilarFigure({
    metadata,
    timeout,
}: Props) {
    const [cover, coverDone] = useCover(metadata, timeout);
    const href = getMetadataInfoPath(metadata.topic, metadata.md5);
    return (
        <div
            id="similar-metadata-div"
            className="similar-figure-img me-0 me-lg-2 mb-3"
        >
            <MetadataSelectableFigure
                metadata={metadata}
                href={href}
                selectable
            />
        </div>
    );
}
