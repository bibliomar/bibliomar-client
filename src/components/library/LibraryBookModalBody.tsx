import React, { useEffect, useState } from "react";
import Break from "../general/Break";
import { getMetadata } from "../book/BookScreen/BookInfo";
import BookDownload from "../book/BookScreen/BookDownload";
import BookInfoError from "../book/BookScreen/BookInfoError";
import { Size, useWindowSize } from "../general/useWindowSize";
import { Book } from "../../helpers/generalTypes";
import { MDBBtn } from "mdb-react-ui-kit";
import { PossibleReaderLandingStates } from "../reader/helpers/readerTypes";
import { useNavigate } from "react-router-dom";

interface Props {
    coverUrl: string;
    bookInfo: Book;
    bookCategory: string;
    formikInstance: any;
}

export default function (props: Props) {
    const bookInfo = props.bookInfo;
    const formik = props.formikInstance;
    const navigate = useNavigate();
    const size: Size = useWindowSize();
    const [description, setDescription] = useState<string>("Carregando");
    const [downloadLinks, setDownloadLinks] = useState<any>({});
    const [bookError, setBookError] = useState<boolean>(false);

    useEffect(() => {
        // This is because of useEffect double mounting.
        let ignore = false;
        getMetadata(props.bookInfo.md5, props.bookInfo.topic).then((r) => {
            if (!ignore) {
                if (r == null || r["download_links"] == null) {
                    setBookError(true);
                    return;
                }
                if (r["description"] == null) {
                    setDescription("Sem descrição.");
                } else {
                    setDescription(r["description"]);
                }
                setDownloadLinks(r["download_links"]);
                return;
            }
        });

        return () => {
            ignore = true;
        };
    }, []);

    return (
        <div className="container-fluid">
            <div className="row d-flex flex-wrap justify-content-center">
                <div className="col-lg-5 col">
                    <img
                        className="w-100"
                        src={props.coverUrl}
                        alt="Capa do livro"
                    />
                </div>
                {size.width < 600 ? <Break /> : null}

                <div className="col-lg-6 col mt-3 mt-lg-0">
                    <div className="lead bg-black p-2 rounded-7 bg-opacity-75 text-light text-center mb-2 book-item d-flex justify-content-center flex-wrap">
                        <span className="fw-bold">Categoria: </span>
                        <Break />
                        <select
                            className="form-select form-control w-75 mb-3 mt-1"
                            id="select"
                            name="select"
                            value={formik.values.select}
                            onChange={formik.handleChange}
                        >
                            <option value="reading">Lendo</option>
                            <option value="to-read">Planejando ler</option>
                            <option value="backlog">Backlog</option>
                        </select>
                        <Break />
                        {!bookInfo.progress ? (
                            <>
                                <span
                                    className="text-muted"
                                    style={{ fontSize: "0.95rem" }}
                                >
                                    Esse livro teve sua leitura iniciada, que
                                    tal mover para a categoria Lendo?
                                </span>
                                <Break />
                                <MDBBtn
                                    size="sm"
                                    type="button"
                                    onClick={async (evt) => {
                                        evt.preventDefault();
                                        formik.values.select = "reading";
                                        await formik.submitForm();
                                    }}
                                >
                                    Mover
                                </MDBBtn>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                    <Break />
                    <div className="lead bg-black p-2 rounded-7 bg-opacity-75 text-light text-center mb-2 book-item">
                        <span className="fw-bold">Descrição: </span>
                        <p>{description}</p>
                    </div>
                    <Break />
                    <div className="lead bg-black p-2 rounded-7 bg-opacity-75 text-light text-center mb-2 book-item">
                        <span className="fw-bold">Arquivo: </span>
                        <p>
                            {bookInfo.extension
                                ? bookInfo.extension.toUpperCase()
                                : null}
                            , {bookInfo["size"]}
                        </p>
                    </div>
                    <Break />
                    <div className="lead bg-black p-2 rounded-7 bg-opacity-75 text-light text-center mb-4 book-item">
                        <span className="fw-bold">Ler online: </span>
                        <br />
                        <MDBBtn
                            className="mb-3"
                            type="button"
                            onClick={() => {
                                if (downloadLinks) {
                                    // State to be used by ReaderLanding on /reader
                                    let readerLandingState: PossibleReaderLandingStates =
                                        {
                                            bookInfo: bookInfo,
                                            url: downloadLinks["IPFS.io"],
                                            secondaryUrl: downloadLinks.Pinata,
                                        };

                                    navigate("/reader", {
                                        state: readerLandingState,
                                    });
                                }
                            }}
                            disabled={
                                bookInfo.extension !== "epub" ||
                                downloadLinks == undefined
                            }
                        >
                            Abrir no navegador
                        </MDBBtn>
                        <br />
                        {bookInfo.extension !== "epub" ? (
                            <span
                                className="text-muted"
                                style={{ fontSize: "0.9rem" }}
                            >
                                Apenas arquivos EPUB são suportados.
                            </span>
                        ) : null}
                    </div>
                    <Break />
                    <div className="bg-black ps-3 py-2 bg-opacity-75 rounded-5 mb-2">
                        {!bookError ? (
                            Object.entries(downloadLinks).length > 0 ? (
                                <BookDownload downloadLinks={downloadLinks} />
                            ) : (
                                <div className="text-light">
                                    <div className="text-center mb-2">
                                        <span className="lead fw-bold">
                                            Download desse arquivo:
                                        </span>
                                        <Break />
                                    </div>
                                    <span className="lead d-flex justify-content-center">
                                        Carregando...
                                    </span>
                                </div>
                            )
                        ) : (
                            <BookInfoError />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
