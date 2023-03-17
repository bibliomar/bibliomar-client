import { Trans, useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../general/helpers/generalContext";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { JWTTokenResponse } from "../user/helpers/loginTypes";
import Break from "../general/Break";

export default function SearchGreeting() {
    const { t, i18n } = useTranslation();
    const { jwtToken, userLogged } = useContext(AuthContext);
    const [username, setUsername] = useState<string | undefined>(undefined);
    useEffect(() => {
        if (userLogged && jwtToken != null) {
            const decodedToken: JwtPayload = jwt_decode(jwtToken);
            const username = decodedToken.sub;
            if (username) {
                setUsername(username);
            }
        }
    }, [jwtToken]);

    const renderGreetingMessage = () => {
        if (userLogged && username != null) {
            return (
                <Trans
                    i18nKey="bemVindoDeVoltaEsperamosQueEncontreOQueProcura"
                    ns="search"
                    values={{
                        username: username,
                    }}
                    components={{
                        b: <br />,
                        s: <strong />,
                    }}
                />
            );
        } else {
            return t("search:greeting");
        }
    };

    const expirationDate = new Date("2023-03-28T23:59:59Z");

    return (
        <div className="d-flex flex-wrap justify-content-center">
            <div className="break" />
            <p className="greeting-text text-center mt-2">
                <Trans
                    i18nKey="atenoEstamosMigrandoParaUmNovoDominoNossoDomnioSit"
                    ns="search"
                    components={{
                        s: <strong />,
                        s2: <strong />,
                        b: <br />,
                    }}
                />
                <span>
                    <strong>
                        {expirationDate.toLocaleString(
                            new Intl.Locale(i18n.language)
                        )}
                    </strong>
                </span>
            </p>
            <Break />
            <span className="greeting-text mb-3">
                {t("search:atualizeSeusFavoritos")}{" "}
                <a href="https://bibliomar.com">bibliomar.com</a>
            </span>
            <div className="break" />
        </div>
    );
}
