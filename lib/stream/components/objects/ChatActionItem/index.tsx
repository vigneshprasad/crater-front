import { useCallback, useMemo, useRef, useState } from "react";
import styled, { useTheme } from "styled-components";

import { useRouter } from "next/router";

import useAuth from "@/auth/context/AuthContext";
import {
  Box,
  Text,
  Button,
  Modal,
  Shimmer,
  Flex,
  Avatar,
  ButtonProps,
} from "@/common/components/atoms";
import Spinner from "@/common/components/atoms/Spiner";
import AppLink, { AppLinkType } from "@/common/components/objects/AppLink";
import { PageRoutes } from "@/common/constants/route.constants";
import useAnalytics from "@/common/utils/analytics/AnalyticsContext";
import { AnalyticsEvents } from "@/common/utils/analytics/types";
import WebinarApiClient from "@/community/api";
import ShareAndEarnModalPage from "@/community/components/objects/ShareAndEarnModalPage";
import StreamsModalPage from "@/community/components/objects/StreamsModalPage";
import {
  ParticpantType,
  PostGroupRequest,
  RequestStatus,
  Webinar,
} from "@/community/types/community";
import { useFollower } from "@/creators/context/FollowerContext";
import useStreamsToRsvp from "@/stream/context/StreamsToRsvpContext";
import useFirebaseChat from "@/stream/providers/FirebaseChatProvider";
import { ChatMessage } from "@/stream/providers/FirebaseChatProvider/types";
import { ChatActionType } from "@/stream/types/streamChat";
import { useReferralSummary } from "@/tokens/context/ReferralSummaryContext";

interface IProps {
  stream?: Webinar;
  message: ChatMessage;
  mutateStream: () => void;
}

const FollowActionButton = styled(Button)<ButtonProps>`
  width: 100%;
  background: #223596;
  border-color: #223596;
  border-radius: 4px;

  &:hover {
    background: #1f2d76;
    border-color: #1f2d76;
  }

  &:disabled {
    background: #1f2d76;
    border-color: #1f2d76;
    color: #fff;
  }
`;

const ReferralActionButton = styled(Button)<ButtonProps>`
  background: #820f54;
  border-color: #820f54;
  border-radius: 4px;

  &:hover {
    background: #621543;
    border-color: #621543;
  }
`;

const StreamsActionButton = styled(Button)<ButtonProps>`
  background: #8822ee;
  border-color: #8822ee;
  border-radius: 4px;

  &:hover {
    background: #7320c6;
    border-color: #7320c6;
  }
`;

export default function ChatActionItem({
  stream,
  message,
  mutateStream,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [showStreamsModal, setShowStreamsModal] = useState(false);
  const { referralSummary } = useReferralSummary();
  const {
    followers,
    loading: followersLoading,
    subscribeCreator,
  } = useFollower();
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const { track } = useAnalytics();
  const { postMessage } = useFirebaseChat();
  const {
    streams: streamsToRsvp,
    loading: streamsToRsvpLoading,
    setStreamsToRsvpPage,
    nextPage: streamsToRsvpNextPage,
  } = useStreamsToRsvp();
  const [rsvpedStreams, setRsvpedStreams] = useState<number[]>([]);
  const router = useRouter();
  const _observer = useRef<IntersectionObserver>();

  const trackModalAnalytics = useCallback(
    (eventName: string) => {
      track(eventName, {
        stream: stream?.id,
        stream_name: stream?.topic_detail?.name,
        page: "livestream",
      });
    },
    [stream, track]
  );

  const shareUrl = useCallback(() => {
    if (user && profile) {
      const url = window.location.href;
      let encodedUrl = url;

      if (!profile.is_creator) {
        encodedUrl = `${url}?referrer_id=${user.pk}`;
      }

      return encodeURIComponent(encodedUrl);
    }
  }, [user, profile]);

  const followCreator = useCallback(async (): Promise<void> => {
    const creator = stream?.host_detail.creator_detail;

    if (creator) {
      await subscribeCreator(creator.id);
      await mutateStream();
      setLoading(false);

      trackModalAnalytics(AnalyticsEvents.chat_action_follow_clicked);

      const message = {
        message: `${user?.name} just followed ${stream?.host_detail.name}'s channel.`,
        display_name: "New Follower",
      };
      postMessage(message);
    }
  }, [
    stream,
    user,
    mutateStream,
    subscribeCreator,
    postMessage,
    trackModalAnalytics,
  ]);

  const postGroupRequest = useCallback(
    async (webinar: Webinar, redirect = false): Promise<void> => {
      const data: PostGroupRequest = {
        group: webinar.id,
        participant_type: ParticpantType.attendee,
        status: RequestStatus.accepted,
      };

      const [request] = await WebinarApiClient().postWebinarRequest(data);

      if (request) {
        setRsvpedStreams((prev) => [...prev, webinar.id]);
        track(AnalyticsEvents.rsvp_stream, {
          page: "Livestream",
          stream: webinar.id,
          stream_name: webinar.topic_detail?.name,
          host: {
            ...webinar.host_detail,
          },
        });
      }

      if (redirect) {
        track(AnalyticsEvents.join_stream, {
          page: "Livestream",
          stream: webinar.id,
          stream_name: webinar.topic_detail?.name,
          host: {
            ...webinar.host_detail,
          },
        });
        router.push(PageRoutes.stream(webinar.id.toString()));
      }
    },
    [track, router]
  );

  const streamsRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (streamsToRsvpLoading) return;
      if (_observer.current) _observer.current.disconnect();
      _observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          streamsToRsvpNextPage && setStreamsToRsvpPage((page) => page + 1);
        }
      });
      if (node != null) _observer.current.observe(node);
    },
    [setStreamsToRsvpPage, streamsToRsvpNextPage, streamsToRsvpLoading]
  );

  const actions = useMemo<
    {
      action: ChatActionType;
      display: JSX.Element | null;
    }[]
  >(() => {
    return [
      {
        action: ChatActionType.FOLLOW,
        display: (
          <Box
            mx={space.xxs}
            my={6}
            backgroundColor="#1E254C"
            p={space.xxxs}
            borderRadius={4}
            border="2px solid #202F79"
          >
            <Flex
              pb={space.xxxs}
              flexDirection="row"
              gridGap={space.xxxs}
              alignItems="center"
            >
              <Avatar size={32} image={stream?.host_profile_details?.image} />
              <Text color="#EDEDED" variant="title">
                {stream?.host_detail.name}
              </Text>
            </Flex>
            <Text pb={space.xxxs} color={colors.white[0]}>
              {message.message}
            </Text>
            {(() => {
              return followersLoading ? (
                <Shimmer
                  w="100%"
                  h={35}
                  borderRadius={radii.xxxs}
                  mr={space.xxs}
                />
              ) : followers && followers.length > 0 && followers[0].notify ? (
                <FollowActionButton
                  variant="full-width-outline-small"
                  text="Following"
                  disabled={true}
                />
              ) : (
                <FollowActionButton
                  variant="full-width-outline-small"
                  text="Follow"
                  onClick={() => {
                    setLoading(true);
                    followCreator();
                  }}
                  suffixElement={
                    loading ? (
                      <Spinner
                        size={24}
                        strokeWidth={2}
                        strokeColor={colors.white[0]}
                      />
                    ) : undefined
                  }
                  disabled={loading}
                  textProps={{ p: 0 }}
                />
              );
            })()}
          </Box>
        ),
      },
      {
        action: ChatActionType.REFERRAL,
        display: (
          <Box
            mx={space.xxs}
            my={6}
            backgroundColor="#541D3E"
            p={space.xxxs}
            borderRadius={4}
            border="2px solid #6F154B"
          >
            <Text pb={space.xxxs}>{message.message}</Text>
            <ReferralActionButton
              variant="full-width-outline-small"
              text="Refer a friend"
              onClick={() => {
                setShowReferralModal(true);
                trackModalAnalytics(
                  AnalyticsEvents.chat_action_referral_modal_opened
                );
              }}
              textProps={{ p: 0 }}
            />
          </Box>
        ),
      },
      {
        action: ChatActionType.MOBILE_APP,
        display: (
          <Box
            mx={space.xxs}
            my={6}
            backgroundColor="#272727"
            p={space.xxxs}
            borderRadius={4}
            border="2px solid #7146AE"
          >
            <Text pb={space.xxxs} color="#D5BBFF">
              {message.message}
            </Text>
            <Flex flexDirection="row" justifyContent="space-between">
              <AppLink
                height={47}
                buttonType={AppLinkType.android}
                analyticsEventName={
                  AnalyticsEvents.chat_action_google_play_badge_clicked
                }
              />
              <AppLink
                height={48}
                buttonType={AppLinkType.apple}
                analyticsEventName={
                  AnalyticsEvents.chat_action_appstore_badge_clicked
                }
              />
            </Flex>
          </Box>
        ),
      },
      {
        action: ChatActionType.STREAMS,
        display: (
          <Box
            mx={space.xxs}
            my={6}
            backgroundColor="#401E67"
            p={space.xxxs}
            borderRadius={4}
            border="2px solid #7146AE"
          >
            <Text pb={space.xxxs}>{message.message}</Text>
            <StreamsActionButton
              variant="full-width-outline-small"
              text="Explore Streams"
              textProps={{ p: 0 }}
              onClick={() => {
                setShowStreamsModal(true);
                trackModalAnalytics(
                  AnalyticsEvents.chat_action_streams_modal_opened
                );
              }}
            />
          </Box>
        ),
      },
    ];
  }, [
    stream,
    space,
    colors,
    message,
    loading,
    radii,
    followersLoading,
    followers,
    followCreator,
    trackModalAnalytics,
  ]);

  return (
    <Box>
      <Modal
        display="grid"
        gridTemplateRows="max-content 1fr"
        maxWidth={600}
        maxHeight={575}
        visible={showReferralModal || showStreamsModal}
        onClose={() => {
          if (showReferralModal) {
            setShowReferralModal(false);
          } else if (showStreamsModal) {
            setShowStreamsModal(false);
          }
        }}
        overflowY={["auto", "hidden"]}
        px={[space.xxs, space.xs]}
        py={space.xxs}
        gridGap={space.xxs}
      >
        {showReferralModal && (
          <ShareAndEarnModalPage
            user={user?.pk}
            referralSummary={referralSummary}
            shareUrl={shareUrl}
            trackModalAnalytics={trackModalAnalytics}
          />
        )}

        {showStreamsModal && stream && (
          <StreamsModalPage
            currentStream={stream}
            streams={streamsToRsvp}
            loading={streamsToRsvpLoading}
            rsvpedStreams={rsvpedStreams}
            postGroupRequest={postGroupRequest}
            ref={streamsRef}
          />
        )}
      </Modal>

      {actions.map(({ action, display }, index) => {
        const chatAction = parseInt(message.action.toString());
        if (action === chatAction && !profile?.is_creator) {
          return <Box key={index}>{display}</Box>;
        }
      })}
    </Box>
  );
}
