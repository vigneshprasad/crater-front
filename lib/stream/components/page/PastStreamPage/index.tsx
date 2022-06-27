import { useCallback, useRef, useState } from "react";
import styled from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import useAuthModal from "@/auth/context/AuthModalContext";
import { Box } from "@/common/components/atoms";
import { useWebinar } from "@/community/context/WebinarContext";
import { useFollower } from "@/creators/context/FollowerContext";
import StreamApiClient from "@/stream/api";
import useStreamQuestions from "@/stream/context/StreamQuestionContext";
import useStreamRecording from "@/stream/context/StreamRecordingContext";
import { StreamQuestion, StreamQuestionUpvote } from "@/stream/types/stream";

import PastStreamPageLayout from "../../layouts/PastStreamPageLayout";
import PastStreamAboutSection from "../../objects/PastStreamAboutSection";
import PastStreamForum from "../../objects/PastStreamForum";
import StreamsPanel from "../../objects/StreamsPanel";

const Video = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.radii.xxxxs}px;
`;

export default function PastStreamPage(): JSX.Element {
  const { webinar, loading, mutateWebinar } = useWebinar();
  const { recording } = useStreamRecording();
  const [followBtnLoading, setFollowBtnLoading] = useState(false);
  const {
    streamQuestions,
    loading: streamQuestionsLoading,
    nextPage: streamQuestionsNextPage,
    mutateStreamQuestionsPage,
    setStreamQuestionsPage,
  } = useStreamQuestions();

  const videoRef = useRef<HTMLVideoElement>(null);
  const forumRef = useRef<HTMLDivElement>(null);
  const {
    followers,
    loading: followersLoading,
    subscribeCreator,
  } = useFollower();
  const { user } = useAuth();
  const { openModal } = useAuthModal();

  const scrollToForum = useCallback(() => {
    if (forumRef.current) {
      forumRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [forumRef]);

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

  const loadMoreStreamQuestions = useCallback(() => {
    setStreamQuestionsPage((page) => page + 1);
  }, [setStreamQuestionsPage]);

  if (!webinar || loading) return <Box>Loading...</Box>;

  const followCreator = async (): Promise<void> => {
    const creator = webinar.host_detail.creator_detail;

    if (creator) {
      await subscribeCreator(creator.id);
      await mutateWebinar();
      setFollowBtnLoading(false);
    }
  };

  return (
    <PastStreamPageLayout
      videoPlayer={
        <Video
          poster={webinar?.topic_detail?.image}
          controls
          controlsList="nodownload"
          src={`${recording?.recording}#t=600`}
          ref={videoRef}
          onTimeUpdate={() => {
            if (
              !user &&
              videoRef.current &&
              videoRef.current.currentTime >= 900
            ) {
              videoRef.current.pause();
              openModal();
            }
          }}
          onEnded={() => {
            if (videoRef.current) {
              videoRef.current.play();
              videoRef.current.currentTime += 600;
            }
          }}
        />
      }
      aboutSection={
        <PastStreamAboutSection
          stream={webinar}
          followers={followers}
          followersLoading={followersLoading || followBtnLoading}
          questions={streamQuestions}
          questionsLoading={streamQuestionsLoading}
          onFollow={followCreator}
          scrollToForum={scrollToForum}
          postQuestion={postGroupQuestion}
          postQuestionUpvote={postGroupQuestionUpvote}
        />
      }
      forumSection={
        <PastStreamForum
          stream={webinar}
          questions={streamQuestions}
          loading={streamQuestionsLoading}
          nextPage={streamQuestionsNextPage}
          loadMoreQuestions={loadMoreStreamQuestions}
          postQuestion={postGroupQuestion}
          postQuestionUpvote={postGroupQuestionUpvote}
          ref={forumRef}
        />
      }
      streamsPanel={<StreamsPanel stream={webinar} />}
    />
  );
}
