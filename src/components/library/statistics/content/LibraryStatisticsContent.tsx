import Break from "../../../general/Break";
import LibraryStatisticsContentComposition from "./LibraryStatisticsContentComposition";
import LibraryStatisticsContentFinished from "./LibraryStatisticsContentFinished";
import LibraryStatisticsContentGeneral from "./LibraryStatisticsContentGeneral";

export default function LibraryStatisticsContent() {
    return (
        <div className="w-100 d-flex flex-wrap">
            <LibraryStatisticsContentComposition />
            <Break className="mt-4" />
            <LibraryStatisticsContentFinished />
            <Break className="mt-5" />
            <LibraryStatisticsContentGeneral />
        </div>
    );
}
