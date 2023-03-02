import { useContext, useMemo } from "react";
import {
    buildMonthsList,
    calculateNumOfBooks,
    UserLibraryContext,
} from "../../helpers/libraryFunctions";
import { Trans, useTranslation } from "react-i18next";
import Break from "../../../general/Break";
import { Metadata, UserLibrary } from "../../../general/helpers/generalTypes";

function calculateMonthlyAverage(userLibrary: UserLibrary) {
    let internalCounter = 0;
    const dates = buildMonthsList();
    const targetCategoryValues = Object.values(userLibrary.finished);
    dates.forEach((date) => {
        const booksFinishedInMonth = targetCategoryValues.filter((metadata) => {
            if (metadata.addedOnLibraryAt == null) {
                return false;
            }
            const finishedAt = new Date(metadata.addedOnLibraryAt);
            return finishedAt.getMonth() === date.getMonth();
        });

        internalCounter += booksFinishedInMonth.length;
    });

    if (internalCounter > 0) {
        return Math.round(internalCounter / dates.length);
    } else {
        return 0;
    }
}

function calculateBiggestRead(userLibrary: UserLibrary): Metadata | undefined {
    const targetCategoryValues = Object.values(userLibrary.finished);
    let internalCounter = 0;
    let biggestRead: Metadata | undefined = undefined;

    targetCategoryValues.forEach((metadata) => {
        if (metadata.pages == null) {
            return;
        }

        try {
            const parsedPage = parseInt(metadata.pages);
            // Just to be extra safe...
            if (Number.isInteger(parsedPage)) {
                internalCounter = Math.max(internalCounter, parsedPage);
                if (internalCounter > parsedPage) {
                    biggestRead = metadata;
                }
            }
        } catch (e: any) {
            // Do nothing
        }
    });

    return biggestRead;
}

export default function LibraryStatisticsContentGeneral() {
    const { userLibrary } = useContext(UserLibraryContext);
    const { t } = useTranslation();
    const monthlyAverage = useMemo(
        () => calculateMonthlyAverage(userLibrary),
        [userLibrary]
    );
    const biggestRead = useMemo(
        () => calculateBiggestRead(userLibrary),
        [userLibrary]
    );

    return (
        <div className="w-100 d-flex flex-wrap">
            <h5 className="text-start w-100">
                {t("library:generalStatistics")}
            </h5>
            <Break className="mt-2" />
            <h6>
                <Trans
                    i18nKey="totalBooksBooks"
                    ns="library"
                    values={{
                        expr: " ",
                        calculateNumOfBooks: calculateNumOfBooks(userLibrary),
                    }}
                    components={{
                        s: <strong />,
                    }}
                />
            </h6>
            <Break />
            <h6>
                <Trans
                    i18nKey="totalPagesReadPages"
                    ns="library"
                    values={{
                        pagesRead: userLibrary.pagesRead,
                    }}
                    components={{
                        s: <strong />,
                    }}
                />
            </h6>
            <Break />
            <h6>
                <Trans
                    i18nKey="yearlyReadingAverageBookPerMonth"
                    ns="library"
                    values={{
                        monthlyAverage: monthlyAverage,
                    }}
                    components={{
                        s: <strong />,
                    }}
                />
            </h6>
            {biggestRead != null ? (
                <>
                    <Break />
                    <h6>
                        <Trans
                            i18nKey="biggestReadByPages"
                            ns="library"
                            values={{
                                pages: biggestRead.pages,
                                author: biggestRead.author,
                                title: biggestRead.title,
                            }}
                            components={{
                                s: <strong />,
                                s2: <strong />,
                            }}
                        />
                    </h6>
                </>
            ) : null}
        </div>
    );
}
