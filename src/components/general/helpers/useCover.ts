import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
    backendUrl,
    coverProviderUrl,
    getEmptyCover,
    resolveCoverUrl,
} from "./generalFunctions";
import { Metadata } from "./generalTypes";
import useSessionStorage from "./useSessionStorage";

// Async handles metadataList cover recovery.
// Returns a tuple with a possible cover and if the process of retrieving the cover is done.
export default function useCover(
    metadata: Metadata,
    timeout?: number
): [string | undefined, boolean] {
    const noCoverUrl: string = getEmptyCover();
    const [cover, setCover] = useState<string | undefined>(undefined);
    const [coverDone, setCoverDone] = useState<boolean>(false);

    useEffect(() => {
        let coverTimeout: number | undefined = undefined;
        let cover: string | undefined;
        if (coverProviderUrl != null && metadata.coverUrl != null) {
            cover = resolveCoverUrl(false, metadata.topic, metadata.coverUrl);
        } else {
            cover = noCoverUrl;
        }

        if (cover != undefined) {
            setCover(cover);
        }

        coverTimeout = window.setTimeout(
            async () => {
                setCoverDone(true);
            },
            timeout ? timeout : 1000
        );

        return () => {
            if (coverTimeout) {
                window.clearTimeout(coverTimeout);
            }
        };
    }, [metadata]);

    return [cover, coverDone];
}
