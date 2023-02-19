import Bibliologo from "../../general/Bibliologo";
import Break from "../../general/Break";
import Message from "../../general/Message";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Recoverable from "./Recoverable";
import Recovering from "./Recovering";
import { MDBCol, MDBContainer, MDBNavbar, MDBRow } from "mdb-react-ui-kit";
import Navbar from "../../general/navbar/Navbar";

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
            <MDBContainer fluid>
                <div className="d-flex flex-wrap justify-content-center w-100 h-100">
                    <div className="w-100">
                        <Navbar />
                    </div>
                    <Break className="mb-4" />
                    <div className="d-flex flex-wrap justify-content-center mt-4 w-100">
                        {recoverable ? (
                            <Recoverable token={token} />
                        ) : (
                            <Recovering />
                        )}
                    </div>
                </div>
            </MDBContainer>
        </div>
    );
}
