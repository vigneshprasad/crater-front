import { DyteMeeting as DyteComponent, Meeting } from "dyte-client";
import { useRef } from "react";

import { Box, BoxProps } from "@/common/components/atoms";

export type Props = BoxProps & {
  token: string;
  orgId: string;
  roomName: string;
};

export default function DyteMeeting({
  orgId,
  token,
  roomName,
  ...rest
}: Props): JSX.Element {
  const meeting = useRef<Meeting>();

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
        }}
        onInit={(dyteMeeting) => {
          meeting.current = dyteMeeting;
        }}
      />
    </Box>
  );
}
