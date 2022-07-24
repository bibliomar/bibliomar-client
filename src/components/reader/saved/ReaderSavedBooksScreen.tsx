import localforage from "localforage";
import { SavedBooks } from "../downloader/ReaderDownloader";
import { useLocation } from "react-router-dom";
import ReaderSavedBooksList from "./ReaderSavedBooksList";
import ReaderEmptyList from "./ReaderEmptyList";
import { useEffect, useState } from "react";

export default function () {
    const location = useLocation();
    const [savedBooks, setSavedBooks] = useState<SavedBooks | null>(null);

    const renderBasedOnSaved = () => {
        if (savedBooks! != null) {
            // If at least one element is populated on SavedBooks.
            if (
                [
                    savedBooks["firstBook"],
                    savedBooks["secondBook"],
                    savedBooks["lastBook"],
                ].some((el) => el != null)
            ) {
                return <ReaderSavedBooksList savedBooks={savedBooks} />;
            } else {
                return <ReaderEmptyList />;
            }
        } else {
            return <ReaderEmptyList />;
        }
    };
    useEffect(() => {
        const ls = localforage.createInstance({
            driver: localforage.INDEXEDDB,
        });
        ls.getItem<SavedBooks | null>("saved-books").then((r) => {
            setSavedBooks(r);
        });
    }, []);
    return (
        <div className="d-flex flex-wrap justify-content-center">
            {renderBasedOnSaved()}
        </div>
    );
}
