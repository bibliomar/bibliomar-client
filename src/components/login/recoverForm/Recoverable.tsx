import { useFormik } from "formik";

import Break from "../../general/Break";

import { MDBBtn, MDBInput } from "mdb-react-ui-kit";

import jwt_decode, { JwtPayload } from "jwt-decode";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Props {
    token: string;
}

export default function Recoverable(props: Props) {
    const [changeStatus, setChangeStatus] = useState<number>(0);
    const navigate = useNavigate();
    let jwt = jwt_decode(props.token) as JwtPayload;
    let username = jwt.sub as string;
    const formik = useFormik({
        initialValues: { username: username, password: "" },
        validate: (values) => {
            const errors: any = {};

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
            return errors;
        },
        onSubmit: async (values) => {
            let formData = new FormData();
            formData.set("new_pass", values.password);
            const config = {
                url: "https://biblioterra.herokuapp.com/v1/user/change",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${props.token}`,
                },
                data: formData,
            };
            try {
                setChangeStatus(103);
                await axios.request(config);
                setChangeStatus(200);
                setTimeout(() => {
                    navigate("/user/login", { replace: true });
                }, 5000);
            } catch (e: any) {
                if (e.response) {
                    if (e.response.status === 400) {
                        setChangeStatus(400);
                    } else if (e.response.status === 500) {
                        setChangeStatus(500);
                    }
                } else {
                    setChangeStatus(500);
                }
            }
        },
    });
    return (
        <div>
            {changeStatus !== 0 && changeStatus === 103 ? (
                <div className="d-flex justify-content-center">
                    <span className="text-info text-center">
                        Enviando sua solicitação ao servidor...
                    </span>
                </div>
            ) : null}
            {changeStatus !== 0 && changeStatus === 200 ? (
                <div className="d-flex justify-content-center">
                    <span className="text-success text-center">
                        Tudo certo! Redefinimos sua senha e vamos te redirecinar
                        a pagina de login...
                    </span>
                </div>
            ) : null}
            {changeStatus !== 0 && changeStatus > 200 ? (
                <div className="d-flex justify-content-center">
                    <span className="text-danger text-center">
                        {changeStatus === 500
                            ? "Não conseguimos atualizar a senha do usuario em questão, tente novamente mais tarde."
                            : "Algo deu errado, aguarde um pouco e tente novamente."}
                    </span>
                </div>
            ) : null}
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="username">Nome de usuario</label>
                <MDBInput
                    className="text-dark"
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
                <label htmlFor="password">Nova senha</label>
                <MDBInput
                    className="text-white"
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
                <div className="d-flex justify-content-end mt-5">
                    <MDBBtn type="submit">Alterar senha</MDBBtn>
                </div>
            </form>
        </div>
    );
}
