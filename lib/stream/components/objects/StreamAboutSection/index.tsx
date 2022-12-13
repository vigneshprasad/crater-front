import { useCallback, useState } from "react";
import { useTheme } from "styled-components";
import useSWR from "swr";

import { useRouter } from "next/router";

import useAuth from "@/auth/context/AuthContext";
import {
  Box,
  Flex,
  Text,
  Grid,
  Avatar,
  Icon,
  Shimmer,
  Span,
  Link,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import { IconButton } from "@/common/components/atoms/v2";
import ExpandingText from "@/common/components/objects/ExpandingText";
import HeadingDivider from "@/common/components/objects/HeadingDivider";
import { PageRoutes } from "@/common/constants/route.constants";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";
import useAnalytics from "@/common/utils/analytics/AnalyticsContext";
import { AnalyticsEvents } from "@/common/utils/analytics/types";
import { Follower, MultiStream, Webinar } from "@/community/types/community";
import StreamApiClient from "@/stream/api";
import useFirebaseChat from "@/stream/providers/FirebaseChatProvider";
import { UpvoteSummary } from "@/stream/types/stream";

import AboutCreatorBottomSheet from "../AboutCreatorBottomSheet";
import ShareStreamBottomSheet from "../ShareStreamBottomSheet";
import StreamHLSPlayer from "../StreamHLSPlayer";

interface IProps {
  stream?: Webinar;
  followers?: Follower[];
  followersLoading: boolean;
  hideShareIcon?: boolean;
  onFollow: () => void;
  onClickChatPanelMobile?: () => void;
  multiStreamMode?: boolean;
  multistream?: MultiStream;
  onUpvote?: (webinar: Webinar) => void;
}

export default function StreamAboutSection({
  stream,
  followers,
  followersLoading,
  hideShareIcon,
  onClickChatPanelMobile,
  multiStreamMode = false,
  multistream,
  onFollow,
}: IProps): JSX.Element | null {
  const router = useRouter();
  const { colors, space, radii, breakpoints } = useTheme();
  const [showAboutSheet, setShowAboutSheet] = useState(false);
  const [showShareSheet, setShowShareSheet] = useState(false);
  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);
  const { user } = useAuth();
  const { track } = useAnalytics();
  const { postMessage } = useFirebaseChat();

  const { data: upvoteSummary, mutate } = useSWR<UpvoteSummary>(
    stream ? API_URL_CONSTANTS.stream.retrieveUpvoteSummary(stream.id) : null
  );

  const upvoteStream = useCallback(async () => {
    if (user && stream && upvoteSummary) {
      const [streamUpvote] = await StreamApiClient().upvoteStream(stream.id);
      if (streamUpvote) {
        const { upvotes: currentUpvotes } = upvoteSummary;

        const newUpvote = streamUpvote.upvote;
        const newUpvotes = newUpvote ? currentUpvotes + 1 : currentUpvotes - 1;

        mutate({
          upvote: newUpvote,
          upvotes: newUpvotes,
        });

        track(AnalyticsEvents.upvote_stream_clicked, {
          ...streamUpvote,
        });

        if (newUpvote) {
          const message = {
            message: `${user?.name} just upvoted ${stream?.host_detail.name}'s channel.`,
            display_name: "Upvote Update",
          };
          postMessage(message);
        }
      }
    }
  }, [user, stream, upvoteSummary, mutate, track, postMessage]);

  if (!stream) {
    return <Box>Loading...</Box>;
  }

  const { topic_detail, host_detail } = stream;

  if (isMobile === undefined) return null;

  return (
    <>
      <Box
        as="section"
        bg={[colors.primaryBackground, colors.primaryLight]}
        borderRadius={radii.xxxxs}
      >
        <Flex
          display={["none", "flex"]}
          justifyContent="space-between"
          px={[space.xxxs, space.xxs]}
          py={[space.xxxs, space.xxxxs]}
          background={colors.primaryDark}
        >
          <Text
            textStyle="cardHeader"
            alignSelf="center"
            color={colors.textSecondary}
          >
            About the stream
          </Text>
        </Flex>

        <Box px={[space.xxxs, space.xxs]} py={[space.xxxxs, space.xxs]}>
          <Text textStyle="headline5" maxLines={2}>
            {topic_detail.name}
          </Text>
          {topic_detail.description && (
            <ExpandingText color={colors.textSecondary} maxLines={2}>
              {topic_detail.description}
            </ExpandingText>
          )}
          {isMobile && multiStreamMode && multistream && stream && (
            <Box overflowX="auto" w="calc(100vw - 24px)">
              <Flex gridGap={space.xxxxs} py={space.xxxs}>
                {multistream.streams
                  .filter((obj) => obj !== stream.id)
                  .map((id) => {
                    return (
                      <StreamHLSPlayer
                        autoPlay
                        muted
                        containerProps={{
                          w: 152,
                          h: 86,
                        }}
                        streamId={id}
                        key={id}
                        onClick={() => {
                          router.push(PageRoutes.multistream(id), undefined, {
                            shallow: true,
                          });
                        }}
                      />
                    );
                  })}
              </Flex>
            </Box>
          )}

          <HeadingDivider label="Speaker" />
          <Grid
            gridTemplateColumns="max-content 1fr max-content"
            gridGap={space.xxs}
            alignItems="start"
            py={space.xxxxs}
          >
            {host_detail.creator_detail?.slug && (
              <Link
                href={PageRoutes.creatorProfile(
                  host_detail.creator_detail.slug
                )}
                boxProps={{ target: "_blank" }}
              >
                <Avatar image={host_detail.photo} size={40} />
              </Link>
            )}
            <Box
              onClick={() => {
                if (isMobile) {
                  setShowAboutSheet(true);
                }
              }}
            >
              <Flex>
                <Text textStyle="body" fontWeight="700">
                  {host_detail.name}{" "}
                  {(() => {
                    return (
                      <Span
                        display={["inline-block", "none"]}
                        color={colors.accentLight}
                      >
                        <Flex alignItems="center">
                          Follow
                          <Icon
                            display="inline-block"
                            color="inherit"
                            icon="ChevronDown"
                            size={20}
                          />
                        </Flex>
                      </Span>
                    );
                  })()}
                </Text>
              </Flex>
              <Text textStyle="body">
                {stream?.host_detail.creator_detail?.subscriber_count} Followers
              </Text>

              <Box pt={space.xxxxxs} display={["none", "grid"]}>
                <ExpandingText color={colors.textSecondary} maxLines={3}>
                  {host_detail.introduction}
                </ExpandingText>
              </Box>
            </Box>

            <Flex display={["none", "flex"]} gridGap={space.xxxs}>
              {user &&
                (() => {
                  if (followersLoading || !followers) {
                    return (
                      <>
                        <Shimmer h={39} w={72} borderRadius={4} />
                      </>
                    );
                  }

                  const isFollower = followers?.[0]?.notify === true;

                  return (
                    <>
                      <Button
                        disabled={isFollower ? true : false}
                        label={isFollower ? "Following" : "Follow"}
                        onClick={() => onFollow()}
                      />
                    </>
                  );
                })()}
              {stream.host_detail.creator_detail?.profile_detail
                .primary_url && (
                <a
                  href={
                    stream.host_detail.creator_detail?.profile_detail
                      .primary_url
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="outline-condensed">
                    <Flex gridGap={space.xxxs} alignItems="center">
                      <Icon icon="Linktree" size={16} />
                      <Text fontSize="inherit" color="inherit" fontWeight="500">
                        LinkTree
                      </Text>
                    </Flex>
                  </Button>
                </a>
              )}
            </Flex>

            {hideShareIcon && (
              <IconButton
                display={["grid", "none !important"]}
                icon="Share"
                onClick={() => {
                  setShowShareSheet(true);
                }}
              />
            )}

            {(() => {
              if (!upvoteSummary) {
                return <Shimmer w={50} h={30} borderRadius={radii.xxxxs} />;
              }

              const { upvotes, upvote } = upvoteSummary;
              if (user) {
                if (user.pk !== host_detail.pk) {
                  return (
                    <Button
                      alignSelf="center"
                      variant="upvote"
                      display={["grid", "none"]}
                      label={`${upvotes}`}
                      alignItems="center"
                      suffixElement={
                        <Icon
                          icon="Upvote"
                          size={10}
                          color={upvote ? colors.green[0] : colors.textPrimary}
                        />
                      }
                      gridProps={{ gridGap: space.xxxxxs }}
                      textProps={{
                        textStyle: "captionLarge",
                        color: upvote ? colors.green[0] : colors.textPrimary,
                      }}
                      onClick={upvoteStream}
                    />
                  );
                }

                return (
                  <Flex
                    display={["grid", "none"]}
                    gridGap={space.xxxxxs}
                    alignItems="center"
                  >
                    <Text textStyle="captionLarge">{upvotes}</Text>
                    <Icon icon="Upvote" size={10} />
                  </Flex>
                );
              }

              return null;
            })()}
          </Grid>

          <Flex
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            p={space.xxxxs}
            display={["none"]}
          >
            <Text color={colors.accentLight}>
              Refer a friend and earn ₹100 🎉
            </Text>
            <Icon icon="ChevronRight" />
          </Flex>
        </Box>
      </Box>

      <Flex
        display={["flex", "none"]}
        gridGap={space.xxxs}
        px={space.xxxs}
        py={space.xxxxs}
      >
        <Button
          variant="dark-flat"
          flex={1}
          label="Share Stream"
          suffixElement={<Icon icon="Share" />}
          onClick={() => {
            setShowShareSheet(true);
          }}
        />
        <Button
          variant="dark-flat"
          flex={1}
          label="Live Chat"
          suffixElement={<Icon icon="Chat" />}
          onClick={onClickChatPanelMobile}
        />
      </Flex>

      <AboutCreatorBottomSheet
        stream={stream}
        visible={showAboutSheet}
        onClose={() => setShowAboutSheet(false)}
        followers={followers}
        followersLoading={followersLoading}
        onFollow={onFollow}
      />

      <ShareStreamBottomSheet
        stream={stream}
        visible={showShareSheet}
        onClose={() => setShowShareSheet(false)}
      />
    </>
  );
}
