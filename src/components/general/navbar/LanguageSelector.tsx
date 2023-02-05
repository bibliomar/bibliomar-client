import { useTranslation } from "react-i18next";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import {
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownMenu,
    MDBDropdownToggle,
    MDBNavbarItem,
    MDBNavbarLink,
} from "mdb-react-ui-kit";

const flagCodeForLanguage = (language: string) => {
    switch (language) {
        case "pt":
            return "br";
        case "en":
            return "us";
        default:
            return "br";
    }
};

export default function LanguageSelector() {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng).then();
    };

    return (
        <MDBNavbarItem className="ms-auto mt-auto mt-lg-0 me-2">
            <MDBDropdown className="shadow-0 h-100 d-flex flex-column justify-content-center">
                <MDBDropdownToggle tag="a" className="">
                    <span
                        className={`fi fi-${flagCodeForLanguage(
                            currentLanguage
                        )} me-2`}
                    ></span>
                    <span className="text-dark">
                        {currentLanguage.toUpperCase()}
                    </span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                    <MDBDropdownItem onClick={() => changeLanguage("pt")}>
                        <span className={`fi fi-br mt-2 me-1`}></span>
                        <span className="text-dark">PT</span>
                    </MDBDropdownItem>
                    <MDBDropdownItem onClick={() => changeLanguage("en")}>
                        <span className={`fi fi-us mt-2 me-1`}></span>
                        <span className="text-dark">EN</span>
                    </MDBDropdownItem>
                </MDBDropdownMenu>
            </MDBDropdown>
        </MDBNavbarItem>
    );
}
