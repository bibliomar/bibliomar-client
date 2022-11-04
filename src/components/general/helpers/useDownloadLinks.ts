import { useEffect, useState } from "react";
import { DownloadLinks } from "./generalTypes";
import { backendUrl } from "./generalFunctions";
import axios from "axios";
import { useToggle } from "./useToggle";
import { useNavigate } from "react-router-dom";

async function getDownloadLinksOnline(md5: string, topic: string) {
    let reqUrl = `${backendUrl}/v1/downloads/${topic}/${md5}`;
    try {
        let req = await axios.get(reqUrl);
        return req.data;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export default function useDownloadLinks(
    md5: string | undefined,
    topic: string | undefined
): [DownloadLinks | undefined, boolean] {
    // Retrieves download links of a specific book
    // Download links are not cached.
    const [downloadLinks, setDownloadLinks] = useState<
        DownloadLinks | undefined
    >(undefined);
    const [error, toggleError] = useToggle(false);
    const navigate = useNavigate();

    const getDownloadLinks = async () => {
        if (md5 == null || topic == null) {
            navigate("/book/error", { replace: true });
            return;
        }
        const dlinks = await getDownloadLinksOnline(md5, topic);
        if (dlinks) {
            setDownloadLinks(dlinks);
        } else {
            toggleError(true);
            return;
        }
    };

    useEffect(() => {
        getDownloadLinks().then();
    }, [md5, topic]);

    return [downloadLinks, error];
}