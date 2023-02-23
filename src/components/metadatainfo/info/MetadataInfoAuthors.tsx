import { Metadata } from "../../general/helpers/generalTypes";
import Break from "../../general/Break";
import SmallLine from "../../general/SmallLine";
import { Link } from "react-router-dom";

interface Props {
    metadata: Metadata;
}

export default function MetadataInfoAuthors({ metadata }: Props) {
    const authorSearchUrl = `/search?type=author&q=${metadata.author}`;
    return (
        <>
            <span
                className="book-info-title mb-2 mt-3"
                style={{ fontSize: "1.2rem" }}
            >
                <Link to={authorSearchUrl}>{metadata.author}</Link>
            </span>
        </>
    );
}
