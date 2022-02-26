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
      <BaseTabItem textStyle="title" label="Streams" />
    </Link>
  ),
  club_members: (
    <Link href={PageRoutes.hub("club_members")} shallow>
      <BaseTabItem textStyle="title" label="Club Members" />
    </Link>
  ),
  rewards: (
    <Link href={PageRoutes.hub("rewards")} shallow>
      <BaseTabItem textStyle="title" label="My Rewards" />
    </Link>
  ),
  portfolio: (
    <Link href={PageRoutes.hub("portfolio")} shallow>
      <BaseTabItem textStyle="title" label="My Portfolio" />
    </Link>
  ),
  faq: (
    <Link href={PageRoutes.hub("faq")} shallow>
      <BaseTabItem textStyle="title" label="Know More" />
    </Link>
  ),
};

const USER_TABS = {
  stream: (
    <Link href={PageRoutes.hub("stream")} shallow>
      <BaseTabItem textStyle="title" label="Streams" />
    </Link>
  ),
  portfolio: (
    <Link href={PageRoutes.hub("portfolio")} shallow>
      <BaseTabItem textStyle="title" label="My Portfolio" />
    </Link>
  ),
  faq: (
    <Link href={PageRoutes.hub("faq")} shallow>
      <BaseTabItem textStyle="title" label="Know More" />
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

    if (!creator.show_club_members) {
      // @ts-expect-error: delete error
      delete CREATOR_TABS.club_members;
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
          mt={[space.xxxs, space.xxs]}
          px={[space.xxs, space.s]}
          tabs={tabs}
          activeTab={activeTab}
        />
        {children}
      </BaseLayout>
    </Page>
  );
}
