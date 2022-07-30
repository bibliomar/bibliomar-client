import { Book } from "./generalTypes";
import { NavigateFunction, useNavigate } from "react-router-dom";

export const navigateToBook = (book: Book, navigate: NavigateFunction) => {
    const bookStr = JSON.stringify(book);
    sessionStorage.setItem(`${book.md5}-info`, bookStr);
    navigate(`/book/${book.topic}/${book.md5}`, { replace: false });
};
