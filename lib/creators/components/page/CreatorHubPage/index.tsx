import { NextSeoProps } from "next-seo";
import HeaderImage from "public/images/img_creatorhub_header.png";
import { PropsWithChildren } from "react";
import { useTheme } from "styled-components";
import useSWR from "swr";

import Image from "next/image";

import { Box, Text, Span } from "@/common/components/atoms";
import BaseLayout from "@/common/components/layouts/BaseLayout";
import AsideNav from "@/common/components/objects/AsideNav";
import Page from "@/common/components/objects/Page";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

type IProps = PropsWithChildren<{
  selectedTab: string;
}>;

export default function CreatorHubPage({ children }: IProps): JSX.Element {
  const seo: NextSeoProps = {
    title: "Crater Club",
    description: "Creater Hub",
  };
  const { space } = useTheme();

  const { data: userCount } = useSWR<{ count: number }>(
    API_URL_CONSTANTS.user.user_count
  );

  const count = userCount && userCount.count.toLocaleString();

  return (
    <Page seo={seo}>
      <BaseLayout
        overflowY="auto"
        pb={space.l}
        aside={<AsideNav activeTab="creatorhub" />}
      >
        <Box h={240} position="relative">
          <Image src={HeaderImage} layout="fill" alt="Creator Hub" />
          <Text
            textAlign="center"
            textStyle="headline3"
            position="absolute"
            top="50%"
            right="50%"
            transform="translate(50%,-50%)"
          >
            Creator Hub
            <Text textStyle="headline6">
              Stream live to {count} <Span fontWeight="800">members</Span>
            </Text>
          </Text>
        </Box>

        {/* <BaseTabBar
          baseUrl="/creatorhub/"
          tabs={["stream", "faq"]}
          active={selectedTab}
        /> */}
        {children}
      </BaseLayout>
    </Page>
  );
}
