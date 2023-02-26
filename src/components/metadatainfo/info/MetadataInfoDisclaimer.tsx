import { Trans } from "react-i18next";

export default function MetadataInfoDisclaimer() {
    return (
        <div className="d-flex flex-wrap text-muted">
            <h6
                className="book-info-title mb-2 text-start w-100"
                style={{ fontWeight: "700" }}
            >
                Disclaimer
            </h6>
            <p className="text-start text-muted">
                <Trans
                    i18nKey="oBibliomarNoHospedaQuaisquerArquivosDeLivrosEmSeus"
                    ns="metadatainfo"
                    components={{
                        s: <strong />,
                    }}
                />
            </p>
        </div>
    );
}
