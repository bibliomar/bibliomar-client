import { Size, useWindowSize } from "./helpers/useWindowSize";
import React from "react";

interface Breaking {
    className?: string;
    mobile?: boolean;
    desktop?: boolean;
}

const BreakComponent = ({ className }: Breaking) => {
    return <div className={`break ${className}`} />;
};

// Talk about code golfing...
// TODO: refactoring
export default function Break({ className, mobile, desktop }: Breaking) {
    const size: Size = useWindowSize();
    const onBoth = !mobile && !desktop;
    const onMobile = mobile && !desktop && size.width <= 768;
    const onDesktop = !mobile && desktop && size.width >= 768;
    const renderConditionally = () => {
        if (onBoth) {
            return <BreakComponent />;
        } else if (onMobile) {
            return <BreakComponent />;
        } else if (onDesktop) {
            return <BreakComponent />;
        } else {
            return null;
        }
    };
    return <>{renderConditionally()}</>;
}
