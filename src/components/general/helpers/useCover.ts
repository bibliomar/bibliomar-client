import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, getEmptyCover, resolveCoverUrl } from "./generalFunctions";
import { onProduction } from "./generalFunctions";

// Async handles book cover recovery.
// Returns a tuple with a possible cover and if the process of retrieving the cover is done.
export default function useCover(
    coverUrl: string,
    topic: string,
    timeout?: number
): [string | undefined, boolean] {
    const noCoverUrl: string = getEmptyCover();
    const [cover, setCover] = useState<string | undefined>(undefined);
    const [coverDone, setCoverDone] = useState<boolean>(false);

    useEffect(() => {
        let coverTimeout: number | undefined = undefined;

        coverTimeout = window.setTimeout(
            async () => {
                let cover: string | undefined;
                if (onProduction != null) {
                    cover = resolveCoverUrl(topic, coverUrl);
                    setCover(cover);
                    setCoverDone(true);
                } else {
                    cover = noCoverUrl;
                }
                if (cover != null && !cover.includes("blank")) {
                    if (cover !== noCoverUrl) {
                        sessionStorage.setItem(`${coverUrl}-cover`, cover);
                    }

                    setCover(cover);
                }
                setCoverDone(true);
            },
            timeout ? timeout : 1000
        );

        return () => {
            if (coverTimeout) {
                window.clearTimeout(coverTimeout);
            }
        };
    }, [coverUrl]);

    return [cover, coverDone];
}
