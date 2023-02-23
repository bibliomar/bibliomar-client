import { Metadata } from "../../general/helpers/generalTypes";
import useCover from "../../general/helpers/useCover";
import { getMetadataInfoPath } from "../../general/helpers/generalFunctions";
import MetadataSelectableFigure from "../../general/figure/MetadataSelectableFigure";

interface Props {
    metadata: Metadata;
    timeout: number;
}

export default function SearchFigure({ metadata, timeout }: Props) {
    const [cover, coverDone] = useCover(metadata, timeout);
    const href = getMetadataInfoPath(metadata.topic, metadata.md5);
    return (
        <div className="search-result-figure mb-3">
            <MetadataSelectableFigure
                metadata={metadata}
                cover={cover}
                coverDone={coverDone}
                href={href}
                expanded
            />
        </div>
    );
}
