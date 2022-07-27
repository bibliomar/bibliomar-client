import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import BookCover from "./BookCover";
import { useEffect, useRef, useState } from "react";
import BookInfo from "./BookInfo";
import BookFooter from "./BookFooter";
import Navbar from "../../general/Navbar/Navbar";
import Break from "../../general/Break";
import { Book } from "../../../helpers/generalTypes";

export default function BookScreen() {
    let navigate = useNavigate();
    const [bookInfo, setBookInfo] = useState<Book | undefined>(undefined);
    const topic = useOutletContext() as string;
    const params = useParams();
    const md5 = params.md5;

    useEffect(() => {
        if (md5 == null) {
            navigate("/book/error");
        }
        const md5Match = md5!.match("^[0-9a-fA-F]{32}$");
        const bookInfoStr = sessionStorage.getItem(`${md5}-info`);
        if (md5Match == null || bookInfoStr == null) {
            navigate("/book/error");
        }
        setBookInfo(JSON.parse(bookInfoStr!));
    }, []);

    return (
        <div className="d-flex flex-wrap justify-content-center">
            {bookInfo != undefined && md5 != null ? (
                <>
                    <section className="ms-lg-5 w-75">
                        <div className="row">
                            <BookCover md5={md5} />
                            <BookInfo
                                md5={md5}
                                topic={topic}
                                bookInfo={bookInfo}
                            />
                        </div>
                    </section>
                    <BookFooter md5={md5} />
                </>
            ) : null}
        </div>
    );
}
