import React, { SetStateAction, useContext, useEffect, useState } from "react";
import {
    AuthContextParams,
    Metadata,
    UserLibrary,
} from "../../general/helpers/generalTypes";
import { AuthContext } from "../../general/helpers/generalContext";
import axios, { AxiosRequestConfig } from "axios";
import { serverUrl } from "../../general/helpers/generalFunctions";
import { useNavigate } from "react-router-dom";

async function retrieveUserLibrary(
    authContext: AuthContextParams
): Promise<UserLibrary> {
    const config: AxiosRequestConfig = {
        method: "GET",
        url: `${serverUrl}/library`,
        headers: {
            Authorization: `Bearer ${authContext.jwtToken}`,
        },
    };

    const response = await axios(config);
    return response.data;
}

export default function useUserLibrary(): [
    UserLibrary | undefined,
    () => Promise<void>
] {
    const [userLibrary, setUserLibrary] = useState<UserLibrary | undefined>(
        undefined
    );
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const updateUserLibrary = async () => {
        if (authContext.userLogged) {
            try {
                const userLibrary = await retrieveUserLibrary(authContext);
                if (userLibrary != null) {
                    setUserLibrary(undefined);
                    setUserLibrary(userLibrary);
                }
            } catch (e) {
                // eslint-disable-next-line no-console
                console.error(e);
                if (e.request) {
                    if (e.request.status === 401) {
                        navigate("/user/login");
                    }
                }
            }
        } else {
            navigate("/user/login");
        }
    };

    useEffect(() => {
        let ignore = false;

        if (authContext.userLogged) {
            retrieveUserLibrary(authContext)
                .then((userLibrary) => {
                    console.log(userLibrary);
                    if (!ignore) {
                        setUserLibrary(userLibrary);
                    }
                })
                .catch((e) => {
                    // eslint-disable-next-line no-console
                    console.error(e);
                    navigate("/user/login");
                });
        } else {
            navigate("/user/login");
        }

        return () => {
            ignore = true;
        };
    }, [authContext]);

    return [userLibrary, updateUserLibrary];
}
