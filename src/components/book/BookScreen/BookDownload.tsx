import Break from "../../general/Break";

// @ts-ignore
export default function BookDownload({ downloadLinks }) {
    return (
        <>
            <div className="text-center mb-2 text-light">
                <span className="lead fw-bold">Download desse arquivo:</span>
                <Break />
            </div>

            <div className="d-flex flex-row flex-wrap justify-content-center">
                <a
                    className="dbutton btn btn-secondary btn-rounded mb-1 me-1"
                    href={downloadLinks["Cloudflare"]}
                >
                    Cloudflare
                </a>
                <a
                    className="dbutton btn btn-secondary btn-rounded mb-1 me-1"
                    href={downloadLinks["IPFS.io"]}
                >
                    IPFS.io
                </a>
                <div className="break"></div>
                <a
                    className="dbutton btn btn-secondary btn-rounded mb-1 me-1"
                    href={downloadLinks["Infura"]}
                >
                    Infura
                </a>
                <a
                    className="dbutton btn btn-secondary btn-rounded mb-1 me-1"
                    href={downloadLinks["Pinata"]}
                >
                    Pinata
                </a>
                <Break />
                <span
                    className="text-muted text-center mt-1"
                    style={{ fontSize: "1rem" }}
                >
                    O download pode demorar para iniciar.
                </span>
            </div>
        </>
    );
}
