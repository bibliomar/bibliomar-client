import { MDBIcon, MDBTabs, MDBTabsItem, MDBTabsLink } from "mdb-react-ui-kit";

interface Props {
    activeTab: number;
    handleTabClick: (value: number) => void;
}

export default function ExploreTabs({ activeTab, handleTabClick }: Props) {
    return (
        <MDBTabs pills>
            <MDBTabsItem>
                <MDBTabsLink
                    active={activeTab === 1}
                    onClick={() => handleTabClick(1)}
                >
                    <MDBIcon fas icon="fire-alt" className="me-2" /> Populares
                </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
                <MDBTabsLink
                    active={activeTab === 2}
                    onClick={() => handleTabClick(2)}
                >
                    <MDBIcon far icon="calendar-plus" className="me-2" />
                    Recentes
                </MDBTabsLink>
            </MDBTabsItem>
        </MDBTabs>
    );
}
