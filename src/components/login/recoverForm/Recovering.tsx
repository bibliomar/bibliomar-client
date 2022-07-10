import { useFormik } from "formik";
import Bibliologo from "../../general/Bibliologo";
import Break from "../../general/Break";
import Message from "../../general/Message";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import { useState } from "react";
import axios from "axios";

export default function Recovering() {
    const [emailSent, setEmailSent] = useState<boolean>(false);
    const [emailFailed, setEmailFailed] = useState<number>(0);
    const formik = useFormik({
        initialValues: { email: "" },

        validate: (values) => {
            let errors: any = {};
            if (!values.email) {
                errors.email = "Campo obrigatorio";
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = "Email inválido.";
            }
            return errors;
        },

        onSubmit: async (values) => {
            console.log("runs");
            const formData = new FormData();
            formData.set("email", values.email);
            const config = {
                url: "https://biblioterra.herokuapp.com/v1/user/recover",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                data: formData,
            };
            try {
                await axios.request(config);
                setEmailSent(true);
                setEmailFailed(0);
            } catch (e: any) {
                if (e.response) {
                    if (e.response.status === 400) {
                        setEmailSent(true);
                        setEmailFailed(400);
                    } else if (e.response.status === 500) {
                        setEmailSent(true);
                        setEmailFailed(500);
                    }
                } else {
                    setEmailSent(true);
                    setEmailFailed(500);
                }
            }
        },
    });
    return (
        <div>
            {emailSent && emailFailed === 0 ? (
                <div className="d-flex justify-content-center">
                    <span className="text-success text-center">
                        Pronto! Enviamos um email de recuperação a sua caixa de
                        entrada.
                    </span>
                </div>
            ) : null}
            {emailSent && emailFailed !== 0 ? (
                <div className="d-flex justify-content-center">
                    <span className="text-danger text-center">
                        {emailFailed === 400
                            ? "O email não corresponde a uma conta existente."
                            : "Não conseguimos enviar um email" +
                              "ao destinatario."}
                    </span>
                </div>
            ) : null}
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email">Email</label>
                <MDBInput
                    className="text-white"
                    name="email"
                    id="email"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div>
                        <Break />
                        <span className="text-danger">
                            {formik.errors.email}
                        </span>
                        <Break />
                    </div>
                ) : null}
                <div className="d-flex justify-content-end">
                    <MDBBtn type="submit" className="mt-3">
                        Enviar
                    </MDBBtn>
                </div>
            </form>
        </div>
    );
}
