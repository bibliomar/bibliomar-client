import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Break from "../../general/Break";
import BookDownload from "./BookDownload";
import BookInfoError from "./BookInfoError";
import BookLibraryActions from "./BookLibraryActions/BookLibraryActions";
import BookLoginNeeded from "./BookLibraryActions/BookLoginNeeded";
import { MDBBtn } from "mdb-react-ui-kit";
import { Book, downloadLinks } from "../../../helpers/generalTypes";
import {
    PossibleReaderLandingStates,
    PossibleReaderScreenStates,
} from "../../reader/helpers/readerTypes";

interface Props {
    md5: string;
    topic: string;
    bookInfo: Book;
}

export async function getMetadata(md5: string, topic: string) {
    let reqUrl = `https://biblioterra.herokuapp.com/v1/metadata/${topic}/${md5}`;
    try {
        let req = await axios.get(reqUrl);
        return req.data;
    } catch (e) {
        console.error(e);
        return null;
    }
}

// Here we use MDBootstrap col- classes to make the bookInfo stay in the right half of the screen.
export default function BookInfo(props: Props) {
    const bookInfo = props.bookInfo;
    const navigate = useNavigate();
    const [description, setDescription] = useState<string>("Carregando");
    const [downloadLinks, setDownloadLinks] = useState<
        downloadLinks | undefined
    >(undefined);
    const [bookError, setBookError] = useState<boolean>(false);
    const [userLogged, setUserLogged] = useState<boolean>(false);

    let fallbackLink: string | undefined = undefined;
    if (bookInfo.mirror1) {
        fallbackLink = bookInfo["mirror1"];
    }
    useEffect(() => {
        // This is because of useEffect double mounting.
        let ignore = false;
        getMetadata(props.md5, props.topic).then((r) => {
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

        const jwtToken = localStorage.getItem("jwt-token");
        if (jwtToken) {
            setUserLogged(true);
        }
        return () => {
            ignore = true;
        };
    }, []);

    return (
        <div className="col-lg-6 col mt-5 mt-lg-0 d-flex flex-row flex-wrap align-content-start text-light lead">
            <Break />
            <div className="lead bg-black p-2 rounded-7 bg-opacity-75 text-light text-center mb-2 book-item">
                <span className="fw-bold">Adicionar a minha biblioteca: </span>
                {userLogged ? (
                    <BookLibraryActions bookInfo={bookInfo} />
                ) : (
                    <BookLoginNeeded topic={props.topic} md5={props.md5} />
                )}
            </div>
            <div className="lead bg-black p-2 rounded-7 bg-opacity-75 text-light text-center mb-2 book-item">
                <span className="fw-bold">Título: </span>
                <p>{bookInfo.title}</p>
            </div>
            <Break />
            <div className="lead bg-black p-2 rounded-7 bg-opacity-75 text-light text-center mb-2 book-item">
                <span className="fw-bold">Autor(a): </span>
                <p>{bookInfo["authors"]}</p>
            </div>
            <Break />
            <div className="lead bg-black p-2 rounded-7 bg-opacity-75 text-light text-center mb-2 book-item">
                <span className="fw-bold">Descrição: </span>
                <p>{description}</p>
            </div>
            <Break />
            <div className="lead bg-black p-2 rounded-7 bg-opacity-75 text-light text-center mb-2 book-item">
                <span className="fw-bold">Linguagem: </span>
                <p>
                    {bookInfo["language"] === "Portuguese"
                        ? "Português"
                        : bookInfo["language"]}
                </p>
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
                                    category: undefined,
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
                    <span className="text-muted" style={{ fontSize: "0.9rem" }}>
                        Apenas arquivos EPUB são suportados.
                    </span>
                ) : null}
            </div>
            <Break />
            <div className="bg-black ps-3 py-2 bg-opacity-75 rounded-5 mb-2">
                {!bookError ? (
                    downloadLinks != undefined ? (
                        <BookDownload downloadLinks={downloadLinks} />
                    ) : (
                        <>
                            <div className="text-center mb-2 text-light">
                                <span className="lead fw-bold">
                                    Download desse arquivo:
                                </span>
                                <Break />
                            </div>
                            <div className="d-flex flex-row flex-wrap justify-content-center text-light">
                                <span>Carregando...</span>
                            </div>
                        </>
                    )
                ) : (
                    <BookInfoError mirror={fallbackLink} />
                )}
            </div>

            <Break />
        </div>
    );
}
