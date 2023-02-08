import { Size, useWindowSize } from "./helpers/useWindowSize";
import React from "react";

interface Breaking {
    className?: string;
    mobile?: boolean;
    tablet?: boolean;
    desktop?: boolean;
}

const BreakComponent = ({ className }: Breaking) => {
    return <div className={`break ${className ? className : null}`} />;
};

export default function Break({
    className,
    mobile,
    desktop,
    tablet,
}: Breaking) {
    const size: Size = useWindowSize();
    const all = !mobile && !desktop && !tablet;
    const onMobile = mobile && size.width < 768;
    const onTablet = tablet && size.width >= 768 && size.width < 1024;
    const onDesktop = desktop && size.width >= 1024;
    const renderConditionally = () => {
        let shouldRender = false;
        [all, onMobile, onTablet, onDesktop].forEach((ele, i) => {
            if (ele) {
                shouldRender = true;
            }
        });
        if (shouldRender) {
            return <BreakComponent className={className} />;
        }
        return null;
    };
    return <>{renderConditionally()}</>;
}
