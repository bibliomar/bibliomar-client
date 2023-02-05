import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "./generalFunctions";
import { onProduction } from "./generalFunctions";

const getOnlineCover = async (
    md5: string,
    topic: string
): Promise<string | undefined> => {
    let reqUrl = `${backendUrl}/v1/cover/${topic}/${md5}`;
    try {
        const request = await axios.get(reqUrl);
        const result: string = request.data;
        if (result.includes("blank")) {
            return undefined;
        }
        return result;
    } catch (e: any) {
        // 500 errors means Biblioterra couldn't find a cover.
        return undefined;
    }
};

// Async handles book cover recovery.
// Returns a tuple with a possible cover and if the process of retrieving the cover is done.
// If the returned cover is a "No Cover" image from LibraryGenesis, we will use our own cover generation instead.
// So undefined is returned.
export default function useCover(
    md5: string,
    topic: string,
    timeout?: number
): [string | undefined, boolean] {
    const noCoverUrl: string = "https://libgen.rocks/img/blank.png";
    const [cover, setCover] = useState<string | undefined>(undefined);
    const [coverDone, setCoverDone] = useState<boolean>(false);

    useEffect(() => {
        let coverTimeout: number | undefined = undefined;
        let possibleCachedCover = sessionStorage.getItem(`${md5}-cover`);
        let possibleCachedCanvas = sessionStorage.getItem(`${md5}-canvas`);
        if (possibleCachedCover != null || possibleCachedCanvas != null) {
            if (setCoverDone) {
                setCoverDone(true);
            }
            setCover(
                possibleCachedCover && !possibleCachedCover.includes("blank")
                    ? possibleCachedCover
                    : possibleCachedCanvas
                    ? possibleCachedCanvas
                    : undefined
            );
        } else {
            coverTimeout = window.setTimeout(
                async () => {
                    let cover: string | undefined;
                    if (onProduction != null) {
                        console.log("Getting online cover");
                        cover = await getOnlineCover(md5, topic);
                    } else {
                        cover = noCoverUrl;
                    }
                    if (cover != null && !cover.includes("blank")) {
                        if (cover !== noCoverUrl) {
                            sessionStorage.setItem(`${md5}-cover`, cover);
                        }

                        setCover(cover);
                    }
                    setCoverDone(true);
                },
                timeout ? timeout : 1000
            );
        }
        return () => {
            if (coverTimeout) {
                window.clearTimeout(coverTimeout);
            }
        };
    }, [md5]);

    return [cover, coverDone];
}
