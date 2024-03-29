import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getEmptyCover, resolveCoverUrl } from "./generalFunctions";
import { Metadata } from "./generalTypes";

// Async handles metadataList cover recovery.
// Returns a tuple with a possible cover and if the process of retrieving the cover is done.
export default function useCover(
    metadata: Metadata,
    timeout?: number
): [string | undefined, boolean] {
    const noCoverUrl: string = getEmptyCover();
    const [cover, setCover] = useState<string | undefined>(() => {
        // This function makes sure cover is available when the component is mounted.
        let cover: string | undefined;
        cover = resolveCoverUrl(metadata.topic, metadata.coverUrl);
        if (cover == undefined) {
            cover = noCoverUrl;
        }
        return cover;
    });
    const [coverDone, setCoverDone] = useState<boolean>(false);

    useEffect(() => {
        // To re-render the Skeleton component when the metadata changes.
        setCoverDone(false);
        let coverTimeout: number | undefined = undefined;
        let cover: string | undefined;
        cover = resolveCoverUrl(metadata.topic, metadata.coverUrl);
        if (cover == undefined) {
            cover = noCoverUrl;
        }

        setCover(cover);

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
