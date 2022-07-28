import { MDBBtn } from "mdb-react-ui-kit";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Break from "../../../general/Break";
import axios from "axios";
import { useState } from "react";
import BookLibraryButton from "./BookLibraryButton";
import { Book } from "../../../../helpers/generalTypes";

interface Props {
    bookInfo: Book;
}

export default function BookLibraryActions(props: Props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [addStatus, setAddStatus] = useState<number>(0);
    const [triedCategory, setTriedCategory] = useState<string>("");
    const jwtToken = localStorage.getItem("jwt-token");

    async function addBook(evt: any, category: string) {
        evt.preventDefault();
        if (jwtToken == null) {
            const redirect = location.pathname;
            navigate(`/user/login?redirect=${redirect}`);
            return;
        }
        let bookToAdd = props.bookInfo;
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
            setAddStatus(103);

            let req = await axios.request(config);

            setAddStatus(200);

            setTimeout(() => {
                setTriedCategory("");
                setAddStatus(0);
            }, 2000);
        } catch (e: any) {
            if (e.request) {
                if (e.request.status === 401) {
                    const redirect = location.pathname;
                    navigate(`/user/login?redirect=${redirect}`);
                    return;
                }
                setAddStatus(e.request.status);
            }
            setTimeout(() => {
                setTriedCategory("");
                setAddStatus(0);
            }, 2000);
        }
    }

    return (
        <>
            <Break />

            <BookLibraryButton
                status={addStatus}
                category={"reading"}
                triedCategory={triedCategory}
                onClickHandler={addBook}
            />
            <Break />
            <BookLibraryButton
                status={addStatus}
                category={"to-read"}
                triedCategory={triedCategory}
                onClickHandler={addBook}
            />
            <Break />
            <BookLibraryButton
                status={addStatus}
                category={"backlog"}
                triedCategory={triedCategory}
                onClickHandler={addBook}
            />
        </>
    );
}
