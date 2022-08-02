import { useState } from "react";
import { ThemeContext, ThemeOptions } from "./helpers/generalTypes";
import { Theme } from "./helpers/generalContext";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Themeing from "./Themeing";

// This is just a wrapper on top of <App /> to help us use contexts better.
// If a context is used application-wise, use it here.
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

    // Loading of themes...
    if (theme === ThemeOptions.light) {
        import("mdb-ui-kit/css/mdb.min.css").then(() => {
            import("./scss/light.scss").then(() => {
                setThemeing(false);
            });
        });
    } else {
        import("mdb-ui-kit/css/mdb.dark.min.css").then(() => {
            import("./scss/dark.scss").then(() => {
                setThemeing(false);
            });
        });
    }

    return (
        <BrowserRouter>
            <Theme.Provider value={themeContext}>
                {themeing ? <Themeing /> : <App />}
            </Theme.Provider>
        </BrowserRouter>
    );
}
