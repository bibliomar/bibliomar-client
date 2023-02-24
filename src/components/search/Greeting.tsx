import { useTranslation } from "react-i18next";

export default function Greeting() {
    const { t } = useTranslation();
    return (
        <div className="d-flex flex-wrap justify-content-center">
            <div className="break" />
            <p className="greeting-text text-center mt-2">
                {t("search:greeting")}
            </p>
            <div className="break" />
        </div>
    );
}
