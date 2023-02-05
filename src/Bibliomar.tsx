import { useEffect, useState } from "react";
import {
    AuthContext,
    ThemeContext,
    ThemeOptions,
} from "./components/general/helpers/generalTypes";
import { Theme, Auth } from "./components/general/helpers/generalContext";
import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Themeing from "./Themeing";
import { hasStorage } from "./components/general/helpers/generalFunctions";

// This is just a wrapper on top of <App /> to help us use contexts better.
// If a context is used application-wise, provide it here.
export default function Bibliomar() {
    const savedThemeStr: string | null = localStorage.getItem("theme")
        ? localStorage.getItem("theme")
        : null;

    const savedTheme = savedThemeStr
        ? savedThemeStr === ThemeOptions.light
            ? ThemeOptions.light
            : ThemeOptions.dark
        : null;

    const [theme, setTheme] = useState<ThemeOptions>(
        savedTheme ? savedTheme : ThemeOptions.light
    );
    const [themeing, setThemeing] = useState<boolean>(true);
    const themeContext: ThemeContext = {
        theme: theme,
        setTheme: setTheme,
    };

    const [userLogged, setUserLogged] = useState<boolean>(
        !!localStorage.getItem("jwt-token")
    );
    const authContext: AuthContext = {
        userLogged: userLogged,
        setUserLogged: setUserLogged,
    };

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

    return (
        <BrowserRouter>
            <Auth.Provider value={authContext}>
                <Theme.Provider value={themeContext}>
                    {themeing ? <Themeing /> : <App />}
                </Theme.Provider>
            </Auth.Provider>
        </BrowserRouter>
    );
}
