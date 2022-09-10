import React from "react";

export default function SimpleHoverMask() {
    return (
        <div
            className={"mask"}
            style={{
                backgroundColor: "rgba(0,0,0,0.2)",
                zIndex: "30000",
            }}
        />
    );
}
