import { Metadata } from "../../general/helpers/generalTypes";
import Break from "../../general/Break";
import SmallLine from "../../general/SmallLine";

interface Props {
    metadata: Metadata;
}

export default function BookInfoTitle({ metadata }: Props) {
    return (
        <>
            <span
                className="book-info-title"
                style={{ fontSize: "1.7rem", overflowWrap: "anywhere" }}
            >
                {metadata.title}
            </span>
        </>
    );
}
