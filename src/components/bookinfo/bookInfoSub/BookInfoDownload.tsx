import Break from "../../general/Break";
import { DownloadLinks } from "../../general/helpers/generalTypes";

interface Props {
    downloadLinks?: DownloadLinks;
    error: boolean;
}

export default function BookInfoDownload({ downloadLinks, error }: Props) {
    console.log(downloadLinks);
    return (
        <div className="d-flex flex-wrap justify-content-center">
            {downloadLinks ? (
                <>
                    <span className="recommendation-title mb-2">Download</span>
                    <Break />
                    {Object.entries(downloadLinks!).map(
                        ([key, value], index) => {
                            return (
                                <>
                                    <a
                                        key={index}
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
                                                key == null ||
                                                value == null ||
                                                error
                                            }
                                        >
                                            {key
                                                ? key.toLowerCase() === "get"
                                                    ? "libgen"
                                                    : key
                                                : "erro"}
                                        </button>
                                    </a>
                                    <Break />
                                </>
                            );
                        }
                    )}

                    <Break />
                    <span className="text-muted mt-1 text-center w-75">
                        {!error
                            ? "O download pode demorar para iniciar."
                            : "Erro ao receber as informações de download."}
                    </span>
                </>
            ) : null}
        </div>
    );
}
