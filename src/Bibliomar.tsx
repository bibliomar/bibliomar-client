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
import { BrowserRouter } from "react-router-dom";
import { hasStorage } from "./components/general/helpers/generalFunctions";
import useLocalStorage from "./components/general/helpers/useLocalStorage";
import { toast, ToastContainer } from "react-toastify";
import useThemeLoader from "./components/general/helpers/useThemeLoader";

// This is just a wrapper on top of <App /> to help us use contexts better.
// If a context is used application-wise, provide it here.
export default function Bibliomar() {
    const [jwtToken, setJwtToken] = useLocalStorage<string | null>(
        "jwt-token",
        null
    );

    const [theme, setTheme] = useThemeLoader();
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

    return (
        <BrowserRouter>
            <AuthContext.Provider value={authContext}>
                <ThemeContext.Provider value={themeContext}>
                    <App />
                </ThemeContext.Provider>
            </AuthContext.Provider>
        </BrowserRouter>
    );
}
