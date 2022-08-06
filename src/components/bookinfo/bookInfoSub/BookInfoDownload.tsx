import Break from "../../general/Break";
import { DownloadLinks } from "../../general/helpers/generalTypes";

interface Props {
    downloadLinks?: DownloadLinks;
    error: boolean;
}

export default function BookInfoDownload({ downloadLinks, error }: Props) {
    return (
        <div className="d-flex flex-wrap justify-content-center">
            <span className="recommendation-title">Download</span>
            <Break desktop />
            <button
                className={
                    !error
                        ? "dbutton btn btn-primary btn-rounded mb-1 me-1"
                        : "dbutton btn btn-danger btn-rounded mb-1 me-1"
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
                        ? "dbutton btn btn-primary btn-rounded mb-1 me-1"
                        : "dbutton btn btn-danger btn-rounded mb-1 me-1"
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
            <Break desktop />
            <button
                className={
                    !error
                        ? "dbutton btn btn-primary btn-rounded mb-1 me-1"
                        : "dbutton btn btn-danger btn-rounded mb-1 me-1"
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
                        ? "dbutton btn btn-primary btn-rounded mb-1 me-1"
                        : "dbutton btn btn-danger btn-rounded mb-1 me-1"
                }
                disabled={!downloadLinks || error}
            >
                <a
                    style={{ color: "#FFFFFF" }}
                    className=""
                    href={downloadLinks ? downloadLinks!["Infura"] : undefined}
                >
                    Infura
                </a>
            </button>
            <Break desktop />
        </div>
    );
}
