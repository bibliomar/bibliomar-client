import Navbar from "../general/navbar/Navbar";
import Break from "../general/Break";
import { Outlet } from "react-router-dom";

export default function BookInfoParent() {
    return (
        <div className="like-body bg-alt">
            <div className="container-fluid">
                <div className="row mb-5">
                    <div className="col mt-3">
                        <Navbar badgeText="books" />
                    </div>
                </div>
                <Break />
                <div className="d-flex justify-content-center">
                    <div className="book-info-container">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}
