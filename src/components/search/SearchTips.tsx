import { useTranslation } from "react-i18next";

export default function SearchTips() {
    const { t } = useTranslation();

    const getSearchTips = () => {
        const tip1 =
            "A sugestão de pesquisa mostra resultados com base nos filtros que você selecionou.";
        const tip2 =
            "Você pode pesquisar por formatos e linguagens diretamente na caixa de pesquisa.";
        const tip3 =
            "Nosso Discord é o melhor local para fazer sugestões. Qualquer feedback é bem vindo!";
        const tip4 =
            "Você pode pressionar o icone proximo ao icone de pesquisa para ativar a pesquisa com filtros.";
        const tip5 = "Experimente o beta do Bibliomar! ";

        const tips = [tip1, tip2, tip3, tip4];
        return <span>{tips[Math.floor(Math.random() * tips.length)]}</span>;
    };

    return (
        <div className="d-flex flex-wrap justify-content-center mb-5">
            <span
                style={{ fontSize: "1rem" }}
                className="greeting-text text-center text-muted"
            >
                Dica: {getSearchTips()}
            </span>
            <div className="break" />
        </div>
    );
}
