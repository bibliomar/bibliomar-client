import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import LibrarySection from "./LibrarySection";
import Break from "../general/Break";
import LibraryNavbar from "./LibraryNavbar";
import { Book } from "../general/helpers/generalTypes";
import LibraryRow from "./LibraryRow";

export default function LibraryLanding() {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
    const selectedContextValue = {
        selectedBooks: selectedBooks,
        setFunction: setSelectedBooks,
    };
    const context: any = useOutletContext();
    const user = context["userInfo"];
    const setProgress: React.Dispatch<React.SetStateAction<number>> =
        context["setProgress"];
    const username = context["username"];
    return (
        <div className="d-flex flex-wrap justify-content-start justify-content-md-center mt-5 w-100">
            {username ? <LibraryNavbar username={username} /> : null}
            <LibraryRow
                message="Para ler"
                bookCategory={"to-read"}
                booksInfo={user["to-read"]}
                setProgress={setProgress}
            />
            <Break />
        </div>
    );
}
