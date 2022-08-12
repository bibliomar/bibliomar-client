import Break from "../../general/Break";
import { DownloadLinks } from "../../general/helpers/generalTypes";

interface Props {
    downloadLinks?: DownloadLinks;
    error: boolean;
}

export default function BookInfoDownload({ downloadLinks, error }: Props) {
    return (
        <div className="d-flex flex-wrap justify-content-center">
            <span className="recommendation-title mb-2">Download</span>
            <Break />
            <a
                className="d-flex justify-content-center"
                href={downloadLinks ? downloadLinks!["Cloudflare"] : undefined}
            >
                <button
                    className={
                        !error
                            ? "dbutton btn btn-primary btn-rounded btn-lg mb-1 me-1"
                            : "dbutton btn btn-danger btn-rounded btn-lg mb-1 me-1"
                    }
                    disabled={!downloadLinks || error}
                >
                    Cloudflare
                </button>
            </a>

            <Break desktop />
            <a
                className="d-flex justify-content-center"
                href={downloadLinks ? downloadLinks!["IPFS.io"] : undefined}
            >
                <button
                    className={
                        !error
                            ? "dbutton btn btn-primary btn-rounded btn-lg mb-1 me-1"
                            : "dbutton btn btn-danger btn-rounded btn-lg mb-1 me-1"
                    }
                    disabled={!downloadLinks || error}
                >
                    IPFS.io
                </button>
            </a>

            <Break />
            <a
                className="d-flex justify-content-center"
                href={downloadLinks ? downloadLinks!["Pinata"] : undefined}
            >
                <button
                    className={
                        !error
                            ? "dbutton btn btn-primary btn-rounded btn-lg mb-1 me-1"
                            : "dbutton btn btn-danger btn-rounded btn-lg mb-1 me-1"
                    }
                    disabled={!downloadLinks || error}
                >
                    Pinata
                </button>
            </a>
            <Break desktop />
            <a
                className="d-flex justify-content-center"
                href={downloadLinks ? downloadLinks!["Infura"] : undefined}
            >
                <button
                    className={
                        !error
                            ? "dbutton btn btn-primary btn-rounded btn-lg mb-1 me-1"
                            : "dbutton btn btn-danger btn-rounded btn-lg mb-1 me-1"
                    }
                    disabled={!downloadLinks || error}
                >
                    Infura
                </button>
            </a>
            <Break desktop />
            <span className="text-muted mt-1 text-center w-75">
                {!error
                    ? "O download pode demorar para iniciar."
                    : "Erro ao receber as informações de download."}
            </span>
        </div>
    );
}
