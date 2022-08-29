import { useOutletContext } from "react-router-dom";
import LibrarySection from "./LibrarySection";
import Break from "../general/Break";
import LibraryNavbar from "./LibraryNavbar";
import React from "react";

interface Props {
    message: string;
    bookCategory: string;
}

export default function (props: Props) {
    const context: any = useOutletContext();
    const user = context["userInfo"];
    const setProgress: React.Dispatch<React.SetStateAction<number>> =
        context["setProgress"];
    const username = context["username"];
    return (
        <div className="d-flex flex-wrap justify-content-center mt-5 w-100">
            {username ? <LibraryNavbar username={username} /> : null}
            <Break />
            <LibrarySection
                expanded
                message={props.message}
                bookCategory={props.bookCategory}
                booksInfo={user[props.bookCategory]}
                setProgress={setProgress}
            />
        </div>
    );
}
