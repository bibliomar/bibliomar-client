import {
    SearchRequestStatus,
    SearchRequestStatusOptions,
    SearchRequestType,
} from "../helpers/searchTypes";
import SearchLoadingMessage from "./SearchLoadingMessage";
import { Link } from "react-router-dom";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface LoadingScreenProps {
    requestStatus?: SearchRequestStatus | null | undefined;
}

export default function SearchMessageScreen({
    requestStatus,
}: LoadingScreenProps) {
    const { t } = useTranslation();

    const renderSearchMessage = () => {
        let message: string | ReactNode = "";

        switch (requestStatus?.status) {
            case SearchRequestStatusOptions.SENDING:
                message = t("search:estamosEnviandoSuaSolicitaoAoServidor2");
                return (
                    <SearchLoadingMessage
                        message={message}
                        noteColor={"primary"}
                    />
                );
            case SearchRequestStatusOptions.LOADING:
                message = t(
                    "search:estamosCarregandoSeusArquivosIssoPodeDemorarUmPouc2"
                );
                return (
                    <SearchLoadingMessage
                        message={message}
                        noteColor={"primary"}
                    />
                );
            case SearchRequestStatusOptions.SUCCESS:
                message = t("search:tudoProntoBoaLeitura2");
                return (
                    <SearchLoadingMessage
                        message={message}
                        noteColor={"success"}
                    />
                );
            case SearchRequestStatusOptions.BAD_QUERY:
                message = t(
                    "search:noPossvelRealizarPesquisasDeMenosDe3Caracteres"
                );
                return (
                    <SearchLoadingMessage
                        message={message}
                        noteColor={"warning"}
                    />
                );

            case SearchRequestStatusOptions.BAD_REQUEST:
                message = (
                    <span>
                        {t(
                            "search:noConseguimosEncontrarNadaComEssesTermosQueTalOlha"
                        )}{" "}
                        <Link to={"/faq?ref=7"}>
                            {t("search:dicasDePesquisa")}
                        </Link>
                        ?
                    </span>
                );
                return (
                    <SearchLoadingMessage
                        message={message}
                        noteColor={"warning"}
                    />
                );
            case SearchRequestStatusOptions.CONNECTION_ERROR:
                message = t(
                    "search:opsNoConseguimosRealizarSuaSolicitaoPorFavorVerifi"
                );
                return (
                    <SearchLoadingMessage
                        message={message}
                        noteColor={"danger"}
                    />
                );

            case SearchRequestStatusOptions.TOO_MANY_REQUESTS:
                message = t("search:calmaVocEstFazendoMuitasRequisies");
                return (
                    <SearchLoadingMessage
                        message={message}
                        noteColor={"danger"}
                    />
                );
        }
    };
    const renderPaginationMessage = () => {
        let message: string | ReactNode = "";
        switch (requestStatus?.status) {
            case SearchRequestStatusOptions.SENDING:
                message = t("search:procurandoMaisResultados");
                return (
                    <SearchLoadingMessage
                        message={message}
                        noteColor={"primary"}
                    />
                );
            case SearchRequestStatusOptions.BAD_REQUEST:
                message = t("search:noConseguimosEncontrarMaisResultados");
                return (
                    <SearchLoadingMessage
                        message={message}
                        noteColor={"warning"}
                    />
                );
        }
    };

    const renderBasedOnType = () => {
        if (requestStatus == null) {
            return null;
        }

        if (requestStatus.type === SearchRequestType.SEARCH) {
            return renderSearchMessage();
        } else {
            return renderPaginationMessage();
        }
    };

    return <div className="text-dark mb-4">{renderBasedOnType()}</div>;
}
