import {
    AuthContextParams,
    Metadata,
    LibraryCategories,
    ThemeOptions,
} from "../../../general/helpers/generalTypes";
import React, { SetStateAction, useContext, useEffect, useState } from "react";
import {
    MDBDropdown,
    MDBDropdownHeader,
    MDBDropdownItem,
    MDBDropdownLink,
    MDBDropdownMenu,
    MDBDropdownToggle,
} from "mdb-react-ui-kit";
import { libraryCategoryToLocaleText } from "../../helpers/bookinfoFunctions";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import {
    addBookToLibrary,
    serverUrl,
} from "../../../general/helpers/generalFunctions";
import { useLocation, useNavigate } from "react-router-dom";
import {
    AuthContext,
    ThemeContext,
} from "../../../general/helpers/generalContext";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

interface BookInfoLibraryAddProps {
    metadata: Metadata;
    updateMetadata: () => Promise<void>;
    className?: string | undefined;
}

export default function BookInfoLibraryAdd({
    metadata,
    updateMetadata,
    className,
}: BookInfoLibraryAddProps) {
    const [requestStatus, setRequestStatus] = useState<number>(0);
    const { theme } = useContext(ThemeContext);
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const currentLocation = useLocation().pathname;
    const { t } = useTranslation();

    const renderButtonText = () => {
        if (metadata.category != null) {
            return "MOVER";
        } else {
            return "ADICIONAR";
        }
    };

    const renderDropdownHeaderText = () => {
        if (metadata.category != null) {
            return "Mover para";
        } else {
            return "Adicionar à";
        }
    };

    const handleAddToLibrary = async (targetCategory: LibraryCategories) => {
        const pendingText = metadata.category
            ? "Movendo livro..."
            : "Adicionando livro...";

        const addBookRequest = await toast.promise(
            addBookToLibrary(authContext, metadata, targetCategory),
            {
                pending: pendingText,
                success: {
                    render: ({ toastProps, data }) => {
                        toastProps.draggable = true;
                        toastProps.draggablePercent = 60;
                        toastProps.closeOnClick = true;
                        return "Livro adicionado com sucesso!";
                    },
                },
                error: {
                    render: ({ toastProps, data }) => {
                        toastProps.draggable = true;
                        toastProps.draggablePercent = 60;
                        toastProps.closeOnClick = true;

                        if (typeof data === "object" && data != null) {
                            const requestError: AxiosError = data as AxiosError;
                            if (requestError.request.status === 400) {
                                const categoryName =
                                    libraryCategoryToLocaleText(
                                        t,
                                        targetCategory
                                    );
                                return (
                                    <span>
                                        O livro já se encontra na categoria{" "}
                                        <strong>{categoryName}</strong>
                                    </span>
                                );
                            }
                        }

                        return (
                            <div>
                                <p>
                                    Erro ao adicionar livro. Por favor, tente
                                    novamente.
                                </p>
                                <p>
                                    Se o erro persistir, entre em contato no
                                    nosso Discord.
                                </p>
                            </div>
                        );
                    },
                },
            }
        );

        if (
            addBookRequest.request.status === 201 ||
            addBookRequest.request.status === 200
        ) {
            await updateMetadata();
        }
    };

    function renderDropdownItem(category: LibraryCategories, key: number) {
        return (
            <MDBDropdownItem key={key}>
                <MDBDropdownLink
                    onClick={async (evt) => {
                        evt.preventDefault();
                        await handleAddToLibrary(category);
                    }}
                    className={metadata.category === category ? "active" : ""}
                >
                    {libraryCategoryToLocaleText(t, category)}
                </MDBDropdownLink>
            </MDBDropdownItem>
        );
    }

    useEffect(() => {
        if (requestStatus === 401) {
            navigate(`/user/login?redirect=${currentLocation}`);
        }
    }, [requestStatus]);

    return (
        <div className={`d-flex ${className ? className : ""} mt-3 mt-lg-0`}>
            <MDBDropdown>
                <MDBDropdownToggle size="lg">
                    {renderButtonText()}
                </MDBDropdownToggle>
                <MDBDropdownMenu dark={theme === ThemeOptions.dark}>
                    <MDBDropdownHeader className="mt-2">
                        {renderDropdownHeaderText()}
                    </MDBDropdownHeader>

                    {Object.values(LibraryCategories).map((category, index) => {
                        return renderDropdownItem(category, index);
                    })}
                </MDBDropdownMenu>
            </MDBDropdown>
        </div>
    );
}
