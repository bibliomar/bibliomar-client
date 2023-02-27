import { Metadata } from "../../general/helpers/generalTypes";
import {
    getAmazonSearchUrl,
    getGoodReadsSearchUrl,
    getGoogleBooksSearchUrl,
} from "../helpers/metadataFunctions";
import { useTranslation } from "react-i18next";

interface Props {
    metadata: Metadata;
}

export default function MetadataInfoSearch({ metadata }: Props) {
    const { t, i18n } = useTranslation();
    const amazonSearchUrl = getAmazonSearchUrl(i18n.language, metadata);
    const googleBooksSearchUrl = getGoogleBooksSearchUrl(metadata);
    const goodReadsSearchUrl = getGoodReadsSearchUrl(metadata);
    return (
        <div className="d-flex flex-wrap w-100 justify-content-start">
            {amazonSearchUrl ? (
                <a href={amazonSearchUrl} target="_blank" className="mb-2 me-2">
                    {t("metadatainfo:pesquisarNoAmazon")}
                </a>
            ) : null}

            {googleBooksSearchUrl ? (
                <a
                    href={googleBooksSearchUrl}
                    target="_blank"
                    className="mb-2 me-2"
                >
                    {t("metadatainfo:pesquisarNoGoogleBooks")}
                </a>
            ) : null}
            {goodReadsSearchUrl ? (
                <a
                    href={goodReadsSearchUrl}
                    target="_blank"
                    className="mb-2 me-2"
                >
                    {t("metadatainfo:pesquisarNoGoodreads")}
                </a>
            ) : null}
        </div>
    );
}
