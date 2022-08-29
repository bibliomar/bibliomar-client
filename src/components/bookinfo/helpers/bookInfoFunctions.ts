import { Book, LibraryCategories } from "../../general/helpers/generalTypes";
import axios from "axios";
import { backendUrl } from "../../general/helpers/generalFunctions";

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
        url: `${backendUrl}/v1/library/add/${category}`,
        method: "POST",
        headers: {
            Authorization: `Bearer ${jwtToken}`,
        },
        data: req_body,
    };
    const req = await axios.request(config);
    console.log(req);
}
