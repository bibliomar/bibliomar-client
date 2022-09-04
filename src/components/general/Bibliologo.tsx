import { Theme } from "./helpers/generalContext";
import { useContext } from "react";
import { ThemeOptions } from "./helpers/generalTypes";
import { Link } from "react-router-dom";

function Bibliologo() {
    const theme = useContext(Theme).theme;
    return (
        <div className="row">
            <div className="col d-flex flex-wrap justify-content-center mt-5">
                <Link to="/">
                    <img
                        style={{ maxWidth: "80vw" }}
                        src={
                            theme === ThemeOptions.light
                                ? "/assets/img/BIBLIOLOGO-light-theme.svg"
                                : "/assets/img/BIBLIOLOGO-dark-theme.svg"
                        }
                        alt="Bibliomar"
                    />
                </Link>
            </div>
        </div>
    );
}

export default Bibliologo;
