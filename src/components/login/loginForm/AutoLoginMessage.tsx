interface Props {
    autoLoginStatus: number;
    disabled: boolean;
}

export default function AutoLoginMessage(props: Props) {
    return (
        <>
            {!props.disabled ? (
                <div>
                    {props.autoLoginStatus === 103 ? (
                        <div className="d-flex justify-content-center">
                            <span className="text-info text-center">
                                Tentando login automático...
                            </span>
                        </div>
                    ) : null}
                    {props.autoLoginStatus === 200 ? (
                        <div className="d-flex justify-content-center">
                            <span className="text-success text-center">
                                Login automático bem sucedido!
                            </span>
                        </div>
                    ) : null}
                    {props.autoLoginStatus === 401 ? (
                        <div className="d-flex justify-content-center">
                            <span className="text-danger text-center">
                                Sessão expirada, por favor, faça login
                                novamente.
                            </span>
                        </div>
                    ) : null}
                </div>
            ) : null}
        </>
    );
}
