import Break from "../../general/Break";
import useCover from "../../general/helpers/useCover";
import Skeleton from "react-loading-skeleton";
import BookFigureCover from "../../general/BookFigureCover";
import { Metadata } from "../../general/helpers/generalTypes";
import { useEffect } from "react";

interface Props {
    metadata: Metadata;
}

export default function BookInfoCover({ metadata }: Props) {
    const [cover, coverDone] = useCover(metadata);

    return (
        <div className="d-flex flex-column mb-3 w-100">
            <div className="metadata-cover-img">
                <BookFigureCover
                    metadata={metadata}
                    cover={cover}
                    coverDone={coverDone}
                />
            </div>
        </div>
    );
}
