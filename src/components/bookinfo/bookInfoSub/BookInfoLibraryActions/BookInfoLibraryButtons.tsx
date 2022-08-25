import BookInfoLibraryAdd from "./BookInfoLibraryAdd";
import React, { SetStateAction, useContext, useState } from "react";
import { Book, LibraryCategories } from "../../../general/helpers/generalTypes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../../general/helpers/generalContext";

interface Props {
    book: Book;
    setBookInfo: React.Dispatch<SetStateAction<Book | undefined>>;
    className?: string;
}

export default function BookInfoLibraryButtons({
    book,
    setBookInfo,
    className,
}: Props) {
    const navigate = useNavigate();
    const authContext = useContext(Auth);

    const [triedCategory, setTriedCategory] = useState<
        LibraryCategories | undefined
    >(undefined);
    const [requestStatus, setRequestStatus] = useState<number>(0);

    const jwtToken = localStorage.getItem("jwt-token");

    async function addBook(evt: any, category: LibraryCategories) {
        // This function automatically adds a category to a bookRef if the user adds it in their library.
        // Useful for when the user adds a book, and then tries to read it online.
        evt.preventDefault();
        if (!authContext.userLogged || jwtToken == null) {
            const redirect = location.pathname;
            navigate(`/user/login?redirect=${redirect}`);
            return;
        }

        let bookToAdd = book;
        bookToAdd.category = category;

        try {
            setTriedCategory(category);
            setRequestStatus(103);

            setBookInfo(bookToAdd);
            setRequestStatus(200);
            setTimeout(() => {
                setTriedCategory(undefined);
                setRequestStatus(0);
            }, 3000);
        } catch (e: any) {
            if (e.request) {
                if (e.request.status === 401) {
                    const redirect = location.pathname;
                    navigate(`/user/login?redirect=${redirect}`);
                    return;
                }
                setRequestStatus(500);
            }
            setTimeout(() => {
                setTriedCategory(undefined);
                setRequestStatus(0);
            }, 2000);
        }
    }

    return (
        <div className={`d-flex ${className}`}>
            <BookInfoLibraryAdd
                book={book}
                category={LibraryCategories.reading}
                message={"Lendo"}
                requestStatus={requestStatus}
                triedCategory={triedCategory}
                onclickHandler={addBook}
            />
            <BookInfoLibraryAdd
                book={book}
                category={LibraryCategories.toRead}
                message={"Lista de leitura"}
                requestStatus={requestStatus}
                triedCategory={triedCategory}
                onclickHandler={addBook}
            />
            <BookInfoLibraryAdd
                book={book}
                category={LibraryCategories.backlog}
                message={"Backlog"}
                requestStatus={requestStatus}
                triedCategory={triedCategory}
                onclickHandler={addBook}
            />
        </div>
    );
}
