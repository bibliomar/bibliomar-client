import { Trans, useTranslation } from "react-i18next";
import { useMemo } from "react";

export default function SearchTips() {
    const { t, i18n } = useTranslation();

    const getSearchTips = () => {
        const tip1 = t(
            "search:aSugestoDePesquisaMostraResultadosComBaseNosFiltro"
        );
        const tip2 = t(
            "search:vocPodePesquisarPorFormatosELinguagensDiretamenteN"
        );
        const tip3 = t(
            "search:nossoDiscordOMelhorLocalParaFazerSugestesQualquerF"
        );
        const tip4 = t(
            "search:vocPodePressionarOIconeProximoAoIconeDePesquisaPar"
        );
        const tip5 = (
            <span>
                <Trans i18nKey="experimenteO" ns="search" />{" "}
                <a href="https://beta.bibliomar.site">
                    {t("search:betaDoBibliomar")}
                </a>
                !
            </span>
        );

        const tips = [tip1, tip2, tip3, tip4, tip5];
        return <>{tips[Math.floor(Math.random() * tips.length)]}</>;
    };

    // The tip should only be generated once per page.
    // Using useMemo avoids unnecessary "re-renders".
    const shownTip = useMemo(() => {
        return getSearchTips();
    }, [i18n.language]);

    return (
        <div className="d-flex flex-wrap justify-content-center mb-5">
            <span
                style={{ fontSize: "1rem" }}
                className="greeting-text text-center text-muted"
            >
                {shownTip}
            </span>
            <div className="break" />
        </div>
    );
}
