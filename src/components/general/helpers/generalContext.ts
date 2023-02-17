// This file is for context used in all the routes.

import { createContext } from "react";
import {
    AuthContextParams,
    ThemeContextParams,
    ThemeOptions,
} from "./generalTypes";

export const ThemeContext = createContext<ThemeContextParams>({
    theme: ThemeOptions.light,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setTheme: () => {},
});

export const AuthContext = createContext<AuthContextParams>({
    userLogged: false,
    jwtToken: null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setJwtToken: () => {},
});
