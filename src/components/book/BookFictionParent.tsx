import { Outlet } from "react-router-dom";
import Message from "../general/Message";

export default function BookFictionParent() {
    return (
        <>
            <Message
                color="text-secondary"
                message="Obrigado por escolher o Bibliomar!"
            />
            <Message color="text-light" message="- Ficção -" />
            <Outlet context="fiction" />
        </>
    );
}
