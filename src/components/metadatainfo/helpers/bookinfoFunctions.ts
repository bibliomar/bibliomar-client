import { LibraryCategories } from "../../general/helpers/generalTypes";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";

function libraryCategoryToLocaleText(
    transFunc: TFunction,
    category: LibraryCategories
) {
    const t = transFunc;
    switch (category) {
        case LibraryCategories.reading:
            return t("library:lendo");
        case LibraryCategories.toRead:
            return t("library:planejandoLer");
        case LibraryCategories.finished:
            return t("library:finalizado");
        case LibraryCategories.dropped:
            return t("library:abandonado");
        case LibraryCategories.backlog:
            return t("library:backlog");

        default:
            return category;
    }
}

export { libraryCategoryToLocaleText };
