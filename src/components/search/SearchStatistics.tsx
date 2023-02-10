import { Trans, useTranslation } from "react-i18next";

interface SearchStatisticsProps {
    totalResults: number | null;
    tookTime: number | null;
    offset: number;
    limit: number;
    paginableResults: number | null;
    disabled?: boolean;
}

export default function SearchStatistics({
    tookTime,
    totalResults,
    disabled,
    paginableResults,
    offset,
    limit,
}: SearchStatisticsProps) {
    const { t } = useTranslation();
    const renderStatistics = () => {
        if (
            disabled ||
            totalResults == null ||
            tookTime == null ||
            paginableResults == null
        ) {
            return null;
        } else if (
            totalResults === 0 ||
            tookTime === 0 ||
            paginableResults === 0
        ) {
            return null;
        } else {
            return (
                <div className="d-flex justify-content-center">
                    <div className="text-center">
                        <div className="w-100">
                            {paginableResults < totalResults ? (
                                <p>
                                    <Trans
                                        ns="search"
                                        i18nKey="exibindoDeMaisDeEncontradosEmMs"
                                        values={{
                                            paginableResults: paginableResults,
                                            offset: offset,
                                            tookTime: tookTime,
                                            limit: limit,
                                        }}
                                        components={{
                                            s: <strong />,
                                            s2: <strong />,
                                            s3: <strong />,
                                        }}
                                    />
                                </p>
                            ) : (
                                <p>
                                    <Trans
                                        ns="search"
                                        i18nKey="exibindoDeEncontradosEmMs"
                                        values={{
                                            totalResults: totalResults,
                                            offset: offset,
                                            tookTime: tookTime,
                                            limit: limit,
                                        }}
                                        components={{
                                            s: <strong />,
                                            s2: <strong />,
                                            s3: <strong />,
                                        }}
                                    />
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            );
        }
    };
    return renderStatistics();
}
