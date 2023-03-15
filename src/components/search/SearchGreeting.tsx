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

    const expireDate = new Date("2023-03-28T23:59:59Z");
    const expireDateStr = expireDate.toLocaleString(
        new Intl.Locale(i18n.language)
    );

    return (
        <div className="d-flex flex-wrap justify-content-center greeting-text text-center">
            <div className="break" />
            <p className=" mt-2">
                <Trans
                    i18nKey="atenoEstamosMigrandoParaUmNovoDominoNossoDomnioSit"
                    ns="search"
                    components={{
                        s: <strong />,
                        b: <br />,
                        s2: <strong />,
                        s3: <strong />,
                    }}
                />
                <strong>{expireDateStr}</strong>.
            </p>
            <Break />
            <span className="mb-1">{t("search:atualizeSeusFavoritos")} </span>
            <Break />
            <a className="mb-2" href="https://bibliomar.com">
                bibliomar.com
            </a>
            <div className="break" />
        </div>
    );
}
