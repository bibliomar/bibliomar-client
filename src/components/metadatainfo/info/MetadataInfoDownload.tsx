import Break from "../../general/Break";
import { DownloadLinks, Metadata } from "../../general/helpers/generalTypes";
import { useTranslation } from "react-i18next";

interface Props {
    metadata: Metadata;
}

export default function MetadataInfoDownload({ metadata }: Props) {
    const { t } = useTranslation();
    // noinspection AllyJsxHardcodedStringInspection
    return (
        <div className="d-flex flex-wrap justify-content-center">
            <span className="recommendation-title mb-2">Download</span>
            <Break />
            <a
                target={"_blank"}
                className="d-flex justify-content-center"
                href={metadata.downloadMirrors?.libgenMirror}
            >
                <button
                    className="dbutton btn btn-primary btn-rounded btn-lg mt-1 mb-1 me-1"
                    disabled={
                        metadata.downloadMirrors == undefined ||
                        metadata.downloadMirrors.libgenMirror == undefined
                    }
                >
                    LIBGEN
                </button>
            </a>
            <Break />
            <a
                target={"_blank"}
                className="d-flex justify-content-center"
                href={metadata.downloadMirrors?.librocksMirror}
            >
                <button
                    className="dbutton btn btn-primary btn-rounded btn-lg mt-1 mb-1 me-1"
                    disabled={
                        metadata.downloadMirrors == undefined ||
                        metadata.downloadMirrors.librocksMirror == undefined
                    }
                >
                    LIBROCKS
                </button>
            </a>
            <Break />
            <span className="text-muted mt-1 text-center w-75">
                {t("metadatainfo:downloadWaitInfo")}
            </span>
        </div>
    );
}
