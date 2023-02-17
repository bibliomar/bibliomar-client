import { Highlighter } from "react-bootstrap-typeahead";
import React from "react";
import { Metadata } from "../../general/helpers/generalTypes";
import useCover from "../../general/helpers/useCover";
import BookFigureCover from "../../general/BookFigureCover";
import Break from "../../general/Break";
import {
    formatBytes,
    getMetadataInfoPath,
} from "../../general/helpers/generalFunctions";

interface Props {
    metadata: Metadata;
    timeout?: number;
}

export default function SearchBarFigure({ metadata, timeout }: Props) {
    const [cover, coverDone] = useCover(metadata, timeout);
    const bookHref = getMetadataInfoPath(metadata.topic, metadata.md5);
    let uppercaseAuthor = "";
    if (metadata.author) {
        uppercaseAuthor = `${metadata.author[0].toUpperCase()}${metadata.author.slice(
            1,
            metadata.author.length
        )}`;
    }
    const extension = metadata.extension
        ? metadata.extension.toUpperCase()
        : null;
    const size = metadata.fileSize ? formatBytes(metadata.fileSize) : null;
    const extensionAndFormat =
        extension && size ? `${extension}, ${size}` : null;
    return (
        <div className="d-flex flex-nowrap">
            <div
                id="search-bar-figure-cover"
                className="search-bar-figure-cover"
            >
                <div className="d-flex w-100">
                    <BookFigureCover
                        metadata={metadata}
                        cover={cover}
                        coverDone={coverDone}
                    />
                </div>
            </div>
            <div
                id="search-bar-figure-text"
                className="ms-2 d-flex flex-column justify-content-start"
            >
                <div className="d-flex flex-wrap">
                    <span style={{ fontSize: "1.0em" }} className="fw-bold">
                        {metadata.title}
                    </span>
                    <Break />
                    <span style={{ fontSize: "0.9em" }}>{uppercaseAuthor}</span>
                    <Break />
                    <span style={{ fontSize: "0.9em" }}>
                        {extensionAndFormat}
                    </span>
                </div>
            </div>
        </div>
    );
}
