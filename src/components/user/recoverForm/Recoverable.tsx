import { useFormik } from "formik";

import Break from "../../general/Break";

import { MDBBtn, MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";

import jwt_decode, { JwtPayload } from "jwt-decode";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { backendUrl, serverUrl } from "../../general/helpers/generalFunctions";
import { useTranslation } from "react-i18next";

interface Props {
    token: string;
}

export default function Recoverable(props: Props) {
    const { t } = useTranslation();
    const [updateStatus, setUpdateStatus] = useState<number>(0);
    const navigate = useNavigate();
    const decodedToken = jwt_decode<JwtPayload>(props.token);
    const username = decodedToken.sub;

    const formik = useFormik({
        initialValues: { username: username, password: "" },
        validate: (values) => {
            const errors: any = {};

            if (!values.password) {
                errors.password = t("user:campoobrigatorio");
            } else if (
                !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{6,16}$/.test(
                    values.password
                )
            ) {
                errors.password = t("user:senhadeveconter");
            }
            return errors;
        },
        onSubmit: async (values) => {
            const data = {
                newPassword: values.password,
            };
            // noinspection AllyPlainJsInspection
            const config = {
                url: `${serverUrl}/user/update`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${props.token}`,
                },
                data: data,
            };
            try {
                setUpdateStatus(103);
                const req = await axios.request(config);
                console.log(req);
                setUpdateStatus(200);
                setTimeout(() => {
                    navigate("/user/login", { replace: true });
                }, 5000);
            } catch (e: any) {
                console.error(e);
                if (e.request) {
                    if (e.request.status === 400) {
                        setUpdateStatus(400);
                    } else if (e.request.status === 500) {
                        setUpdateStatus(500);
                    }
                } else {
                    setUpdateStatus(500);
                }
            }
        },
    });

    const renderMessageOnStatus = () => {
        switch (updateStatus) {
            case 103:
                return (
                    <span className="text-info text-center">
                        {t("user:enviandoSuaSolicitaoAoServidor")}
                    </span>
                );
            case 200:
                return (
                    <span className="text-success text-center">
                        {t(
                            "user:tudoCertoRedefinimosSuaSenhaEVamosTeRedirecinarAPa"
                        )}
                    </span>
                );
            case 400:
                return (
                    <span className="text-danger text-center">
                        {t(
                            "user:erroAoAtualizarSenhaVerifiqueSeAMesmaAtendeATodosO"
                        )}
                    </span>
                );
            case 401:
                return (
                    <span className="text-danger text-center">
                        {t(
                            "user:erroAoAtualizarSenhaOTokenDeVerificaoExpirouOuInvl"
                        )}
                    </span>
                );
            case 500:
                return (
                    <span className="text-danger text-center">
                        {t(
                            "user:noConseguimosAtualizarASenhaDoUsuarioEmQuestoTente"
                        )}
                    </span>
                );
            default:
                return null;
        }
    };
    return (
        <MDBRow className="w-100 d-flex justify-content-center">
            <MDBCol size={12} md={10} lg={8} className="basic-container p-4">
                <div className="d-flex flex-wrap">
                    {renderMessageOnStatus()}
                </div>
                <Break />
                <h3>{t("user:redefinirSenhaDeAcesso")}</h3>

                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="username">{t("user:nomeDeUsuario")}</label>
                    <MDBInput
                        name="username"
                        id="username"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        disabled={true}
                    />
                    {formik.touched.username && formik.errors.username ? (
                        <div>
                            <Break />
                            <span className="text-danger">
                                {formik.errors.username}
                            </span>
                            <Break />
                        </div>
                    ) : null}
                    <label htmlFor="password">{t("user:novaSenha")}</label>
                    <MDBInput
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
                    <div className="d-flex justify-content-end mt-5">
                        <MDBBtn type="submit" disabled={formik.isSubmitting}>
                            {t("user:alterarSenha")}
                        </MDBBtn>
                    </div>
                </form>
            </MDBCol>
        </MDBRow>
    );
}
