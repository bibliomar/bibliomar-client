import Navbar from "../general/navbar/Navbar";
import Break from "../general/Break";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Footer from "../general/Footer";

export default function MetadataInfoParent() {
    return (
        <div className="container-fluid d-flex flex-column min-vh-100">
            <div className="row mb-5">
                <div className="col mt-3">
                    <Navbar badgeText="BOOKS" />
                </div>
            </div>
            <Break />
            <div className="d-flex justify-content-center">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
