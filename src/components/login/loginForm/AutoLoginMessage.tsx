import { useTranslation } from "react-i18next";

interface Props {
    autoLoginStatus: number;
    disabled: boolean;
}

export default function AutoLoginMessage(props: Props) {
    const { t } = useTranslation();
    return (
        <>
            {!props.disabled ? (
                <div>
                    {props.autoLoginStatus === 103 ? (
                        <div className="d-flex justify-content-center">
                            <span className="text-info text-center">
                                {t("user:tentandoLoginAutomtico")}
                            </span>
                        </div>
                    ) : null}
                    {props.autoLoginStatus === 200 ? (
                        <div className="d-flex justify-content-center">
                            <span className="text-success text-center">
                                {t("user:loginAutomticoBemSucedido")}
                            </span>
                        </div>
                    ) : null}
                    {props.autoLoginStatus === 401 ? (
                        <div className="d-flex justify-content-center">
                            <span className="text-danger text-center">
                                {t(
                                    "user:sessoExpiradaPorFavorFaaLoginNovamente"
                                )}
                            </span>
                        </div>
                    ) : null}
                    {props.autoLoginStatus === 403 ? (
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
                </div>
            ) : null}
        </>
    );
}
