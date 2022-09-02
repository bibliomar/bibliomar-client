import Break from "../../general/Break";

interface Props {
    downloadProgress: number;
    downloadStatus: number;
    downloadSize: number;
    userLoggedIn: boolean;
}

export default function ({
    downloadProgress,
    downloadStatus,
    downloadSize,
    userLoggedIn,
}: Props) {
    const renderBasedOnStatus = () => {
        if (downloadStatus === 0) {
            return <span>Preparando-se para iniciar seu download...</span>;
        }
        // Else...
        switch (downloadStatus) {
            case 103:
                return (
                    <>
                        <p>
                            Estamos baixando seu arquivo em nossos servidores...
                        </p>
                    </>
                );
            case 200:
                return (
                    <>
                        <span>
                            Seu livro foi baixado e já estamos salvando na sua
                            lista para você ler quando quiser!
                        </span>
                        <Break />
                        <span>
                            Nota: Seu arquivo já foi excluido dos nossos
                            servidores, e não salvamos nenhuma informação sobre
                            ele ;)
                        </span>
                    </>
                );
            case 201:
                return (
                    <div className="d-flex flex-wrap justify-content-center">
                        <span className="lead">Baixando: </span>
                        <Break />
                        <span>
                            {downloadProgress}Kb de {downloadSize}Kb
                        </span>
                        <Break />
                        <span>
                            {(downloadProgress / downloadSize) * 100}%
                            concluído.
                        </span>
                        <Break className="mb-2" />
                        <span>
                            {downloadProgress === downloadSize
                                ? "Finalizando..."
                                : null}
                        </span>
                    </div>
                );
            case 400:
                return (
                    <span>
                        Ocorreu um erro durante o seu download... por favor,
                        tente novamente.
                    </span>
                );
            case 401:
                return (
                    <div className="d-flex flex-wrap justify-content-center">
                        {!userLoggedIn ? (
                            <>
                                <span className="mb-2">
                                    Desculpe, parece que você fez um outro
                                    download a menos de 5 minutos...
                                </span>
                                <Break />
                                <span>
                                    Nós sabemos que essa limitação é irritante.
                                    Mas é ela quem garante que o conteúdo que
                                    você consome continue gratuito, obrigado
                                    pela compreensão.
                                </span>
                                <Break />
                                <span>
                                    <strong>PS:</strong> Usuários logados não
                                    possuem restrição de download.
                                    <br />
                                    Criar uma conta é totalmente gratuito ;).
                                </span>
                            </>
                        ) : (
                            <>
                                <span>
                                    Desculpe, você baixou outro livro a menos de
                                    15 segundos, por favor, aguarde mais um
                                    pouco.
                                </span>
                            </>
                        )}
                    </div>
                );
            case 403:
                return (
                    <span>
                        Aparentemente, o arquivo que você está tentando baixar
                        não se trata de um ePub... que coisa, não?
                    </span>
                );
            case 413:
                return (
                    <div className="d-flex flex-wrap justify-content-center">
                        <span className="mb-2">
                            Opa, parece que seu arquivo excede nossa cota de 5MB
                            máximo de download.
                        </span>
                        <Break />
                        <span>
                            Nós sabemos que essa limitação é irritante. Mas é
                            ela quem garante que o conteúdo que você consome
                            continue gratuito. Obrigado pela compreensão.
                        </span>
                        <Break />
                        <span>
                            <strong>PS:</strong> Usuários logados não possuem
                            restrição de download.
                            <br />
                            Criar uma conta é totalmente gratuito ;).
                        </span>
                    </div>
                );
            case 500:
                return (
                    <span>
                        Ocorreu um erro durante o seu download... por favor,
                        tente novamente.
                    </span>
                );
            case 504:
                return (
                    <span>
                        O servidor de download não está respondendo, tente
                        novamente mais tarde.
                    </span>
                );
        }
    };

    return <div className="mt-4 text-center">{renderBasedOnStatus()}</div>;
}
