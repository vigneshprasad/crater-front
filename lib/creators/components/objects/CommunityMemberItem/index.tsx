import { forwardRef } from "react";
import { useTheme } from "styled-components";

import { Avatar, Flex, Text } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";

interface IProps {
  name: string;
  image?: string;
  tagLine: string;
  onClick: () => void;
}

export function CommunityMemberItemWithRef({
  name,
  image,
  tagLine,
  onClick,
  ref,
}: IProps & {
  ref: React.ForwardedRef<HTMLDivElement>;
}): JSX.Element {
  const { space } = useTheme();
  return (
    <Flex ref={ref} alignItems="center" flexDirection={["row", "column"]}>
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

const CommunityMemberItem = forwardRef<HTMLDivElement, IProps>((props, ref) => (
  <CommunityMemberItemWithRef {...props} ref={ref} />
));

CommunityMemberItem.displayName = "CommunityMemberItem";

export default CommunityMemberItem;
