import { User } from "next-auth";
import { useTheme } from "styled-components";

import dynamic from "next/dynamic";

import { Box, Shimmer, Text } from "@/common/components/atoms";
import { useWebinar } from "@/community/context/WebinarContext";
import { Webinar } from "@/community/types/community";
import { Props as DyteMeetingProps } from "@/dyte/components/objects/DyteMeeting";
import useDyteWebinar from "@/dyte/context/DyteWebinarContext";
import RewardBidModal from "@/tokens/components/objects/RewardBidModal";
import { Reward } from "@/tokens/types/token";

import LiveStreamPageLayout from "../../layouts/LiveStreamPageLayout";
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
  const { webinar: cachedWebinar } = useWebinar();
  const { dyteParticipant } = useDyteWebinar();
  const { space, borders } = useTheme();
  const { setTokenModalVisible, tokenModalVisible, activeReward } =
    useLiveStreamPageContext();

  return (
    <LiveStreamPageLayout
      videoPlayer={
        dyteParticipant && (
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
        )
      }
      streamDetail={
        <Box p={space.xs}>
          <Text textStyle="headline5">{cachedWebinar?.topic_detail.name}</Text>
        </Box>
      }
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
