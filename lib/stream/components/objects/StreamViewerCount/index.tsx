import { useTheme } from "styled-components";

import { Grid, Icon, Text } from "@/common/components/atoms";
import useStreamChat from "@/stream/hooks/useStreamChat";

export default function StreamViewerCount(): JSX.Element | null {
  const { room, viewerCount } = useStreamChat();
  const { space, colors, radii } = useTheme();

  if (!room || !viewerCount) {
    return null;
  }

  return (
    <Grid
      position="absolute"
      top={space.xxs}
      left={space.xs}
      gridTemplateColumns="24px max-content"
      px={8}
      py={4}
      bg={colors.black[0]}
      borderRadius={radii.xxxs}
      alignItems="center"
      gridGap={space.xxxxs}
    >
      <Icon icon="Eye" size={20} />
      <Text>{viewerCount}</Text>
    </Grid>
  );
}
