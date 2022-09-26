import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { ParsedUrlQuery } from "querystring";
import { useEffect } from "react";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import useAuth from "@/auth/context/AuthContext";
import Page from "@/common/components/objects/Page";
import { PageRoutes } from "@/common/constants/route.constants";
import WebinarApiClient from "@/community/api";
import { PrivateStreamRewardProvider } from "@/community/context/PrivateStreamRewardContext";
import { WebinarProvider } from "@/community/context/WebinarContext";
import { WebinarRequestProvider } from "@/community/context/WebinarRequestContext";
import { PrivacyType, Webinar } from "@/community/types/community";
import { FollowerProvider } from "@/creators/context/FollowerContext";
import { PastStreamProvider } from "@/stream/context/PastStreamContext";
import { StreamCreatorProvider } from "@/stream/context/StreamCreatorContext";
import { StreamQuestionProvider } from "@/stream/context/StreamQuestionContext";
import { StreamsToRsvpProvider } from "@/stream/context/StreamsToRsvpContext";
import { UpcomingStreamsProvider } from "@/stream/context/UpcomingStreamsContext";
import { ReferralSummaryProvider } from "@/tokens/context/ReferralSummaryContext";

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

export const getServerSideProps: GetServerSideProps<Props, IParams> = async (
  props
) => {
  const { params } = props;
  const { id } = params as IParams;
  const [webinar] = await WebinarApiClient().getWebinar(id);
  const session = await getSession(props);

  if (!webinar) {
    return {
      notFound: true,
    };
  }
  const user = session?.user;

  if (user) {
    if (webinar.is_live) {
      const isUserAttendee = webinar.attendees?.indexOf(user.pk) > -1;
      const isUserSpeaker = webinar.speakers?.indexOf(user.pk) > -1;

      if (webinar.privacy !== PrivacyType.private) {
        return {
          redirect: {
            destination: PageRoutes.stream(webinar?.id),
            permanent: false,
          },
        };
      } else {
        if (isUserAttendee || isUserSpeaker) {
          return {
            redirect: {
              destination: PageRoutes.stream(webinar?.id),
              permanent: false,
            },
          };
        }
      }
    }
    if (webinar.is_past && webinar.closed) {
      return {
        redirect: {
          destination: PageRoutes.streamVideo(webinar?.id),
          permanent: false,
        },
      };
    }
  }

  return { props: { webinar, id } };
};

export default function Session({ webinar, id }: Props): JSX.Element {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (router && router.isFallback) {
      router.reload();
    }
  }, [router]);

  return (
    <Page
      seo={{
        title: webinar.topic_detail?.name,
        description:
          webinar.topic_detail?.description ?? webinar.topic_detail?.name,
        openGraph: {
          title: webinar.topic_detail?.name,
          description:
            webinar.topic_detail?.description ?? webinar.topic_detail?.name,
          images: [
            {
              url: webinar.topic_detail?.image,
              width: 1600,
              height: 900,
              alt: webinar.topic_detail?.name,
            },
          ],
        },
      }}
    >
      <FollowerProvider
        creator={webinar.host_detail?.creator_detail?.id}
        user={user?.pk}
      >
        <StreamCreatorProvider>
          <WebinarProvider id={id} initial={webinar}>
            <WebinarRequestProvider groupId={id} user={user?.pk}>
              <UpcomingStreamsProvider pageSize={4}>
                <StreamsToRsvpProvider>
                  <ReferralSummaryProvider>
                    <PastStreamProvider host={webinar.host}>
                      <StreamQuestionProvider group={webinar.id}>
                        <PrivateStreamRewardProvider id={id}>
                          <SessionPage id={id} />
                        </PrivateStreamRewardProvider>
                      </StreamQuestionProvider>
                    </PastStreamProvider>
                  </ReferralSummaryProvider>
                </StreamsToRsvpProvider>
              </UpcomingStreamsProvider>
            </WebinarRequestProvider>
          </WebinarProvider>
        </StreamCreatorProvider>
      </FollowerProvider>
    </Page>
  );
}
