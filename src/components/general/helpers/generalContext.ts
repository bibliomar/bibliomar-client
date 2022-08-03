// This file is for context used in all the routes.

import { createContext } from "react";
import { ThemeContext, ThemeOptions } from "./generalTypes";

export const Theme = createContext<ThemeContext>({
    theme: ThemeOptions.light,
    setTheme: () => {},
});
