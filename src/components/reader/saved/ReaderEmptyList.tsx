import Break from "../../general/Break";
import React from "react";
import SmallLine from "../../general/SmallLine";

export default function () {
    return (
        <div
            className="bg-black p-2 rounded-7 bg-opacity-25 text-light mt-4 "
            style={{ width: "80vw", minHeight: "20vh" }}
        >
            <div className="d-flex flex-wrap justify-content-center mb-2">
                <span className="fw-bold lead">Livros salvos</span>
                <Break />
                <SmallLine flexGrow />
            </div>
            <Break />
            <div className="text-center">
                <p className="lead">Vazio, por enquanto...</p>
                <p className="lead">
                    Os livros que você optar por ler online aparecerão aqui.
                </p>
                <p className="text-muted">
                    Dica: basta clicar em "Ler online" nas informações do seu
                    livro.{" "}
                </p>
            </div>
        </div>
    );
}
