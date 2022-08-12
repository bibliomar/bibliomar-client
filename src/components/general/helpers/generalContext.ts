// This file is for context used in all the routes.

import { createContext } from "react";
import { AuthContext, ThemeContext, ThemeOptions } from "./generalTypes";

export const Theme = createContext<ThemeContext>({
    theme: ThemeOptions.light,
    setTheme: () => {},
});

export const Auth = createContext<AuthContext>({
    userLogged: false,
    setUserLogged: () => {},
});
