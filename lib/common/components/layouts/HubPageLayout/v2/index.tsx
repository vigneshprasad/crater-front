import { GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/client";
import { PropsWithChildren } from "react";
import { useTheme } from "styled-components";

import { Grid } from "@/common/components/atoms";
import { AsideNav, HubNavKeys } from "@/common/components/objects/AsideNav/v2";
import HubNav from "@/common/components/objects/AsideNav/v2/HubNav";
import Page from "@/common/components/objects/Page";
import CreatorApiClient from "@/creators/api";
import { Creator } from "@/creators/types/creator";

import BaseLayout from "../../BaseLayout/v2";

type PageProps = PropsWithChildren<{
  creator: Creator | null;
  activeTab?: HubNavKeys;
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
  creator,
  activeTab,
  children,
}: PageProps): JSX.Element {
  const { space } = useTheme();

  return (
    <Page
      seo={{
        title: "Crater Club: Hub",
        description:
          "Crater is where you join live streams with the mentors & creators you follow, get to network with like-minds, and can claim exclusive access to mentors & creator by buying their tokens at the live auction",
      }}
    >
      <BaseLayout aside={<AsideNav activeTab="hub" />} overflowY="auto">
        <Grid
          py={space.xxs}
          pl={space.xxs}
          pr={24}
          gridTemplateColumns="max-content 1fr"
          gridGap={24}
        >
          <HubNav creator={creator} activeTab={activeTab} />
          {children}
        </Grid>
      </BaseLayout>
    </Page>
  );
}
