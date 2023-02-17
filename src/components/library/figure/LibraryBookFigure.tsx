import React from "react";
import { Metadata } from "../../general/helpers/generalTypes";
import SimpleBookFigure from "../../general/figure/SimpleBookFigure";
import useCover from "../../general/helpers/useCover";
import { getMetadataInfoPath } from "../../general/helpers/generalFunctions";

interface Props {
    metadata: Metadata;
    timeout: number;
    expanded?: boolean;
}

export default function LibraryBookFigure(props: Props) {
    const metadata = props.metadata;
    const [cover, coverDone] = useCover(metadata, props.timeout);
    const href = getMetadataInfoPath(metadata.topic, metadata.md5);
    return (
        <div id="library-book-div" className="library-figure-img me-2 mb-3">
            <SimpleBookFigure
                metadata={props.metadata}
                cover={cover}
                coverDone={coverDone}
                href={href}
                expanded={props.expanded}
            />
        </div>
    );
}
