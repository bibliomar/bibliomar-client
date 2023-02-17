import Bibliologo from "../../general/Bibliologo";
import Break from "../../general/Break";
import Message from "../../general/Message";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Recoverable from "./Recoverable";
import Recovering from "./Recovering";

export default function Recover() {
    const [recoverable, setRecoverable] = useState<boolean>(false);

    const [token, setToken] = useState<string>("");
    const [searchParams, _] = useSearchParams();
    useEffect(() => {
        const recoverToken = searchParams.get("token") as string;
        if (recoverToken) {
            setToken(recoverToken);
            setRecoverable(true);
        }
    });

    return (
        <div className="like-body bg-alt">
            <div className="d-flex flex-wrap justify-content-center text-white">
                <Bibliologo />
                <Break />
                <Message
                    color="text-secondary"
                    message="Recuperação de Conta"
                />
                <Break />
                <div className="bg-black p-3 rounded-3 bg-opacity-25 login-form-container">
                    {recoverable && token !== "" ? (
                        <Recoverable token={token} />
                    ) : (
                        <Recovering />
                    )}
                </div>
            </div>
        </div>
    );
}
