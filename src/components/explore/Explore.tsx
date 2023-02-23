import { MDBContainer } from "mdb-react-ui-kit";
import Navbar from "../general/navbar/Navbar";
import React, { useState } from "react";
import Footer from "../general/Footer";
import "./explore.scss";
import ExploreTabs from "./ExploreTabs";
import ExploreContent from "./content/ExploreContent";
import { Portal } from "react-portal";

export default function Explore() {
    const [activeTab, setActiveTab] = useState<number>(1);

    const handleTabClick = (value: number) => {
        if (value === activeTab) {
            return;
        }
        setActiveTab(value);
    };

    return (
        <div className="like-body bg-alt">
            <MDBContainer fluid className="d-flex flex-column min-vh-100 p-1">
                <div className="w-100">
                    <Navbar activeItem="explore" />
                </div>
                <div className="d-flex flex-column flex-grow-1 align-items-center w-100 h-100 mt-3 mb-3">
                    <div className="d-flex explore-container mb-0">
                        <ExploreTabs
                            activeTab={activeTab}
                            handleTabClick={handleTabClick}
                        />
                    </div>
                    <div className="d-flex flex-column flex-grow-1 explore-container basic-container p-2">
                        <ExploreContent
                            activeTab={activeTab}
                            handleTabClick={handleTabClick}
                        />
                    </div>
                    <div id="explore-pagination-portal"></div>
                </div>
                <Footer />
            </MDBContainer>
        </div>
    );
}
