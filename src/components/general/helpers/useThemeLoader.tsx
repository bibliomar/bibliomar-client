import useLocalStorage from "./useLocalStorage";
import { ThemeOptions } from "./generalTypes";
import { useEffect } from "react";

export default function useThemeLoader(): [
    ThemeOptions,
    (value: ThemeOptions | ((val: ThemeOptions) => ThemeOptions)) => void
] {
    const [theme, setTheme] = useLocalStorage<ThemeOptions>(
        "theme",
        ThemeOptions.light
    );

    useEffect(() => {
        // Loading of themes...

        /**
         * The older way of loading themes.
         * MDBootstrap makes a man write such things.
         * Here for historical purposes. :P

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
         */

        const themeStylesLink = document.getElementById("theme-styles");
        if (themeStylesLink) {
            const themeFile = theme === ThemeOptions.light ? "light" : "dark";
            // The path should be relative to the index.html in the root folder.
            // The path should also start with a slash.
            const themePath = `/src/scss/${themeFile}.scss`;

            const olderHref = themeStylesLink.getAttribute("href");
            if (olderHref !== themePath) {
                themeStylesLink.setAttribute("href", themePath);
            }
        }
    }, [theme]);

    return [theme, setTheme];
}
