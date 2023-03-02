import React, { SetStateAction } from "react";
import { Metadata, UserLibrary } from "../../general/helpers/generalTypes";

export interface FailedMoveRemoveRequest {
    failedEntry: Metadata;
    message: JSX.Element | string;
}

export interface PossibleFilters {
    [key: string]: string | boolean;

    title: string;
    author: string;
    format: string;
}

export interface UserLibraryContextParams {
    userLibrary: UserLibrary;
    updateUserLibrary: () => void;
}

export interface EditModeContextParams {
    editMode: boolean;
    setEditMode: React.Dispatch<SetStateAction<boolean>>;
    selectedBooksRef: React.MutableRefObject<Metadata[]>;
}

export interface FiltersContextParams {
    filters: PossibleFilters;
    setFilters: React.Dispatch<SetStateAction<PossibleFilters>>;
}
