import styled from "styled-components";

import dynamic from "next/dynamic";

import BaseLayout from "@/common/components/layouts/BaseLayout/v2";
import { AsideNav } from "@/common/components/objects/AsideNav/v2";
import Page from "@/common/components/objects/Page";

const StoreBuyNowPage = dynamic(
  () => import("@/tokens/components/pages/StoreBuyNowPage")
);

const StyledBaseLayout = styled(BaseLayout)`
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default function StoreBuyNow(): JSX.Element {
  return (
    <Page
      seo={{
        title: "Discover Content and Art by Creators",
        description:
          "Crater&apos;s digital marketplace for art, content and more. Buy, sell and discover exclusive digital assets.",
      }}
    >
      <StyledBaseLayout aside={<AsideNav activeTab="store" />} overflowY="auto">
        <StoreBuyNowPage />
      </StyledBaseLayout>
    </Page>
  );
}
