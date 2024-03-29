import { Metadata } from "../../general/helpers/generalTypes";
import MetadataHoverableFigure from "../../general/figure/MetadataHoverableFigure";

interface Props {
    metadata: Metadata;
    href?: string;
    timeout: number;
}

export default function ExploreContentFigure({
    metadata,
    href,
    timeout,
}: Props) {
    return (
        <div className="w-100 metadata-figure mb-2">
            <MetadataHoverableFigure
                metadata={metadata}
                href={href}
                timeout={timeout}
                showFileInfo
            />
        </div>
    );
}
