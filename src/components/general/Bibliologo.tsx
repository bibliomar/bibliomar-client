import { Theme } from "./helpers/generalContext";
import { useContext } from "react";
import { ThemeOptions } from "./helpers/generalTypes";

function Bibliologo() {
    const theme = useContext(Theme).theme;
    return (
        <div className="row">
            <div className="col d-flex flex-wrap justify-content-center mt-5">
                <a href="/search">
                    <img
                        style={{ maxWidth: "80vw" }}
                        src={
                            theme === ThemeOptions.light
                                ? "/assets/img/BIBLIOLOGO-light-theme.svg"
                                : "/assets/img/BIBLIOLOGO-dark-theme.svg"
                        }
                        alt="Bibliomar"
                    />
                </a>
            </div>
            <div className="break" />
        </div>
    );
}

export default Bibliologo;
