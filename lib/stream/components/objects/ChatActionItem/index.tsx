import { useCallback, useMemo, useState } from "react";
import { useTheme } from "styled-components";

import { Box, Text, Button } from "@/common/components/atoms";
import Spinner from "@/common/components/atoms/Spiner";
import { PageRoutes } from "@/common/constants/route.constants";
import ReferralModal from "@/community/components/objects/ReferralModal";
import { Webinar } from "@/community/types/community";
import { useFollower } from "@/creators/context/FollowerContext";
import { ChatMessage } from "@/stream/providers/FirebaseChatProvider/types";
import { ChatActionType } from "@/stream/types/streamChat";
import { useReferralSummary } from "@/tokens/context/ReferralSummaryContext";

interface IProps {
  stream?: Webinar;
  mutateStream: () => void;
  message: ChatMessage;
}

export default function ChatActionItem({
  stream,
  message,
  mutateStream,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();
  const [showReferralModal, setShowReferralModal] = useState(false);
  const { referralSummary } = useReferralSummary();
  const { subscribeCreator } = useFollower();
  const [loading, setLoading] = useState(false);

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
        display: !stream?.host_detail.creator_detail?.is_subscriber ? (
          <Box
            mx={space.xxs}
            my={6}
            backgroundColor={colors.black[4]}
            p={space.xxxs}
          >
            <Text pb={space.xxxs}>{message.message}</Text>
            {stream?.host_detail.creator_detail?.is_subscriber ? (
              <Button
                variant="full-width-outline-small"
                text="Following"
                disabled={true}
                textProps={{ p: 0 }}
              />
            ) : (
              <Button
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
            )}
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
          >
            <Text pb={space.xxxs}>{message.message}</Text>
            <Button
              variant="full-width-outline-small"
              text="Learn more"
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
          >
            <Text pb={space.xxxs}>{message.message}</Text>
            <a href={PageRoutes.home} target="_blank" rel="noreferrer">
              <Button
                variant="full-width-outline-small"
                text="Explore"
                textProps={{ p: 0 }}
              />
            </a>
          </Box>
        ),
      },
    ];
  }, [stream, space, colors, message, followCreator, loading]);

  return (
    <Box>
      <ReferralModal
        referralSummary={referralSummary}
        visible={showReferralModal}
        onClose={() => setShowReferralModal(false)}
      />

      {actions.map(({ action, display }) => {
        const chatAction = parseInt(message.action.toString());
        if (action === chatAction) {
          return display;
        }
      })}
    </Box>
  );
}
