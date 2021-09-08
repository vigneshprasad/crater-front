import { useState, useMemo, useEffect } from "react";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import HomePageLayout from "../../layouts/HomePageLayout";
import { HomeNavBar, INavItem, MenuKeys } from "../../objects/HomeNavBar";
import Page from "../../objects/Page";

const ClubTab = dynamic(() => import("@/creators/components/objects/ClubTab"));
const AccountTab = dynamic(
  () => import("@/auth/components/objects/AccountTab")
);

const TAB_CONTENT_MAP: Record<MenuKeys, React.ComponentType> = {
  clubs: ClubTab,
  wallet: ClubTab,
  account: AccountTab,
};

export default function HomePage(): JSX.Element | null {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<MenuKeys | undefined>();

  const MENU_ITEMS: INavItem[] = useMemo(
    () => [
      {
        icon: "Chart",
        slug: "clubs",
        url: "/home/clubs/",
      },
    ],
    []
  );

  useEffect(() => {
    const params = router.query.tab?.[0] as MenuKeys;
    if (params) {
      setActiveTab(params);
    }
  }, [router]);

  if (!activeTab) return null;

  const Component = TAB_CONTENT_MAP[activeTab];

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
          tabContent: <Component />,
        }}
      </HomePageLayout>
    </Page>
  );
}
