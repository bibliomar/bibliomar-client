import { MDBTabsContent, MDBTabsPane } from "mdb-react-ui-kit";
import ExploreContentPopular from "./ExploreContentPopular";

interface Props {
    activeTab: number;
    handleTabClick: (value: number) => void;
}

export default function ExploreContent({ activeTab, handleTabClick }: Props) {
    return (
        <MDBTabsContent className="flex-grow-1 d-flex flex-column">
            <MDBTabsPane show={activeTab === 1}>
                <ExploreContentPopular />
            </MDBTabsPane>
            <MDBTabsPane show={activeTab === 2}>Teste 2</MDBTabsPane>
        </MDBTabsContent>
    );
}
