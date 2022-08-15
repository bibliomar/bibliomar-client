import React, {
    MouseEventHandler,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import axios from "axios";
import { MDBRipple, MDBSpinner } from "mdb-react-ui-kit";
import { Portal } from "react-portal";
import { useNavigate } from "react-router-dom";
import LibraryBookModal from "./LibraryBookModalDeprecated";
import { Size, useWindowSize } from "../general/helpers/useWindowSize";
import LibraryBookIcon from "./LibraryBookIcon";
import { Book } from "../general/helpers/generalTypes";
import { getCover } from "../general/helpers/generalFunctions";
import FigureCoverSkeleton from "../general/FigureCoverSkeleton";

interface Props {
    book: Book;
    timeout: number;
    bookCategory: string;
    setProgress: React.Dispatch<React.SetStateAction<number>>;
}

export default function LibraryBookFigure(props: Props) {
    let book = props.book;
    const size: Size = useWindowSize();
    const [modalOn, setModalOn] = useState<boolean>(false);
    const [firstRender, setFirstRender] = useState<boolean>(false);

    const toggleShow = () => setModalOn(!modalOn);

    let navigate = useNavigate();
    const [cover, setCover] = useState<string>(
        "https://libgen.rocks/img/blank.png"
    );
    const [coverDone, setCoverDone] = useState<boolean>(false);

    useEffect(() => {
        let coverSetTimeout: number | undefined;
        getCover(book.md5, setCover, setCoverDone, props.timeout).then(
            (r) => (coverSetTimeout = r)
        );
        return () => {
            clearTimeout(coverSetTimeout);
        };
    }, []);

    return (
        <div className={"mb-3 pt-2 border-white border-top flex-grow-1"}>
            <div className="d-flex library-row">
                <div id="cover-div" className="me-2 library-figure-img">
                    <MDBRipple
                        className="bg-image hover-overlay shadow-1-strong w-100"
                        rippleTag="div"
                        rippleColor="light"
                    >
                        <img
                            src={cover}
                            alt="Capa do livro"
                            className="w-100"
                        />

                        <a href={`/book/${props.book.topic}/${props.book.md5}`}>
                            <FigureCoverSkeleton coverDone={coverDone} />
                        </a>
                    </MDBRipple>
                </div>
                <div id="info-div" className="">
                    <p className="">
                        <strong>Título: </strong> <br />
                        {props.book.title}
                    </p>
                    <p className="">
                        <strong>Autor(a)(s): </strong> <br />
                        {props.book.authors}
                    </p>
                    {props.book.extension === "epub" ? (
                        <span className="">
                            <strong>Leitura iniciada: </strong> <br />
                            {props.book.progress ? "Sim" : "Não"}
                        </span>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
