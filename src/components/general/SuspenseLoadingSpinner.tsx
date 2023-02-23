import BlankLoadingSpinner from "./BlankLoadingSpinner";

export default function SuspenseLoadingSpinner() {
    return (
        <div className="d-flex flex-column align-items-center h-100 w-100 min-vh-100">
            <div className="ms-auto me-auto mt-auto mb-auto">
                <BlankLoadingSpinner />
            </div>
        </div>
    );
}
