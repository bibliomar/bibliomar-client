import MetadataSelectableFigure from "../../general/figure/MetadataSelectableFigure";
import { Metadata } from "../../general/helpers/generalTypes";
import useCover from "../../general/helpers/useCover";

interface Props {
    metadata: Metadata;
    timeout: number;
}

export default function RecommendationBookFigure({ metadata, timeout }: Props) {
    const [cover, coverDone] = useCover(metadata, timeout);

    const href = `/search?category=${metadata.topic}&q=${metadata.title}`;

    return (
        <div className="recommendation-figure me-2 mb-3">
            <MetadataSelectableFigure metadata={metadata} href={href} />
        </div>
    );
}
