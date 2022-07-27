import Bibliologo from "../general/Bibliologo";
import { Outlet } from "react-router-dom";
import Message from "../general/Message";
import Navbar from "../general/Navbar/Navbar";
import Break from "../general/Break";

export default function BooksParent() {
    return (
        <div className="like-body bg-alt">
            <div className="container text-light bg-alt">
                <div className="row mb-5">
                    <div className="col mt-3">
                        <Navbar />
                    </div>
                </div>
                <Break />
                <div className="">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
