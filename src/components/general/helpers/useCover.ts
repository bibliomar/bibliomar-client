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
    book: Metadata,
    timeout?: number
): [string | undefined, boolean] {
    const noCoverUrl: string = getEmptyCover();
    const [cover, setCover] = useState<string | undefined>(undefined);
    const [coverDone, setCoverDone] = useState<boolean>(false);

    useEffect(() => {
        let coverTimeout: number | undefined = undefined;
        // Retrieves a possible cached cover from sessionStorage
        const cachedCover = window.sessionStorage.getItem(`${book.md5}-cover`);
        if (cachedCover != undefined) {
            setCover(cachedCover);
            setCoverDone(true);
            return;
        }

        coverTimeout = window.setTimeout(
            async () => {
                let cover: string | undefined;
                if (coverProviderUrl != null && book.coverUrl != null) {
                    cover = resolveCoverUrl(false, book.topic, book.coverUrl);
                } else {
                    cover = noCoverUrl;
                }

                if (cover != undefined) {
                    // Persist cover url to sessionStorage
                    window.sessionStorage.setItem(`${book.md5}-cover`, cover);
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
    }, []);

    return [cover, coverDone];
}
