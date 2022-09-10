import { Link, useSearchParams } from "react-router-dom";
import { MDBAccordion, MDBAccordionItem, MDBTooltip } from "mdb-react-ui-kit";
import Bibliologo from "../general/Bibliologo";
import { useEffect, useState } from "react";

export default function FAQ() {
    const [searchParams, _] = useSearchParams();
    console.log("ei");
    let refParam: string | null = searchParams.get("ref");
    let ref: number | undefined = undefined;
    if (refParam) {
        ref = parseInt(refParam);
    }

    return (
        <div className="like-body bg-alt">
            <div className="container-fluid">
                <div className="mb-5">
                    <Bibliologo />
                    <br />
                </div>
                <div
                    className="position-relative basic-container fs-5"
                    style={{ top: "20%" }}
                >
                    <MDBAccordion initialActive={ref}>
                        <MDBAccordionItem
                            tag={"div"}
                            collapseId={1}
                            headerTitle={"Como funciona o Bibliomar?"}
                        >
                            <p>
                                Nós somos basicamente uma interface bem completa
                                baseada no banco de dados do{" "}
                                {<Link to={"/faq?ref=3"}>Library Genesis</Link>}
                                .
                            </p>

                            <h5>
                                O bibliomar é dividido em três partes, sendo
                                elas:
                            </h5>
                            <br />
                            <ul>
                                <li>
                                    <p>
                                        A base de tudo, uma biblioteca simples
                                        mas muito poderosa, responsável por
                                        extrair informações e realizar pesquisas
                                        diretamente no LibraryGenesis.
                                    </p>
                                    <Link
                                        to={
                                            "https://github.com/Lamarcke/grab-fork-from-libgen"
                                        }
                                    >
                                        grab-fork-from-libgen
                                    </Link>
                                </li>
                                <br />
                                <li>
                                    <p>
                                        O backend, responsável por organizar os
                                        resultados distribuidos pela biblioteca
                                        principal e receber as requisições do
                                        frontend.
                                    </p>
                                    <p>
                                        Apesar de ter sido desenvolvido com foco
                                        em atender as necessidades do Bibliomar,
                                        o Biblioterra é uma API pura e funciona
                                        perfeitamente sem o uso do mesmo.
                                    </p>
                                    <Link
                                        to={
                                            "https://github.com/Lamarcke/Biblioterra"
                                        }
                                    >
                                        Biblioterra
                                    </Link>
                                </li>
                                <br />
                                <li>
                                    <p>
                                        E o frontend: esse site que você está
                                        acessando agora mesmo.
                                    </p>
                                    <p>
                                        Ao todo, o site principal do Bibliomar
                                        já foi reescrito três vezes.
                                    </p>
                                    <p>
                                        Não havia algo necessariamente de ruim
                                        nas versões anteriores, apenas fomos
                                        modernizando conforme novas
                                        contribuições surgiam.
                                    </p>
                                    <a
                                        href={
                                            "https://github.com/Lamarcke/bibliomar-react"
                                        }
                                    >
                                        Bibliomar
                                    </a>
                                </li>
                            </ul>
                            <br />
                            <p>
                                O bibliomar é um projeto extramamente modular, e
                                que com o tempo acabou tomando um escopo muito
                                maior do que eu originalmente planejava.
                            </p>
                            <p className="text-muted">
                                Na época, eu planejava uma simples barra de
                                pesquisa com uma tabela de resultados.
                            </p>
                        </MDBAccordionItem>
                        <MDBAccordionItem
                            collapseId={2}
                            headerTitle={"Qual formato devo baixar?"}
                        >
                            <span className="fw-bold lead">EPUB: </span>
                            <p>
                                Essa é a opção recomendada, se você procura ler
                                livros digitalmente, esse é o principal formato
                                feito para isso, nele você consegue usufruir de
                                funções como visualização que se adapta a sua
                                tela, temas (dependendo do seu aplicativo) e
                                fontes personalizadas. E o principal: chega de
                                ter que ficar dando zoom toda hora igual no PDF.
                            </p>
                            <span className="fw-bold lead">PDF: </span>
                            <p>
                                Essa é a segunda melhor opção, a maior vantagem
                                deste formato é que você pode abrir ele em
                                praticamente qualquer computador ou celular. Se
                                você tem algum navegador moderno no seu
                                dispositivio, ele provavelmente roda PDF
                                nativamente. A maior desvantagem é o PDF ser um
                                formato estático, ou seja, ele não se adapta a
                                sua tela. Isso significa que você vai ter que
                                ler seu arquivo usando da ferramenta de zoom.
                            </p>
                            <span className="fw-bold lead">MOBI: </span>
                            <p>
                                Esse é o formato recomendado para ler em um
                                Kindle. Leia "Baixei meu livro, e agora?" para
                                entender como funciona.
                            </p>

                            <span>
                                A opção{" "}
                                <span className="lead fw-bold">TODOS</span>{" "}
                                pesquisa por livros de todos os formatos
                                disponíveis.
                            </span>
                            <br />
                            <span>
                                Pode-se notar que alguns formatos não estão
                                incluidos nas opções de filtro, apesar de serem
                                mostrados quando essa opção é usada. Isso se
                                deve ao fato de ainda não haver demanda o
                                suficiente para esses tipos de arquivos aqui no
                                Bibliomar.
                            </span>
                            <br />
                            <br />
                            <p>
                                Agora que você tem uma ideia geral sobre os
                                formatos, basta baixar seu livro e ler a seção{" "}
                                {
                                    <a href={"/faq?ref=3"}>
                                        "Baixei meu livro, e agora?"
                                    </a>
                                }
                                .
                            </p>
                        </MDBAccordionItem>
                        <MDBAccordionItem
                            collapseId={3}
                            headerTitle={"Baixei meu livro, e agora?"}
                        >
                            <div className="accordion-body">
                                <span className="lead">
                                    Agora vem a parte boa, você abre seu arquivo
                                    e começa a leitura em qualquer dispositivo.
                                </span>
                                <p>
                                    Porém dependendo do formato que você baixou,
                                    pode ser necessário o uso de algum programa
                                    de terceiros:
                                </p>
                                <p className="text-muted">
                                    PS: Você também pode pular tudo isso e
                                    simplesmente ler seu livro online aqui no
                                    site. É gratuito e nós salvamos seu
                                    progresso entre dispositivos automaticamente
                                    ;)
                                </p>
                                <br />

                                <MDBTooltip
                                    placement={"top-start"}
                                    tag={"div"}
                                    title={
                                        'As vezes, ao usar o servidor de download "Cloudflare", seu navegador vai abrir um leitor de PDF diretamente, mas não é sempre ;)'
                                    }
                                >
                                    <span className="lead">
                                        Baixei um arquivo <strong>PDF</strong>.
                                    </span>
                                    <br />
                                    <p>
                                        Nesse caso, basta abrir o arquivo no seu
                                        computador ou celular, qualquer
                                        navegador moderno oferece suporte nativo
                                        a PDF.
                                    </p>
                                </MDBTooltip>
                                <br />
                                <span className="lead">
                                    Baixei um arquivo <strong>EPUB</strong>.
                                </span>
                                <p>
                                    Então você precisa baixar um leitor ePub
                                    para seu dispositivo. Se você estiver em um
                                    computador, recomendamos usar o{" "}
                                    <a href="https://calibre-ebook.com/download">
                                        Calibre
                                    </a>
                                    , disponivel para Windows, MAC e Linux.
                                    <br />
                                    <br />
                                    Caso você esteja em um celular Android,
                                    recomendamos baixar o{" "}
                                    <a href="https://play.google.com/store/apps/details?id=org.readera&amp;hl=pt_BR&amp;gl=US">
                                        ReadEra
                                    </a>
                                    , um aplicativo gratuito que lê diversos
                                    formatos de arquivo, inclusive ePub.
                                    <br />
                                    Já para iOS, existem{" "}
                                    <a href="https://beebom.com/best-epub-readers-ipad-iphone/">
                                        diversas opções
                                    </a>
                                    .
                                </p>
                                <p>
                                    Obviamente, outros aplicativos existem para
                                    cada plataforma, basta dar uma pesquisada e
                                    testar qual a melhor para você.
                                </p>
                                <span className="lead">
                                    Baixei um arquivo <strong>MOBI</strong>.
                                </span>
                                <p>
                                    Se você baixou um arquivo Mobi, você
                                    provavelmente quer enviar para o seu Kindle,
                                    basta seguir
                                    <a href="https://www.digitalbook.io/blog/pt/como-enviar-ebooks-para-o-seu-kindle/">
                                        esse
                                    </a>
                                    tutorial para aprender como fazer isso.
                                </p>
                                <p>
                                    Caso você esteja usando um e-leitor
                                    diferente do Kindle, você precisa verificar
                                    quais formatos seu dispositivo suporta
                                    (geralmente olhando o site da fabricante ou
                                    pesquisando na internet). Alguns leitores
                                    têm suporte nativo para PDF, outros suportam
                                    até mesmo ePub diretamente. Depois disso, é
                                    só pesquisar na internet como enviar o
                                    arquivo para seu dispositivo.
                                </p>
                            </div>
                        </MDBAccordionItem>
                        <MDBAccordionItem
                            collapseId={4}
                            headerTitle={"Como funciona a leitura online?"}
                        >
                            <h5>
                                A ideia do leitor online é muito simples, nós
                                simplificamos todo o processo de leitura pra
                                você.
                            </h5>
                            <p>
                                A príncipio, o usuario normalmente baixa o livro
                                que procura, baixa um aplicativo ou programa que
                                consiga ler aquele tipo de arquivo, e então
                                inicia a leitura caso tudo ocorra sem problemas.
                            </p>
                            <p>
                                O leitor online simplifica todo esse processo da
                                seguinte forma:
                            </p>
                            <p>
                                O usuario escolhe um livro para ler, clica em
                                "Ler online", espera alguns segundos e começa a
                                leitura.
                            </p>
                            <p>
                                Quando esse mesmo usuario (caso esteja logado)
                                acessar esse livro no seu dispositivo móvel ou
                                outro aparelho, a leitura irá continuar de onde
                                ele parou.
                            </p>
                            <p>Muito mais simples, né? ;)</p>
                            <span>
                                PS: A leitura online é melhor aproveitada com
                                uma conta, afinal nós salvamos seu progresso
                                online através dela.
                            </span>
                            <br />
                            <span>
                                Quando você lê um livro e não está logado, seu
                                progresso é salvo no cache do seu navegador e
                                pode ser apagado a qualquer momento.
                            </span>

                            <br />
                            <br />
                            <br />
                            <h5>
                                Essa foi a explicação simplificada, se nós
                                formos ditar o passo a passo técnico, seria o
                                seguinte:
                            </h5>
                            <ol type={"1"}>
                                <li>
                                    Você (usuario) clica em "Ler online" em
                                    algum livro.
                                </li>
                                <li>
                                    Você é redirecionado para a página de
                                    download, e nela fazemos as seguintes
                                    checagens:
                                    <ol type="a">
                                        <li>
                                            Verificamos se você já tem algum
                                            livro baixado no seu dispositivo
                                            (sim, os livros ficam no seu
                                            dispositivo)
                                        </li>
                                        <li>
                                            Caso sim, verificamos se o livro que
                                            você está tentando baixar já não
                                            está salvo no seu dispositivo.
                                        </li>
                                        <li>
                                            Caso sim, nós te redirecionamos
                                            automaticamente para a página do seu
                                            livro, e você continua a leitura de
                                            onde parou.
                                        </li>
                                        <span className="text-muted">
                                            Nós usamos o "MD5" dos livros para
                                            diferenciá-los. Afinal, um livro
                                            pode ter nomes e autores repetidos
                                            no site.
                                        </span>
                                    </ol>
                                </li>
                                <li>
                                    Após a verificação acima, enviamos os dados
                                    do seu livro ao nosso servidor backend (o
                                    Biblioterra)
                                </li>
                                <li>
                                    O Biblioterra verifica as informações e
                                    procura pelos links de download do seu
                                    livro.
                                </li>
                                <li>
                                    Inicia-se o processo de download em nosso
                                    servidor, nós tentamos o download em até 5
                                    links diferentes.
                                </li>
                                <li>
                                    <MDBTooltip
                                        tag="span"
                                        title={
                                            "Nós salvamos seu livro em um banco de dados chamado " +
                                            "'IndexedDB', que existe nativamente na maioria dos navegadores modernos."
                                        }
                                    >
                                        Caso tudo ocorra bem, nosso frontend (o
                                        Bibliomar) inicia o processo de salvar o
                                        seu livro localmente.
                                    </MDBTooltip>
                                </li>
                                <li>
                                    Assím que o processo acima termina, nós
                                    excluimos seu livro de nossos servidores.
                                </li>
                                <span>
                                    Esse processo é automático e final, não
                                    salvamos nenhuma informação sobre o livro
                                    que você acabou de baixar.
                                </span>
                                <br />
                                <span className="text-muted">
                                    Se, em um caso extremamente raro, esse
                                    processo falhar, o Biblioterra sofre uma
                                    limpa de arquivos pelo menos a cada 24h, já
                                    que ele é hospedado em um servidor com
                                    sistema de arquivos efêmero.
                                </span>
                                <li>Você inicia sua leitura.</li>
                            </ol>
                            <p>
                                Um pouco mais complicado, mas o processo para o
                                usuario final continua sendo apenas esperar
                                alguns segundos haha.
                            </p>
                        </MDBAccordionItem>
                        <MDBAccordionItem
                            collapseId={5}
                            headerTitle={""}
                        ></MDBAccordionItem>
                        <MDBAccordionItem
                            collapseId={6}
                            headerTitle={
                                "Quero contribuir mas estou meio perdido, o que fazer?"
                            }
                        >
                            <p>
                                Nesses casos (e em qualquer outro), fique a
                                vontade para entrar em contato comigo (Lamarcke)
                                diretamente:
                            </p>
                            <ul>
                                <li>
                                    Por{" "}
                                    <a
                                        href={
                                            "mailto:cassiolamarcksilvafreitas@gmail.com"
                                        }
                                    >
                                        email
                                    </a>
                                </li>
                                <li>Através do meu discord: Lamarco#5809</li>
                                <li>
                                    Através de um{" "}
                                    <a
                                        href={
                                            "https://github.com/Lamarcke/bibliomar-react"
                                        }
                                    >
                                        issue no repositório do Bibliomar
                                    </a>
                                </li>
                            </ul>
                        </MDBAccordionItem>
                    </MDBAccordion>
                </div>
            </div>
        </div>
    );
}
