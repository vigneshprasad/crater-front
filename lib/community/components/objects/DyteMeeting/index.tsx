import { DyteMeeting as DyteComponent, Meeting } from "dyte-client";
import { useCallback, useEffect, useRef } from "react";

import { useRouter } from "next/router";

import useAuth from "@/auth/context/AuthContext";
import { Box, BoxProps } from "@/common/components/atoms";
import { PageRoutes } from "@/common/constants/route.constants";
import DateTime from "@/common/utils/datetime/DateTime";
import useStreamChat from "@/stream/hooks/useStreamChat";
import { ChatMessageType } from "@/stream/types/streamChat";

export type Props = BoxProps & {
  groupId: number;
  token: string;
  orgId: string;
  roomName: string;
};

export default function DyteMeeting({
  groupId,
  orgId,
  token,
  roomName,
  ...rest
}: Props): JSX.Element {
  const router = useRouter();
  const meeting = useRef<Meeting>();
  const { user } = useAuth();

  const { messages } = useStreamChat();

  const meetendEndHandler = useCallback(() => {
    // router.push(PageRoutes.session(groupId.toString()));
  }, []);

  const participantLeaveHandler = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (participant: any) => {
      if (participant.clientSpecificId === user?.pk) {
        router.push(PageRoutes.session(groupId.toString()));
      }
    },
    [router, groupId, user]
  );

  const addEventListeners = useCallback(() => {
    if (meeting.current) {
      meeting.current.on(
        meeting.current.Events.meetingEnded,
        meetendEndHandler
      );

      meeting.current.on(
        meeting.current.Events.participantLeave,
        participantLeaveHandler
      );
    }
  }, [meeting, participantLeaveHandler, meetendEndHandler]);

  useEffect(() => {
    return () => {
      meeting.current?.removeAllListeners();
    };
  }, []);

  // const timerRef = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    if (messages.length > 0 && messages[0].type === ChatMessageType.REACTION) {
      const lastMessage = messages[0];
      if (meeting.current && lastMessage.data) {
        const reactionTime = DateTime.parse_with_milliseconds(
          lastMessage.created_at
        );
        const timeSinceReaction = Math.abs(reactionTime.diffNow().toMillis());
        if (timeSinceReaction < 10000) {
          meeting.current?.grid.setOverlay(
            `<img src=${lastMessage.data.file} height="80px" width="80px" style="position:fixed; right: 20px; top: 10px"/>`,
            10000
          );
        }
        // if (timerRef.current) {
        //   clearInterval(timerRef.current);
        //   timerRef.current = undefined;
        // }
        // timerRef.current = setTimeout(() => {
        //   meeting.current?.grid.setOverlay(null);
        // }, 10000);
      }
    }
  }, [messages]);

  return (
    <Box {...rest}>
      <DyteComponent
        uiConfig={{
          header: false,
          controlBarElements: {
            polls: false,
            chat: false,
            plugins: false,
            participants: false,
          },
          dimensions: {
            mode: "fillParent",
          },
        }}
        clientId={orgId}
        meetingConfig={{
          roomName,
          authToken: token,
          showSetupScreen: true,
        }}
        onInit={(dyteMeeting) => {
          meeting.current = dyteMeeting;
          addEventListeners();
        }}
      />
    </Box>
  );
}
