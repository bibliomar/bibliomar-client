import { MDBContainer, MDBTooltip } from "mdb-react-ui-kit";
import Navbar from "../general/navbar/Navbar";
import Footer from "../general/Footer";
import Break from "../general/Break";
import { useWindowSize } from "../general/helpers/useWindowSize";

export default function About() {
    const width = useWindowSize().width;
    return (
        <div className="like-body bg-alt">
            <MDBContainer fluid>
                <div className="row mb-5">
                    <div className="col mt-3">
                        <Navbar activeItem="about" />
                    </div>
                </div>
                <div className="basic-container" style={{ minHeight: "75vh" }}>
                    <div className="d-flex flex-wrap p-2 p-lg-3 justify-content-start justify-content-lg-between w-100 ms-2">
                        <h3 className="mt-3 text-start simple-text-bolder">
                            Sobre
                        </h3>
                        <Break />
                        <div className="d-flex justify-content-center justify-content-lg-between flex-wrap">
                            <div className="about-first-text-container text-center mt-4 mt-lg-5 simple-text fs-5">
                                <h5>
                                    O Bibliomar é um projeto educacional que
                                    busca se tornar a opção definitiva de
                                    leitura no Brasil.
                                </h5>
                                <p>
                                    Nosso projeto nasceu com um único objetivo:
                                    tornar possível o fácil acesso à literatura,
                                    tanto nacional quanto estrangeira, à
                                    população brasileira e aos demais falantes
                                    da lingua portuguesa.
                                </p>
                                <p>
                                    O Bibliomar é genuinamente brasileiro e
                                    temos muito orgulho disso.
                                </p>
                                <p className="mt-3">
                                    Aqui, você tem a certeza de encontrar
                                    milhares de livros em um acervo de
                                    qualidade. Nós usamos o banco de dados do
                                    LibraryGenesis - a maior biblioteca digital
                                    do mundo - como base.
                                </p>
                                <p className="mt-1">
                                    Quando encontrar o livro ou artigo acadêmico
                                    que tanto procura, você pode usufruir de uma
                                    biblioteca pessoal com opções de filtragem e
                                    categorias.
                                </p>

                                <MDBTooltip
                                    title="Apenas para arquivos no formato ePub ;)"
                                    tag={"div"}
                                >
                                    <p>
                                        E, além disso, você pode ler qualquer*
                                        livro online gratuitamente.{" "}
                                    </p>
                                </MDBTooltip>
                            </div>
                            <Break mobile />
                            <div className="about-first-img-container mt-5 mt-md-0">
                                <img
                                    className="img-fluid"
                                    alt={"Icone"}
                                    src="/assets/img/about-image-1.png"
                                />
                            </div>
                        </div>

                        <Break />

                        <div
                            className="d-flex flex-wrap w-100
                        text-center mt-4 mt-lg-5 simple-text"
                        >
                            <div
                                className="about-first-img-container d-flex
                            flex-wrap justify-content-center justify-content-lg-start mb-5 mb-lg-0"
                            >
                                <h3 className="simple-text-bolder text-start mb-2 mb-lg-5 flex-grow-1">
                                    Conheça nossa comunidade
                                </h3>
                                <Break className="mb-5" />
                                <img
                                    className={"img-fluid"}
                                    alt={"Icone 2"}
                                    src="/assets/img/about-image-2.png"
                                />
                            </div>
                            <Break mobile />
                            <div
                                className={`d-flex justify-content-center 
                                justify-content-lg-around about-first-text-container ${
                                    width <= 768 ? "w-100" : undefined
                                }`}
                            >
                                <div className="d-flex flex-wrap justify-content-center w-50 me-4">
                                    <a href="https://github.com/Lamarcke/bibliomar-react">
                                        <img
                                            alt={"Icone 3"}
                                            className="mt-0 mt-lg-auto about-icon-img mb-1"
                                            src="/assets/img/about-github-logo.png"
                                        />
                                    </a>

                                    <span>
                                        Nosso projeto é open-source. Contribua
                                        para melhorar ainda mais o Bibliomar!
                                    </span>
                                </div>
                                <div className="d-flex flex-wrap justify-content-center w-50 me-3">
                                    <a
                                        href="https://discord.gg/J5FBbh8JbS"
                                        style={{ color: "unset" }}
                                    >
                                        <img
                                            alt={"Icone 4"}
                                            className="mt-0 mt-lg-auto about-icon-img"
                                            src="/assets/img/about-discord-logo.png"
                                        />
                                    </a>

                                    <span>
                                        Converse e participe da comunidade em
                                        nosso discord!
                                    </span>
                                </div>
                            </div>
                            <Break className="mb-4" />
                        </div>
                    </div>
                </div>
                <div className="mt-3 ">
                    <Footer />
                </div>
            </MDBContainer>
        </div>
    );
}
