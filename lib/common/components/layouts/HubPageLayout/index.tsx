import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/client";
import { PropsWithChildren, useMemo } from "react";
import { useTheme } from "styled-components";

import { PageRoutes } from "@/common/constants/route.constants";
import CreatorApiClient from "@/creators/api";
import { Creator } from "@/creators/types/creator";

import { Box, Link } from "../../atoms";
import AsideNav from "../../objects/AsideNav";
import { BaseTabBar, BaseTabItem } from "../../objects/BaseTabBar";
import Page from "../../objects/Page";
import TabHeading from "../../objects/TabHeading";
import BaseLayout from "../BaseLayout";

const CREATOR_TABS = {
  stream: (
    <Link href={PageRoutes.hub("stream")} shallow>
      <BaseTabItem textStyle="title" label="Stream" />
    </Link>
  ),
  analytics: (
    <Link href={PageRoutes.hub("analytics")} shallow>
      <BaseTabItem textStyle="title" label="Analytics" />
    </Link>
  ),
  auction: (
    <Link href={PageRoutes.hub("auction")} shallow>
      <BaseTabItem textStyle="title" label="Auction" />
    </Link>
  ),
  wallet: (
    <Link href={PageRoutes.hub("wallet")} shallow>
      <BaseTabItem textStyle="title" label="Wallet" />
    </Link>
  ),
  faq: (
    <Link href={PageRoutes.hub("faq")} shallow>
      <BaseTabItem textStyle="title" label="FAQ" />
    </Link>
  ),
};

const USER_TABS = {
  stream: (
    <Link href={PageRoutes.hub("stream")} shallow>
      <BaseTabItem textStyle="title" label="Streams" />
    </Link>
  ),
  wallet: (
    <Link href={PageRoutes.hub("wallet")} shallow>
      <BaseTabItem textStyle="title" label="Wallet" />
    </Link>
  ),
  faq: (
    <Link href={PageRoutes.hub("faq")} shallow>
      <BaseTabItem textStyle="title" label="FAQ" />
    </Link>
  ),
};

export type HubTabKeys = keyof typeof CREATOR_TABS | keyof typeof USER_TABS;

type PageProps = PropsWithChildren<{
  creator: Creator | null;
  activeTab?: HubTabKeys;
}>;

export const getHubServerSideProps = async ({
  req,
}: GetServerSidePropsContext): Promise<{
  creator: Creator | null;
  userId?: string;
}> => {
  const session = await getSession({ req });

  if (!session || !session.user) {
    throw Error("No user");
  }

  const [creator] = await CreatorApiClient({ req }).getMyCreator();
  return {
    creator: creator ?? null,
    userId: session.user.pk,
  };
};

export default function HubPageLayout({
  children,
  activeTab,
  creator,
}: PageProps): JSX.Element {
  const { space } = useTheme();

  const tabs = useMemo(() => {
    if (!creator) {
      return USER_TABS;
    }

    if (!creator.show_club_members && !creator.show_analytics) {
      // @ts-expect-error: delete error
      delete CREATOR_TABS.analytics;
      return CREATOR_TABS;
    }

    return CREATOR_TABS;
  }, [creator]);

  return (
    <Page
      seo={{
        title: "Crater Club: Hub",
        description:
          "Crater is where you join live streams with the mentors & creators you follow, get to network with like-minds, and can claim exclusive access to mentors & creator by buying their tokens at the live auction",
      }}
    >
      <BaseLayout aside={<AsideNav activeTab="creatorhub" />} overflowY="auto">
        <Box p={[space.xs, space.s]}>
          <TabHeading>Hub</TabHeading>
        </Box>

        <BaseTabBar
          top={0}
          overflowX="auto"
          mt={[space.xxxs, space.xxs]}
          px={[space.xxs, space.s]}
          py={space.xxs}
          tabs={tabs}
          activeTab={activeTab}
        />
        {children}
      </BaseLayout>
    </Page>
  );
}
