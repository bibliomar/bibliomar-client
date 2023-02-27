import { Metadata } from "../helpers/generalTypes";
import MetadataCover from "../cover/MetadataCover";
import useCover from "../helpers/useCover";
import Break from "../Break";
import "./figure.scss";
import { MDBRipple } from "mdb-react-ui-kit";
import { formatBytes, getEmptyCover } from "../helpers/generalFunctions";
import useSwipe from "../helpers/useSwipe";
import React, { useEffect, useRef, useState } from "react";
import { LongPressDetectEvents, useLongPress } from "use-long-press";
import MetadataHoverableCover from "../cover/MetadataHoverableCover";
import { useTranslation } from "react-i18next";

interface Props {
    metadata: Metadata;
    timeout?: number;
    href?: string;

    showFileInfo?: boolean;
}

export default function MetadataHoverableFigure({
    metadata,
    timeout,
    href,
    showFileInfo,
}: Props) {
    const emptyCover = getEmptyCover();
    const { t } = useTranslation();
    const [cover, coverDone] = useCover(metadata, timeout);
    const [shouldForceMask, setShouldForceMask] = useState<boolean>(
        cover === undefined || cover === emptyCover
    );

    const formatAndSize = `${
        metadata.extension
            ? metadata.extension.toUpperCase()
            : t("metadatainfo:undefinedField")
    }, ${
        metadata.fileSize
            ? formatBytes(metadata.fileSize)
            : t("metadatainfo:undefinedField")
    }`;

    const handleImageError = (evt: React.SyntheticEvent<HTMLImageElement>) => {
        const target = evt.currentTarget;
        if (target.src !== emptyCover) {
            target.src = emptyCover;
        }
        setShouldForceMask(true);
        // Avoiding loops
        target.onerror = null;
    };

    const handleImageLoad = (evt: React.SyntheticEvent<HTMLImageElement>) => {
        const target = evt.currentTarget;
        if (target.src === emptyCover) {
            setShouldForceMask(true);
        }
        // Avoiding loops
        target.onload = null;
    };

    const renderMaskElement = () => {
        const { title, author } = metadata;
        const formattedTitle =
            title.length > 25 ? title.slice(0, 25) + "..." : title;
        const formattedAuthor =
            author.length > 25 ? author.slice(0, 25) + "..." : author;
        return (
            <div className="d-flex flex-column justify-content-center align-items-center h-100">
                <div className="d-flex flex-wrap justify-content-center align-items-center w-100 text-center text-light simple-text">
                    <span
                        className="fw-bold text-wrap mx-1"
                        style={{ fontSize: "1.05rem" }}
                    >
                        {formattedTitle}
                    </span>
                    <Break />
                    <span className="mx-1">{formattedAuthor}</span>
                    <Break />
                    {showFileInfo ? (
                        <span style={{ fontSize: "0.9rem" }}>
                            {formatAndSize}
                        </span>
                    ) : null}
                </div>
            </div>
        );
    };

    useEffect(() => {
        // Cleanup to avoid setting force mask on new metadatas.
        // This is very important.
        return () => {
            setShouldForceMask(false);
        };
    }, [metadata]);

    return (
        <div className="w-100 h-100">
            <MDBRipple
                className={`bg-image ${
                    shouldForceMask ? "" : "hover-overlay"
                } rounded w-100 h-100 shadow-3-strong`}
            >
                <MetadataHoverableCover
                    coverUrl={cover}
                    coverDone={coverDone}
                    href={href}
                    maskClassname="hoverable-mask"
                    maskElement={renderMaskElement()}
                    handleImageLoad={handleImageLoad}
                    handleImageError={handleImageError}
                />
            </MDBRipple>
        </div>
    );
}
