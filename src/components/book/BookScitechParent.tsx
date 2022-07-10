import { Outlet } from "react-router-dom";
import Message from "../general/Message";

export default function BookScitechParent() {
    return (
        <>
            <Message
                color="text-secondary"
                message="Obrigado por escolher o Bibliomar!"
            />
            <Message color="text-light" message="- Não-ficção - " />
            <Outlet context="sci-tech" />
        </>
    );
}
