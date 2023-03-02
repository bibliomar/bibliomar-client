import { UserLibraryContext } from "../../helpers/libraryFunctions";
import { useContext, useMemo } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    ChartDataset,
    ChartOptions,
} from "chart.js";
import {
    LibraryCategories,
    UserLibrary,
} from "../../../general/helpers/generalTypes";
import { Bar } from "react-chartjs-2";
import { libraryCategoryToLocaleText } from "../../../general/helpers/generalFunctions";
import { useTranslation } from "react-i18next";
import Break from "../../../general/Break";
import { i18n, TFunction } from "i18next";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

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
            text: "Books finished by month",
            font: {
                size: 20,
            },
        },
    },
};

function buildMonthsList(): Date[] {
    const months = [];

    const currentDate = new Date();
    const monthsOffset = 11;
    const startMonth = currentDate.getMonth() - monthsOffset;
    for (let i = startMonth; i <= currentDate.getMonth(); i++) {
        if (i === currentDate.getMonth()) {
            months.push(currentDate);
        } else {
            months.push(new Date(currentDate.getFullYear(), i, 1));
        }
    }
    return months;
}

function buildLabels(i18n: i18n, monthList: Date[]): string[] {
    return monthList.map((date) => {
        return (
            date.toLocaleString(i18n.language, { month: "long" }) +
            " " +
            date.getFullYear()
        );
    });
}

const fakeMetadataDates = (): Date[] => {
    const dates: Date[] = [];
    for (let i = 0; i < 80; i++) {
        const randomMonth = Math.random() * (12 - 1 + 1) + 1;
        dates.push(new Date(2022, randomMonth, 1));
    }
    return dates;
};

function buildDataset(monthList: Date[], userLibrary: UserLibrary) {
    const targetCategoryValues = Object.values(userLibrary.finished);
    const mainData: ChartDataset<"bar"> = {
        label: "Finished at this month",
        data: monthList.map((date) => {
            /**
             const finishedBooks = targetCategoryValues.filter((metadata) => {
                if (metadata.addedOnLibraryAt == null) {
                    return false;
                }
                const finishedAt = new Date(metadata.addedOnLibraryAt);
                return date.getMonth() === finishedAt.getMonth();
            });

             return finishedBooks.length;
             */
            const finishedDates = fakeMetadataDates().filter((fakeDate) => {
                return date.getMonth() === fakeDate.getMonth();
            });
            return finishedDates.length;
        }),
        backgroundColor: "#7663F2",
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

    return (
        <div className="w-100 position-relative library-statistics-canvas">
            <Bar options={options} data={memoizedData} />
        </div>
    );
}
