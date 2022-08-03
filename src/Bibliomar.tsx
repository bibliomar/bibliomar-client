import { useEffect, useState } from "react";
import {
    ThemeContext,
    ThemeOptions,
} from "./components/general/helpers/generalTypes";
import { Theme } from "./components/general/helpers/generalContext";
import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Themeing from "./Themeing";

// This is just a wrapper on top of <App /> to help us use contexts better.
// If a context is used application-wise, provide it here.
export default function Bibliomar() {
    const savedTheme: ThemeOptions | null = localStorage.getItem("theme")
        ? JSON.parse(localStorage.getItem("theme")!)
        : null;
    const [theme, setTheme] = useState<ThemeOptions>(
        savedTheme || ThemeOptions.light
    );
    const [themeing, setThemeing] = useState<boolean>(true);
    const themeContext: ThemeContext = {
        theme: theme,
        setTheme: setTheme,
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
                ? "./mdb-ui-kit/css/mdb.min.css?inline"
                : "./mdb-ui-kit/css/mdb.dark.min.css?inline"
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
            <Theme.Provider value={themeContext}>
                {themeing ? <Themeing /> : <App />}
            </Theme.Provider>
        </BrowserRouter>
    );
}
