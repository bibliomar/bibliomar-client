import { Book, LibraryCategories } from "../../general/helpers/generalTypes";
import axios from "axios";

interface ParametersModel {
    [key: string]: string | number;
}

export async function addBookToLibrary(
    bookToAdd: Book,
    jwtToken: string,
    category: LibraryCategories
) {
    if (!Object.hasOwn(bookToAdd, "category")) {
        bookToAdd.category = category;
    }

    const req_body = [bookToAdd];
    const config = {
        url: `https://biblioterra.herokuapp.com/v1/library/add/${category}`,
        method: "POST",
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
        data: req_body,
    };
    const req = await axios.request(config);
    console.log(req);
}
