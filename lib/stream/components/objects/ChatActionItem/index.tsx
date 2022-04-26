import { useCallback, useMemo, useState } from "react";
import { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import { Box, Text, Button, Modal, Shimmer } from "@/common/components/atoms";
import Spinner from "@/common/components/atoms/Spiner";
import { PageRoutes } from "@/common/constants/route.constants";
import useAnalytics from "@/common/utils/analytics/AnalyticsContext";
import ShareAndEarnModalPage from "@/community/components/objects/ShareAndEarnModalPage";
import { Webinar } from "@/community/types/community";
import { useFollower } from "@/creators/context/FollowerContext";
import { ChatMessage } from "@/stream/providers/FirebaseChatProvider/types";
import { ChatActionType } from "@/stream/types/streamChat";
import { useReferralSummary } from "@/tokens/context/ReferralSummaryContext";

interface IProps {
  stream?: Webinar;
  message: ChatMessage;
  mutateStream: () => void;
}

export default function ChatActionItem({
  stream,
  message,
  mutateStream,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();
  const [showReferralModal, setShowReferralModal] = useState(false);
  const { referralSummary } = useReferralSummary();
  const {
    followers,
    loading: followersLoading,
    subscribeCreator,
  } = useFollower();
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const { track } = useAnalytics();

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
    }
  }, [stream, mutateStream, subscribeCreator]);

  const actions = useMemo<
    {
      action: ChatActionType;
      display: JSX.Element | null;
    }[]
  >(() => {
    return [
      {
        action: ChatActionType.FOLLOW,
        display:
          stream?.host !== user?.pk ? (
            <Box
              mx={space.xxs}
              my={6}
              backgroundColor={colors.black[4]}
              p={space.xxxs}
              borderRadius={radii.xxs}
            >
              <Text pb={space.xxxs}>{message.message}</Text>
              {(() => {
                return followersLoading ? (
                  <Shimmer
                    w="100%"
                    h={35}
                    borderRadius={radii.xxxs}
                    mr={space.xxs}
                  />
                ) : followers && followers.length > 0 && followers[0].notify ? (
                  <Button
                    variant="full-width-outline-small"
                    text={`Following ${stream?.host_detail.name}`}
                    disabled={true}
                  />
                ) : (
                  <Button
                    variant="full-width-outline-small"
                    text={`Follow ${stream?.host_detail.name}`}
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
          ) : null,
      },
      {
        action: ChatActionType.REFERRAL,
        display: (
          <Box
            mx={space.xxs}
            my={6}
            backgroundColor={colors.black[4]}
            p={space.xxxs}
            borderRadius={radii.xxs}
          >
            <Text pb={space.xxxs}>{message.message}</Text>
            <Button
              variant="full-width-outline-small"
              text="Refer a friend"
              onClick={() => setShowReferralModal(true)}
              textProps={{ p: 0 }}
            />
          </Box>
        ),
      },
      {
        action: ChatActionType.STREAMS,
        display: (
          <Box
            mx={space.xxs}
            my={6}
            backgroundColor={colors.black[4]}
            p={space.xxxs}
            borderRadius={radii.xxs}
          >
            <Text pb={space.xxxs}>{message.message}</Text>
            <a href={PageRoutes.home} target="_blank" rel="noreferrer">
              <Button
                variant="full-width-outline-small"
                text="Explore Streams"
                textProps={{ p: 0 }}
              />
            </a>
          </Box>
        ),
      },
    ];
  }, [
    stream,
    space,
    colors,
    message,
    followCreator,
    loading,
    radii,
    followersLoading,
    followers,
    user,
  ]);

  return (
    <Box>
      <Modal
        display="grid"
        gridTemplateRows="max-content 1fr"
        maxWidth={600}
        maxHeight={575}
        visible={showReferralModal}
        onClose={() => setShowReferralModal(false)}
        overflowY={["auto", "hidden"]}
        px={[space.xxs, space.xs]}
        py={space.xxs}
        gridGap={space.xxs}
      >
        <ShareAndEarnModalPage
          user={user?.pk}
          referralSummary={referralSummary}
          shareUrl={shareUrl}
          trackModalAnalytics={trackModalAnalytics}
        />
      </Modal>

      {actions.map(({ action, display }, index) => {
        const chatAction = parseInt(message.action.toString());
        if (action === chatAction) {
          return <Box key={index}>{display}</Box>;
        }
      })}
    </Box>
  );
}
