import { Metadata } from "../helpers/generalTypes";
import MetadataCover from "../cover/MetadataCover";
import useCover from "../helpers/useCover";
import Break from "../Break";
import "./figure.scss";
import { MDBRipple } from "mdb-react-ui-kit";
import { getEmptyCover } from "../helpers/generalFunctions";
import useSwipe from "../helpers/useSwipe";
import { useState } from "react";
import { LongPressDetectEvents, useLongPress } from "use-long-press";

interface Props {
    metadata: Metadata;
    timeout?: number;
    href?: string;
}

export default function MetadataHoverableFigure({
    metadata,
    timeout,
    href,
}: Props) {
    const emptyCover = getEmptyCover();

    const [cover, coverDone] = useCover(metadata, timeout);
    const [shouldForceMask, setShouldForceMask] = useState<boolean>(
        cover === undefined || cover === emptyCover
    );

    const renderMaskElement = () => {
        const { title, author } = metadata;
        const formattedTitle =
            title.length > 30 ? title.slice(0, 30) + "..." : title;
        const formattedAuthor =
            author.length > 30 ? author.slice(0, 30) + "..." : author;
        return (
            <div className="d-flex flex-column justify-content-center align-items-center h-100">
                <div className="d-flex flex-wrap justify-content-center align-items-center w-100 text-center text-light simple-text">
                    <span
                        className="fw-bold text-wrap"
                        style={{ fontSize: "1.05rem" }}
                    >
                        {formattedTitle}
                    </span>
                    <Break />
                    <span className="">{formattedAuthor}</span>
                </div>
            </div>
        );
    };

    return (
        <div className="w-100 h-100">
            <MDBRipple
                className={`bg-image ${
                    shouldForceMask ? "" : "hover-overlay"
                } rounded w-100 h-100 shadow-3-strong`}
            >
                <MetadataCover
                    coverUrl={cover}
                    coverDone={coverDone}
                    href={href}
                    mask
                    maskClassname="hoverable-mask"
                    maskElement={renderMaskElement()}
                />
            </MDBRipple>
        </div>
    );
}
