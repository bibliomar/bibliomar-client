import MetadataSelectableFigure from "../../general/figure/MetadataSelectableFigure";
import { Metadata } from "../../general/helpers/generalTypes";
import useCover from "../../general/helpers/useCover";
import MetadataHoverableFigure from "../../general/figure/MetadataHoverableFigure";

interface Props {
    metadata: Metadata;
    timeout: number;
}

export default function RecommendationBookFigure({ metadata, timeout }: Props) {
    const [cover, coverDone] = useCover(metadata, timeout);

    const href = `/search?topic=${metadata.topic}&q=${metadata.title}`;

    return (
        <div className="metadata-figure me-2 mb-3">
            <MetadataHoverableFigure
                metadata={metadata}
                href={href}
                timeout={timeout}
            />
        </div>
    );
}
