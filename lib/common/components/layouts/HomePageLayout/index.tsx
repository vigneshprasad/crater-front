import { NextSeoProps } from "next-seo";
import { PropsWithChildren } from "react";
import { useTheme } from "styled-components";

import { INavKeys } from "@/common/constants/ui.constants";

import { Box } from "../../atoms";
import AsideNav from "../../objects/AsideNav";
import Page from "../../objects/Page";
import TabHeading from "../../objects/TabHeading";
import BaseLayout from "../BaseLayout";

type IProps = PropsWithChildren<{
  seo: NextSeoProps;
  activeTab?: INavKeys;
  heading: string;
}>;

export default function HomePageLayout({
  heading,
  children,
  activeTab,
  seo,
}: IProps): JSX.Element {
  const { space } = useTheme();
  return (
    <Page seo={seo}>
      <BaseLayout
        pb={space.xl}
        aside={<AsideNav activeTab={activeTab} />}
        overflowY="auto"
      >
        <Box p={space.s}>
          <TabHeading>{heading}</TabHeading>
        </Box>

        {children}
      </BaseLayout>
    </Page>
  );
}
