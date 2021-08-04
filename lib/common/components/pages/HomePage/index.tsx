import { useState, useMemo } from "react";

import HomePageLayout from "../../layouts/HomePageLayout";
import { HomeNavBar, INavItem, MenuKeys } from "../../objects/HomeNavBar";
import Page from "../../objects/Page";

type IProps = {
  tab?: string;
};

const HomePage: React.FC<IProps> = () => {
  const [activeTab] = useState<MenuKeys>("clubs");

  const MENU_ITEMS: INavItem[] = useMemo(
    () => [
      {
        icon: "Chart",
        slug: "clubs",
        url: "/home/",
      },
    ],
    []
  );

  return (
    <Page
      seo={{
        title: "Home Page",
        description: "Crater Club",
      }}
    >
      <HomePageLayout>
        {{
          navbar: <HomeNavBar active={activeTab} items={MENU_ITEMS} />,
          tabContent: <div>Hello</div>,
        }}
      </HomePageLayout>
    </Page>
  );
};

export default HomePage;
