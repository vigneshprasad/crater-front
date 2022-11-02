import STATIC_IMAGES from "public/images";
import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useTheme } from "styled-components";

import Image from "next/image";
import { useRouter } from "next/router";

import useAuth from "@/auth/context/AuthContext";
import useAuthModal from "@/auth/context/AuthModalContext";
import { BottomSheet, Box, Flex, Icon, Text } from "@/common/components/atoms";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";
import { useWebinar } from "@/community/context/WebinarContext";
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
import { StreamsToRsvpProvider } from "@/stream/context/StreamsToRsvpContext";
import { StreamQuestion, StreamQuestionUpvote } from "@/stream/types/stream";

import RsvpSuccesModal from "../../objects/RsvpSuccesModal";

interface IProps {
  id: string;
}

export default function SessionPage({ id }: IProps): JSX.Element {
  const router = useRouter();
  const { webinar, mutateWebinar } = useWebinar();
  const { space, colors, breakpoints } = useTheme();
  const [showSuccess, setShowSuccess] = useState(false);
  const { user } = useAuth();
  const { openModal } = useAuthModal();
  // const { track } = useAnalytics();
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
  const [showShareSheet, setShowShareSheet] = useState(false);
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

  const autoRsvp = useCallback(async () => {
    await router.replace({
      query: {
        ...router.query,
        join: true,
        newUser: true,
      },
    });
    openModal();
  }, [openModal, router]);

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

  const webinarCategories = useMemo<string[] | undefined>(() => {
    if (!webinar) return undefined;

    return webinar.categories_detail_list?.map((item) => item.slug);
  }, [webinar]);

  const followCreator = async (): Promise<void> => {
    const creator = webinar?.host_detail.creator_detail;

    if (creator) {
      await subscribeCreator(creator.id);
      await mutateWebinar();
      setFollowBtnLoading(false);
    }
  };

  if (!webinar || isMobile === undefined) return <Box>Loading..</Box>;

  const image = webinar.topic_detail?.image ?? STATIC_IMAGES.ImageStreamDefault;

  return (
    <>
      <StreamsToRsvpProvider sortByCategory={webinarCategories}>
        <RsvpSuccesModal
          group={webinar}
          visble={showSuccess}
          onClose={() => setShowSuccess(false)}
        />
      </StreamsToRsvpProvider>
      <RsvpPageLayout
        streamImage={
          <Image
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            unoptimized
            src={image}
            alt={webinar.topic_detail?.name}
          />
        }
        streamMain={
          <RsvpHeadingSection
            stream={webinar}
            id={id}
            onRsvpSubmit={() => setShowSuccess(true)}
          />
        }
        streamDetail={
          <RsvpAboutSection
            stream={webinar}
            followers={followers}
            pastStreams={pastStreams}
            followersLoading={followersLoading || followBtnLoading}
            onFollow={followCreator}
            autoRsvp={autoRsvp}
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
                  <StreamShareSection stream={webinar} autoRsvp={autoRsvp} />
                </BottomSheet>
              )}
            </>
          ) : (
            <StreamShareSection stream={webinar} autoRsvp={autoRsvp} />
          )
        }
        upcomingStreams={<UpcomingStreamsList />}
        questionPanel={
          <RsvpQuestionPanel
            questions={streamQuestions}
            loading={StreamQuestionsLoading}
            host={webinar.host}
            postQuestion={postGroupQuestion}
            postQuestionUpvote={postGroupQuestionUpvote}
            autoRsvp={autoRsvp}
          />
        }
      />
    </>
  );
}
