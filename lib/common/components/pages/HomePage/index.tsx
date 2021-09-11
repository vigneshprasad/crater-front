import { useState, useMemo, useEffect } from "react";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import BaseLayout from "../../layouts/BaseLayout";
import AsideNav from "../../objects/AsideNav";
import { INavItem, MenuKeys } from "../../objects/HomeNavBar";
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      <BaseLayout overflowY="auto" aside={<AsideNav />}>
        <Component />
      </BaseLayout>
    </Page>
  );
}
