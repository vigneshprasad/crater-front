import dynamic from "next/dynamic";

import BaseLayout from "@/common/components/layouts/BaseLayout/v2";
import { AsideNav } from "@/common/components/objects/AsideNav/v2";
import Page from "@/common/components/objects/Page";

const StorePage = dynamic(() => import("@/tokens/components/pages/StorePage"));

export default function Store(): JSX.Element {
  return (
    <Page
      seo={{
        title: "Discover Content and Art by Creators",
        description:
          "Crater’s digital marketplace for art, content and more. Buy, sell and discover exclusive digital assets.",
      }}
    >
      <BaseLayout aside={<AsideNav activeTab="store" />} overflowY="auto">
        <StorePage />
      </BaseLayout>
    </Page>
  );
}
