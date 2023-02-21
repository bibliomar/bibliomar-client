import Navbar from "../general/navbar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { MDBProgress, MDBProgressBar } from "mdb-react-ui-kit";
import BlankLoadingSpinner from "../general/BlankLoadingSpinner";
import { getUserInfo } from "../general/helpers/generalFunctions";
import { Filters, EditModeContext } from "./helpers/libraryContext";
import {
    EditModeContextParams,
    FiltersContextParams,
    PossibleFilters,
    UserLibraryContextParams,
} from "./helpers/libraryTypes";
import {
    bookFiltering,
    defaultFilters,
    UserLibraryContext,
} from "./helpers/libraryFunctions";
import { Metadata, UserLibrary } from "../general/helpers/generalTypes";
import { AuthContext } from "../general/helpers/generalContext";
import useUserLibrary from "./helpers/useUserLibrary";
import "./library.css";
import { ToastContainer } from "react-toastify";

export default function LibraryScreen() {
    const authContext = useContext(AuthContext);
    const [filters, setFilters] = useState<PossibleFilters>(defaultFilters);
    const filtersContext: FiltersContextParams = {
        filters: filters,
        setFilters: setFilters,
    };
    // Edit mode related states
    // A ref is preffered to avoid cover flickering when selecting a metadataList.
    const selectedBooksRef = useRef<Metadata[]>([]);
    const [editMode, setEditMode] = useState<boolean>(false);
    const editModeContext: EditModeContextParams = {
        editMode: editMode,
        setEditMode: setEditMode,
        selectedBooksRef: selectedBooksRef,
    };

    const [userLibrary, updateUserLibrary] = useUserLibrary();

    const userLibraryContext: UserLibraryContextParams = {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        userLibrary: userLibrary!,
        updateUserLibrary: updateUserLibrary,
    };

    const [progress, setProgress] = useState<number>(0);
    const navigate = useNavigate();

    return (
        <div className="like-body bg-alt">
            <div className="container-fluid">
                <div className="">
                    <MDBProgress height={progress === 0 ? "0" : "2"}>
                        <MDBProgressBar
                            style={{ zIndex: "10000" }}
                            width={progress}
                            valuemin={0}
                            valuemax={100}
                        />
                    </MDBProgress>
                </div>
                <div className="row">
                    <div className="col">
                        <Navbar activeItem="library" badgeText="LIBRARY" />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {userLibrary != null ? (
                            <UserLibraryContext.Provider
                                value={userLibraryContext}
                            >
                                <EditModeContext.Provider
                                    value={editModeContext}
                                >
                                    <Filters.Provider value={filtersContext}>
                                        <Outlet />
                                        <ToastContainer
                                            closeOnClick={true}
                                            limit={5}
                                            draggable
                                            draggablePercent={50}
                                        />
                                    </Filters.Provider>
                                </EditModeContext.Provider>
                            </UserLibraryContext.Provider>
                        ) : (
                            <BlankLoadingSpinner />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
