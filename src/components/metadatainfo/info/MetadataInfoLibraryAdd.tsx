import {
    AuthContextParams,
    Metadata,
    LibraryCategories,
    ThemeOptions,
} from "../../general/helpers/generalTypes";
import React, { SetStateAction, useContext, useEffect, useState } from "react";
import {
    MDBDropdown,
    MDBDropdownItem,
    MDBDropdownMenu,
    MDBDropdownToggle,
} from "mdb-react-ui-kit";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import {
    libraryCategoryToLocaleText,
    addBookToLibrary,
    serverUrl,
} from "../../general/helpers/generalFunctions";
import { useLocation, useNavigate } from "react-router-dom";
import {
    AuthContext,
    ThemeContext,
} from "../../general/helpers/generalContext";
import { toast } from "react-toastify";
import { Trans, useTranslation } from "react-i18next";

interface BookInfoLibraryAddProps {
    metadata: Metadata;
    updateMetadata: () => Promise<void>;
    className?: string | undefined;
}

export default function MetadataInfoLibraryAdd({
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
            return t("metadatainfo:MOVE");
        } else {
            return t("metadatainfo:ADD");
        }
    };

    const renderDropdownHeaderText = () => {
        if (metadata.category != null) {
            return t("metadatainfo:moverPara");
        } else {
            return t("metadatainfo:adicionar");
        }
    };

    const handleAddToLibrary = async (targetCategory: LibraryCategories) => {
        if (!authContext.userLogged) {
            const loginFailedMessage = t(
                "metadatainfo:vocPrecisaEstarLogadoParaAdicionarLivros"
            );
            toast.error(loginFailedMessage);
        }
        const pendingText = metadata.category
            ? t("metadatainfo:movendoLivro")
            : t("metadatainfo:adicionandoLivro");

        const addBookRequest = await toast.promise(
            addBookToLibrary(authContext, metadata, targetCategory),
            {
                pending: pendingText,
                success: {
                    render: ({ toastProps, data }) => {
                        toastProps.draggable = true;
                        toastProps.draggablePercent = 60;
                        toastProps.closeOnClick = true;
                        if (metadata.category != null) {
                            return t("metadatainfo:Livromovidocomsucesso");
                        }
                        return t("metadatainfo:Livroadicionadocomsucesso");
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
                                        <Trans
                                            i18nKey="oLivroJSeEncontraNaCategoria"
                                            ns="metadatainfo"
                                        />{" "}
                                        <strong>{categoryName}</strong>
                                    </span>
                                );
                            }
                        }

                        return (
                            <div>
                                <p>
                                    {t(
                                        "metadatainfo:erroAoAdicionarLivroPorFavorTenteNovamente"
                                    )}
                                </p>
                                <p>
                                    {t(
                                        "metadatainfo:seOErroPersistirEntreEmContatoNoNossoDiscord"
                                    )}
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
            <MDBDropdownItem
                link
                key={key}
                onClick={async (evt) => {
                    evt.preventDefault();
                    if (
                        !authContext.userLogged ||
                        authContext.jwtToken == null
                    ) {
                        navigate(`/user/login?redirect=${currentLocation}`);
                        return;
                    }
                    await handleAddToLibrary(category);
                }}
                className={metadata.category === category ? "active" : ""}
            >
                {libraryCategoryToLocaleText(t, category)}
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
                <MDBDropdownToggle size="lg" color="secondary">
                    {renderButtonText()}
                </MDBDropdownToggle>
                <MDBDropdownMenu dark={theme === ThemeOptions.dark}>
                    <MDBDropdownItem header className="mt-2">
                        {renderDropdownHeaderText()}
                    </MDBDropdownItem>

                    <>
                        {Object.values(LibraryCategories).map(
                            (category, index) => {
                                return renderDropdownItem(category, index);
                            }
                        )}
                    </>
                </MDBDropdownMenu>
            </MDBDropdown>
        </div>
    );
}
