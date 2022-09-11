import React, { SetStateAction, useEffect, useState } from "react";
import { Book } from "./generalTypes";
import { backendUrl, findBookInLibrary } from "./generalFunctions";
import axios from "axios";
import { useNavigate } from "react-router-dom";

async function getMetadataOnline(
    md5: string,
    topic: string
): Promise<Book | null> {
    const possibleMetadataCache = sessionStorage.getItem(`${md5}-metadata`);
    if (possibleMetadataCache) {
        return JSON.parse(possibleMetadataCache);
    }
    let reqUrl = `${backendUrl}/v1/metadata/${topic}/${md5}`;
    try {
        let req = await axios.get(reqUrl);
        const result = req.data;
        sessionStorage.setItem(`${md5}-metadata`, JSON.stringify(result));
        return result;
    } catch (e) {
        console.error(e);
        return null;
    }
}

export default function useMetadata(
    md5: string | undefined,
    topic: string | undefined
): [Book | undefined, React.Dispatch<SetStateAction<Book | undefined>>] {
    // Retrieves metadata for a specific book. Also checks if that books is in library and updates accordingly.
    // Metadata is equivalent to a book's info.
    const [metadata, setMetadata] = useState<Book | undefined>(undefined);
    const navigate = useNavigate();

    const getMetadata = async () => {
        if (md5 == null || topic == null) {
            navigate("/book/error", { replace: true });
            return;
        }

        const metadata = await getMetadataOnline(md5, topic);
        if (metadata != null) {
            setMetadata(metadata);
            const libraryBook = await findBookInLibrary(md5);
            if (libraryBook != null) {
                setMetadata({
                    ...metadata,
                    progress: libraryBook.progress
                        ? libraryBook.progress
                        : undefined,
                    category: libraryBook.category,
                });
            }
        } else {
            navigate("/book/error", { replace: true });
            return;
        }
    };

    useEffect(() => {
        getMetadata().then();
    }, [md5, topic]);

    return [metadata, setMetadata];
}
