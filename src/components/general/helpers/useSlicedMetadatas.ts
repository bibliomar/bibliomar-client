import { Metadata } from "./generalTypes";
import { useMemo } from "react";

/**
 * A optimized pre-made hook to slice a list of metadata into a list of slices. <br>
 * Useful for rendering a list of metadata in a grid system.
 * @param metadatas
 * @param itemsPerSlice
 */
export default function useSlicedMetadatas(
    metadatas: Metadata[],
    itemsPerSlice: number
): Metadata[][] {
    const slicedMetadataList = useMemo(() => {
        const listOfSlices: Metadata[][] = [];
        for (let start = 0; start < metadatas.length; start += itemsPerSlice) {
            const end = start + itemsPerSlice;
            const sliced = metadatas.slice(start, end);
            listOfSlices.push(sliced);
        }

        return listOfSlices;
    }, [metadatas, itemsPerSlice]);

    return slicedMetadataList;
}
