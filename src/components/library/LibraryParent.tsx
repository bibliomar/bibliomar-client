import Navbar from "../general/navbar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect, useMemo, useState } from "react";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { MDBProgress, MDBProgressBar } from "mdb-react-ui-kit";
import BlankLoadingSpinner from "../general/BlankLoadingSpinner";
import { getUserInfo } from "../general/helpers/generalFunctions";
import { Filters, EditMode, SelectedBooks } from "./helpers/libraryContext";
import {
    EditModeContext,
    FiltersContext,
    PossibleFilters,
    SelectedBooksContext,
} from "./helpers/libraryTypes";
import { bookFiltering, defaultFilters } from "./helpers/libraryFunctions";
import { Book, UserLibrary } from "../general/helpers/generalTypes";
import { Auth } from "../general/helpers/generalContext";

export default function LibraryParent() {
    const authContext = useContext(Auth);
    const [filters, setFilters] = useState<PossibleFilters>(defaultFilters);
    const filtersContext: FiltersContext = {
        filters: filters,
        setFilters: setFilters,
    };

    const [selectedBooks, setSelectedBooks] = useState<Book[]>([]);
    const selectedBooksContext: SelectedBooksContext = {
        selectedBooks: selectedBooks,
        setSelectedBooks: setSelectedBooks,
    };

    const [editMode, setEditMode] = useState<boolean>(false);
    const editModeContext: EditModeContext = {
        editMode: editMode,
        setEditMode: setEditMode,
    };

    const [userInfo, setUserInfo] = useState<UserLibrary | undefined>(
        undefined
    );
    const [progress, setProgress] = useState<number>(0);
    const navigate = useNavigate();
    let token: string | undefined = undefined;
    if (authContext.userLogged) {
        token = localStorage.getItem("jwt-token") as string;
    }
    let decoded_token: JwtPayload | undefined = undefined;
    if (token) {
        decoded_token = jwt_decode(token) as JwtPayload;
    }

    let username = undefined;
    if (decoded_token) {
        username = decoded_token.sub;
    }

    useEffect(() => {
        if (!authContext.userLogged) {
            navigate("/user/login");
        }
    }, [authContext.userLogged]);

    useEffect(() => {
        if (token && decoded_token) {
            sessionStorage.removeItem(`${decoded_token.sub}-user`);
        }
    }, []);

    useEffect(() => {
        let cachedUserInfo: string | null = null;
        if (token && decoded_token) {
            cachedUserInfo = sessionStorage.getItem(
                `${decoded_token.sub}-user`
            );
            if (cachedUserInfo) {
                setUserInfo(JSON.parse(cachedUserInfo));
            }
        }
        if (token && decoded_token && cachedUserInfo == null) {
            setUserInfo(undefined);
            setProgress(60);
            getUserInfo(token, navigate).then((r) => {
                if (r) {
                    sessionStorage.setItem(
                        `${decoded_token!.sub}-user`,
                        JSON.stringify(r)
                    );
                    setProgress(0);
                    setUserInfo(r);
                } else {
                    navigate("/error");
                }
            });
        }
    }, []);

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
                        <Navbar activeItem="library" badgeText="library" />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {userInfo != null ? (
                            <EditMode.Provider value={editModeContext}>
                                <SelectedBooks.Provider
                                    value={selectedBooksContext}
                                >
                                    <Filters.Provider value={filtersContext}>
                                        <Outlet
                                            context={{
                                                userInfo: userInfo,
                                                username: username,
                                            }}
                                        />
                                    </Filters.Provider>
                                </SelectedBooks.Provider>
                            </EditMode.Provider>
                        ) : (
                            <BlankLoadingSpinner />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
