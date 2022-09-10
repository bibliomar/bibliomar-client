import { Size, useWindowSize } from "./helpers/useWindowSize";
import React from "react";

interface Breaking {
    className?: string;
    mobile?: boolean;
    desktop?: boolean;
}

// Talk about code golfing...
export default function Break({ className, mobile, desktop }: Breaking) {
    const size: Size = useWindowSize();

    const onMobile = (): boolean => {
        return !!(mobile && size.width <= 768);
    };

    const onDesktop = (): boolean => {
        return !!(desktop && size.width >= 768);
    };

    const onBoth = (): boolean => {
        // Only render on both desktop and mobile if both props are provided, or if not.
        return !!(desktop && mobile && !desktop && !mobile);
    };

    const BreakComponent = () => {
        return (
            <div className={className ? `break ${className}` : "break"}></div>
        );
    };

    const renderBasedOnPlataform = () => {
        if (onBoth()) {
            return <BreakComponent />;
        } else if (onMobile()) {
            return <BreakComponent />;
        } else if (onDesktop()) {
            return <BreakComponent />;
        } else {
            return null;
        }
    };

    return <>{renderBasedOnPlataform()}</>;
}
