import Bibliologo from "../../general/Bibliologo";
import { useFormik } from "formik";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import Message from "../../general/Message";
import Break from "../../general/Break";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AutoLoginMessage from "./AutoLoginMessage";
import LoginMessage from "./LoginMessage";
import { Auth } from "../../general/helpers/generalContext";

export default function Login() {
    const authContext = useContext(Auth);
    const [searchParameters, _] = useSearchParams();
    const redirect = searchParameters.get("redirect") as string;
    const md5 = searchParameters.get("md5") as string;
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useState<number>(0);
    const [autoLoginStatus, setAutoLoginStatus] = useState<number>(0);

    const autoLogin = async (jwt: string) => {
        try {
            const config = {
                url: "https://biblioterra.herokuapp.com/v1/user/validate",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            };
            setAutoLoginStatus(103);
            let req = await axios.request(config);
            setAutoLoginStatus(200);
            localStorage.setItem("jwt-token", req.data["access_token"]);
            authContext.setUserLogged(!!localStorage.getItem("jwt-token"));

            if (redirect) {
                navigate(`${redirect}`, { replace: true });
            } else {
                navigate("/library", { replace: true });
            }
        } catch (e: any) {
            if (e.request) {
                if (e.request.status === 401) {
                    localStorage.removeItem("jwt-token");
                    authContext.setUserLogged(
                        !!localStorage.getItem("jwt-token")
                    );
                }
                setAutoLoginStatus(e.request.status);
                setTimeout(() => {
                    setAutoLoginStatus(0);
                }, 4000);
            }
        }
    };

    useEffect(() => {
        const jwt = localStorage.getItem("jwt-token");
        let ignore = false;
        if (jwt && !ignore) {
            autoLogin(jwt).then((r) => {});
        }
        return () => {
            ignore = true;
        };
    }, []);

    const formik = useFormik({
        initialValues: { username: "", password: "" },
        validate: (values) => {
            const errors: any = {};
            if (!values.username) {
                errors.username = "Obrigatório";
            }
            if (!values.password) {
                errors.password = "Obrigatório";
            }
            return errors;
        },
        onSubmit: async (values) => {
            let formData = new FormData();
            for (const [key, value] of Object.entries(values)) {
                formData.append(key, value);
            }
            const config = {
                url: "https://biblioterra.herokuapp.com/v1/user/login",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                data: formData,
            };
            try {
                setLoginStatus(103);
                let req = await axios.request(config);
                setLoginStatus(200);
                localStorage.setItem("jwt-token", req.data["access_token"]);
                authContext.setUserLogged(!!localStorage.getItem("jwt-token"));

                if (redirect) {
                    navigate(`${redirect}`, { replace: true });
                    return;
                }

                if (md5) {
                    navigate(`/library?md5=${md5}`, { replace: true });
                    return;
                }

                navigate("/library", { replace: true });
                return;
            } catch (e: any) {
                if (e.request) {
                    switch (e.request.status) {
                        case 400:
                            setLoginStatus(400);
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
            <div className="d-flex flex-wrap justify-content-center">
                <Bibliologo />
                <Break className="mb-6" />
                <div className="basic-container rounded-3 p-3 w-75">
                    <AutoLoginMessage
                        autoLoginStatus={autoLoginStatus}
                        disabled={autoLoginStatus === 0}
                    />
                    <LoginMessage
                        loginStatus={loginStatus}
                        disabled={loginStatus === 0}
                    />
                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor="username">Nome de usuario</label>
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
                                <span className="text-danger">
                                    {formik.errors.username}
                                </span>
                                <Break />
                            </div>
                        ) : null}
                        <label htmlFor="password">Senha</label>
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
                        <Link to="/user/recover">
                            <span
                                style={{ fontSize: "0.85rem" }}
                                className="text-muted"
                            >
                                Esqueci minha senha/usuario
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
                                Não possui uma conta? Crie uma gratuitamente.
                            </Link>
                            <Break />

                            <MDBBtn
                                className="mt-5"
                                type="submit"
                                disabled={autoLoginStatus !== 0}
                            >
                                logar
                            </MDBBtn>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
