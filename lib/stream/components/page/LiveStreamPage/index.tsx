import { User } from "next-auth";
import { useState } from "react";
import { useTheme } from "styled-components";

import dynamic from "next/dynamic";

import useAuth from "@/auth/context/AuthContext";
import { Shimmer } from "@/common/components/atoms";
import { useWebinar } from "@/community/context/WebinarContext";
import { Webinar } from "@/community/types/community";
import { useFollower } from "@/creators/context/FollowerContext";
import { Props as DyteMeetingProps } from "@/dyte/components/objects/DyteMeeting";
import useDyteWebinar from "@/dyte/context/DyteWebinarContext";
import UpcomingStreamsList from "@/stream/components//objects/UpcomingStreamsList";
import useFirebaseChat from "@/stream/providers/FirebaseChatProvider";
import RewardBidModal from "@/tokens/components/objects/RewardBidModal";
import { Reward } from "@/tokens/types/token";

import LiveStreamPageLayout from "../../layouts/LiveStreamPageLayout";
import PastStreamsList from "../../objects/PastStreamsList/v2";
import SimilarStreamsOverlay from "../../objects/SimilarStreamsOverlay";
import StreamAboutSection from "../../objects/StreamAboutSection";
import StreamShareSection from "../../objects/StreamShareSection";
import TokenBannerOverlay from "../../objects/TokenBannerOverlay";
import Container from "./container";
import useLiveStreamPageContext from "./context";

const DyteMeeting = dynamic<DyteMeetingProps>(
  () => import("@/dyte/components/objects/DyteMeeting"),
  {
    ssr: false,
    loading: () => {
      return (
        <Shimmer
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          overflow="hidden"
        />
      );
    },
  }
);

type IProps = {
  webinar: Webinar;
  id: string;
  orgId: string;
  rewards: Reward[];
  user?: User;
};

export function Content({ webinar, orgId }: IProps): JSX.Element {
  const { user } = useAuth();
  const { webinar: cachedWebinar, mutateWebinar } = useWebinar();
  const { dyteParticipant } = useDyteWebinar();
  const { borders } = useTheme();
  const { setTokenModalVisible, tokenModalVisible, activeReward } =
    useLiveStreamPageContext();
  const [loading, setLoading] = useState(false);
  const {
    followers,
    loading: followersLoading,
    subscribeCreator,
  } = useFollower();
  const { postMessage } = useFirebaseChat();

  const creator = cachedWebinar?.host_detail.creator_detail;
  const followCreator = async (): Promise<void> => {
    if (creator) {
      await subscribeCreator(creator.id);
      await mutateWebinar();
      setLoading(false);

      const message = {
        message: `${user?.name} just followed ${cachedWebinar?.host_detail.name}'s channel.`,
        display_name: "Follow Update",
      };
      postMessage(message);
    }
  };

  return (
    <LiveStreamPageLayout
      videoPlayer={
        <>
          {dyteParticipant && (
            <DyteMeeting
              webinar={webinar}
              orgId={orgId}
              token={dyteParticipant.auth_token}
              roomName={dyteParticipant.dyte_meeting_detail.room_name}
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              overflow="hidden"
              borderBottom={`2px solid ${borders.main}`}
            />
          )}
          {creator?.tokens_enabled && webinar.is_live && <TokenBannerOverlay />}
          <SimilarStreamsOverlay />
        </>
      }
      streamDetail={
        <StreamAboutSection
          followers={followers}
          stream={cachedWebinar ?? webinar}
          followersLoading={followersLoading || loading}
          onFollow={() => followCreator()}
        />
      }
      shareSection={<StreamShareSection stream={cachedWebinar} />}
      modal={
        tokenModalVisible &&
        activeReward &&
        webinar.host_detail.creator_detail && (
          <RewardBidModal
            reward={activeReward}
            creator={webinar.host_detail.creator_detail}
            visible={tokenModalVisible}
            onClose={() => setTokenModalVisible(false)}
          />
        )
      }
      upcomingsStreams={<UpcomingStreamsList />}
      pastStreams={<PastStreamsList />}
    />
  );
}

export default function LiveStreamPage({
  orgId,
  ...rest
}: IProps): JSX.Element {
  return (
    <Container {...rest}>
      <Content {...rest} orgId={orgId} />
    </Container>
  );
}
