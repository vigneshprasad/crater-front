import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { useEffect } from "react";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import useAuth from "@/auth/context/AuthContext";
import Page from "@/common/components/objects/Page";
import WebinarApiClient from "@/community/api";
import { LiveStreamsProvider } from "@/community/context/LiveStreamsContext";
import { UpcomingStreamsProvider } from "@/community/context/UpcomingStreamsContext";
import { WebinarProvider } from "@/community/context/WebinarContext";
import { WebinarRequestProvider } from "@/community/context/WebinarRequestContext";
import { Webinar } from "@/community/types/community";
import { FollowerProvider } from "@/creators/context/FollowerContext";
import { StreamCreatorProvider } from "@/stream/context/StreamCreatorContext";

const SessionPage = dynamic(
  () => import("@/community/components/pages/SessionPage")
);

interface IParams extends ParsedUrlQuery {
  id: string;
}

interface Props {
  id: string;
  webinar: Webinar;
}

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const [webinars] = await WebinarApiClient().getAllWebinar();

  const paths = (webinars as Webinar[]).map(({ id }) => ({
    params: { id: id.toString() },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<Props, IParams> = async ({
  params,
}) => {
  const { id } = params as IParams;
  const [webinar] = await WebinarApiClient().getWebinar(id);

  if (!webinar) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }

  return {
    props: {
      id,
      webinar,
    },
    revalidate: 10,
  };
};

export default function Session({ webinar, id }: Props): JSX.Element {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (router && router.isFallback) {
      router.reload();
    }
  }, [router]);

  useEffect(() => {
    if (router) {
      if (webinar.is_live) router.push(`/livestream/${webinar.id}/`);
      else if (webinar.is_past || webinar.closed)
        router.push(`/video/${webinar.id}/`);
    }
  }, [router, user, webinar]);

  return (
    <Page
      seo={{
        title: webinar.topic_detail?.name,
        description:
          webinar.topic_detail?.description ?? webinar.topic_detail?.name,
      }}
    >
      <FollowerProvider
        creator={webinar.host_detail?.creator_detail?.id}
        user={user?.pk}
      >
        <StreamCreatorProvider>
          <WebinarProvider id={id} initial={webinar}>
            <WebinarRequestProvider groupId={id}>
              <LiveStreamsProvider>
                <UpcomingStreamsProvider>
                  <SessionPage id={id} />
                </UpcomingStreamsProvider>
              </LiveStreamsProvider>
            </WebinarRequestProvider>
          </WebinarProvider>
        </StreamCreatorProvider>
      </FollowerProvider>
    </Page>
  );
}
