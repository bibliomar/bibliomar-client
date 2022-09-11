import { useCallback, useState } from "react";

export function useToggle(
    initialValue: boolean
): [boolean, (value?: boolean) => void] {
    // A placeholder toggle function, accepts a boolean value and returns it with an update function.
    const [toggled, setToggled] = useState<boolean>(initialValue);

    const toggle = (value?: boolean) => {
        // If called without value, changes the toggled value to !toggled.
        setToggled(value ? value : !toggled);
    };

    return [toggled, toggle];
}
