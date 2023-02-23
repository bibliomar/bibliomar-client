import { Metadata } from "../../general/helpers/generalTypes";
import MetadataHoverableFigure from "../../general/figure/MetadataHoverableFigure";

interface Props {
    metadata: Metadata;
    href?: string;
}

export default function ExploreContentFigure({ metadata, href }: Props) {
    return (
        <div className="w-100 explore-figure mb-2">
            <MetadataHoverableFigure metadata={metadata} href={href} />
        </div>
    );
}
