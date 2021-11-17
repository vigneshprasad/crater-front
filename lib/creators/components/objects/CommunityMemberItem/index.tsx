import { useTheme } from "styled-components";

import { Avatar, Flex, Text } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";

interface IProps {
  name: string;
  image?: string;
  tagLine: string;
  onClick: () => void;
}

export default function CommunityMemberItem({
  name,
  image,
  tagLine,
  onClick,
}: IProps): JSX.Element {
  const { space } = useTheme();
  return (
    <Flex alignItems="center" flexDirection={["row", "column"]}>
      <Avatar size={64} image={image} mr={[space.xxs, 0]} />
      <Flex py={space.xxs} flexDirection="column" flexGrow={1}>
        <Text textStyle="menu" textAlign={["left", "center"]}>
          {name}
        </Text>
        <Text textStyle="caption" textAlign={["left", "center"]}>
          {tagLine}
        </Text>
      </Flex>
      <Button variant="outline-small" text="Connect" onClick={onClick} />
    </Flex>
  );
}
