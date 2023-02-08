import {
    RequestStatus,
    RequestStatusOptions,
    RequestType,
} from "../helpers/searchTypes";
import SearchLoadingMessage from "./SearchLoadingMessage";
import { Link } from "react-router-dom";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface LoadingScreenProps {
    requestStatus: RequestStatus;
}

export default function SearchLoadingScreen({
    requestStatus,
}: LoadingScreenProps) {
    const { t } = useTranslation();
    const { type, status } = requestStatus;

    const renderSearchMessage = () => {
        let message: string | ReactNode = "";

        switch (status) {
            case RequestStatusOptions.SENDING:
                message = t("search:estamosEnviandoSuaSolicitaoAoServidor2");
                return (
                    <SearchLoadingMessage
                        message={message}
                        noteColor={"primary"}
                    />
                );
            case RequestStatusOptions.LOADING:
                message = t(
                    "search:estamosCarregandoSeusArquivosIssoPodeDemorarUmPouc2"
                );
                return (
                    <SearchLoadingMessage
                        message={message}
                        noteColor={"primary"}
                    />
                );
            case RequestStatusOptions.SUCCESS:
                message = t("search:tudoProntoBoaLeitura2");
                return (
                    <SearchLoadingMessage
                        message={message}
                        noteColor={"success"}
                    />
                );
            case RequestStatusOptions.BAD_QUERY:
                message = t(
                    "search:noPossvelRealizarPesquisasDeMenosDe3Caracteres"
                );
                return (
                    <SearchLoadingMessage
                        message={message}
                        noteColor={"warning"}
                    />
                );

            case RequestStatusOptions.BAD_REQUEST:
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
            case RequestStatusOptions.CONNECTION_ERROR:
                message = t(
                    "search:opsNoConseguimosRealizarSuaSolicitaoPorFavorVerifi"
                );
                return (
                    <SearchLoadingMessage
                        message={message}
                        noteColor={"danger"}
                    />
                );

            case RequestStatusOptions.TOO_MANY_REQUESTS:
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
        switch (status) {
            case RequestStatusOptions.SENDING:
                message = t("search:procurandoMaisResultados");
                return (
                    <SearchLoadingMessage
                        message={message}
                        noteColor={"primary"}
                    />
                );
        }
    };

    return (
        <div className="text-dark mb-4">
            {type === RequestType.SEARCH
                ? renderSearchMessage()
                : renderPaginationMessage()}
        </div>
    );
}
