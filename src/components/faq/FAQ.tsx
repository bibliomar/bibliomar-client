import { Link, useSearchParams } from "react-router-dom";
import { MDBAccordion, MDBAccordionItem, MDBTooltip } from "mdb-react-ui-kit";
import Bibliologo from "../general/Bibliologo";
import { useEffect, useState } from "react";
import Navbar from "../general/navbar/Navbar";
import { Trans, useTranslation } from "react-i18next";

export default function FAQ() {
    const { t, i18n } = useTranslation();
    const [searchParams, _] = useSearchParams();
    const refParam: string | null = searchParams.get("ref");
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
                    {i18n.language === "en-us" ? (
                        <h5 className="text-center">
                            We are working to translate this resource. Thank
                            your for your patience!
                        </h5>
                    ) : null}
                </div>
                <div
                    className="basic-container text-color"
                    style={{ fontSize: "1.0rem" }}
                >
                    <MDBAccordion initialActive={ref} className="text-color">
                        <MDBAccordionItem
                            className="text-color"
                            collapseId={1}
                            headerTitle={t(
                                "faq:comoFuncionaAPesquisaEstruturada"
                            )}
                        >
                            <p>
                                {t(
                                    "faq:aPesquisaEstruturadaUmaDasAdiesDaVerso30DoBiblioma"
                                )}
                            </p>
                            <p>
                                {t(
                                    "faq:elaPermiteEmTermosSimplesQueVocPesquiseEmTodosOsCa"
                                )}
                            </p>
                            <br />
                            <span>
                                {t(
                                    "faq:porExemploTituloAutorLinguagemEtcOperadoresAndOrMa"
                                )}
                            </span>
                            <br />
                            <br />
                            <p>
                                {t(
                                    "faq:mesmoComOSeletorDaPesquisaEstruturadaDesativadaOBi"
                                )}
                            </p>
                            <span>
                                {t(
                                    "faq:aDiferenaQueCasoEstejaDesativadaNsAplicamosOsFiltr"
                                )}
                            </span>
                            <br />
                            <br />
                            <p>{t("faq:attributosPesquisaveis")} </p>
                            <ul>
                                <li>@title</li>
                                <title>@author</title>
                                <li>@language</li>
                                <li>@topic</li>
                                <li>@extension</li>
                                <li>@series</li>
                            </ul>
                            <br />
                            <span>
                                {t(
                                    "faq:exemploTitleONomeDoVentoFloresParaAlgernon"
                                )}
                            </span>
                            <br />
                            <span>
                                {t(
                                    "faq:encontraResultadosRelevantesParaONomeDoVentoOuFlor"
                                )}
                            </span>
                            <br />
                            <br />
                            <p>
                                <Trans
                                    i18nKey="paraEntenderMelhorOsOperadoresDisponveisNaPesquisa"
                                    ns="faq"
                                />{" "}
                                <a href="https://manual.manticoresearch.com/Searching/Full_text_matching/Operators#Full-text-operators">
                                    {t("faq:acesseEsseLink")}
                                </a>
                            </p>
                        </MDBAccordionItem>
                    </MDBAccordion>
                    <MDBAccordion initialActive={ref}>
                        <MDBAccordionItem
                            className="text-color"
                            collapseId={10}
                            headerTitle={
                                "Não consigo encontrar meu livro, como proceder?"
                            }
                        >
                            <p>
                                {t(
                                    "faq:emMuitosCasosIssoApenasUmaQuestoDeComoVocEstEstrut"
                                )}
                            </p>
                            <ul>
                                <li>
                                    {t(
                                        "faq:apagueAlgumasPalavrasDaSuaPesquisaRemovaAcentosExc"
                                    )}
                                </li>
                                <li>
                                    {t("faq:tentePesquisarEmOutraCategoria")}
                                </li>
                                <li>
                                    <span>
                                        {t("faq:tentePesquisarEmOutroFormato")}
                                    </span>
                                    <br />
                                    <span className="text-muted">
                                        {t(
                                            "faq:normalmenteLiteraturaBrasileiraMaisEncontradaNoFor"
                                        )}
                                    </span>
                                </li>
                            </ul>
                            <br />
                            <p>
                                {t(
                                    "faq:casoNenhumDessesMtodosFuncionePorFavorPesquisePorS"
                                )}
                                <a href="https://libgen.is/">
                                    {t("faq:diretamenteNoLibrarygenesis")}
                                </a>
                                .
                            </p>
                            <p>
                                <span>
                                    {t(
                                        "faq:casoMesmoAssimNoEncontreSeuLivroVocPodeAjudarOutro"
                                    )}
                                </span>
                                <a href={"/faq?ref=7"}>
                                    {t("faq:fazendoUploadDoMesmo")}
                                </a>
                            </p>
                        </MDBAccordionItem>
                        <MDBAccordionItem
                            className="text-color"
                            tag={"div"}
                            collapseId={20}
                            headerTitle={"Como funciona o Bibliomar?"}
                        >
                            <p>
                                {t(
                                    "faq:muitaCoisaMudouNoBibliomarEssaSeoSerAtualizadaEmBr"
                                )}
                            </p>
                        </MDBAccordionItem>
                        <MDBAccordionItem
                            className="text-color"
                            collapseId={30}
                            headerTitle={"Qual formato devo baixar?"}
                        >
                            <span className="fw-bold lead">EPUB: </span>
                            <p>
                                {t(
                                    "faq:essaAOpoRecomendadaSeVocProcuraLerLivrosDigitalmen"
                                )}
                            </p>
                            <span className="fw-bold lead">PDF: </span>
                            <p>
                                {t(
                                    "faq:essaASegundaMelhorOpoAMaiorVantagemDesteFormatoQue"
                                )}
                            </p>
                            <span className="fw-bold lead">MOBI: </span>
                            <p>
                                {t(
                                    "faq:esseOFormatoRecomendadoParaLerEmUmKindleLeiaBaixei"
                                )}
                            </p>

                            <span>
                                <Trans
                                    ns="faq"
                                    i18nKey="aOpoTodosPesquisaPorLivrosDeTodosOsFormatosDisponv"
                                    components={{
                                        s: <strong />,
                                    }}
                                />
                            </span>
                            <br />
                            <span>
                                {t(
                                    "faq:podeseNotarQueAlgunsFormatosNoEstoIncluidosNasOpes"
                                )}
                            </span>
                            <br />
                            <br />
                            <p>
                                <Trans
                                    ns="faq"
                                    i18nKey="agoraQueVocTemUmaIdeiaGeralSobreOsFormatosBastaBai"
                                />{" "}
                                {
                                    <a href={"/faq?ref=4"}>
                                        {t("faq:baixeiMeuLivroEAgora")}
                                    </a>
                                }
                                .
                            </p>
                        </MDBAccordionItem>
                        <MDBAccordionItem
                            className="text-color"
                            collapseId={40}
                            headerTitle={"Baixei meu livro, e agora?"}
                        >
                            <div className="accordion-body">
                                <span className="lead">
                                    {t(
                                        "faq:agoraVemAParteBoaVocAbreSeuArquivoEComeaALeituraEm"
                                    )}
                                </span>
                                <p>
                                    {t(
                                        "faq:pormDependendoDoFormatoQueVocBaixouPodeSerNecessri"
                                    )}
                                </p>
                                <p className="text-muted">
                                    {t(
                                        "faq:psVocTambmPodePularTudoIssoESimplesmenteLerSeuLivr"
                                    )}
                                </p>
                                <br />

                                <span className="lead">
                                    <Trans
                                        ns="faq"
                                        i18nKey="baixeiUmArquivoPdf"
                                        components={{
                                            s: <strong />,
                                        }}
                                    />
                                </span>
                                <br />
                                <p>
                                    {t(
                                        "faq:nesseCasoBastaAbrirOArquivoNoSeuComputadorOuCelula"
                                    )}
                                </p>

                                <br />
                                <span className="lead">
                                    <Trans
                                        ns="faq"
                                        i18nKey="baixeiUmArquivoEpub"
                                        components={{
                                            s: <strong />,
                                        }}
                                    />
                                </span>
                                <p>
                                    <Trans
                                        ns="faq"
                                        i18nKey="entoVocPrecisaBaixarUmLeitorEpubParaSeuDispositivo"
                                    />{" "}
                                    <a href="https://calibre-ebook.com/download">
                                        Calibre
                                    </a>
                                    <Trans
                                        ns="faq"
                                        i18nKey="disponivelParaWindowsMacELinuxCasoVocEstejaEmUmCel"
                                        components={{
                                            b: <br />,
                                            b2: <br />,
                                        }}
                                    />{" "}
                                    <a href="https://play.google.com/store/apps/details?id=org.readera&amp;hl=pt_BR&amp;gl=US">
                                        ReadEra
                                    </a>
                                    <Trans
                                        ns="faq"
                                        i18nKey="umAplicativoGratuitoQueLDiversosFormatosDeArquivoI"
                                        components={{
                                            b: <br />,
                                        }}
                                    />{" "}
                                    <a href="https://beebom.com/best-epub-readers-ipad-iphone/">
                                        {t("faq:diversasOpes")}
                                    </a>
                                    .
                                </p>
                                <p>
                                    {t(
                                        "faq:obviamenteOutrosAplicativosExistemParaCadaPlatafor"
                                    )}
                                </p>
                                <span className="lead">
                                    <Trans
                                        ns="faq"
                                        i18nKey="baixeiUmArquivoMobi"
                                        components={{
                                            s: <strong />,
                                        }}
                                    />
                                </span>
                                <p>
                                    <Trans
                                        ns="faq"
                                        i18nKey="seVocBaixouUmArquivoMobiVocProvavelmenteQuerEnviar"
                                        components={{
                                            a: (
                                                <a href="https://www.digitalbook.io/blog/pt/como-enviar-ebooks-para-o-seu-kindle/" />
                                            ),
                                        }}
                                    />
                                </p>
                                <p>
                                    {t(
                                        "faq:casoVocEstejaUsandoUmEleitorDiferenteDoKindleVocPr"
                                    )}
                                </p>
                            </div>
                        </MDBAccordionItem>
                        <MDBAccordionItem
                            className="text-color"
                            collapseId={50}
                            headerTitle="Como funciona a leitura online?"
                        >
                            <h5>
                                {t(
                                    "faq:aIdeiaDoLeitorOnlineMuitoSimplesNsSimplificamosTod"
                                )}
                            </h5>
                            <p>
                                {t(
                                    "faq:aPrncipioOUsuarioNormalmenteBaixaOLivroQueProcuraB"
                                )}
                            </p>
                            <p>
                                {t(
                                    "faq:oLeitorOnlineSimplificaTodoEsseProcessoDaSeguinteF"
                                )}
                            </p>
                            <p>
                                {t(
                                    "faq:oUsuarioEscolheUmLivroParaLerClicaEmLerOnlineEsper"
                                )}
                            </p>
                            <p>
                                {t(
                                    "faq:quandoEsseMesmoUsuarioCasoEstejaLogadoAcessarEsseL"
                                )}
                            </p>
                            <p>{t("faq:muitoMaisSimplesN")}</p>
                            <span>
                                {t(
                                    "faq:psALeituraOnlineMelhorAproveitadaComUmaContaAfinal"
                                )}
                            </span>
                            <br />
                            <span>
                                {t(
                                    "faq:quandoVocLUmLivroENoEstLogadoSeuProgressoSalvoNoCa"
                                )}
                            </span>
                        </MDBAccordionItem>
                        <MDBAccordionItem
                            className="text-color"
                            collapseId={60}
                            headerTitle={
                                "Quero contribuir mas estou meio perdido, o que fazer?"
                            }
                        >
                            <p>
                                {t(
                                    "faq:aPrincipalFormaDeContribuiaoJustamenteAdicionandoN"
                                )}
                            </p>
                            <p>
                                <Trans
                                    ns="faq"
                                    i18nKey="sigaEsseGuiaParaSaberComoEnviarNovosLivros"
                                    components={{
                                        a: <a href={"/faq?ref=7"} />,
                                    }}
                                />
                            </p>
                        </MDBAccordionItem>
                        <MDBAccordionItem
                            className="text-color"
                            collapseId={70}
                            headerTitle={"Como faço upload de novos livros?"}
                        >
                            <h5>
                                <Trans
                                    ns="faq"
                                    i18nKey="primeiramenteMuitoObrigadoPorSuaContribuioSuaAdioA"
                                    components={{
                                        b: <br />,
                                    }}
                                />
                            </h5>
                            <p>
                                {t(
                                    "faq:esseGuiaVaiLheEnsinarAFazerUploadDosSeusLivrosDire"
                                )}
                            </p>
                            <p>{t("faq:noSePreocupeOProcessoBemSimples")}</p>
                            <p>
                                {t(
                                    "faq:psVocPrecisaDeNoMnimoONomeDoLivroESeusAutoresParaE"
                                )}
                            </p>
                            <ul>
                                <li>
                                    <p>
                                        {t(
                                            "faq:primeiramenteEntreNoMenuDeUploadDoLibgen"
                                        )}
                                    </p>
                                    <a href={"https://library.bz/main/upload/"}>
                                        {t("faq:paraLivrosDeNofico")}
                                    </a>
                                    <br />
                                    <a href="https://library.bz/fiction/upload/">
                                        {t("faq:paraLivrosDeFico")}
                                    </a>
                                    <p>
                                        {t(
                                            "faq:porFavorTenhaCertezaDeEscolherACategoriaCorretaBas"
                                        )}
                                    </p>
                                </li>
                                <li>
                                    <Trans
                                        ns="faq"
                                        i18nKey="naTelaDeLoginDigiteAsCredenciais"
                                        components={{
                                            b: <br />,
                                        }}
                                    />
                                    <strong>Login</strong>: genesis
                                    <br />
                                    <strong>Password</strong>: upload
                                </li>
                                <li>
                                    {t(
                                        "faq:naTelaDeUploadEscolhaOArquivoQueDesejaEnviar"
                                    )}
                                </li>
                                <li>
                                    {t(
                                        "faq:comOArquivoEnviadoPreenchaPrimeiramenteONomeEAsInf"
                                    )}
                                </li>
                                <li>
                                    {t(
                                        "faq:emSeguidaVocPodeAdicionarTodasAsInformaesQueAcharR"
                                    )}
                                </li>
                                <li>
                                    <span>
                                        {t(
                                            "faq:opcionalEscolhaAlgumDosMtodosDePesquisaBibliogrfic"
                                        )}
                                    </span>
                                    <br />
                                    <span>
                                        {t(
                                            "faq:porExemploSelecioneGoodreadsEDigiteOIsbn10OuIsbn13"
                                        )}
                                    </span>
                                </li>
                            </ul>
                            <span>
                                {t(
                                    "faq:comEsseProcessoFinalizadoSeuLivroDeveAparecerNoAce"
                                )}
                            </span>
                            <p className="text-muted">
                                {t(
                                    "faq:esseOTempoQueArmazenamosAsPesquisasEmCache"
                                )}
                            </p>
                            <h5>
                                {t(
                                    "faq:maisUmaVezMuitoObrigadoAComunidadeAgradece"
                                )}
                            </h5>
                        </MDBAccordionItem>
                    </MDBAccordion>
                </div>
            </div>
        </div>
    );
}
