import { Trans, useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../general/helpers/generalContext";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { JWTTokenResponse } from "../user/helpers/loginTypes";

export default function SearchGreeting() {
    const { t } = useTranslation();
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

    return (
        <div className="d-flex flex-wrap justify-content-center">
            <div className="break" />
            <p className="greeting-text text-center mt-2">
                {renderGreetingMessage()}
            </p>
            <div className="break" />
        </div>
    );
}
