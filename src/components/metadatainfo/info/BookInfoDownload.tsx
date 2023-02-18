import Break from "../../general/Break";
import { DownloadLinks } from "../../general/helpers/generalTypes";
import { useTranslation } from "react-i18next";

interface Props {
    downloadLinks?: DownloadLinks;
    error: boolean;
}

export default function BookInfoDownload({ downloadLinks, error }: Props) {
    const { t } = useTranslation();
    // noinspection AllyJsxHardcodedStringInspection
    return (
        <div className="d-flex flex-wrap justify-content-center">
            {downloadLinks ? (
                <>
                    <span className="recommendation-title mb-2">Download</span>
                    <Break />
                    {Object.entries(downloadLinks!).map(
                        ([provider, value], index) => {
                            if (value == null) {
                                return null;
                            }
                            if (
                                provider === "libgen" ||
                                provider === "librocks"
                            ) {
                                return (
                                    <>
                                        <a
                                            key={provider}
                                            target={"_blank"}
                                            className="d-flex justify-content-center"
                                            href={value ? value : undefined}
                                        >
                                            <button
                                                className={
                                                    !error
                                                        ? "dbutton btn btn-primary btn-rounded btn-lg mt-1 mb-1 me-1"
                                                        : "dbutton btn btn-danger btn-rounded btn-lg mt-1 mb-1 me-1"
                                                }
                                                disabled={
                                                    provider == null || error
                                                }
                                            >
                                                {provider ? provider : "erro"}
                                            </button>
                                        </a>
                                        <Break key={index} />
                                    </>
                                );
                            } else {
                                return null;
                            }
                        }
                    )}

                    <Break />
                    {!error ? (
                        <span className="text-muted mt-1 text-center w-75">
                            {t("metadatainfo:downloadWaitInfo")}
                        </span>
                    ) : (
                        <span className="text-danger mt-1 text-center w-75">
                            {t("metadatainfo:downloadErrorInfo")}
                        </span>
                    )}
                </>
            ) : null}
        </div>
    );
}
