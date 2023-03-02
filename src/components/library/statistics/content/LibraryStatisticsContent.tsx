import Break from "../../../general/Break";
import LibraryStatisticsContentComposition from "./LibraryStatisticsContentComposition";
import LibraryStatisticsContentFinished from "./LibraryStatisticsContentFinished";

export default function LibraryStatisticsContent() {
    return (
        <div className="w-100 d-flex flex-wrap">
            <LibraryStatisticsContentComposition />
            <Break className="mt-4" />
            <LibraryStatisticsContentFinished />
        </div>
    );
}
