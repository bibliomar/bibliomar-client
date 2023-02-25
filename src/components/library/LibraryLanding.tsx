import React, { useContext, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Break from "../general/Break";
import LibraryNavbar from "./LibraryNavbar";
import {
    Metadata,
    LibraryCategories,
    UserLibrary,
} from "../general/helpers/generalTypes";
import LibraryMinimalCategory from "./LibraryMinimalCategory";
import { useTranslation } from "react-i18next";
import { UserLibraryContext } from "./helpers/libraryFunctions";
import { libraryCategoryToLocaleText } from "../general/helpers/generalFunctions";

export default function LibraryLanding() {
    const userLibraryContext = useContext(UserLibraryContext);
    const userLibrary = userLibraryContext.userLibrary;
    const { t } = useTranslation();

    return (
        <div className="d-flex flex-wrap mt-5 w-100">
            <LibraryNavbar />
            <Break />
            <LibraryMinimalCategory
                title={libraryCategoryToLocaleText(
                    t,
                    LibraryCategories.reading
                )}
                message={t("library:readingExplanation")}
                metadataCategory={LibraryCategories.reading}
                metadata={Object.values(userLibrary.reading)}
            />
            <Break />
            <LibraryMinimalCategory
                title={libraryCategoryToLocaleText(t, LibraryCategories.toRead)}
                message={t("library:planToReadExplanation")}
                metadataCategory={LibraryCategories.toRead}
                metadata={Object.values(userLibrary.toRead)}
            />
            <Break />
            <LibraryMinimalCategory
                title={libraryCategoryToLocaleText(
                    t,
                    LibraryCategories.finished
                )}
                message={t("library:livrosQueVocFinalizou")}
                metadataCategory={LibraryCategories.finished}
                metadata={Object.values(userLibrary.finished)}
            />
            <Break />
            <LibraryMinimalCategory
                title={libraryCategoryToLocaleText(
                    t,
                    LibraryCategories.backlog
                )}
                message={t("library:backlogExplanation")}
                metadataCategory={LibraryCategories.backlog}
                metadata={Object.values(userLibrary.backlog)}
            />
            <Break />
            <LibraryMinimalCategory
                title={libraryCategoryToLocaleText(
                    t,
                    LibraryCategories.dropped
                )}
                message={t("library:livrosQueVocAbandonou")}
                metadataCategory={LibraryCategories.dropped}
                metadata={Object.values(userLibrary.dropped)}
            />
            <Break />
        </div>
    );
}
