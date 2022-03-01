import { User } from "next-auth";
import { useTheme } from "styled-components";

import dynamic from "next/dynamic";

import useAuth from "@/auth/context/AuthContext";
import {
  Box,
  Shimmer,
  Text,
  Grid,
  Icon,
  Flex,
  Avatar,
  Link,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import { PageRoutes } from "@/common/constants/route.constants";
import { useWebinar } from "@/community/context/WebinarContext";
import { Webinar } from "@/community/types/community";
import { useFollower } from "@/creators/context/FollowerContext";
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
  const { user } = useAuth();
  const { webinar: cachedWebinar } = useWebinar();
  const { dyteParticipant } = useDyteWebinar();
  const { space, borders, colors } = useTheme();
  const { setTokenModalVisible, tokenModalVisible, activeReward } =
    useLiveStreamPageContext();

  const { followers, subscribeCreator } = useFollower();

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
        <Box>
          <Grid
            p={space.xs}
            gridTemplateColumns={["1fr", "1fr min-content"]}
            alignItems="center"
            gridRowGap={[space.xxs, 0]}
          >
            <Box>
              <Text textStyle="headline5" maxLines={2}>
                {cachedWebinar?.topic_detail.name}
              </Text>
            </Box>

            <Flex>
              {(() => {
                // If the logged in user is the host, do not show `Follow` button
                if (cachedWebinar?.host === user?.pk) return null;

                if (
                  followers &&
                  followers?.length > 0 &&
                  followers?.[0].notify
                ) {
                  return (
                    <Button
                      mr={space.xxs}
                      text="Following"
                      variant="nav-button"
                      bg={colors.black[5]}
                      border="1px solid rgba(255, 255, 255, 0.1)"
                      disabled={true}
                    />
                  );
                }

                return (
                  <Button
                    mr={space.xxs}
                    variant="nav-button"
                    text="Follow"
                    onClick={() => {
                      const creator =
                        cachedWebinar?.host_detail?.creator_detail?.id;
                      if (creator) {
                        subscribeCreator(creator);
                      }
                    }}
                  />
                );
              })()}
              {cachedWebinar?.host_profile_details?.primary_url && (
                <Link
                  href={cachedWebinar?.host_profile_details?.primary_url}
                  boxProps={{ target: "_blank" }}
                >
                  <Button
                    border={`2px solid ${colors.slate}`}
                    bg="transparent"
                    prefixElement={
                      <Icon mx={space.xxxxs} size={18} icon="Linktree" />
                    }
                    variant="nav-button"
                    text="LinkTree"
                  />
                </Link>
              )}
            </Flex>
            <Flex
              display={["none", "flex"]}
              flexDirection="column"
              gridColumn="1 / span 2"
            >
              <Text my={space.xxs} textStyle="title">
                Speakers
              </Text>
              <Flex>
                {cachedWebinar?.speakers_detail_list.map((speaker) => {
                  return (
                    <Link
                      key={speaker.pk}
                      href={PageRoutes.creatorProfile(
                        speaker.creator_detail?.slug ?? ""
                      )}
                    >
                      <Flex
                        flexDirection="row"
                        alignItems="center"
                        gridGap={space.xxxs}
                      >
                        <Avatar size={42} image={speaker.photo} />
                        <Text fontWeight="600">{speaker.name}</Text>
                      </Flex>
                    </Link>
                  );
                })}
              </Flex>
            </Flex>
          </Grid>
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
