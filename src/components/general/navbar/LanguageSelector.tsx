import { useTranslation } from "react-i18next";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { MDBDropdown, MDBDropdownToggle } from "mdb-react-ui-kit";

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
        <div className="ms-auto">
            <MDBDropdown className="shadow-0">
                <MDBDropdownToggle color="light">
                    <span
                        className={`fi fi-${flagCodeForLanguage(
                            currentLanguage
                        )} me-2`}
                    ></span>
                    <span>{currentLanguage.toUpperCase()}</span>
                </MDBDropdownToggle>
            </MDBDropdown>
        </div>
    );
}
