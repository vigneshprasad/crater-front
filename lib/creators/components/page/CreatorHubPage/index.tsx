import { NextSeoProps } from "next-seo";
import { PropsWithChildren } from "react";
import { useTheme } from "styled-components";

import { Box } from "@/common/components/atoms";
import BaseLayout from "@/common/components/layouts/BaseLayout";
import AsideNav from "@/common/components/objects/AsideNav";
import Page from "@/common/components/objects/Page";

type IProps = PropsWithChildren<{
  selectedTab: string;
}>;

export default function CreatorHubPage({ children }: IProps): JSX.Element {
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
        <Box h={240} bg="#fff" />
        {children}
      </BaseLayout>
    </Page>
  );
}
