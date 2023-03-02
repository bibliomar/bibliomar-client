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
import { LibraryCategories } from "../../../general/helpers/generalTypes";
import { Bar } from "react-chartjs-2";
import { libraryCategoryToLocaleText } from "../../../general/helpers/generalFunctions";
import { useTranslation } from "react-i18next";
import Break from "../../../general/Break";

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
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Your library composition",
            font: {
                size: 20,
            },
        },
    },
};

export default function LibraryStatisticsContentComposition() {
    const { userLibrary } = useContext(UserLibraryContext);
    const { t } = useTranslation();
    const labels = Object.values(LibraryCategories).map((category) => {
        return libraryCategoryToLocaleText(t, category);
    });

    const memoizedData = useMemo(() => {
        const data: ChartData<"bar"> = {
            labels,
            datasets: [
                {
                    label: "Total books",
                    data: Object.values(LibraryCategories).map(
                        (label) => Object.values(userLibrary[label]).length
                    ),
                    backgroundColor: "#7663F2",
                },
                {
                    label: "Fiction",
                    data: Object.values(LibraryCategories).map((label) => {
                        const fictionEntries = Object.values(
                            userLibrary[label]
                        ).filter((metadata, index) => {
                            return metadata.topic === "fiction";
                        });
                        return fictionEntries.length;
                    }),
                    backgroundColor: "rgb(53, 162, 235)",
                },
                {
                    label: "Non fiction",
                    data: Object.values(LibraryCategories).map((label) => {
                        const fictionEntries = Object.values(
                            userLibrary[label]
                        ).filter((metadata, index) => {
                            return metadata.topic === "scitech";
                        });
                        return fictionEntries.length;
                    }),
                    backgroundColor: "rgb(26, 113, 135)",
                },
            ],
        };
        return data;
    }, [userLibrary]);

    return (
        <div className="w-100 position-relative library-statistics-canvas">
            <Bar options={options} data={memoizedData} />
        </div>
    );
}
