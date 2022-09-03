import { useCallback, useState } from "react";

export function useToggle(initialValue: boolean): [boolean, () => void] {
    const [toggled, setToggled] = useState<boolean>(initialValue);

    const toggle = () => {
        setToggled(!toggled);
    };

    return [toggled, toggle];
}
