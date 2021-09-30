import { DyteMeeting as DyteComponent, Meeting } from "dyte-client";
import { useCallback, useEffect, useRef } from "react";

import { useRouter } from "next/router";

import useAuth from "@/auth/context/AuthContext";
import { Box, BoxProps } from "@/common/components/atoms";
import { PageRoutes } from "@/common/constants/route.constants";

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

  const meetendEndHandler = useCallback(() => {
    // router.push(PageRoutes.session(groupId.toString()));
  }, []);

  const participantLeaveHandler = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (participant: any) => {
      console.log(participant);
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
