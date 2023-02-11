import { useEffect, useState } from "react";
import axios from "axios";
import {
    backendUrl,
    coverProviderUrl,
    getEmptyCover,
    resolveCoverUrl,
} from "./generalFunctions";
import { Book } from "./generalTypes";

// Async handles book cover recovery.
// Returns a tuple with a possible cover and if the process of retrieving the cover is done.
export default function useCover(
    book: Book,
    timeout?: number
): [string | undefined, boolean] {
    const noCoverUrl: string = getEmptyCover();
    const [cover, setCover] = useState<string | undefined>(undefined);
    const [coverDone, setCoverDone] = useState<boolean>(false);

    useEffect(() => {
        let coverTimeout: number | undefined = undefined;

        coverTimeout = window.setTimeout(
            async () => {
                let cover: string | undefined = undefined;
                if (coverProviderUrl != null && book.coverUrl != null) {
                    cover = resolveCoverUrl(false, book.topic, book.coverUrl);
                }

                if (cover != undefined && cover !== noCoverUrl) {
                    setCover(cover);
                } else {
                    setCover(noCoverUrl);
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
    }, [book]);

    return [cover, coverDone];
}
