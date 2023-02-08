import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Break from "../general/Break";
import LibraryNavbar from "./LibraryNavbar";
import {
    Book,
    LibraryCategories,
    UserLibrary,
} from "../general/helpers/generalTypes";
import LibraryRow from "./LibraryRow";
import { useTranslation } from "react-i18next";

export default function LibraryLanding() {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
    const selectedContextValue = {
        selectedBooks: selectedBooks,
        setFunction: setSelectedBooks,
    };
    const { t } = useTranslation();
    const context: any = useOutletContext();
    const user: UserLibrary = context["userInfo"];
    const username: string = context["username"];
    return (
        <div className="d-flex flex-wrap justify-content-start justify-content-md-center mt-5 w-100">
            {username ? (
                <LibraryNavbar userLibrary={user} username={username} />
            ) : null}
            <Break />
            <LibraryRow
                title={t("library:reading")}
                message={t("library:readingExplanation")}
                bookCategory={LibraryCategories.reading}
                booksInfo={user["reading"]}
            />
            <Break />
            <LibraryRow
                title={t("library:planToRead")}
                message={t("library:planToReadExplanation")}
                bookCategory={LibraryCategories.toRead}
                booksInfo={user["to-read"]}
            />
            <Break />
            <LibraryRow
                title={t("library:backlog")}
                message={t("library:backlogExplanation")}
                bookCategory={LibraryCategories.backlog}
                booksInfo={user["backlog"]}
            />
            <Break />
        </div>
    );
}
