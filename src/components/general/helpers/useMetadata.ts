import React, { SetStateAction, useContext, useEffect, useState } from "react";
import { Metadata } from "./generalTypes";
import { backendUrl, findBookInLibrary, serverUrl } from "./generalFunctions";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./generalContext";

async function increaseViewCount(md5: string, topic: string) {
    try {
        const reqUrl = `${serverUrl}/statistics/${topic}/${md5}/views`;
        const req = await axios.post(reqUrl);
        console.log(req);
    } catch (e) {
        console.error(e);
    }
}

async function getMetadataOnline(
    md5: string,
    topic: string
): Promise<Metadata | null> {
    const possibleMetadataCache = sessionStorage.getItem(`${md5}-metadata`);
    if (possibleMetadataCache) {
        // return JSON.parse(possibleMetadataCache);
    }
    try {
        const reqUrl = `${serverUrl}/metadata/${topic}/${md5}`;
        const req = await axios.get(reqUrl);
        const result = req.data;
        console.log(result);
        /**
         * Metadata schema:
         *
         * {
         *     "id": 145211,
         *     "title": "Flores Para Algernon",
         *     "author": "Keyes, Daniel",
         *     "timeAdded": "2011-06-11T20:00:00",
         *     "timeLastModified": "2017-05-08T05:21:33",
         *     "extension": "pdf",
         *     "fileSize": 454672,
         *     "pages": "137",
         *     "coverUrl": "145000/ff972e332636f3b1958bc7e15046a606.jpg",
         *     "series": "",
         *     "edition": "",
         *     "language": "Spanish",
         *     "year": "0",
         *     "publisher": "",
         *     "topic": "fiction",
         *     "description": null,
         *     "md5": "FF972E332636F3B1958BC7E15046A606",
         *     "downloadMirrors": {
         *         "libgenMirror": "https://library.lol/fiction/FF972E332636F3B1958BC7E15046A606",
         *         "librocksMirror": "https://libgen.rocks/ads.php?md5=FF972E332636F3B1958BC7E15046A606"
         *     }
         * }
         *
         */
        // sessionStorage.setItem(`${md5}-metadataList`, JSON.stringify(result));
        return result;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export default function useMetadata(
    md5: string | undefined,
    topic: string | undefined
): [Metadata | undefined, () => Promise<void>] {
    // Retrieves metadataList for a specific metadataList. Also checks if that books is in library and updates accordingly.
    // Metadata is equivalent to a metadataList's info.
    const authContext = useContext(AuthContext);
    const [metadata, setMetadata] = useState<Metadata | undefined>(undefined);
    const navigate = useNavigate();

    const updateMetadata = async () => {
        if (md5 == null || topic == null) {
            navigate("/metadataList/error", { replace: true });
            return;
        }

        const metadata = await getMetadataOnline(md5, topic);
        if (metadata != null) {
            setMetadata(metadata);
        } else {
            navigate("/metadataList/error", { replace: true });
            return;
        }
    };

    useEffect(() => {
        if (md5 && topic) {
            updateMetadata().then(() => {
                increaseViewCount(md5!, topic!).then();
            });
        }
    }, [md5, topic]);

    useEffect(() => {
        let ignore = false;
        if (metadata == null || metadata.category != null) {
            return;
        }

        findBookInLibrary(authContext, metadata.md5)
            .then((res) => {
                if (res.status === 200 && !ignore) {
                    const metadataOnLibrary = res.data as Metadata;
                    setMetadata({
                        ...metadata,
                        category: metadataOnLibrary.category,
                    });
                }
            })
            .catch((e) => console.error(e));

        return () => {
            ignore = true;
        };
    }, [metadata]);

    return [metadata, updateMetadata];
}
