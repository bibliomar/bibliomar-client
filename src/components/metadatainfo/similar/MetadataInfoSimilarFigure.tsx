import useCover from "../../general/helpers/useCover";
import { Metadata } from "../../general/helpers/generalTypes";
import { getMetadataInfoPath } from "../../general/helpers/generalFunctions";
import SimpleBookFigure from "../../general/figure/SimpleBookFigure";
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
        <div id="similar-metadata-div" className="similar-figure-img me-2 mb-3">
            <SimpleBookFigure
                metadata={metadata}
                cover={cover}
                coverDone={coverDone}
                href={href}
                selectable
                expanded
            />
        </div>
    );
}
