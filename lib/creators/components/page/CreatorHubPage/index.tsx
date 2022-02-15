import { NextSeoProps } from "next-seo";
import HeaderImage from "public/images/img_creatorhub_header.png";
import { PropsWithChildren, useMemo } from "react";
import { useTheme } from "styled-components";
import useSWR from "swr";

import Image from "next/image";

import { Box, Text, Span, Link } from "@/common/components/atoms";
import BaseLayout from "@/common/components/layouts/BaseLayout";
import AsideNav from "@/common/components/objects/AsideNav";
import {
  BaseTabBar,
  BaseTabItem,
} from "@/common/components/objects/BaseTabBar";
import Page from "@/common/components/objects/Page";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { Creator } from "@/creators/types/creator";

type IProps = PropsWithChildren<{
  selectedTab: string;
  creator?: Creator;
}>;

export default function CreatorHubPage({
  children,
  selectedTab,
  creator,
}: IProps): JSX.Element {
  const seo: NextSeoProps = {
    title: "Crater Club",
    description: "Creator Hub",
  };
  const { space } = useTheme();

  const { data: userCount } = useSWR<{ count: number }>(
    API_URL_CONSTANTS.user.user_count
  );

  const count = userCount && userCount.count.toLocaleString();

  const tabs = useMemo(() => {
    if (!creator) {
      return undefined;
    }

    if (creator.show_club_members) {
      return {
        stream: (
          <Link href="/creatorhub/stream">
            <BaseTabItem label="Streams" />
          </Link>
        ),
        faq: (
          <Link href="/creatorhub/faq">
            <BaseTabItem label="Faq" />
          </Link>
        ),
        club_analytics: (
          <Link href="/creatorhub/club_analytics">
            <BaseTabItem label="Club Analytics" />
          </Link>
        ),
      };
    }

    return {
      stream: (
        <Link href="/creatorhub/stream">
          <BaseTabItem label="Streams" />
        </Link>
      ),
      faq: (
        <Link href="/creatorhub/faq">
          <BaseTabItem label="Faq" />
        </Link>
      ),
    };
  }, [creator]);

  return (
    <Page seo={seo}>
      <BaseLayout
        overflowY="auto"
        pb={space.xs}
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

        {tabs && <BaseTabBar tabs={tabs} activeTab={selectedTab} />}
        {children}
      </BaseLayout>
    </Page>
  );
}
