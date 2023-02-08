import Break from "../../general/Break";
import { useTranslation } from "react-i18next";

interface Props {
    downloadProgress: number;
    downloadStatus: number;
    downloadSize: number;
    userLoggedIn: boolean;
}

export default function ({
    downloadProgress,
    downloadStatus,
    downloadSize,
    userLoggedIn,
}: Props) {
    const { t } = useTranslation();
    const downloadProgressHandler = () => {
        if (downloadSize > 0) {
            // noinspection AllyJsxHardcodedStringInspection
            return (
                <>
                    <span>
                        {downloadProgress}Kb / {downloadSize}Kb
                    </span>
                    <Break />
                    <span>
                        {(downloadProgress / downloadSize) * 100}
                        {t("reader:downloadConcludedLabel")}
                    </span>
                </>
            );
        } else if (downloadSize === 0 && downloadProgress > 0) {
            // noinspection AllyJsxHardcodedStringInspection
            return (
                <span>
                    {downloadProgress}Kb{" "}
                    {t("reader:downloadProgressDownloaded")}.
                </span>
            );
        }
    };

    const renderBasedOnStatus = () => {
        if (downloadStatus === 0) {
            return <span>{t("reader:downloadStartingLabel")}</span>;
        }
        // Else...
        switch (downloadStatus) {
            case 103:
                return (
                    <>
                        <p>{t("reader:downloadStartingLabel2")}</p>
                    </>
                );
            case 200:
                return (
                    <>
                        <span>{t("reader:downloadDoneLabel1")}</span>
                        <Break />
                        <span>{t("reader:downloadDoneLabel2")}</span>
                    </>
                );
            case 201:
                return (
                    <div className="d-flex flex-wrap justify-content-center">
                        <span className="lead">
                            {t("reader:downloadingProgressLabel")}{" "}
                        </span>
                        <Break />
                        {downloadProgressHandler()}
                    </div>
                );
            case 401:
                return (
                    <div className="d-flex flex-wrap justify-content-center">
                        {!userLoggedIn ? (
                            <>
                                <span className="mb-2">
                                    {t("reader:downloadTimeoutText1")}
                                </span>
                                <Break />
                                <span>{t("reader:downloadTimeoutText2")}</span>
                                <Break />
                                <span>{t("reader:downloadTimeoutText3")}</span>
                                <Break />
                                <span>{t("reader:downloadTimeoutText4")}</span>
                            </>
                        ) : (
                            <>
                                <span>
                                    {t("reader:downloadUserTimeoutText")}
                                </span>
                            </>
                        )}
                    </div>
                );
            case 403:
                return <span>{t("reader:downloadFileNotEpub")}</span>;
            case 413:
                return (
                    <div className="d-flex flex-wrap justify-content-center">
                        <span className="mb-2">
                            {t("reader:downloadFilesizeExceededText1")}
                        </span>
                        <Break />
                        <span>{t("reader:downloadFilesizeExceededText2")}</span>
                    </div>
                );
            case 500:
                return <span>{t("reader:downloadErrorRetryMessage")}</span>;
        }
    };

    return <div className="mt-4 text-center">{renderBasedOnStatus()}</div>;
}
