import { useEffect, useMemo, useState } from "react";
import { getOnlineCover } from "./generalFunctions";

// Async handles book cover recovery.
// Returns a tuple with a possible cover and if the process of retrieving the cover is done.
export default function useCover(
    md5: string,
    timeout?: number
): [string | undefined, boolean] {
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
                    const onlineCover = await getOnlineCover(md5);
                    if (onlineCover != null && !onlineCover.includes("blank")) {
                        sessionStorage.setItem(`${md5}-cover`, onlineCover);
                        setCover(onlineCover);
                    }
                    setCoverDone(true);
                },
                timeout ? timeout : 1500
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
