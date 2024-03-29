import Break from "../general/Break";
import React from "react";
import SmallLine from "../general/SmallLine";
import { useTranslation } from "react-i18next";

export default function ReaderGreeting() {
    const { t } = useTranslation();
    return (
        <div className="basic-container d-flex flex-wrap justify-content-center p-3">
            <div className="text-center simple-text-bolder w-75 mt-5">
                <p className="lead">
                    {t("reader:vocPodeEnviarSeuArquivoLocalPorAqui")}
                </p>
                <p className="">
                    {t("reader:dicaApenasArquivosEpubSoSuportados")}
                </p>
            </div>
        </div>
    );
}
