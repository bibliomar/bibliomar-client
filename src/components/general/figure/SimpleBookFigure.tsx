import { Book } from "../helpers/generalTypes";
import { MDBCheckbox, MDBRipple } from "mdb-react-ui-kit";
import React, { useContext, useEffect, useState } from "react";
import { EditMode, SelectedBooks } from "../../library/helpers/libraryContext";
import { useNavigate } from "react-router-dom";
import BookFigureCover from "../BookFigureCover";

interface SimpleBookFigureProps {
    book: Book;
    cover: string | undefined;
    coverDone: boolean;
    loadingClassName?: string;
    href: string;
}

// A reusable book figure which shows the book info on top of its cover.
export default function SimpleBookFigure({
    book,
    cover,
    loadingClassName,
    coverDone,
    href,
}: SimpleBookFigureProps) {
    const editModeContext = useContext(EditMode);
    const selectedBooksContext = useContext(SelectedBooks);
    const [onSelectedBooks, setOnSelectedBooks] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleCheckboxChange = () => {
        if (!onSelectedBooks) {
            setOnSelectedBooks(true);
            selectedBooksContext.setSelectedBooks((prevSelected) => {
                return [...prevSelected, book];
            });
        } else {
            setOnSelectedBooks(false);
            selectedBooksContext.setSelectedBooks((prevSelected) => {
                let newSelectedBooks = prevSelected;
                newSelectedBooks.forEach((selectedBook, index) => {
                    if (book.md5 === selectedBook.md5) {
                        newSelectedBooks.splice(index);
                    }
                });
                return newSelectedBooks;
            });
        }
    };

    useEffect(() => {
        let onList = false;
        selectedBooksContext.selectedBooks.forEach((selectedBook) => {
            if (selectedBook.md5 === book.md5) {
                onList = true;
                if (!onSelectedBooks) {
                    setOnSelectedBooks(true);
                }
            }
        });
        if (!onList && onSelectedBooks) {
            setOnSelectedBooks(false);
        }
    }, [selectedBooksContext]);

    return (
        <div className="position-relative w-100 h-100">
            <div className="simple-figure-bg text-light">
                <span
                    className="ms-2 text-nowrap simple-text fw-bolder"
                    style={{ fontSize: "1.15em" }}
                >
                    {book.title}
                </span>
                <br />
                <span
                    className="ms-2 text-nowrap simple-text"
                    style={{ fontSize: "0.9em" }}
                >
                    {book.author}
                </span>
            </div>
            <MDBRipple
                className={`bg-image hover-overlay shadow-1-strong rounded w-100 h-100`}
                rippleTag="div"
                rippleColor="light"
            >
                {editModeContext.editMode && (
                    <div className="library-checkbox-container">
                        <MDBCheckbox
                            checked={onSelectedBooks}
                            className="library-checkbox-input"
                            onChange={handleCheckboxChange}
                        />
                    </div>
                )}

                <BookFigureCover
                    book={book}
                    cover={cover}
                    coverDone={coverDone}
                    loadingClassName={loadingClassName}
                    href={href}
                    onClick={(evt) => {
                        evt.preventDefault();
                        if (editModeContext && editModeContext.editMode) {
                            handleCheckboxChange();
                        } else {
                            navigate(href);
                        }
                    }}
                />
            </MDBRipple>
        </div>
    );
}
