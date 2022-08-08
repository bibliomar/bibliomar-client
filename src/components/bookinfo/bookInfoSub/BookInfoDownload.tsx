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
            <button
                className={
                    !error
                        ? "dbutton btn btn-primary btn-rounded btn-lg mb-1 me-1"
                        : "dbutton btn btn-danger btn-rounded btn-lg mb-1 me-1"
                }
                disabled={!downloadLinks || error}
            >
                <a
                    className=""
                    href={
                        downloadLinks ? downloadLinks!["Cloudflare"] : undefined
                    }
                    style={{ color: "#FFFFFF" }}
                >
                    Cloudflare
                </a>
            </button>
            <Break desktop />

            <button
                className={
                    !error
                        ? "dbutton btn btn-primary btn-rounded btn-lg mb-1 me-1"
                        : "dbutton btn btn-danger btn-rounded btn-lg mb-1 me-1"
                }
                disabled={!downloadLinks || error}
            >
                <a
                    style={{ color: "#FFFFFF" }}
                    className=""
                    href={downloadLinks ? downloadLinks!["IPFS.io"] : undefined}
                >
                    IPFS.io
                </a>
            </button>
            <Break />
            <button
                className={
                    !error
                        ? "dbutton btn btn-primary btn-rounded btn-lg mb-1 me-1"
                        : "dbutton btn btn-danger btn-rounded btn-lg mb-1 me-1"
                }
                disabled={!downloadLinks || error}
            >
                <a
                    style={{ color: "#FFFFFF" }}
                    className=""
                    href={downloadLinks ? downloadLinks!["Pinata"] : undefined}
                >
                    Pinata
                </a>
            </button>
            <Break desktop />
            <button
                className={
                    !error
                        ? "dbutton btn btn-primary btn-rounded btn-lg mb-1 me-1"
                        : "dbutton btn btn-danger btn-rounded btn-lg mb-1 me-1"
                }
                disabled={!downloadLinks || error}
            >
                <a
                    style={{ color: "#FFFFFF" }}
                    className="w-100"
                    href={downloadLinks ? downloadLinks!["Infura"] : undefined}
                >
                    Infura
                </a>
            </button>
            <Break desktop />
            <span className="text-muted mt-1 text-center w-75">
                O download pode demorar para iniciar.
            </span>
        </div>
    );
}
