import React, { useEffect, useState } from "react";
import jwt_decode, { JwtPayload } from "jwt-decode";
import {
    useNavigate,
    useOutletContext,
    useSearchParams,
} from "react-router-dom";
import axios from "axios";
import LibrarySection from "../LibrarySection";
import Break from "../../general/Break";
import LibraryNavbar from "../LibraryNavbar";
import {
    EditModeContext,
    SelectedBooksContext,
    SelectedContext,
} from "../utils/RelevantContext";
import { Book } from "../../../helpers/generalTypes";

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
    console.log(context);
    console.log(selectedBooks);
    return (
        <EditModeContext.Provider value={editMode}>
            <SelectedBooksContext.Provider value={selectedContextValue}>
                <div className="d-flex flex-wrap justify-content-start mt-5 w-100">
                    {username ? (
                        <LibraryNavbar
                            setEditMode={setEditMode}
                            username={username}
                        />
                    ) : null}
                    <LibrarySection
                        message="Lendo"
                        bookCategory={"reading"}
                        booksInfo={user["reading"]}
                        setProgress={setProgress}
                    />
                    <Break />
                    <LibrarySection
                        message="Planejando ler"
                        bookCategory={"to-read"}
                        booksInfo={user["to-read"]}
                        setProgress={setProgress}
                    />
                    <Break />
                    <LibrarySection
                        message="Backlog"
                        bookCategory={"backlog"}
                        booksInfo={user["backlog"]}
                        setProgress={setProgress}
                    />
                    <Break />
                </div>
            </SelectedBooksContext.Provider>
        </EditModeContext.Provider>
    );
}
