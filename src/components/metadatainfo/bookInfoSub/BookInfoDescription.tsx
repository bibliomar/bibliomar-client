import Break from "../../general/Break";
import { useTranslation } from "react-i18next";

interface Props {
    description: string | null | undefined;
}

export default function BookInfoDescription({ description }: Props) {
    const { t } = useTranslation();
    return (
        <div className="d-flex flex-wrap mt-5">
            <h4
                className="book-info-title-bold mb-4"
                style={{ fontWeight: "700" }}
            >
                {t("metadatainfo:description")}
            </h4>
            <Break />
            <p className="book-info-description">
                {description
                    ? description
                    : t("metadatainfo:undefinedDescription")}
            </p>
        </div>
    );
}
