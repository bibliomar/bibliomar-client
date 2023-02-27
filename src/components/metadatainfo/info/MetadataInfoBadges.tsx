import { Metadata } from "../../general/helpers/generalTypes";
import { SavedBookEntry, SavedBooks } from "../../reader/helpers/readerTypes";
import { useTranslation } from "react-i18next";
import { libraryCategoryToLocaleText } from "../../general/helpers/generalFunctions";
import {
    getAmazonDirectUrl,
    getGoogleBooksDirectUrl,
} from "../helpers/metadataFunctions";

interface Props {
    metadata: Metadata;
}

export default function MetadataInfoBadges({ metadata }: Props) {
    const { t } = useTranslation();
    const amazonDirectUrl = getAmazonDirectUrl(metadata);
    const googleBooksDirectUrl = getGoogleBooksDirectUrl(metadata);
    return (
        <>
            <div className="badge badge-secondary book-info-badge me-1 mb-1">
                {metadata.topic === "fiction"
                    ? t("metadatainfo:fiction")
                    : t("metadatainfo:nonfiction")}
            </div>
            <div className="badge badge-secondary book-info-badge me-1 mb-1">
                {amazonDirectUrl ? (
                    <a href={amazonDirectUrl} target="_blank">
                        {t("metadatainfo:disponvelNoAmazon")}
                    </a>
                ) : null}
            </div>
            <div className="badge badge-secondary book-info-badge me-1 mb-1">
                {googleBooksDirectUrl ? (
                    <a href={googleBooksDirectUrl} target="_blank">
                        {t("metadatainfo:disponvelNoGoogleBooks")}
                    </a>
                ) : null}
            </div>
            <div className="badge badge-secondary book-info-badge me-1 mb-1">
                {metadata.category ? t("metadatainfo:onLibrary") : null}
            </div>
            <div className="badge badge-secondary book-info-badge me-1 mb-1">
                {metadata.category
                    ? libraryCategoryToLocaleText(t, metadata.category)
                    : null}
            </div>
        </>
    );
}
