import backgroundModule from "@dytesdk/background-changer-module";
import { DyteMeeting as DyteComponent, Meeting } from "dyte-client";
import { useCallback, useEffect, useRef } from "react";

import useAuth from "@/auth/context/AuthContext";
import { Box, BoxProps } from "@/common/components/atoms";
// import { PageRoutes } from "@/common/constants/route.constants";
import useAnalytics from "@/common/utils/analytics/AnalyticsContext";
import { AnalyticsEvents } from "@/common/utils/analytics/types";
import { Webinar } from "@/community/types/community";

export type Props = BoxProps & {
  webinar: Webinar;
  token: string;
  orgId: string;
  roomName: string;
};

export default function DyteMeeting({
  webinar,
  orgId,
  token,
  roomName,
  ...rest
}: Props): JSX.Element {
  const meeting = useRef<Meeting>();
  const { track } = useAnalytics();

  const meetendEndHandler = useCallback(() => {
    // router.push(PageRoutes.session(groupId.toString()));
  }, []);

  const participantLeaveHandler = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (participant: any) => {
      console.log("Participant left", participant);
      // if (participant.clientSpecificId === user?.pk) {
      //   router.push(PageRoutes.session(webinar.id.toString()));
      // }
    },
    []
  );

  const { user } = useAuth();

  const participantJoinHandler = useCallback(() => {
    track(AnalyticsEvents.participant_joined_stream, {
      stream: webinar.id,
      stream_name: webinar.topic_detail?.name,
      host: {
        ...webinar.host_detail,
      },
    });
  }, [track, webinar]);

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

      meeting.current.on(
        meeting.current.Events.participantJoin,
        participantJoinHandler
      );
    }
  }, [
    meeting,
    participantLeaveHandler,
    meetendEndHandler,
    participantJoinHandler,
  ]);

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
          showSetupScreen: false,
        }}
        onInit={(dyteMeeting) => {
          meeting.current = dyteMeeting;
          user?.pk === webinar.host &&
            meeting.current.modules.initAndAdd(backgroundModule);
          addEventListeners();
        }}
      />
    </Box>
  );
}
