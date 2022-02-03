import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { getSession } from "next-auth/client";
import { ParsedUrlQuery } from "querystring";
import { useEffect } from "react";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import useAuth from "@/auth/context/AuthContext";
import useAuthModal from "@/auth/context/AuthModalContext";
import Page from "@/common/components/objects/Page";
import WebinarApiClient from "@/community/api";
import { ChatReactionListProvider } from "@/community/context/ChatReactionListContext";
import { UpcomingStreamsProvider } from "@/community/context/UpcomingStreamsContext";
import { WebinarProvider } from "@/community/context/WebinarContext";
import { Webinar as WebinarType } from "@/community/types/community";
import { Webinar } from "@/community/types/community";
import CreatorApiClient from "@/creators/api";
import { FollowerProvider } from "@/creators/context/FollowerContext";
import { DyteWebinarProvider } from "@/dyte/context/DyteWebinarContext";
import StreamChatProvider from "@/stream/providers/StreamChatProvider";
import { RewardsListProvider } from "@/tokens/context/RewardsListContext";
import { Reward } from "@/tokens/types/token";

const DynamicWebinarPage = dynamic(
  () => import("@/community/components/pages/WebinarPage")
);

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface WebinarPageProps {
  orgId: string;
  id: string;
  webinar: WebinarType;
  rewards: Reward[];
}

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const [webinars] = await WebinarApiClient().getAllWebinar();

  const paths = (webinars as Webinar[]).map(({ id }) => ({
    params: { id: id.toString() },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<WebinarPageProps, IParams> =
  async ({ params }) => {
    const { id } = params as IParams;
    const [webinar, error] = await WebinarApiClient().getWebinar(id);
    const orgId = process.env.DYTE_ORG_ID as string;

    if (error || !webinar) {
      return {
        notFound: true,
        revalidate: 10,
      };
    }

    const slug = webinar.host_detail.creator_detail?.slug;
    const [rewards] = await CreatorApiClient().getAllRewards(slug);

    return {
      props: {
        orgId,
        id,
        webinar,
        rewards: rewards ?? [],
      },
      revalidate: 10,
    };
  };

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default function WebinarPage({
  orgId,
  webinar,
  id,
  rewards,
}: Props): JSX.Element {
  const router = useRouter();
  const { user } = useAuth();
  const { openModal } = useAuthModal();

  useEffect(() => {
    async function checkAuth(): Promise<void> {
      const session = await getSession();
      if (session === null) {
        openModal();
      }
    }

    if (router) {
      checkAuth();
    }
  }, [router, id, openModal]);

  return (
    <Page
      seo={{
        title: webinar.topic_detail?.name,
        description: webinar.topic_detail?.description,
      }}
    >
      <FollowerProvider
        creator={webinar.host_detail?.creator_detail?.id}
        user={user?.pk}
      >
        <WebinarProvider id={id} initial={webinar}>
          <DyteWebinarProvider id={id}>
            <StreamChatProvider groupId={id}>
              <ChatReactionListProvider>
                <UpcomingStreamsProvider>
                  <RewardsListProvider
                    initial={rewards}
                    filterCreatorSlug={webinar.host_detail.creator_detail?.slug}
                  >
                    <DynamicWebinarPage orgId={orgId} id={id} />
                  </RewardsListProvider>
                </UpcomingStreamsProvider>
              </ChatReactionListProvider>
            </StreamChatProvider>
          </DyteWebinarProvider>
        </WebinarProvider>
      </FollowerProvider>
    </Page>
  );
}
