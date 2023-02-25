import { Metadata } from "../../general/helpers/generalTypes";
import Break from "../../general/Break";
import { useTranslation } from "react-i18next";
import { formatBytes } from "../../general/helpers/generalFunctions";

interface Props {
    metadata: Metadata;
}

export default function MetadataInfoFile({ metadata }: Props) {
    const { t, i18n } = useTranslation();

    return (
        <div className="book-info-title d-flex flex-wrap">
            <Break mobile className="mb-2" />
            <span className="me-3">
                <strong>{t("metadatainfo:format")}</strong>:{" "}
                {metadata.extension
                    ? metadata.extension.toUpperCase()
                    : t("metadatainfo:undefinedField")}
            </span>
            <Break mobile className="mb-2" />
            <span className="me-3">
                <strong>{t("metadatainfo:filesize")}</strong>:{" "}
                {metadata.fileSize
                    ? formatBytes(metadata.fileSize)
                    : t("metadatainfo:undefinedField")}
            </span>
            <Break mobile className="mb-2" />
            <span className="me-3">
                <strong>{t("metadatainfo:language")}</strong>:{" "}
                {metadata.language
                    ? metadata.language
                    : t("metadatainfo:undefinedField")}
            </span>

            <Break mobile className="mb-2" />
            <span className="me-3">
                <strong>{t("metadatainfo:year")}</strong>:{" "}
                {metadata.year
                    ? metadata.year
                    : t("metadatainfo:undefinedField")}
            </span>
            <Break mobile className="mb-2" />
            <span className="me-3">
                <strong>{t("metadatainfo:publisher")}</strong>:{" "}
                {metadata.publisher
                    ? metadata.publisher
                    : t("metadatainfo:undefinedField")}
            </span>
            <Break mobile className="mb-2" />
            <span className="me-3">
                <strong>{t("metadatainfo:edition")}</strong>:{" "}
                {metadata.edition
                    ? metadata.edition
                    : t("metadatainfo:undefinedField")}
            </span>
            <Break mobile className="mb-2" />
            <span className="me-3">
                <strong>{t("metadatainfo:series")}</strong>:{" "}
                {metadata.series
                    ? metadata.series
                    : t("metadatainfo:undefinedField")}
            </span>
            <Break mobile className="mb-2" />
            <span className="me-3">
                <strong>{t("metadatainfo:timeadded")}</strong>:{" "}
                {metadata.timeAdded
                    ? new Date(metadata.timeAdded).toLocaleString(
                          new Intl.Locale(i18n.language)
                      )
                    : t("metadatainfo:undefinedField")}
            </span>
            <Break mobile className="mb-2" />
            <span className="me-3">
                <strong>{t("metadatainfo:timelastmodified")}</strong>:{" "}
                {metadata.timeLastModified
                    ? new Date(metadata.timeLastModified).toLocaleString(
                          new Intl.Locale(i18n.language)
                      )
                    : t("metadatainfo:undefinedField")}
            </span>
        </div>
    );
}
