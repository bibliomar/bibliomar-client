import { Trans, useTranslation } from "react-i18next";
import React from "react";

interface SearchStatisticsProps {
    totalResults: number | null;
    tookTime: number | null;
    offset: number;
    paginableResults: number | null;
    itemsPerPage: number;
    disabled?: boolean;
}

export default function SearchStatistics({
    tookTime,
    totalResults,
    disabled,
    paginableResults,
    offset,
    itemsPerPage,
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
        } else if (totalResults === 0 || paginableResults === 0) {
            return null;
        } else {
            const visibleOffset = offset + 1;

            let visibleLimit = 0;
            if (offset + itemsPerPage > paginableResults) {
                visibleLimit = paginableResults;
            } else {
                visibleLimit = offset + itemsPerPage;
            }
            let message: string | React.ReactElement = "";
            if (paginableResults === itemsPerPage) {
                message = (
                    <Trans
                        ns="search"
                        i18nKey="exibindoEncontradosEmMs"
                        values={{
                            totalResults: totalResults,
                            tookTime: tookTime,
                        }}
                        components={{
                            s: <strong />,
                            s2: <strong />,
                            s3: <strong />,
                        }}
                    />
                );
            } else if (paginableResults < totalResults) {
                message = (
                    <Trans
                        ns="search"
                        i18nKey="exibindoDeMaisDeEncontradosEmMs"
                        values={{
                            paginableResults: paginableResults,
                            offset: visibleOffset,
                            tookTime: tookTime,
                            limit: visibleLimit,
                        }}
                        components={{
                            s: <strong />,
                            s2: <strong />,
                            s3: <strong />,
                        }}
                    />
                );
            } else {
                message = (
                    <Trans
                        ns="search"
                        i18nKey="exibindoDeEncontradosEmMs"
                        values={{
                            totalResults: totalResults,
                            paginableResults: paginableResults,
                            offset: visibleOffset,
                            tookTime: tookTime,
                            limit: visibleLimit,
                        }}
                        components={{
                            s: <strong />,
                            s2: <strong />,
                            s3: <strong />,
                        }}
                    />
                );
            }
            return (
                <div className="d-flex justify-content-center">
                    <div className="text-center">
                        <div className="w-100">
                            <p>{message}</p>
                        </div>
                    </div>
                </div>
            );
        }
    };
    return renderStatistics();
}
