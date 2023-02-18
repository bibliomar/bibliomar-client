import { Metadata } from "../../general/helpers/generalTypes";
import { useWindowSize } from "../../general/helpers/useWindowSize";
import useSlicedMetadatas from "../../general/helpers/useSlicedMetadatas";
import { MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import MetadataInfoSimilarFigure from "./MetadataInfoSimilarFigure";

interface Props {
    metadatas: Metadata[];
}

export default function MetadataInfoSimilarResults({ metadatas }: Props) {
    const { width } = useWindowSize();

    // The number of items per row will be different depending on the screen size.
    // Make sure to set this to a number divisible by 12 (bootstrap grid max size).
    const gridSize = 12;
    let itemsPerRow = 6;
    if (width < 768) {
        itemsPerRow = 3;
    } else if (width < 1024) {
        itemsPerRow = 4;
    }

    const maxVisibleRows = 3;
    const maxVisibleItems = itemsPerRow * maxVisibleRows;

    // The list of slices to be rendered.
    // They will be rendered using MDBootstrap grid system.
    const slicedMetadataList = useSlicedMetadatas(metadatas, itemsPerRow);
    return (
        <MDBContainer fluid>
            {slicedMetadataList.map((slice, rowIndex) => {
                return (
                    <MDBRow key={rowIndex} className="d-flex flex-nowrap w-100">
                        {slice.map((metadata, itemIndex) => {
                            const timeout =
                                itemIndex === 0 ? 750 : itemIndex * 750;
                            return (
                                <MDBCol
                                    size={Math.ceil(gridSize / itemsPerRow)}
                                    className="gx-2"
                                >
                                    <MetadataInfoSimilarFigure
                                        key={itemIndex}
                                        metadata={metadata}
                                        timeout={timeout}
                                    />
                                </MDBCol>
                            );
                        })}
                    </MDBRow>
                );
            })}
        </MDBContainer>
    );
}
