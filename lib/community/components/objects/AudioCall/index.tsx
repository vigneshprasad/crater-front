import { useTheme } from "styled-components";

import { IRtcUser } from "@/agora/types/rtc";
import { useUser } from "@/auth/hooks";
import { Box, Grid, Text, Flex } from "@/common/components/atoms";
import { Room } from "@/creators/types/community";

import AudioCallBar from "../AudioCallBar";
import SpeakersList from "../SpeakersList";

type IProps = {
  muted: boolean;
  room: Room;
  remoteUsers: Map<string, IRtcUser>;
  onLeaveClick: () => void | Promise<void>;
  onMutedClick: () => void | Promise<void>;
};

const AudioCall: React.FC<IProps> = ({
  muted,
  room,
  remoteUsers,
  onMutedClick,
  onLeaveClick,
}) => {
  const { user } = useUser();
  const { colors, space, radii } = useTheme();
  return (
    <Grid gridTemplateRows="1fr 96px">
      <Grid position="relative">
        <SpeakersList host={room.host_detail} remoteUsers={remoteUsers} />
        <Flex
          position="absolute"
          bottom={0}
          right={space.s}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          h={140}
          w={240}
          bg={colors.black[3]}
          borderRadius={radii.xs}
        >
          <Box
            mb={space.xxs}
            h={56}
            w={56}
            backgroundImage={`url(${user?.photo})`}
            backgroundSize="cover"
            backgroundPosition="center"
            borderRadius="50%"
          />
          <Text>You</Text>
        </Flex>
      </Grid>
      <AudioCallBar
        muted={muted}
        name={room?.topic_detail?.name}
        onLeaveClick={onLeaveClick}
        onMutedClick={onMutedClick}
      />
    </Grid>
  );
};

export default AudioCall;
