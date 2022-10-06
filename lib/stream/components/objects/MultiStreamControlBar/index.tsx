import { useTheme } from "styled-components";

import { Avatar, Flex, Text, Toggle } from "@/common/components/atoms";
import { MultiStream } from "@/community/types/community";

interface IProps {
  active: boolean;
  multistream: MultiStream;
  onChange: (value: boolean) => void;
}

export default function MultiStreamControlBar({
  onChange,
  active,
  multistream,
}: IProps): JSX.Element {
  const { colors, space, radii } = useTheme();
  return (
    <Flex
      m={space.xxxxs}
      px={space.xxs}
      py={space.xxxs}
      bg={colors.primaryDark}
      borderRadius={radii.xxxxs}
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex gridGap={space.xxxxs} alignItems="center">
        <Text mr={space.xxxs} fontSize="1.4rem" color={colors.textPlaceholder}>
          Streaming here
        </Text>
        {multistream.host_detail_list.map(({ pk, photo }) => (
          <Avatar
            image={photo}
            key={pk}
            size={28}
            border={`1px solid ${colors.accent}`}
          />
        ))}
      </Flex>

      <Flex alignItems="center" gridGap={space.xxxxs}>
        <Toggle value={active} onChange={onChange} />
        <Text>Multistream Mode</Text>
      </Flex>
    </Flex>
  );
}
