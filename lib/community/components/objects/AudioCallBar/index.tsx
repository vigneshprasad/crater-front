import { useTheme } from "styled-components";

import { Grid, Text } from "@/common/components/atoms";
import IconButton from "@/common/components/atoms/IconButton";
import { IconOptions } from "@/common/theme";

type IProps = {
  name?: string;
  muted: boolean;
  onLeaveClick: () => void | Promise<void>;
  onMutedClick: () => void | Promise<void>;
};

const AudioCallBar: React.FC<IProps> = ({
  muted,
  name,
  onLeaveClick,
  onMutedClick,
}) => {
  const { space, colors } = useTheme();
  const muteIcon: IconOptions = muted ? "MicOff" : "MicOn";
  const muteBg = muted ? colors.error : colors.black[3];
  return (
    <Grid
      px={[space.s]}
      alignItems="center"
      gridColumnGap={[space.xs]}
      gridTemplateColumns="1fr min-content 1fr"
    >
      <Text textStyle="headline6">{name}</Text>
      <Grid
        gridAutoFlow="column"
        gridColumnGap={[space.xs]}
        justifyContent="center"
      >
        <IconButton bg={muteBg} icon={muteIcon} onClick={onMutedClick} />
        <IconButton bg={colors.error} icon="CallEnd" onClick={onLeaveClick} />
      </Grid>
    </Grid>
  );
};

export default AudioCallBar;
