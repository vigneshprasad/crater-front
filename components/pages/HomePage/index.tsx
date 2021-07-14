import { HOME_MENU_ITEMS } from "@constants/ui.constants";

import { useRouter } from "next/dist/client/router";
import dynamic from "next/dynamic";

import { useEffect, useState } from "react";

import HomePageLayout from "@components/layouts/HomePageLayout";
import Page from "@components/layouts/Page";
import HomeNavbar from "@components/objects/HomeNavbar";

const TradingFloorTab = dynamic(
  () => import("@components/objects/TradingFloorTab")
);

interface IProps {
  tabs: string;
}

const HomePage: React.FC<IProps> = () => {
  const [activeTab, setActiveTab] = useState(HOME_MENU_ITEMS[0].id);
  const router = useRouter();

  useEffect(() => {
    const slug = router.query.tab?.[0] ?? "";
    if (slug) {
      setActiveTab(slug);
    }
  }, [router]);

  return (
    <Page title="Home">
      <HomePageLayout>
        <HomeNavbar menuItems={HOME_MENU_ITEMS} selected={activeTab} />
        {activeTab === "trading" && <TradingFloorTab heading="Trading Floor" />}
      </HomePageLayout>
    </Page>
  );
};

export default HomePage;
