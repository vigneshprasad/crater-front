import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useTheme } from "styled-components";

import Image from "next/image";
import { useRouter } from "next/router";

import useAuth from "@/auth/context/AuthContext";
import useAuthModal from "@/auth/context/AuthModalContext";
import { BottomSheet, Box, Flex, Icon, Text } from "@/common/components/atoms";
import { UTM_SOURCE_STORAGE_KEY } from "@/common/constants/global.constants";
import { PageRoutes } from "@/common/constants/route.constants";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";
import useAnalytics from "@/common/utils/analytics/AnalyticsContext";
import { AnalyticsEvents } from "@/common/utils/analytics/types";
import DateTime from "@/common/utils/datetime/DateTime";
import WebinarApiClient from "@/community/api";
import { useWebinar } from "@/community/context/WebinarContext";
import { useWebinarRequest } from "@/community/context/WebinarRequestContext";
import {
  ParticpantType,
  PostGroupRequest,
  RequestStatus,
} from "@/community/types/community";
import { useFollower } from "@/creators/context/FollowerContext";
import StreamApiClient from "@/stream/api";
import UpcomingStreamsList from "@/stream/components//objects/UpcomingStreamsList";
import RsvpPageLayout from "@/stream/components/layouts/RsvpPageLayout";
import RsvpAboutSection from "@/stream/components/objects/RsvpAboutSection";
import RsvpHeadingSection from "@/stream/components/objects/RsvpHeadingSection";
import RsvpQuestionPanel from "@/stream/components/objects/RsvpQuestionPanel";
import ShareStreamBottomSheet from "@/stream/components/objects/ShareStreamBottomSheet";
import StreamShareSection from "@/stream/components/objects/StreamShareSection";
import usePastStreams from "@/stream/context/PastStreamContext";
import useStreamQuestions from "@/stream/context/StreamQuestionContext";
import { StreamQuestion, StreamQuestionUpvote } from "@/stream/types/stream";
import { useReferralSummary } from "@/tokens/context/ReferralSummaryContext";

import RsvpSuccesModal from "../../objects/RsvpSuccesModal";

interface IProps {
  id: string;
}

export default function SessionPage({ id }: IProps): JSX.Element {
  const router = useRouter();
  const { webinar, mutateWebinar } = useWebinar();
  const { webinarRequest, mutateRequest } = useWebinarRequest();
  const { space, colors, breakpoints } = useTheme();
  const [showSuccess, setShowSuccess] = useState(false);
  const { user, profile } = useAuth();
  const { openModal } = useAuthModal();
  const { track } = useAnalytics();
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const {
    followers,
    loading: followersLoading,
    subscribeCreator,
  } = useFollower();
  const [followBtnLoading, setFollowBtnLoading] = useState(false);
  const { streams: pastStreams } = usePastStreams();
  const {
    streamQuestions,
    loading: StreamQuestionsLoading,
    mutateStreamQuestionsPage,
  } = useStreamQuestions();
  const { referralSummary } = useReferralSummary();
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [rsvpBtnLoading, setRsvpBtnLoading] = useState(false);

  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

  const scrollToTop = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo(0, 0);
    }
  }, [scrollContainerRef]);

  useEffect(() => {
    if (router && router.query && router.query.id) {
      if (router.query.id !== sessionId) {
        scrollToTop();
        setSessionId(router.query.id as string);
      }
    }
  }, [router, scrollToTop, sessionId, setSessionId]);

  const isHost = useMemo(() => {
    if (!user || !webinar) return false;

    return user.pk == webinar.host || webinar.speakers?.includes(user.pk);
  }, [user, webinar]);

  const postGroupRequest = useCallback(
    async (redirect = false): Promise<void> => {
      if (webinar) {
        if (webinarRequest?.status !== RequestStatus.accepted) {
          setRsvpBtnLoading(true);
          const data: PostGroupRequest = {
            group: parseInt(id, 10),
            participant_type: ParticpantType.attendee,
            status: RequestStatus.accepted,
          };

          const [request] = await WebinarApiClient().postWebinarRequest(data);

          if (request) {
            track(AnalyticsEvents.rsvp_stream, {
              stream: webinar.id,
              stream_name: webinar.topic_detail?.name,
              host: {
                ...webinar.host_detail,
              },
            });

            // First time RSVP analytics event tracking
            if (
              router.query?.join === "true" &&
              router.query?.newUser === "true" &&
              user &&
              !user.email &&
              localStorage.getItem(UTM_SOURCE_STORAGE_KEY) == "Facebook"
            ) {
              track(AnalyticsEvents.first_time_rsvp, {
                stream: webinar.id,
                stream_name: webinar.topic_detail?.name,
                host: {
                  ...webinar.host_detail,
                },
              });
            }

            mutateRequest(request);
          }
        }

        if (redirect) {
          track(AnalyticsEvents.join_stream, {
            stream: webinar.id,
            stream_name: webinar.topic_detail?.name,
            host: {
              ...webinar.host_detail,
            },
          });
          router.push(PageRoutes.stream(webinar.id.toString()));

          return;
        }

        setRsvpBtnLoading(false);
        setShowSuccess(true);
      }
    },
    [webinar, id, mutateRequest, router, track, webinarRequest, user]
  );

  const ctaButton = useMemo<{
    buttonText: string;
    loading?: boolean;
    disabled?: boolean;
    onClick?: () => void;
  } | null>(() => {
    if (webinar) {
      const startTime = DateTime.parse(webinar.start);
      const now = DateTime.now();

      if (user) {
        if (isHost) {
          if (now < startTime.minus({ minutes: 30 })) {
            return {
              buttonText: "Test livestream",
              onClick: () => router.push(PageRoutes.stream(webinar.id)),
            };
          }

          return {
            buttonText: "Go live",
            onClick: () => router.push(PageRoutes.stream(webinar.id)),
          };
        } else {
          if (webinar.is_live || now >= startTime.minus({ minutes: 10 })) {
            return {
              buttonText: "Join livestream",
              onClick: () => postGroupRequest(true),
            };
          }

          if (
            webinarRequest &&
            webinarRequest.status === RequestStatus.accepted
          ) {
            return {
              buttonText: "You'll be notified when the stream starts.",
              disabled: true,
            };
          }

          return {
            buttonText: "RSVP to livestream",
            loading: rsvpBtnLoading,
            onClick: () => {
              postGroupRequest();
            },
          };
        }
      } else {
        return {
          buttonText: "RSVP to livestream",
          onClick: () => {
            track(AnalyticsEvents.rsvp_button_clicked, {
              new_user: true,
              session: webinar.id,
            });
            router.replace({
              query: {
                ...router.query,
                join: true,
                newUser: true,
              },
            });
            openModal();
          },
        };
      }
    }

    return null;
  }, [
    user,
    webinar,
    router,
    openModal,
    track,
    isHost,
    postGroupRequest,
    webinarRequest,
    rsvpBtnLoading,
  ]);

  const postGroupQuestion = useCallback(
    async (question: string) => {
      if (webinar) {
        const data: Partial<StreamQuestion> = {
          group: webinar.id,
          question: question,
        };

        const [request] = await StreamApiClient().postGroupQuestion(data);

        if (request) {
          mutateStreamQuestionsPage();
        }
      }
    },
    [webinar, mutateStreamQuestionsPage]
  );

  const postGroupQuestionUpvote = useCallback(
    async (question: number) => {
      const data: Partial<StreamQuestionUpvote> = {
        question: question,
      };

      const [request] = await StreamApiClient().postGroupQuestionUpvote(data);

      if (request) {
        mutateStreamQuestionsPage();
      }
    },
    [mutateStreamQuestionsPage]
  );

  useEffect(() => {
    const action = async (): Promise<void> => {
      await postGroupRequest();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { join, ...query } = router.query;
      router.replace({ query: { ...query } });
    };

    if (router.query?.join === "true" && user && webinar) {
      action();
    }
  }, [router, user, webinar, profile, postGroupRequest, track]);

  const followCreator = async (): Promise<void> => {
    const creator = webinar?.host_detail.creator_detail;

    if (creator) {
      await subscribeCreator(creator.id);
      await mutateWebinar();
      setFollowBtnLoading(false);
    }
  };

  if (!webinar || isMobile === undefined) return <Box>Loading..</Box>;

  const image = webinar.topic_detail?.image;

  return (
    <>
      <RsvpSuccesModal
        group={webinar}
        visble={showSuccess}
        referralSummary={referralSummary}
        onClose={() => setShowSuccess(false)}
      />
      <RsvpPageLayout
        streamImage={
          <Image
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            src={image}
            alt={webinar.topic_detail?.name}
          />
        }
        streamMain={
          <RsvpHeadingSection stream={webinar} ctaButton={ctaButton} />
        }
        streamDetail={
          <RsvpAboutSection
            stream={webinar}
            followers={followers}
            pastStreams={pastStreams}
            followersLoading={followersLoading || followBtnLoading}
            onFollow={followCreator}
          />
        }
        shareSection={
          isMobile ? (
            <>
              <Flex
                px={28}
                py={space.xxxs}
                justifyContent="center"
                alignItems="center"
                gridGap={6}
                bg={colors.primaryDark}
                borderRight={`1px solid ${colors.primaryLight}`}
                onClick={() => setShowShareSheet(true)}
              >
                <Icon
                  icon="Share"
                  size={20}
                  color={colors.white[0]}
                  fill={true}
                />
                <Text textStyle="small" fontWeight={500}>
                  Share stream
                </Text>
              </Flex>

              {user ? (
                <ShareStreamBottomSheet
                  stream={webinar}
                  visible={showShareSheet}
                  onClose={() => {
                    setShowShareSheet(false);
                  }}
                />
              ) : (
                <BottomSheet
                  px={0}
                  heading="Share stream"
                  bg={colors.primaryDark}
                  visible={showShareSheet}
                  boxProps={{
                    px: space.xxxs,
                    pt: space.xxxs,
                    pb: space.xxxxxs,
                    bg: colors.primaryDark,
                  }}
                  onClose={() => {
                    setShowShareSheet(false);
                  }}
                >
                  <StreamShareSection stream={webinar} />
                </BottomSheet>
              )}
            </>
          ) : (
            <StreamShareSection stream={webinar} />
          )
        }
        upcomingStreams={<UpcomingStreamsList />}
        questionPanel={
          <RsvpQuestionPanel
            questions={streamQuestions}
            loading={StreamQuestionsLoading}
            isHost={isHost}
            postQuestion={postGroupQuestion}
            postQuestionUpvote={postGroupQuestionUpvote}
          />
        }
      />
    </>
  );
}
