import { useEffect, useState } from "react";
import {
    AuthContextParams,
    ThemeContextParams,
    ThemeOptions,
} from "./components/general/helpers/generalTypes";
import {
    AuthContext,
    ThemeContext,
} from "./components/general/helpers/generalContext";
import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { Helmet } from "react-helmet";
import { BrowserRouter } from "react-router-dom";
import { hasStorage } from "./components/general/helpers/generalFunctions";
import useLocalStorage from "./components/general/helpers/useLocalStorage";
import { toast, ToastContainer } from "react-toastify";
import useThemeLoader from "./components/general/helpers/useThemeLoader";
import Themeing from "./Themeing";

// This is just a wrapper on top of <App /> to help us use contexts better.
// If a context is used application-wise, provide it here.
export default function Bibliomar() {
    const [jwtToken, setJwtToken] = useLocalStorage<string | null>(
        "jwt-token",
        null
    );

    const [theme, setTheme] = useLocalStorage("theme", ThemeOptions.light);
    const [themeing, setThemeing] = useState<boolean>(true);
    const themeContext: ThemeContextParams = {
        theme: theme,
        setTheme: setTheme,
    };

    const [userLogged, setUserLogged] = useState<boolean>(jwtToken != null);
    const authContext: AuthContextParams = {
        userLogged: userLogged,
        jwtToken: jwtToken,
        setJwtToken: setJwtToken,
    };

    // Tries for localStorage and sessionStorage, and clear them if they are full.
    useEffect(() => {
        // Tries for sessionStorage
        if (!hasStorage(sessionStorage)) {
            sessionStorage.clear();
        }
        // Tries for localStorage
        if (!hasStorage(localStorage)) {
            localStorage.clear();
        }
    }, []);

    useEffect(() => {
        // Set userLogged state to true if jwtToken is not null.
        setUserLogged(!!jwtToken);
    }, [jwtToken]);

    useEffect(() => {
        // Loading of themes...

        // If not themeing, set themeing to true.
        // Just to avoid unnecessary rerenders.
        !themeing ? setThemeing(true) : null;

        // Tries removing the old styles before anything.
        const oldStyles = Array.from(
            document.getElementsByClassName("theme-style")
        );
        if (oldStyles && oldStyles.length > 0) {
            oldStyles.forEach((style) => {
                document.head.removeChild(style);
            });
        }

        import(
            theme === ThemeOptions.light
                ? "mdb-ui-kit/css/mdb.min.css?inline"
                : "mdb-ui-kit/css/mdb.dark.min.css?inline"
        ).then((mdbCss) => {
            import(
                theme === ThemeOptions.light
                    ? "./scss/light.scss?inline"
                    : "./scss/dark.scss?inline"
            ).then((themeCss) => {
                const mdbStyle = document.createElement("style");
                const themeStyle = document.createElement("style");
                mdbStyle.className = "theme-style";
                mdbStyle.innerHTML = mdbCss.default;
                themeStyle.className = "theme-style";
                themeStyle.innerHTML = themeCss.default;
                document.head.append(mdbStyle, themeStyle);
                setThemeing(false);
            });
        });
    }, [theme]);

    return (
        <BrowserRouter>
            <AuthContext.Provider value={authContext}>
                <ThemeContext.Provider value={themeContext}>
                    <>
                        <Helmet>
                            <title>Bibliomar</title>
                        </Helmet>
                        {themeing ? <Themeing /> : <App />}
                    </>
                </ThemeContext.Provider>
            </AuthContext.Provider>
        </BrowserRouter>
    );
}
