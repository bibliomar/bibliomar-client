import LoadingSending from "./LoadingSending";
import LoadingWaiting from "./LoadingWaiting";
import LoadingDone from "./LoadingDone";
import LoadingError from "./LoadingError";

interface loadingStatus {
    status: string;
    errorType?: string;
}
export default function LoadingScreen(props: loadingStatus) {
    function loadOnStatus() {
        if (props.status === "sending") {
            return <LoadingSending />;
        } else if (props.status === "waiting") {
            return <LoadingWaiting />;
        } else if (props.status === "done") {
            return <LoadingDone />;
        } else if (props.status === "error") {
            return (
                <>
                    <LoadingError errorType={props.errorType!} />
                </>
            );
        }
    }
    return <div className="text-dark">{loadOnStatus()}</div>;
}
