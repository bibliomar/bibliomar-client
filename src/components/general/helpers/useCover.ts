import { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, getEmptyCover, resolveCoverUrl } from "./generalFunctions";
import { onProduction } from "./generalFunctions";
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
                let cover: string | undefined;
                if (
                    onProduction != null &&
                    onProduction === "yes" &&
                    book.coverURL != null
                ) {
                    cover = resolveCoverUrl(book.topic, book.coverURL);
                    setCover(cover);
                    setCoverDone(true);
                } else {
                    cover = noCoverUrl;
                }
                if (cover != null && !cover.includes("blank")) {
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
    }, [book]);

    return [cover, coverDone];
}
