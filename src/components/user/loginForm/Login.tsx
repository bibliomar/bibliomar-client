import Bibliologo from "../../general/Bibliologo";
import { useFormik } from "formik";
import {
    MDBBtn,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBRow,
} from "mdb-react-ui-kit";
import Message from "../../general/Message";
import Break from "../../general/Break";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AutoLoginMessage from "./AutoLoginMessage";
import LoginMessage from "./LoginMessage";
import { AuthContext } from "../../general/helpers/generalContext";
import { backendUrl, serverUrl } from "../../general/helpers/generalFunctions";
import { useTranslation } from "react-i18next";
import { JWTTokenResponse } from "../helpers/loginTypes";
import Navbar from "../../general/navbar/Navbar";

type LoginFormType = {
    username: string;
    password: string;
};

export default function Login() {
    const authContext = useContext(AuthContext);
    const [searchParameters, _] = useSearchParams();
    const redirect = searchParameters.get("redirect") as string;
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useState<number>(0);
    const [autoLoginStatus, setAutoLoginStatus] = useState<number>(0);
    const { t } = useTranslation();

    const autoLogin = async (jwt: string) => {
        try {
            // noinspection AllyPlainJsInspection
            const config = {
                // Auth endpoint is to be implemented
                // Not to be confused with the /user/login endpoint!
                url: `${serverUrl}/user/auth`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            };
            setAutoLoginStatus(103);
            const req = await axios.request(config);
            const tokenResponse: JWTTokenResponse = req.data;
            setAutoLoginStatus(200);
            authContext.setJwtToken(tokenResponse.access_token);

            if (redirect) {
                navigate(`${redirect}`, { replace: true });
            } else {
                navigate("/library", { replace: true });
            }
        } catch (e: any) {
            if (e.request) {
                if (e.request.status === 401) {
                    authContext.setJwtToken(null);
                }
                setAutoLoginStatus(e.request.status);
                setTimeout(() => {
                    setAutoLoginStatus(0);
                }, 2000);
            }
        }
    };

    useEffect(() => {
        let ignore = false;
        /*
        if (jwt && !ignore) {
            autoLogin(jwt).then((r) => {});
        }

         */
        return () => {
            ignore = true;
        };
    }, []);

    const formik = useFormik<LoginFormType>({
        initialValues: { username: "", password: "" },
        validate: (values) => {
            const errors: Partial<LoginFormType> = {};
            if (!values.username) {
                errors.username = "Obrigatório";
            }
            if (!values.password) {
                errors.password = "Obrigatório";
            }
            return errors;
        },
        onSubmit: async (values) => {
            const loginForm = {
                username: values.username,
                password: values.password,
            };
            const config = {
                url: `${serverUrl}/user/login`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                data: loginForm,
            };
            try {
                setLoginStatus(103);
                const req = await axios.request<JWTTokenResponse>(config);
                setLoginStatus(200);
                const response = req.data;
                const token = response.access_token;
                const navigateTimeout = setTimeout(() => {
                    if (redirect) {
                        navigate(`${redirect}`, { replace: true });
                        return;
                    }

                    navigate("/library", { replace: true });
                    return;
                }, 2000);
                authContext.setJwtToken(token);
            } catch (e: any) {
                if (e.request) {
                    switch (e.request.status) {
                        case 403:
                            setLoginStatus(403);
                            return;
                        case 401:
                            setLoginStatus(401);
                            return;
                    }
                    setLoginStatus(500);
                    return;
                }
            }
        },
    });
    return (
        <div className="like-body bg-alt">
            <MDBContainer fluid>
                <div className="d-flex flex-wrap justify-content-center">
                    <div className="w-100">
                        <Navbar />
                    </div>
                    <Break className="mb-6" />
                    <MDBRow className="w-100 d-flex justify-content-center ">
                        <MDBCol
                            size={12}
                            md={10}
                            lg={8}
                            className="basic-container p-4"
                        >
                            <AutoLoginMessage
                                autoLoginStatus={autoLoginStatus}
                                disabled={autoLoginStatus === 0}
                            />
                            <LoginMessage
                                loginStatus={loginStatus}
                                disabled={loginStatus === 0}
                            />
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
                                {formik.touched.username &&
                                formik.errors.username ? (
                                    <div>
                                        <Break />
                                        <span className="text-danger">
                                            {formik.errors.username}
                                        </span>
                                        <Break />
                                    </div>
                                ) : null}
                                <label htmlFor="password">
                                    {t("user:senha")}
                                </label>
                                <MDBInput
                                    className="book-info-description"
                                    name="password"
                                    id="password"
                                    type="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                />
                                {formik.touched.password &&
                                formik.errors.password ? (
                                    <div>
                                        <Break />
                                        <span className="text-danger">
                                            {formik.errors.password}
                                        </span>
                                        <Break />
                                    </div>
                                ) : null}
                                <Link to="/user/recover">
                                    <span
                                        style={{ fontSize: "0.85rem" }}
                                        className="text-muted"
                                    >
                                        {t("user:esqueciMinhaSenhausuario")}
                                    </span>
                                </Link>
                                <Break />
                                <div className="d-flex flex-wrap justify-content-center mt-4">
                                    <Link
                                        to={
                                            redirect
                                                ? `/user/register?redirect=${redirect}`
                                                : "/user/register"
                                        }
                                    >
                                        {t(
                                            "user:noPossuiUmaContaCrieUmaGratuitamente"
                                        )}
                                    </Link>
                                    <Break />

                                    <MDBBtn
                                        className="mt-5"
                                        type="submit"
                                        disabled={autoLoginStatus !== 0}
                                    >
                                        {t("user:logar")}
                                    </MDBBtn>
                                </div>
                            </form>
                        </MDBCol>
                    </MDBRow>
                </div>
            </MDBContainer>
        </div>
    );
}
