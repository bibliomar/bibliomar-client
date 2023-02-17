import { useTranslation } from "react-i18next";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import {
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBNavbarItem,
} from "mdb-react-ui-kit";
import { Simulate } from "react-dom/test-utils";
import { useContext } from "react";
import { ThemeContext } from "../helpers/generalContext";
import { ThemeOptions } from "../helpers/generalTypes";

const flagCodeForLanguage = (language: string) => {
    switch (language) {
        case "pt":
            return "br";
        case "en":
            return "us";
        case "en-us":
            return "us";
        default:
            return "br";
    }
};

export default function LanguageSelector() {
    const { i18n } = useTranslation();
    const { theme } = useContext(ThemeContext);

    const currentLanguage = i18n.language;
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng).then();
    };

    if (currentLanguage === "en-us") {
        changeLanguage("en");
    }

    // noinspection AllyJsxHardcodedStringInspection
    return (
        <MDBNavbarItem className="ms-auto mt-3 mt-lg-0 me-2">
            <MDBDropdown className="shadow-0 h-100 d-flex flex-column justify-content-center">
                <MDBDropdownToggle tag="a" className="">
                    <span
                        className={`fi fi-${flagCodeForLanguage(
                            currentLanguage
                        )} me-2`}
                    ></span>
                    <span
                        className={
                            theme === ThemeOptions.light
                                ? "text-dark"
                                : "text-light"
                        }
                    >
                        {currentLanguage.toUpperCase()}
                    </span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                    <MDBDropdownItem onClick={() => changeLanguage("pt")}>
                        <span className={`fi fi-br mt-2 me-1`}></span>
                        <span>PT</span>
                    </MDBDropdownItem>
                    <MDBDropdownItem onClick={() => changeLanguage("en")}>
                        <span className={`fi fi-us mt-2 me-1`}></span>
                        <span>EN</span>
                    </MDBDropdownItem>
                </MDBDropdownMenu>
            </MDBDropdown>
        </MDBNavbarItem>
    );
}
