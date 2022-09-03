import { Form, Formik, useFormik } from "formik";
import { MDBBtn, MDBInput } from "mdb-react-ui-kit";
import Bibliologo from "../../general/Bibliologo";
import Break from "../../general/Break";
import Message from "../../general/Message";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { useContext, useState } from "react";
import { Auth } from "../../general/helpers/generalContext";
import { backendUrl } from "../../general/helpers/generalFunctions";

export default function Register() {
    const authContext = useContext(Auth);
    const [searchParameters, _] = useSearchParams();
    const redirect = searchParameters.get("redirect") as string;
    const navigate = useNavigate();
    const [registerStatus, setRegisterStatus] = useState<number>(0);

    const formik = useFormik({
        initialValues: { username: "", email: "", password: "" },
        validate: (values) => {
            const errors: any = {};

            if (!values.username) {
                errors.username = "Campo obrigatorio";
            } else if (values.username.length < 5) {
                errors.username =
                    "Nome de usuario deve conter pelo menos 5 caracteres.";
            } else if (/[\s@$!%*#?&]/.test(values.username)) {
                errors.username =
                    "Nome de usuario não pode conter espaços ou caracteres especiais.";
            }
            if (!values.password) {
                errors.password = "Campo obrigatorio";
            } else if (
                !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{6,16}$/.test(
                    values.password
                )
            ) {
                errors.password =
                    "Senha deve conter pelo menos uma letra maiuscula, uma minuscula, um número e um caractere " +
                    "especial. Entre 6 e 16 caracteres.";
            }
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
            let formData = new FormData();
            for (const [key, value] of Object.entries(values)) {
                formData.append(key, value);
            }
            const config = {
                url: `${backendUrl}/v1/user/signup`,
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                data: formData,
            };
            try {
                setRegisterStatus(103);
                let req = await axios.request(config);
                setRegisterStatus(200);
                localStorage.setItem("jwt-token", req.data["access_token"]);
                authContext.setUserLogged(!!localStorage.getItem("jwt-token"));
                setTimeout(() => {
                    if (redirect) {
                        navigate(redirect);
                    } else {
                        navigate("/library");
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
                                        Enviando sua solicitação ao servidor...
                                    </span>
                                </div>
                            ) : null}
                            {registerStatus === 200 ? (
                                <div className="d-flex justify-content-center">
                                    <span className="text-success text-center">
                                        Tudo certo! Sua conta foi criada e já
                                        vamos te enviar pra próxima página...
                                    </span>
                                </div>
                            ) : null}
                            {registerStatus === 400 ? (
                                <div className="d-flex justify-content-center">
                                    <span className="text-danger text-center">
                                        Nome de usuario ou email em uso.
                                    </span>
                                </div>
                            ) : null}
                            {registerStatus === 500 ? (
                                <div className="d-flex justify-content-center">
                                    <span className="text-danger text-center">
                                        Não conseguimos fazer seu registro,
                                        tente novamente mais tarde.
                                    </span>
                                </div>
                            ) : null}
                        </div>
                    ) : null}
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
                                <span className="text-danger text-wrap">
                                    {formik.errors.username}
                                </span>
                                <Break />
                            </div>
                        ) : null}
                        <label htmlFor="password">Email</label>
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
                        <label htmlFor="password">Senha</label>
                        <MDBInput
                            className="book-info-description"
                            name="password"
                            id="password"
                            type="text"
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
                                Já tenho uma conta
                            </Link>
                            <Break />

                            <MDBBtn className="mt-4">registrar</MDBBtn>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
