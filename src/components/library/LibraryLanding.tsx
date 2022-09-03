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

export default function LibraryLanding() {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
    const selectedContextValue = {
        selectedBooks: selectedBooks,
        setFunction: setSelectedBooks,
    };
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
                title="Lendo"
                message={"Para livros que você está lendo agora"}
                bookCategory={LibraryCategories.reading}
                booksInfo={user["reading"]}
            />
            <Break />
            <LibraryRow
                title="Planejando ler"
                message={"Para livros que você planeja ler no futuro"}
                bookCategory={LibraryCategories.toRead}
                booksInfo={user["to-read"]}
            />
            <Break />
            <LibraryRow
                title="Backlog"
                message={"Para livros abandonados ou finalizados"}
                bookCategory={LibraryCategories.backlog}
                booksInfo={user["backlog"]}
            />
            <Break />
        </div>
    );
}
