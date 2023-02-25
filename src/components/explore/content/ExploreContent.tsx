import { MDBTabsContent, MDBTabsPane } from "mdb-react-ui-kit";
import ExploreContentPopular from "./ExploreContentPopular";
import ExploreContentRecent from "./ExploreContentRecent";

interface Props {
    activeTab: number;
    handleTabClick: (value: number) => void;
}

export default function ExploreContent({ activeTab, handleTabClick }: Props) {
    return (
        <MDBTabsContent className="flex-grow-1 d-flex flex-column">
            <MDBTabsPane show={activeTab === 1}>
                {activeTab === 1 ? <ExploreContentPopular /> : null}
            </MDBTabsPane>
            <MDBTabsPane show={activeTab === 2}>
                {activeTab === 2 ? <ExploreContentRecent /> : null}
            </MDBTabsPane>
        </MDBTabsContent>
    );
}
