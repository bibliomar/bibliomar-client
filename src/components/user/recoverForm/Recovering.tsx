import { useFormik } from "formik";
import Bibliologo from "../../general/Bibliologo";
import Break from "../../general/Break";
import Message from "../../general/Message";
import { MDBBtn, MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { useState } from "react";
import axios from "axios";
import { backendUrl, serverUrl } from "../../general/helpers/generalFunctions";
import { useTranslation } from "react-i18next";

export default function Recovering() {
    const { t } = useTranslation();
    const [emailStatus, setEmailStatus] = useState<number>(0);
    const formik = useFormik({
        initialValues: { email: "" },

        validate: (values) => {
            const errors: any = {};
            if (!values.email) {
                errors.email = t("user:campoobrigatorio");
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = t("user:emailinvalido");
            }
            return errors;
        },

        onSubmit: async (values) => {
            const data = {
                email: values.email,
            };
            const config = {
                url: `${serverUrl}/user/recover`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: data,
            };
            try {
                setEmailStatus(103);
                const req = await axios.request(config);
                console.log(req);
                setEmailStatus(200);
            } catch (e: any) {
                console.error(e);
                if (e.request) {
                    setEmailStatus(e.request.status);
                } else {
                    setEmailStatus(500);
                }
            }
        },
    });

    const renderOnStatus = () => {
        switch (emailStatus) {
            case 103:
                return (
                    <span className="text-info text-center">
                        {t("user:enviandoEmail")}
                    </span>
                );
            case 200:
                return (
                    <span className="text-success text-center">
                        {t(
                            "user:prontoEnviamosUmEmailDeRecuperaoASuaCaixaDeEntrada"
                        )}
                    </span>
                );
            case 400:
                return (
                    <span className="text-danger text-center">
                        {t("user:correspondsToAccount")}
                    </span>
                );
            case 500:
                return (
                    <span className="text-danger text-center">
                        {t("user:correspondsToAccount2")}
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <MDBRow className="w-100 d-flex justify-content-center">
            <MDBCol size={12} md={10} lg={8} className="basic-container p-4">
                <div className="d-flex justify-content-center">
                    {renderOnStatus()}
                </div>
                <Break />
                <form onSubmit={formik.handleSubmit}>
                    <h3>{t("user:recuperarSenhaDeAcesso")}</h3>
                    <label htmlFor="email">{t("user:email")}</label>
                    <MDBInput
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
                            {t("user:enviar")}
                        </MDBBtn>
                    </div>
                </form>
            </MDBCol>
        </MDBRow>
    );
}
