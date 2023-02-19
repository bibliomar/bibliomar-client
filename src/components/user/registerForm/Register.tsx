import { Form, Formik, useFormik } from "formik";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import Bibliologo from "../../general/Bibliologo";
import Break from "../../general/Break";
import Message from "../../general/Message";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../general/helpers/generalContext";
import { backendUrl, serverUrl } from "../../general/helpers/generalFunctions";
import { useTranslation } from "react-i18next";

export default function Register() {
    const { t } = useTranslation();
    const authContext = useContext(AuthContext);
    const [searchParameters, _] = useSearchParams();
    const redirect = searchParameters.get("redirect") as string;
    const navigate = useNavigate();
    const [registerStatus, setRegisterStatus] = useState<number>(0);

    const formik = useFormik({
        initialValues: { username: "", email: "", password: "" },
        validate: (values) => {
            const errors: any = {};

            if (!values.username) {
                errors.username = t("user:campoobrigatorio");
            } else if (values.username.length < 5) {
                errors.username = t(
                    "user:Nomedeusuariodeveconterpelomenos5caracteres"
                );
            } else if (/[\s@$!%*#?&]/.test(values.username)) {
                errors.username = t(
                    "user:Nomedeusuariodeveconternomáximo16caracteres"
                );
            }
            if (!values.password) {
                errors.password = t("user:campoobrigatorio");
            } else if (
                !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{6,16}$/.test(
                    values.password
                )
            ) {
                errors.password = t("user:senhadeveconter");
            }
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
            const registerForm = {
                username: values.username,
                email: values.email,
                password: values.password,
            };
            const config = {
                url: `${serverUrl}/user/register`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: registerForm,
            };
            try {
                setRegisterStatus(103);
                const req = await axios.request(config);
                setRegisterStatus(200);
                setTimeout(() => {
                    if (redirect) {
                        navigate("/user/login?redirect=" + redirect, {
                            replace: true,
                        });
                    } else {
                        navigate("/user/login", { replace: true });
                    }
                }, 5000);
            } catch (e: any) {
                if (e.request) {
                    switch (e.request.status) {
                        case 400:
                            setRegisterStatus(400);
                            return;
                    }
                    setRegisterStatus(500);
                    return;
                }
            }
        },
    });

    return (
        <div className="like-body bg-alt">
            <div className="d-flex flex-wrap justify-content-center">
                <Bibliologo />
                <Break className="mb-6" />
                <div className="basic-container rounded-3 p-3 login-form-container">
                    {registerStatus !== 0 ? (
                        <div>
                            {registerStatus === 103 ? (
                                <div className="d-flex justify-content-center">
                                    <span className="text-primary text-center">
                                        {t(
                                            "user:enviandoSuaSolicitaoAoServidor"
                                        )}
                                    </span>
                                </div>
                            ) : null}
                            {registerStatus === 200 ? (
                                <div className="d-flex justify-content-center">
                                    <span className="text-success text-center">
                                        {t(
                                            "user:tudoCertoSuaContaFoiCriadaEJVamosTeEnviarPraPrxima"
                                        )}
                                    </span>
                                </div>
                            ) : null}
                            {registerStatus === 400 ? (
                                <div className="d-flex justify-content-center">
                                    <span className="text-danger text-center">
                                        {t("user:nomeDeUsuarioOuEmailEmUso")}
                                    </span>
                                </div>
                            ) : null}
                            {registerStatus === 500 ? (
                                <div className="d-flex justify-content-center">
                                    <span className="text-danger text-center">
                                        {t(
                                            "user:noConseguimosFazerSeuRegistroTenteNovamenteMaisTar"
                                        )}
                                    </span>
                                </div>
                            ) : null}
                        </div>
                    ) : null}
                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor="username">
                            {t("user:nomeDeUsuario")}
                        </label>
                        <MDBInput
                            className="book-info-description"
                            name="username"
                            id="username"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                        />
                        {formik.touched.username && formik.errors.username ? (
                            <div>
                                <Break />
                                <span className="text-danger text-wrap">
                                    {formik.errors.username}
                                </span>
                                <Break />
                            </div>
                        ) : null}
                        <label htmlFor="password">{t("user:email")}</label>
                        <MDBInput
                            className="book-info-description"
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
                        <label htmlFor="password">{t("user:senha")}</label>
                        <MDBInput
                            className="book-info-description"
                            name="password"
                            id="password"
                            type="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div>
                                <Break />
                                <span className="text-danger">
                                    {formik.errors.password}
                                </span>
                                <Break />
                            </div>
                        ) : null}
                        <Break />
                        <div className="d-flex flex-wrap justify-content-center mt-5">
                            <Link
                                to={
                                    redirect
                                        ? `/user/login?redirect=${redirect}`
                                        : "/user/login"
                                }
                            >
                                {t("user:jTenhoUmaConta")}
                            </Link>
                            <Break />

                            <MDBBtn className="mt-4">
                                {t("user:registrar")}
                            </MDBBtn>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
