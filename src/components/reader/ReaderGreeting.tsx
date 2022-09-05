import Break from "../general/Break";
import React from "react";
import SmallLine from "../general/SmallLine";

export default function ReaderGreeting() {
    return (
        <div
            className="basic-container mt-4 d-flex justify-content-center"
            style={{ minHeight: "30vh" }}
        >
            <div className="text-center simple-text-bolder w-75 mt-5">
                <p className="lead">
                    Você pode enviar seu arquivo local por aqui.
                </p>
                <p className="lead">
                    Para ler um livro online usando nosso leitor, basta acessar
                    a pagina de informações de algum livro (pela sua biblioteca
                    ou pela pesquisa) e clicar em "Ler online"!
                </p>
                <p className="">Dica: apenas arquivos EPUB são suportados.</p>
            </div>
        </div>
    );
}
