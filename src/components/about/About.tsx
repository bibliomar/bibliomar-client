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
                    <div className="d-flex flex-wrap justify-content-center justify-content-lg-between flex-md-nowrap w-100">
                        <div className="about-first-text-container text-center mt-4 mt-lg-5 ms-0 ms-lg-3">
                            <h6>
                                O Bibliomar é um projeto educacional que busca
                                se tornar a opção definitiva de leitura no
                                Brasil.
                            </h6>
                            <p>
                                Nosso projeto nasceu de um único objetivo:
                                tornar possível o fácil acesso a literatura,
                                tanto nacional quanto estrangeira, a população
                                brasileira e aos demais falantes da lingua
                                portuguesa.
                            </p>
                            <p>
                                O Bibliomar é genuinamente brasileiro, e temos
                                muito orgulho disso.
                            </p>
                            <p className="mt-3">
                                Aqui você tem a certeza de encontrar milhares de
                                livros gratuitos e de qualidade. Nós usamos o
                                acervo do LibraryGenesis, a maior biblioteca
                                digital do mundo, como base.
                            </p>
                            <p className="mt-1">
                                E quando encontrar o livro ou artigo acadêmico
                                que tanto procura, você usufruir de uma
                                biblioteca pessoal gratuita, com opções de
                                filtragem e categorias.
                            </p>
                            <MDBTooltip
                                title="Apenas para arquivos no formato ePub ;)"
                                tag={"div"}
                            >
                                <p>
                                    E além disso, a qualquer momento você pode
                                    ler qualquer* livro online gratuitamente.{" "}
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
                    </div>
                </div>
                <div className="mt-3">
                    <Footer />
                </div>
            </MDBContainer>
        </div>
    );
}
