import SimpleBookFigure from "../../general/figure/SimpleBookFigure";
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
            <SimpleBookFigure
                loadingClassName="loading-skeleton-recommendation"
                metadata={metadata}
                cover={cover}
                coverDone={coverDone}
                href={href}
            />
        </div>
    );
}
