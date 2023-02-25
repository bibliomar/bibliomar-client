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
import { useContext, useEffect } from "react";
import { ThemeContext } from "../helpers/generalContext";
import { ThemeOptions } from "../helpers/generalTypes";

const flagCodeForLanguage = (language: string) => {
    const langCode = language.toLowerCase();
    switch (langCode) {
        case "pt":
            return "br";
        case "pt-br":
            return "br";
        case "en":
            return "us";
        case "en-us":
            return "us";
        default:
            return "br";
    }
};

export default function NavbarLanguageSelector() {
    const { i18n } = useTranslation();
    const { theme } = useContext(ThemeContext);

    const currentLanguage = i18n.language;
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng).then();
    };

    useEffect(() => {
        if (currentLanguage === "pt-BR") {
            changeLanguage("pt-br");
        } else if (currentLanguage === "en-US") {
            changeLanguage("en-us");
        }
        console.log("currentLanguage: " + currentLanguage);
    }, []);

    // noinspection AllyJsxHardcodedStringInspection
    return (
        <MDBNavbarItem className="">
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
                    <MDBDropdownItem
                        link
                        onClick={() => changeLanguage("pt-br")}
                    >
                        <span className={`fi fi-br mt-2 me-1`}></span>
                        <span>PT-BR</span>
                    </MDBDropdownItem>
                    <MDBDropdownItem
                        link
                        onClick={() => changeLanguage("en-us")}
                    >
                        <span className={`fi fi-us mt-2 me-1`}></span>
                        <span>EN-US</span>
                    </MDBDropdownItem>
                </MDBDropdownMenu>
            </MDBDropdown>
        </MDBNavbarItem>
    );
}
