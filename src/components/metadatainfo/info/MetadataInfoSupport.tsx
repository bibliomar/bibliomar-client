import { Metadata } from "../../general/helpers/generalTypes";
import { useTranslation } from "react-i18next";
import Break from "../../general/Break";
import {
    getGoogleBooksUrl,
    getLocalizedAmazonUrl,
} from "../helpers/metadataFunctions";

interface MetadataInfoSupportProps {
    metadata: Metadata;
}

export default function MetadataInfoSupport({
    metadata,
}: MetadataInfoSupportProps) {
    const { t, i18n } = useTranslation();

    return (
        <div className="d-flex flex-wrap justify-content-center">
            <span className="recommendation-title mb-2">
                {t("metadatainfo:apoieOAutor")}
            </span>
            <Break />
            <a
                target={"_blank"}
                className="d-flex justify-content-center"
                href={getLocalizedAmazonUrl(i18n.language, metadata)}
            >
                <button
                    className="dbutton btn btn-primary btn-rounded btn-lg mt-1 mb-1 me-1"
                    disabled={
                        metadata.downloadMirrors == undefined ||
                        metadata.downloadMirrors.libgenMirror == undefined
                    }
                >
                    AMAZON
                </button>
            </a>
            <Break />
            <a
                target={"_blank"}
                className="d-flex justify-content-center"
                href={getGoogleBooksUrl(metadata)}
            >
                <button
                    className="dbutton btn btn-primary btn-rounded btn-lg mt-1 mb-1 me-1"
                    disabled={
                        metadata.downloadMirrors == undefined ||
                        metadata.downloadMirrors.librocksMirror == undefined
                    }
                >
                    GOOGLE BOOKS
                </button>
            </a>
        </div>
    );
}
