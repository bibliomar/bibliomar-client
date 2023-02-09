import { useTranslation } from "react-i18next";

interface SearchStatisticsProps {
    total: number | null;
    took: number | null;
    disabled?: boolean;
}

export default function SearchStatistics({
    took,
    total,
    disabled,
}: SearchStatisticsProps) {
    const { t } = useTranslation();
    const renderStatistics = () => {
        if (disabled) {
            return null;
        } else if (took === null || total === null) {
            return null;
        } else if (total === 0 || took === 0) {
            return null;
        } else {
            return (
                <div className="d-flex justify-content-center">
                    <div className="searchfield text-center">
                        <div className="w-100">
                            <p>
                                {total} resultados encontrados em {took}ms
                            </p>
                        </div>
                    </div>
                </div>
            );
        }
    };
    return renderStatistics();
}
