import React, { useEffect, useState } from "react";
import jwt_decode, { JwtPayload } from "jwt-decode";
import {
    useNavigate,
    useOutletContext,
    useSearchParams,
} from "react-router-dom";
import axios from "axios";
import LibrarySection from "../LibrarySection";
import { Book } from "../../search/Search";
import Break from "../../general/Break";

export default function LibraryLanding() {
    const context: any = useOutletContext();
    const user = context["userInfo"];
    const setProgress: React.Dispatch<React.SetStateAction<number>> =
        context["setProgress"];
    console.log(context);
    return (
        <div className="d-flex flex-wrap justify-content-start mt-5 w-100">
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
    );
}
