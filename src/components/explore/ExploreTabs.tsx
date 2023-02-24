import { MDBIcon, MDBTabs, MDBTabsItem, MDBTabsLink } from "mdb-react-ui-kit";
import { useTranslation } from "react-i18next";

interface Props {
    activeTab: number;
    handleTabClick: (value: number) => void;
}

export default function ExploreTabs({ activeTab, handleTabClick }: Props) {
    const { t } = useTranslation();
    return (
        <MDBTabs pills>
            <MDBTabsItem>
                <MDBTabsLink
                    active={activeTab === 1}
                    onClick={() => handleTabClick(1)}
                >
                    <MDBIcon fas icon="fire-alt" className="me-2" />{" "}
                    {t("explore:populares")}
                </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
                <MDBTabsLink
                    active={activeTab === 2}
                    onClick={() => handleTabClick(2)}
                >
                    <MDBIcon far icon="calendar-plus" className="me-2" />
                    {t("explore:recentes")}
                </MDBTabsLink>
            </MDBTabsItem>
        </MDBTabs>
    );
}
