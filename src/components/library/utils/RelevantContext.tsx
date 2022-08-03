import React from "react";
import { Book } from "../../general/helpers/generalTypes";

interface SelectedContext {
    selectedBooks: Book[];
    setFunction: any;
}

const defaultSelectedValue = {
    selectedBooks: [],
    setFunction: undefined,
};

const EditModeContext = React.createContext<boolean>(false);
const SelectedBooksContext =
    React.createContext<SelectedContext>(defaultSelectedValue);
export type { SelectedContext };
export { EditModeContext, SelectedBooksContext };
