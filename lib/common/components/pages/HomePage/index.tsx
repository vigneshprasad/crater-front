import HomePageLayout from "lib/common/components/layouts/HomePageLayout";
import Page from "lib/common/components/layouts/Page";
import AccountTab from "lib/common/components/objects/AccountTab";
import HomeNavbar from "lib/common/components/objects/HomeNavbar";
import { HOME_MENU_ITEMS } from "lib/common/constants/ui.constants";

import { useRouter } from "next/dist/client/router";
import dynamic from "next/dynamic";

import { useEffect, useState } from "react";

const TradingFloorTab = dynamic(
  () => import("lib/common/components/objects/TradingFloorTab")
);

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(HOME_MENU_ITEMS[0].id);
  const router = useRouter();
  useEffect(() => {
    const slug = router.query.tab?.[0] ?? "";
    if (slug) {
      setActiveTab(slug);
    }
  }, [router]);

  const title = HOME_MENU_ITEMS.find((item) => item.id === activeTab)?.title;

  return (
    <Page title={`Home | ${title}`}>
      <HomePageLayout>
        <HomeNavbar menuItems={HOME_MENU_ITEMS} selected={activeTab} />
        {activeTab === "trading" && <TradingFloorTab heading="Trading Floor" />}
        {activeTab === "account" && <AccountTab heading="Account Settings" />}
      </HomePageLayout>
    </Page>
  );
};

export default HomePage;
