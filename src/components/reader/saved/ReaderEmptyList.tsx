export default function () {
    return (
        <div className="bg-black p-2 rounded-3 bg-opacity-25 text-light recommendation-div">
            <span>
                Você ainda não salvou nenhum livro. Para ler online, basta
                clicar em "Ler online" na tela de algum livro aqui no site ;)
            </span>
            <br />
            <span>Lembrando: Essa função só funciona com arquivos EPUB!</span>
            <br />
            <p>
                <strong>PS:</strong> Os livros serão salvos no{" "}
                <strong>seu</strong> dispositivo! Não temos acesso a nenhum
                deles e nem monetizamos seu dados.
            </p>
        </div>
    );
}
