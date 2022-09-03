import { useOutletContext } from "react-router-dom";
import LibrarySection from "./LibrarySection";
import Break from "../general/Break";
import LibraryNavbar from "./LibraryNavbar";
import React from "react";
import {
    LibraryCategories,
    UserLibrary,
} from "../general/helpers/generalTypes";

interface Props {
    message: string;
    bookCategory: LibraryCategories;
}

export default function (props: Props) {
    const context: any = useOutletContext();
    const user: UserLibrary = context["userInfo"];
    const username = context["username"];
    return (
        <div className="d-flex flex-wrap justify-content-start justify-content-md-center mt-5 w-100">
            {username ? (
                <LibraryNavbar userLibrary={user} username={username} />
            ) : null}
            <Break />
            <LibrarySection
                message={props.message}
                bookCategory={props.bookCategory}
                booksInfo={user[props.bookCategory]}
            />
        </div>
    );
}
