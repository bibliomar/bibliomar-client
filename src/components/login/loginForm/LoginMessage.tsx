interface Props {
    loginStatus: number;
    disabled: boolean;
}

export default function LoginMessage(props: Props) {
    let loginStatus = props.loginStatus;
    return (
        <div>
            {!props.disabled ? (
                <div>
                    {loginStatus === 103 ? (
                        <div className="d-flex justify-content-center">
                            <span className="text-info text-center">
                                Enviando sua solicitação ao servidor...
                            </span>
                        </div>
                    ) : null}
                    {loginStatus === 200 ? (
                        <div className="d-flex justify-content-center">
                            <span className="text-success text-center">
                                Login bem sucedido!
                            </span>
                        </div>
                    ) : null}
                    {loginStatus === 400 ? (
                        <div className="d-flex justify-content-center">
                            <span className="text-danger text-center">
                                Informações de login incorretas.
                            </span>
                        </div>
                    ) : null}
                    {loginStatus === 500 ? (
                        <div className="d-flex justify-content-center">
                            <span className="text-danger text-center">
                                Não conseguimos fazer seu login, tente novamente
                                mais tarde.
                            </span>
                        </div>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
}
