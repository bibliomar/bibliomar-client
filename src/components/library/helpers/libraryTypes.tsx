import React, { SetStateAction } from "react";

export interface PossibleFilters {
    title: string | undefined;
    authors: string | undefined;
    isReading: boolean;
    format: string | undefined;
}

export interface FiltersContext {
    filters: PossibleFilters;
    setFilters: React.Dispatch<SetStateAction<PossibleFilters>>;
}
