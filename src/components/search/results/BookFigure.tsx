// noinspection AllyJsxHardcodedStringInspection

import React, { SetStateAction, useEffect } from "react";

import { MDBRipple } from "mdb-react-ui-kit";
import Break from "../../general/Break";
import { Metadata } from "../../general/helpers/generalTypes";
import useCover from "../../general/helpers/useCover";
import MetadataCover from "../../general/cover/MetadataCover";
import {
    SearchRequestStatus,
    SearchRequestStatusOptions,
    SearchRequestType,
} from "../helpers/searchTypes";
import { useTranslation } from "react-i18next";
import {
    formatBytes,
    getMetadataInfoPath,
} from "../../general/helpers/generalFunctions";

interface Props {
    metadata: Metadata;
    timeout: number;
}

export default function BookFigure({ metadata, timeout }: Props) {
    const { t } = useTranslation();
    const [cover, coverDone] = useCover(metadata, timeout);
    const extension = metadata.extension
        ? metadata.extension.toUpperCase()
        : t("search:formatoIndefinido");
    const size = metadata.fileSize
        ? formatBytes(metadata.fileSize)
        : t("search:tamanhoIndefinido");

    const href = getMetadataInfoPath(metadata.topic, metadata.md5);

    return (
        <figure className="figure d-flex flex-column deprecated-search-result-container me-lg me-md-3">
            <MDBRipple
                className={`bg-image hover-overlay shadow-1-strong w-100 search-result-figure figure-img mb-1`}
                rippleTag="div"
                rippleColor="light"
            >
                <MetadataCover
                    metadata={metadata}
                    coverUrl={cover}
                    coverDone={coverDone}
                    href={href}
                />
            </MDBRipple>

            <figcaption
                className={
                    "figure-caption text-wrap border rounded-7 rounded-top border-dark border-top-0 basic-container-alt pt-1 w-100 flex-grow-1 d-flex flex-column text-color"
                }
                style={{ fontSize: "1rem" }}
            >
                <div className="d-flex flex-wrap">
                    <span className="mx-2 mb-1">
                        <strong>{t("figure:title")} </strong>
                        {metadata.title}
                    </span>
                    <Break />
                    <span className="mx-2 mb-1">
                        <strong>{t("figure:author")}</strong>
                        {metadata["author"]}
                    </span>
                    <Break />
                    <p className="mx-2 mb-2">
                        <strong>{t("figure:file")}</strong>
                        {extension}, {size}
                    </p>
                    <Break />
                </div>
            </figcaption>
        </figure>
    );
}
