import { Highlighter } from "react-bootstrap-typeahead";
import React from "react";
import { Metadata } from "../../general/helpers/generalTypes";
import useCover from "../../general/helpers/useCover";
import MetadataCover from "../../general/cover/MetadataCover";
import Break from "../../general/Break";
import {
    formatBytes,
    getMetadataInfoPath,
} from "../../general/helpers/generalFunctions";

interface Props {
    metadata: Metadata;
    timeout?: number;
}

export default function SearchBarItemExpanded({ metadata, timeout }: Props) {
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
        <div className="d-flex flex-wrap">
            <span style={{ fontSize: "1.0em" }} className="fw-bold">
                {metadata.title}
            </span>
            <Break />
            <span style={{ fontSize: "0.95em" }}>{uppercaseAuthor}</span>
            <Break />
            <span style={{ fontSize: "0.95em" }}>{extensionAndFormat}</span>
        </div>
    );
}
