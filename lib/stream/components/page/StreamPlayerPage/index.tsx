import { useRef, useState } from "react";
import styled, { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import useAuthModal from "@/auth/context/AuthModalContext";
import {
  Grid,
  Text,
  Box,
  Avatar,
  Link,
  Flex,
  Button,
  Spinner,
} from "@/common/components/atoms";
import BaseLayout from "@/common/components/layouts/BaseLayout/v2";
import { AsideNav } from "@/common/components/objects/AsideNav/v2";
import ExpandingText from "@/common/components/objects/ExpandingText";
import { PageRoutes } from "@/common/constants/route.constants";
import DateTime from "@/common/utils/datetime/DateTime";
import { useWebinar } from "@/community/context/WebinarContext";
import { useFollower } from "@/creators/context/FollowerContext";
import useStreamRecording from "@/stream/context/StreamRecordingContext";

import PastStreamsList from "../../objects/PastStreamsList";

const Video = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.radii.xxs}px;
`;

export default function StreamPlayerPage(): JSX.Element {
  const { webinar, loading, mutateWebinar } = useWebinar();
  const { recording } = useStreamRecording();

  const { space, colors, borders } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  const { subscribeCreator } = useFollower();
  const [followBtnLoading, setFollowBtnLoading] = useState(false);
  const { user } = useAuth();
  const { openModal } = useAuthModal();

  if (!webinar || loading) return <Box>Loading...</Box>;

  const startTime = DateTime.parse(webinar?.start).toFormat("ff");

  const followCreator = async (): Promise<void> => {
    const creator = webinar.host_detail.creator_detail;

    if (creator) {
      await subscribeCreator(creator.id);
      await mutateWebinar();
      setFollowBtnLoading(false);
    }
  };

  return (
    <BaseLayout px={[space.xs, space.s]} aside={<AsideNav />} overflowY="auto">
      <Grid
        gridTemplateColumns={["1fr", "2fr 1fr"]}
        gridGap={[space.xxxs, space.xs]}
      >
        <Box py={[space.xxs, space.s]}>
          <Box position="relative" pt="56.25%">
            <Video
              poster={webinar?.topic_detail?.image}
              controls
              controlsList="nodownload"
              src={`${recording?.recording}#t=600`}
              ref={videoRef}
              onEnded={() => {
                if (videoRef.current) {
                  videoRef.current.play();
                  videoRef.current.currentTime += 600;
                }
              }}
            />
          </Box>

          <Box py={space.xxs}>
            <Flex
              flexDirection={["column", "row"]}
              justifyContent="space-between"
              alignItems="start"
              gridGap={[space.xxs, 0]}
            >
              <Box>
                <Text textStyle="headline5">{webinar?.topic_detail?.name}</Text>
                <Text color={colors.slate}>{startTime}</Text>
              </Box>

              {(() => {
                // If the logged in user is the host, do not show `Follow` button
                if (webinar?.host === user?.pk) return null;

                if (
                  webinar?.host_detail.creator_detail?.is_subscriber &&
                  user
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
                      if (user) {
                        setFollowBtnLoading(true);
                        followCreator();
                      } else {
                        openModal();
                      }
                    }}
                    suffixElement={
                      followBtnLoading ? (
                        <Spinner
                          size={24}
                          strokeWidth={2}
                          strokeColor={colors.white[0]}
                        />
                      ) : undefined
                    }
                    disabled={followBtnLoading}
                  />
                );
              })()}
            </Flex>
          </Box>

          <Grid
            py={space.xxs}
            borderTop={`2px solid ${borders.main}`}
            alignItems="start"
            gridTemplateColumns="max-content 1fr"
          >
            {webinar.host_detail?.creator_detail?.slug && (
              <Link
                href={PageRoutes.creatorProfile(
                  webinar.host_detail?.creator_detail?.slug
                )}
              >
                <Avatar
                  size={52}
                  image={webinar?.host_profile_details?.photo}
                />
              </Link>
            )}

            <Box px={space.xxs}>
              <Text textStyle="title">{webinar?.host_detail?.name}</Text>
              <ExpandingText maxLines={1}>
                {webinar?.host_detail?.introduction}
              </ExpandingText>
            </Box>
          </Grid>
        </Box>

        <Box py={[space.xxxs, space.s]}>
          <PastStreamsList displayedPastStreamId={webinar.id} />
          <Box h={space.xs} />
        </Box>
      </Grid>
    </BaseLayout>
  );
}
