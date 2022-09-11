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

export default function Break({ className, mobile, desktop }: Breaking) {
    const size: Size = useWindowSize();
    const onBoth = !mobile && !desktop;
    const onMobile = mobile && !desktop && size.width <= 768;
    const onDesktop = !mobile && desktop && size.width >= 768;
    const renderConditionally = () => {
        if (onMobile && !onDesktop) {
            return <BreakComponent className={className} />;
        } else if (onDesktop && !onMobile) {
            return <BreakComponent className={className} />;
        } else if (onBoth) {
            return <BreakComponent className={className} />;
        } else {
            return null;
        }
    };
    return <>{renderConditionally()}</>;
}
