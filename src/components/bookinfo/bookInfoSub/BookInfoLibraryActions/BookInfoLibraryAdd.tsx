import { LibraryCategories } from "../../../general/helpers/generalTypes";
import Break from "../../../general/Break";

interface LibraryAddProps {
    category: LibraryCategories;
    message: string;
    triedCategory: LibraryCategories | undefined;
    requestStatus: number;
    onclickHandler: (evt: any, category: LibraryCategories) => Promise<any>;
}

export default function BookInfoLibraryAdd({
    category,
    message,
    requestStatus,
    triedCategory,
    onclickHandler,
}: LibraryAddProps) {
    return (
        <div
            className="d-flex flex-wrap justify-content-center"
            style={{ position: "relative" }}
        >
            <button
                style={{
                    // This removes the button default styling.
                    position: "inherit",
                    background: "none",
                    color: "inherit",
                    border: "none",
                    padding: "0",
                    font: "inherit",
                    outline: "inherit",
                }}
                className=""
                onClick={async (evt) => {
                    console.log(onclickHandler);
                    await onclickHandler(evt, category);
                }}
                disabled={requestStatus !== 0}
            >
                <img
                    src="/assets/img/button-ellipse.svg"
                    alt="Adicionar a biblioteca"
                />
                <i
                    // "fas fa-ellipsis-h"
                    // "fas fa-plus"
                    className={
                        // Code, to golf or not to golf?
                        triedCategory
                            ? triedCategory === category
                                ? requestStatus === 200
                                    ? "fas fa-check"
                                    : "fas fa-ellipsis-h"
                                : "fas fa-plus"
                            : "fas fa-plus"
                    }
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        fontSize: "2rem",
                        textAlign: "center",
                    }}
                ></i>
            </button>
            <Break />
            <span>{message}</span>
        </div>
    );
}
