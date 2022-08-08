import BookInfoLibraryAdd from "./BookInfoLibraryAdd";
import React, { useState } from "react";
import { Book, LibraryCategories } from "../../../general/helpers/generalTypes";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Props {
    bookRef: React.MutableRefObject<Book>;
    className?: string;
}

export default function BookInfoLibraryButtons({ bookRef, className }: Props) {
    const navigate = useNavigate();
    const [triedCategory, setTriedCategory] = useState<
        LibraryCategories | undefined
    >(undefined);
    const [requestStatus, setRequestStatus] = useState<number>(0);

    const jwtToken = localStorage.getItem("jwt-token");

    async function addBook(evt: any, category: LibraryCategories) {
        // This function automatically adds a category to a bookRef if the user adds it in their library.
        // Useful for when the user adds a book, and then tries to read it online.
        evt.preventDefault();
        if (jwtToken == null) {
            const redirect = location.pathname;
            navigate(`/user/login?redirect=${redirect}`);
            return;
        }
        let bookToAdd = bookRef.current;
        bookToAdd.category = category;
        const req_body = [bookToAdd];
        const config = {
            url: `https://biblioterra.herokuapp.com/v1/library/add/${category}`,
            method: "POST",
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
            data: req_body,
        };
        try {
            setTriedCategory(category);
            setRequestStatus(103);

            let req = await axios.request(config);
            bookRef.current = bookToAdd;
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
                category={LibraryCategories.reading}
                message={"Lendo"}
                requestStatus={requestStatus}
                triedCategory={triedCategory}
                onclickHandler={addBook}
            />
            <BookInfoLibraryAdd
                category={LibraryCategories.toRead}
                message={"Lista de leitura"}
                requestStatus={requestStatus}
                triedCategory={triedCategory}
                onclickHandler={addBook}
            />
            <BookInfoLibraryAdd
                category={LibraryCategories.backlog}
                message={"Backlog"}
                requestStatus={requestStatus}
                triedCategory={triedCategory}
                onclickHandler={addBook}
            />
        </div>
    );
}
