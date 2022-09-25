import {
    RequestStatus,
    RequestStatusOptions,
    RequestType,
} from "../helpers/searchTypes";
import SearchLoadingMessage from "./SearchLoadingMessage";
import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface LoadingScreenProps {
    requestStatus: RequestStatus;
}

export default function SearchLoadingScreen({
    requestStatus,
}: LoadingScreenProps) {
    const { type, status } = requestStatus;

    const renderSearchMessage = () => {
        let message: string | ReactNode = "";

        switch (status) {
            case RequestStatusOptions.SENDING:
                message = "Estamos enviando sua solicitação ao servidor...";
                return (
                    <SearchLoadingMessage
                        message={message}
                        noteColor={"primary"}
                    />
                );
            case RequestStatusOptions.LOADING:
                message =
                    "Estamos carregando seus arquivos, isso pode demorar um pouco...";
                return (
                    <SearchLoadingMessage
                        message={message}
                        noteColor={"primary"}
                    />
                );
            case RequestStatusOptions.SUCCESS:
                message = "Tudo pronto! Boa leitura.";
                return (
                    <SearchLoadingMessage
                        message={message}
                        noteColor={"success"}
                    />
                );
            case RequestStatusOptions.BAD_QUERY:
                message = (
                    <span>
                        Não conseguimos encontrar nada com esses termos, que tal
                        olhar nossas{" "}
                        <Link to={"/faq?ref=7"}>dicas de pesquisa</Link>?
                    </span>
                );
                return (
                    <SearchLoadingMessage
                        message={message}
                        noteColor={"warning"}
                    />
                );
            case RequestStatusOptions.CONNECTION_ERROR:
                message =
                    "Ops, não conseguimos realizar sua solicitação, por favor, verifique sua conexão.";
                return (
                    <SearchLoadingMessage
                        message={message}
                        noteColor={"danger"}
                    />
                );

            case RequestStatusOptions.TOO_MANY_REQUESTS:
                message = "Calma! Você está fazendo muitas requisições.";
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
                message = "Procurando mais resultados...";
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
