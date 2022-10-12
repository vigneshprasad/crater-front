import backgroundModule from "@dytesdk/background-changer-module";
import { Meeting, DyteMeeting } from "dyte-client";
import { useCallback, useEffect, useRef } from "react";

import useAuth from "@/auth/context/AuthContext";
import { Box, Shimmer } from "@/common/components/atoms";
import useAnalytics from "@/common/utils/analytics/AnalyticsContext";
import { AnalyticsEvents } from "@/common/utils/analytics/types";
import { Webinar } from "@/community/types/community";
import useDyteWebinar from "@/dyte/context/DyteWebinarContext";

interface IProps {
  stream?: Webinar;
  orgId: string;
}

export default function StreamDytePlayer({
  stream,
  orgId,
}: IProps): JSX.Element {
  const meeting = useRef<Meeting>();
  const { dyteParticipant, loading } = useDyteWebinar();

  const { track } = useAnalytics();

  const meetendEndHandler = useCallback(() => {
    // router.push(PageRoutes.session(groupId.toString()));
  }, []);

  const participantLeaveHandler = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    (participant: any) => {
      // if (participant.clientSpecificId === user?.pk) {
      //   router.push(PageRoutes.session(webinar.id.toString()));
      // }
    },
    []
  );

  const { user } = useAuth();

  const participantJoinHandler = useCallback(() => {
    if (stream) {
      track(AnalyticsEvents.participant_joined_stream, {
        stream: stream.id,
        stream_name: stream.topic_detail?.name,
        host: {
          ...stream.host_detail,
        },
      });
    }
  }, [track, stream]);

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

      meeting.current.on(meeting.current.Events.participantJoin, (data) => {
        console.log(data);
      });
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
    <Box pt="56.25%" position="relative">
      {(() => {
        if (!dyteParticipant || loading) {
          return (
            <Shimmer
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
            />
          );
        }

        return (
          <Box position="absolute" top={0} left={0} right={0} bottom={0}>
            <DyteMeeting
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
                roomName: dyteParticipant.dyte_meeting_detail.room_name,
                authToken: dyteParticipant.auth_token,
                showSetupScreen: false,
              }}
              onInit={(dyteMeeting) => {
                meeting.current = dyteMeeting;
                user?.pk === stream?.host &&
                  meeting.current.modules.initAndAdd(backgroundModule);
                addEventListeners();
              }}
            />
          </Box>
        );
      })()}
    </Box>
  );
}
