import { LibraryCategories } from "../../../general/helpers/generalTypes";

export default function BookInfoLibraryAddIcon({
    category,
}: {
    category: LibraryCategories;
}) {
    return (
        <img
            src={`/assets/img/library-add-${category}.svg`}
            alt="Adicionar a biblioteca"
        />
    );
}
