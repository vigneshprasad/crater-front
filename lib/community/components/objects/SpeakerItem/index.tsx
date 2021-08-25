import { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import { useTheme } from "styled-components";

import { Avatar, Box, Text, Grid, Flex } from "@/common/components/atoms";

type IProps = {
  remoteUser?: IAgoraRTCRemoteUser;
  photo?: string;
  isHost?: boolean;
  name: string;
};

const SpeakerItem: React.FC<IProps> = ({ remoteUser, photo, name }) => {
  const { radii, borders, space } = useTheme();

  return (
    <Grid
      gridTemplateRows="36px 1fr 48px"
      border={`2px solid ${borders.main}`}
      borderRadius={[radii.s]}
    >
      <Box />
      <Avatar m="auto auto" size={96} alt={name} image={photo} />
      <Flex px={[space.xs]} alignItems="center" justifyContent="space-between">
        <Text singleLine textStyle="captionLarge">
          {name}
        </Text>
        {!remoteUser && <Text textStyle="caption">(Offline)</Text>}
      </Flex>
    </Grid>
  );
};

SpeakerItem.defaultProps = {
  isHost: false,
};

export default SpeakerItem;
