import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Book } from "../general/helpers/generalTypes";
import { MDBContainer } from "mdb-react-ui-kit";
import BookInfoDesktop from "./BookInfoDesktop";
import axios from "axios";
import { DownloadLinks } from "../general/helpers/generalTypes";
import BookFooter from "./bookInfoSub/BookFooter";

export interface BookInfoSubProps {
    book: Book;
    description: string;
    downloadLinks: DownloadLinks | undefined;
    error: boolean;
    userLogged: boolean;
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

export default function BookInfoScreen() {
    let navigate = useNavigate();
    const [bookInfo, setBookInfo] = useState<Book | undefined>(undefined);
    // This is done because when a book is sent to the database via BookLibraryActions, its category property may change.
    const bookInfoRef = useRef<Book | undefined>(bookInfo);
    const [description, setDescription] = useState<string>("Carregando");
    const [downloadLinks, setDownloadLinks] = useState<
        DownloadLinks | undefined
    >(undefined);
    const [bookError, setBookError] = useState<boolean>(false);
    const [userLogged, setUserLogged] = useState<boolean>(
        !!localStorage.getItem("jwt-token")
    );

    const params = useParams();
    const md5 = params.md5;

    useEffect(() => {
        let ignore = false;
        if (md5 == null) {
            navigate("/book/error");
            return;
        }
        const md5Match = md5.match("^[0-9a-fA-F]{32}$");
        const bookInfoStr = sessionStorage.getItem(`${md5}-info`);
        if (md5Match == null || bookInfoStr == null) {
            navigate("/book/error");
            return;
        }
        const bookInfoParsed: Book = JSON.parse(bookInfoStr);
        setBookInfo(JSON.parse(bookInfoStr));

        getMetadata(md5, bookInfoParsed.topic).then((r) => {
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

    useEffect(() => {
        // This is because of useEffect double mounting.
        let ignore = false;

        const jwtToken = localStorage.getItem("jwt-token");
        if (jwtToken) {
            setUserLogged(true);
        }
        return () => {
            ignore = true;
        };
    }, []);

    useEffect(() => {}, []);
    return (
        <div className="d-flex flex-column align-items-center">
            <div className="book-info-container">
                {bookInfo ? (
                    <BookInfoDesktop
                        book={bookInfo}
                        description={description}
                        downloadLinks={downloadLinks}
                        error={bookError}
                        userLogged={userLogged}
                    />
                ) : null}
            </div>
            {bookInfo ? <BookFooter md5={bookInfo.md5} /> : null}
        </div>
    );
}
