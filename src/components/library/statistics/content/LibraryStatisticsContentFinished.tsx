import {
    buildMonthsList,
    UserLibraryContext,
} from "../../helpers/libraryFunctions";
import { useContext, useMemo } from "react";
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    ChartData,
    ChartDataset,
    ChartOptions,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from "chart.js";
import { UserLibrary } from "../../../general/helpers/generalTypes";
import { Bar } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import { i18n } from "i18next";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function buildLabels(i18n: i18n, monthList: Date[]): string[] {
    return monthList.map((date) => {
        return (
            date.toLocaleString(i18n.language, { month: "long" }) +
            " " +
            date.getFullYear()
        );
    });
}

function buildDataset(monthList: Date[], userLibrary: UserLibrary) {
    const targetCategoryValues = Object.values(userLibrary.finished);
    const mainData: ChartDataset<"bar"> = {
        label: "Finished books",
        data: monthList.map((date) => {
            const finishedBooks = targetCategoryValues.filter((metadata) => {
                if (metadata.addedOnLibraryAt == null) {
                    return false;
                }
                const finishedAt = new Date(metadata.addedOnLibraryAt);
                return date.getMonth() === finishedAt.getMonth();
            });

            return finishedBooks.length;
        }),
        backgroundColor: "rgb(255, 99, 132)",
    };

    const datasetValues: ChartDataset<"bar">[] = [mainData];
    return datasetValues;
}

export default function LibraryStatisticsContentFinished() {
    const { userLibrary } = useContext(UserLibraryContext);
    const { t, i18n } = useTranslation();
    const months = useMemo(() => {
        return buildMonthsList();
    }, []);

    const labels = buildLabels(i18n, months);

    const memoizedData = useMemo(() => {
        const data: ChartData<"bar"> = {
            labels,
            datasets: buildDataset(months, userLibrary),
        };
        return data;
    }, [userLibrary]);

    const options: ChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y" as const,
        elements: {
            bar: {
                borderWidth: 2,
            },
        },

        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: t("library:yourMonthlyReading") as string,
                font: {
                    size: 20,
                },
            },
        },
    };

    return (
        <div className="w-100 position-relative library-statistics-canvas">
            <Bar options={options} data={memoizedData} />
        </div>
    );
}
