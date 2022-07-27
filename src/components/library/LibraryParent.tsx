import Navbar from "../general/Navbar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { MDBProgress, MDBProgressBar } from "mdb-react-ui-kit";
import BlankLoadingSpinner from "../general/BlankLoadingSpinner";

export default function LibraryParent() {
    const [userInfo, setUserInfo] = useState<any>(undefined);
    const [progress, setProgress] = useState<number>(0);
    const navigate = useNavigate();
    const token = localStorage.getItem("jwt-token") as string;
    let decoded_token = jwt_decode(token) as JwtPayload;
    let username = undefined;
    if (decoded_token) {
        username = decoded_token.sub;
    }

    const getUserInfo = async () => {
        const config = {
            url: "https://biblioterra.herokuapp.com/v1/library/get",
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            setProgress(33);
            let req = await axios.request(config);
            setProgress(100);
            let data = req.data;
            return {
                reading: data["reading"].reverse(),
                "to-read": data["to-read"].reverse(),
                backlog: data["backlog"].reverse(),
            };
        } catch (e: any) {
            if (e.request) {
                if (e.request.status === 401) {
                    localStorage.removeItem("jwt-token");
                    navigate("/user/login");
                }
            }
            navigate("/book/error");
        }
    };

    useEffect(() => {
        let decoded_token = jwt_decode(token) as JwtPayload;
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
            getUserInfo().then((r) => {
                sessionStorage.setItem(
                    `${decoded_token.sub}-user`,
                    JSON.stringify(r)
                );
                setProgress(0);
                setUserInfo(r);
            });
        }
    }, [progress]);

    return (
        <div className="like-body bg-alt">
            <div className="container text-white">
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
                        <Navbar activeItem="library" />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {userInfo != null ? (
                            <Outlet
                                context={{
                                    userInfo: userInfo,
                                    setProgress: setProgress,
                                    username: username,
                                }}
                            />
                        ) : (
                            <BlankLoadingSpinner />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
