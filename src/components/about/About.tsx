import { MDBContainer, MDBTooltip } from "mdb-react-ui-kit";
import Navbar from "../general/navbar/Navbar";
import Footer from "../general/Footer";
import Break from "../general/Break";

export default function About() {
    return (
        <div className="like-body bg-alt">
            <MDBContainer fluid>
                <div className="row mb-5">
                    <div className="col mt-3">
                        <Navbar activeItem="about" />
                    </div>
                </div>
                <div
                    className="basic-container p-2 p-lg-3"
                    style={{ minHeight: "75vh" }}
                >
                    <div className="d-flex flex-wrap justify-content-center justify-content-lg-between w-100">
                        <div className="about-first-text-container text-center mt-4 mt-lg-5 ms-0 ms-lg-3 simple-text">
                            <h3 className="mb-5 text-start simple-text-bolder">
                                Sobre
                            </h3>
                            <h6>
                                O Bibliomar é um projeto educacional que busca
                                se tornar a opção definitiva de leitura no
                                Brasil.
                            </h6>
                            <p>
                                Nosso projeto nasceu com um único objetivo:
                                tornar possível o fácil acesso à literatura,
                                tanto nacional quanto estrangeira, à população
                                brasileira e aos demais falantes da lingua
                                portuguesa.
                            </p>
                            <p>
                                O Bibliomar é genuinamente brasileiro e temos
                                muito orgulho disso.
                            </p>
                            <p className="mt-3">
                                Aqui, você tem a certeza de encontrar milhares
                                de livros em um acervo de qualidade. Nós usamos
                                o banco de dados do LibraryGenesis - a maior
                                biblioteca digital do mundo - como base.
                            </p>
                            <p className="mt-1">
                                Quando encontrar o livro ou artigo acadêmico que
                                tanto procura, você pode usufruir de uma
                                biblioteca pessoal com opções de filtragem e
                                categorias.
                            </p>
                            <MDBTooltip
                                title="Apenas para arquivos no formato ePub ;)"
                                tag={"div"}
                            >
                                <p>
                                    E, além disso, você pode ler qualquer* livro
                                    online gratuitamente.{" "}
                                </p>
                            </MDBTooltip>
                        </div>
                        <Break mobile />
                        <div className="about-first-img-container">
                            <img
                                className="img-fluid"
                                alt={"Icone"}
                                src="/assets/img/about-image-1.png"
                            />
                        </div>
                        <Break />

                        <div
                            className="d-flex flex-wrap w-100
                        text-center mt-4 mt-lg-5 ms-0 ms-lg-3 simple-text"
                        >
                            <div
                                className="about-first-img-container d-flex
                            flex-wrap justify-content-center justify-content-lg-start"
                            >
                                <h3 className="simple-text-bolder text-start mb-5 flex-grow-1">
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
                            <div className="d-flex about-first-text-container">
                                <div className="d-flex flex-wrap w-50">
                                    <img
                                        className="mt-auto"
                                        style={{ width: "auto", height: "20%" }}
                                        src="/assets/img/about-github-logo.png"
                                    />
                                    <span>
                                        Nosso projeto é open-source. Contribua
                                        para melhorar ainda mais o Bibliomar!
                                    </span>
                                </div>
                                <div></div>
                            </div>
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
