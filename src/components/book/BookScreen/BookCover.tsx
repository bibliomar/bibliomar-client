import { useEffect, useState } from "react";
import axios from "axios";
import Break from "../../general/Break";

interface Props {
    md5: string;
}

async function getCover(md5: string) {
    let reqUrl = `https://biblioterra.herokuapp.com/v1/cover/${md5}`;
    let request;
    try {
        request = await axios.get(reqUrl);
    } catch (e: any) {
        // 500 errors means Biblioterra couldn't find a cover.
        return null;
    }
    if (request?.data) {
        return request?.data;
    }
    return null;
}

// Here we use MDBootstrap col- classes to make the cover stay in the left half of the screen.
export default function BookCover(props: Props) {
    const [cover, setCover] = useState<string>(
        "https://libgen.rocks/img/blank.png"
    );
    useEffect(() => {
        let cachedCover = sessionStorage.getItem(
            `${props.md5}-cover`
        ) as string;
        if (cachedCover) {
            setCover(cachedCover);
            return;
        } else {
            getCover(props.md5).then((r) => {
                if (r == null) {
                    return;
                }
                setCover(r);
            });
        }
    }, []);

    return (
        <div className="col-lg-6 col d-flex justify-content-center">
            <img
                src={cover}
                alt="https://libgen.rocks/img/blank.png"
                className="cover-img"
            />
            <Break />
        </div>
    );
}
