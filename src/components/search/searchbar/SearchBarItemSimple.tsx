import { Highlighter } from "react-bootstrap-typeahead";
import React from "react";
import { Metadata } from "../../general/helpers/generalTypes";
import useCover from "../../general/helpers/useCover";
import BookFigureCover from "../../general/BookFigureCover";
import Break from "../../general/Break";
import { getMetadataInfoPath } from "../../general/helpers/generalFunctions";

interface Props {
    text: string;
    metadata: Metadata;
    timeout?: number;
}

export default function SearchBarItemSimple({
    text,
    metadata,
    timeout,
}: Props) {
    const [cover, coverDone] = useCover(metadata, timeout);
    const bookHref = getMetadataInfoPath(metadata.topic, metadata.md5);
    let uppercaseAuthor = "";
    if (metadata.author) {
        uppercaseAuthor = `${metadata.author[0].toUpperCase()}${metadata.author.slice(
            1,
            metadata.author.length
        )}`;
    }
    return (
        <div className="d-flex flex-wrap">
            <Highlighter search={text}>{metadata.title}</Highlighter>
        </div>
    );
}
