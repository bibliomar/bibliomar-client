import { Link, useSearchParams } from "react-router-dom";
import { MDBAccordion, MDBAccordionItem, MDBTooltip } from "mdb-react-ui-kit";
import Bibliologo from "../general/Bibliologo";
import { useEffect, useState } from "react";
import Navbar from "../general/navbar/Navbar";

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
                <div>
                    <Navbar />
                </div>
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
                            collapseId={1}
                            headerTitle={
                                "Não consigo encontrar meu livro, como proceder?"
                            }
                        >
                            <p>
                                Em muitos casos, isso é apenas uma questão de
                                como você está estruturando sua pesquisa. Eis
                                aqui alguns métodos para aumentar suas chances
                                de encontrar seu livro:
                            </p>
                            <ul>
                                <li>
                                    Apague algumas palavras da sua pesquisa,
                                    remova acentos, exclua preposições (o e a).
                                </li>
                                <li>Tente pesquisar em outra categoria</li>
                                <li>
                                    <span>
                                        Tente pesquisar em outro formato
                                    </span>
                                    <br />
                                    <span className="text-muted">
                                        Normalmente, literatura brasileira é
                                        mais encontrada no formato ePub.
                                    </span>
                                </li>
                            </ul>
                            <br />
                            <p>
                                Caso nenhum desses métodos funcione, por favor,
                                pesquise por seu livro{" "}
                                <a href="https://libgen.is/">
                                    diretamente no LibraryGenesis
                                </a>
                                .
                            </p>
                            <p>
                                Caso mesmo assim não encontre seu livro, você
                                pode ajudar outros a encontrarem{" "}
                                <a href={"/faq?ref=7"}>
                                    fazendo upload do mesmo.
                                </a>
                            </p>
                        </MDBAccordionItem>
                        <MDBAccordionItem
                            tag={"div"}
                            collapseId={2}
                            headerTitle={"Como funciona o Bibliomar?"}
                        >
                            <p>
                                Nós somos basicamente uma interface baseada no
                                banco de dados do{" "}
                                <a href={"https://libgen.is"}>
                                    Library Genesis
                                </a>
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
                                        perfeitamente sozinha.
                                    </p>
                                    <a
                                        href={
                                            "https://github.com/Lamarcke/Biblioterra"
                                        }
                                    >
                                        Biblioterra
                                    </a>
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
                            collapseId={3}
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
                                    <a href={"/faq?ref=4"}>
                                        "Baixei meu livro, e agora?"
                                    </a>
                                }
                                .
                            </p>
                        </MDBAccordionItem>
                        <MDBAccordionItem
                            collapseId={4}
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
                            collapseId={5}
                            headerTitle={"Como funciona a leitura online?"}
                        >
                            <h5>
                                A ideia do leitor online é muito simples: nós
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
                            collapseId={6}
                            headerTitle={
                                "Quero contribuir mas estou meio perdido, o que fazer?"
                            }
                        >
                            <p>
                                A principal forma de contribuiçao é justamente
                                adicionando novos livros para a comunidade.
                            </p>
                            <p>
                                Siga <a href={"/faq?ref=7"}>esse guia</a> para
                                saber como enviar novos livros.
                            </p>
                            <p>
                                Caso sua dúvida seja sobre contribuição no
                                desenvolvimento, fique a vontade para entrar em
                                contato comigo (Lamarcke) diretamente:
                            </p>
                            <ul>
                                <li>
                                    Por{" "}
                                    <a
                                        href={
                                            "mailto:cassiolamarcksilvafreitas@gmail.com"
                                        }
                                    >
                                        email.
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
                        <MDBAccordionItem
                            collapseId={7}
                            headerTitle={"Como faço upload de novos livros?"}
                        >
                            <h5>
                                Primeiramente, muito obrigado por sua
                                contribuição!
                                <br />
                                Sua adição ao acervo com certeza será valiosa
                                para outros leitores.
                            </h5>
                            <p>
                                Esse guia vai lhe ensinar a fazer upload dos
                                seus livros diretamente no acervo do
                                LibraryGenesis.
                            </p>
                            <p>Não se preocupe, o processo é bem simples.</p>
                            <p>
                                PS: Você precisa de, no mínimo, o nome do livro
                                e seus autores para enviar seu livro.
                            </p>
                            <ul>
                                <li>
                                    <p>
                                        Primeiramente, entre no menu de upload
                                        do libgen:
                                    </p>
                                    <a href={"https://library.bz/main/upload/"}>
                                        Para livros de não-ficção
                                    </a>
                                    <br />
                                    <a href="https://library.bz/fiction/upload/">
                                        Para livros de ficção
                                    </a>
                                    <p>
                                        Por favor, tenha certeza de escolher a
                                        categoria correta baseada no seu
                                        arquivo, isso ajuda muito a manter o
                                        acervo organizado.
                                    </p>
                                </li>
                                <li>
                                    Na tela de login, digite as credenciais:
                                    <br />
                                    <strong>Login</strong>: genesis
                                    <br />
                                    <strong>Senha</strong>: upload
                                </li>
                                <li>
                                    Na tela de upload, escolha o arquivo que
                                    deseja enviar.
                                </li>
                                <li>
                                    Com o arquivo enviado, preencha
                                    primeiramente o nome e as informações dos
                                    autores, caso não estejam preenchidas.
                                </li>
                                <li>
                                    Em seguida, você pode adicionar todas as
                                    informações que achar relevante ao seu
                                    livro, como descrição, n. de páginas,
                                    editora, etc.
                                </li>
                                <li>
                                    <span>
                                        (opcional) Escolha algum dos métodos de
                                        pesquisa bibliográfica (o primeiro campo
                                        na tela) e digite o código do livro
                                        correspondente na plataforma.
                                    </span>
                                    <br />
                                    <span>
                                        Por exemplo, selecione "Goodreads" e
                                        digite o ISBN-10 ou ISBN-13 do seu
                                        livro.
                                    </span>
                                </li>
                            </ul>
                            <span>
                                Com esse processo finalizado, seu livro deve
                                aparecer no acervo do Bibliomar em pelo menos 24
                                horas.
                            </span>
                            <p className="text-muted">
                                Esse é o tempo que armazenamos as pesquisas em
                                cache.
                            </p>
                            <h5>
                                Mais uma vez, muito obrigado, a comunidade
                                agradece!
                            </h5>
                        </MDBAccordionItem>
                    </MDBAccordion>
                </div>
            </div>
        </div>
    );
}
