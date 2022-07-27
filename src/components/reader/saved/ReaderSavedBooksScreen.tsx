import localforage from "localforage";
import { useLocation } from "react-router-dom";
import ReaderSavedBooksList from "./ReaderSavedBooksList";
import ReaderEmptyList from "./ReaderEmptyList";
import { useEffect, useState } from "react";
import { SavedBooks } from "../helpers/readerTypes";
import { createBookInfoList } from "../helpers/readerFunctions";

interface Props {
    savedBooks?: SavedBooks;
}

export default function ({ savedBooks }: Props) {
    const renderBasedOnSaved = () => {
        if (savedBooks! != null) {
            // If at least one element is populated on savedBooks.
            const arrayBookInfoList = createBookInfoList(savedBooks);
            if (arrayBookInfoList.some((el) => el != null)) {
                return <ReaderSavedBooksList savedBooks={savedBooks} />;
            } else {
                return <ReaderEmptyList />;
            }
        } else {
            return <ReaderEmptyList />;
        }
    };
    return (
        <div className="d-flex flex-wrap justify-content-center">
            {renderBasedOnSaved()}
        </div>
    );
}
