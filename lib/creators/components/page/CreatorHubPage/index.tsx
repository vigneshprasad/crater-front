import { NextSeoProps } from "next-seo";
import { PropsWithChildren } from "react";
import { useTheme } from "styled-components";

import { Box } from "@/common/components/atoms";
import BaseLayout from "@/common/components/layouts/BaseLayout";
import AsideNav from "@/common/components/objects/AsideNav";
import { BaseTabBar } from "@/common/components/objects/BaseTabBar";
import Page from "@/common/components/objects/Page";

type IProps = PropsWithChildren<{
  selectedTab: string;
}>;

export default function CreatorHubPage({
  selectedTab,
  children,
}: IProps): JSX.Element {
  const seo: NextSeoProps = {
    title: "Crater Club",
    description: "Creater Hub",
  };
  const { space } = useTheme();

  return (
    <Page seo={seo}>
      <BaseLayout
        overflowY="auto"
        pb={space.l}
        aside={<AsideNav activeTab="creatorhub" />}
      >
        <Box
          h={240}
          backgroundImage="url('/images/img_creatorhub_header.png')"
          backgroundPosition="center"
          backgroundSize="cover"
        />
        <BaseTabBar
          baseUrl="/creatorhub/"
          tabs={["stream", "faq"]}
          active={selectedTab}
        />
        {children}
      </BaseLayout>
    </Page>
  );
}
