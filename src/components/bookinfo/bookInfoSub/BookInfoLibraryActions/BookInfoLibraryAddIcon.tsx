import { LibraryCategories } from "../../../general/helpers/generalTypes";
import { useTranslation } from "react-i18next";

export default function BookInfoLibraryAddIcon({
    category,
}: {
    category: LibraryCategories;
}) {
    const { t } = useTranslation();
    return (
        <img
            src={`/assets/img/library-add-${category}.svg`}
            alt={t("bookinfo:altAddToLibrary") as string}
        />
    );
}
