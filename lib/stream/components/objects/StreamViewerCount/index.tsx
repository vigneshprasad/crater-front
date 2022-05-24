import { useTheme } from "styled-components";

import { Flex, Icon, Text } from "@/common/components/atoms";
import useStreamChat from "@/stream/hooks/useStreamChat";

export default function StreamViewerCount(): JSX.Element | null {
  const { room, viewerCount } = useStreamChat();
  const { space } = useTheme();

  if (!room || !viewerCount) {
    return null;
  }

  return (
    <Flex gridGap={space.xxxs}>
      <Icon icon="Users" size={16} />
      <Text>{viewerCount}</Text>
    </Flex>
  );
}
