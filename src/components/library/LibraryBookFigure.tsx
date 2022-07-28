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
import LibraryBookModal from "./LibraryBookModal";
import { Size, useWindowSize } from "../general/useWindowSize";
import LibraryBookIcon from "./LibraryBookIcon";
import { EditModeContext, SelectedBooksContext } from "./utils/RelevantContext";
import { Book } from "../../helpers/generalTypes";

interface Props {
    book: Book;
    timeout: number;
    bookCategory: string;
    setProgress: React.Dispatch<React.SetStateAction<number>>;
}

async function getCover(md5: string) {
    let reqUrl = `https://biblioterra.herokuapp.com/v1/cover/${md5}`;
    let request;
    try {
        request = await axios.get(reqUrl);
    } catch (e: any) {
        // 500 errors means Biblioterra couldn't find a cover.
        return null;
    }
    if (request?.data) {
        sessionStorage.setItem(`${md5}-cover`, request?.data);
        return request?.data;
    }
    return null;
}

export default function LibraryBookFigure(props: Props) {
    const selectedBooksContext = useContext(SelectedBooksContext);
    const editMode = useContext(EditModeContext);
    const size: Size = useWindowSize();
    const [checkboxToggle, setCheckboxToggle] = useState<boolean>(false);
    const [modalOn, setModalOn] = useState<boolean>(false);
    const [firstRender, setFirstRender] = useState<boolean>(false);

    const toggleShow = () => setModalOn(!modalOn);

    let navigate = useNavigate();
    const [cover, setCover] = useState<string>(
        "https://libgen.rocks/img/blank.png"
    );
    const [coverDone, setCoverDone] = useState<boolean>(false);

    useEffect(() => {
        let coverSetTimeout: number;
        let cachedCover = sessionStorage.getItem(
            `${props.book.md5}-cover`
        ) as string;
        if (cachedCover) {
            const lowerCachedCover = cachedCover.toLowerCase();
            const lowerMD5 = props.book.md5.toLowerCase();
            if (lowerCachedCover.includes(lowerMD5)) {
                setCoverDone(true);
                setCover(cachedCover);
            }
        }

        coverSetTimeout = setTimeout(() => {
            getCover(props.book.md5).then((r) => {
                if (r == null) {
                    setCoverDone(true);
                    return;
                }
                setCoverDone(true);
                setCover(r);
            });
        }, props.timeout);
        return () => {
            clearTimeout(coverSetTimeout);
        };
    }, []);

    return (
        <div className={"mb-3 pt-2 border-white border-top flex-grow-1"}>
            <div className="d-flex library-row">
                {firstRender ? (
                    <Portal node={document.getElementById("modal-root")}>
                        <LibraryBookModal
                            coverUrl={cover}
                            bookInfo={props.book}
                            bookCategory={props.bookCategory}
                            showProp={modalOn}
                            setShowProp={setModalOn}
                            setProgress={props.setProgress}
                            size={size}
                        />
                    </Portal>
                ) : null}

                <div id="cover-div" className="me-2 library-figure-img">
                    {coverDone ? (
                        <LibraryBookIcon checked={checkboxToggle} />
                    ) : !editMode ? (
                        <MDBSpinner
                            style={{
                                width: "1rem",
                                height: "1rem",
                                marginTop: "1vh",
                                marginLeft: "1vh",
                                zIndex: "5",
                            }}
                            color="dark"
                            className="position-absolute ms-1 mt-1"
                        />
                    ) : null}

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

                        <a
                            href={`/book/${props.book.topic}/${props.book.md5}`}
                            onClick={(evt) => {
                                evt.preventDefault();
                                if (!editMode) {
                                    setFirstRender(true);
                                    toggleShow();
                                    return;
                                }
                                const bookOnArray =
                                    selectedBooksContext.selectedBooks.indexOf(
                                        props.book
                                    );

                                if (bookOnArray !== -1) {
                                    console.log("runs");
                                    let arrayCopy =
                                        selectedBooksContext.selectedBooks;
                                    arrayCopy.splice(bookOnArray);
                                    selectedBooksContext.setFunction([
                                        ...arrayCopy,
                                    ]);
                                    setCheckboxToggle(false);
                                    return;
                                }

                                selectedBooksContext.setFunction([
                                    ...selectedBooksContext.selectedBooks,
                                    props.book,
                                ]);
                                setCheckboxToggle(true);
                                return;
                            }}
                        >
                            <div
                                className="mask"
                                style={{
                                    backgroundColor: "rgba(251, 251, 251, 0.2)",
                                }}
                            />
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
