import {
    Book,
    LibraryCategories,
    ThemeOptions,
} from "../../../general/helpers/generalTypes";
import Break from "../../../general/Break";
import { useContext } from "react";
import { Theme } from "../../../general/helpers/generalContext";
import { MDBSpinner } from "mdb-react-ui-kit";
import BookInfoLibraryAddIcon from "./BookInfoLibraryAddIcon";

interface LibraryAddProps {
    book: Book;
    category: LibraryCategories;
    message: string;
    triedCategory: LibraryCategories | undefined;
    requestStatus: number;
    onclickHandler: (evt: any, category: LibraryCategories) => Promise<any>;
}

export default function BookInfoLibraryAdd({
    book,
    category,
    message,
    requestStatus,
    triedCategory,
    onclickHandler,
}: LibraryAddProps) {
    const theme = useContext(Theme).theme;
    return (
        <div
            className="d-flex flex-wrap justify-content-center"
            style={{ position: "relative" }}
        >
            <button
                style={{
                    // This removes the button default styling.
                    position: "inherit",
                    background: "none",
                    color: "inherit",
                    border: "none",
                    padding: "0",
                    font: "inherit",
                    outline: "inherit",
                }}
                className=""
                onClick={async (evt) => {
                    console.log(onclickHandler);
                    await onclickHandler(evt, category);
                }}
                disabled={requestStatus !== 0 || book.category === category}
            >
                {triedCategory ? (
                    triedCategory === category ? (
                        requestStatus === 200 ? (
                            <i className="fas fa-check fa-lg"></i>
                        ) : (
                            <MDBSpinner />
                        )
                    ) : (
                        <BookInfoLibraryAddIcon category={category} />
                    )
                ) : (
                    <BookInfoLibraryAddIcon category={category} />
                )}
            </button>
            <Break />

            <span>
                {book.category === category ? (
                    <strong>{message}</strong>
                ) : (
                    message
                )}
            </span>
        </div>
    );
}
