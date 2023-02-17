import { useEffect, useState } from "react";
import { DownloadLinks } from "./generalTypes";
import { backendUrl } from "./generalFunctions";
import axios from "axios";
import { useToggle } from "./useToggle";
import { useNavigate } from "react-router-dom";

async function getDownloadLinksOnline(md5: string, topic: string) {
    if (topic === "scitech") {
        topic = "sci-tech";
    }
    const reqUrl = `${backendUrl}/v1/downloads/${topic}/${md5}`;
    try {
        const req = await axios.get(reqUrl);
        return req.data;
    } catch (e) {
        console.error(e);
        return null;
    }
}

function getLibgenURL(md5: string, topic: string) {
    const baseURL = "https://library.lol";
    let topicURL = "";
    if (topic === "fiction") {
        topicURL = "fiction";
    } else {
        topicURL = "main";
    }

    return `${baseURL}/${topicURL}/${md5}`;
}

function getLibrocksURL(md5: string) {
    const contentURL = `https://libgen.rocks/ads.php?md5=${md5}`;

    return contentURL;
}

export default function useDownloadLinks(
    md5: string | undefined,
    topic: string | undefined
): [DownloadLinks | undefined, boolean] {
    // Retrieves download links of a specific metadataList
    // Download links are not cached.
    const [downloadLinks, setDownloadLinks] = useState<
        DownloadLinks | undefined
    >(undefined);
    const [error, toggleError] = useToggle(false);
    const navigate = useNavigate();

    const getDownloadLinks = async () => {
        if (md5 == null || topic == null) {
            navigate("/metadataList/error", { replace: true });
            return;
        }
        const dlinks = await getDownloadLinksOnline(md5, topic);
        if (dlinks) {
            dlinks.libgen = getLibgenURL(md5, topic);
            dlinks.librocks = getLibrocksURL(md5);
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
