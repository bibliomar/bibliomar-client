import { useEffect, useState } from "react";
import axios from "axios";
import Break from "../../general/Break";
import { getCover } from "../../general/helpers/generalFunctions";

interface Props {
    md5: string;
}

// Here we use MDBootstrap col- classes to make the cover stay in the left half of the screen.
export default function BookInfoCover({ md5 }: Props) {
    const [cover, setCover] = useState<string>(
        "https://libgen.rocks/img/blank.png"
    );
    useEffect(() => {
        getCover(md5, setCover).then();
    }, []);

    return (
        <div className="d-flex flex-column mb-3">
            <img
                src={cover}
                alt="https://libgen.rocks/img/blank.png"
                className="cover-img"
            />
            <Break />
        </div>
    );
}
