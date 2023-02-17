import { useTranslation } from "react-i18next";

interface Props {
    loginStatus: number;
    disabled: boolean;
}

export default function LoginMessage(props: Props) {
    const loginStatus = props.loginStatus;
    const { t } = useTranslation();
    return (
        <div>
            {!props.disabled ? (
                <div>
                    {loginStatus === 103 ? (
                        <div className="d-flex justify-content-center">
                            <span className="text-info text-center">
                                {t("user:enviandoSuaSolicitaoAoServidor")}
                            </span>
                        </div>
                    ) : null}
                    {loginStatus === 200 ? (
                        <div className="d-flex justify-content-center">
                            <span className="text-success text-center">
                                {t("user:loginBemSucedido")}
                            </span>
                        </div>
                    ) : null}
                    {loginStatus === 400 ? (
                        <div className="d-flex justify-content-center">
                            <span className="text-danger text-center">
                                {t("user:informaesDeLoginIncorretas")}
                            </span>
                        </div>
                    ) : null}
                    {loginStatus === 401 ? (
                        <div className="d-flex justify-content-center">
                            <span className="text-danger text-center">
                                {t("user:informaesDeLoginIncorretas")}
                            </span>
                        </div>
                    ) : null}
                    {loginStatus === 403 ? (
                        <div className="d-flex justify-content-center">
                            <span className="text-danger text-center">
                                {t(
                                    "user:nsFizemosUmaMigraoInternaDeServidorEComIssoSuaSenh"
                                )}
                            </span>
                            <a href="https://bibliomar.site/user/recover">
                                {t("user:solicitarNovaSenha")}
                            </a>
                        </div>
                    ) : null}
                    {loginStatus === 500 ? (
                        <div className="d-flex justify-content-center">
                            <span className="text-danger text-center">
                                {t(
                                    "user:noConseguimosFazerSeuLoginTenteNovamenteMaisTarde"
                                )}
                            </span>
                        </div>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
}
