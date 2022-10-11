import { useTheme } from "styled-components";

import { Avatar, Flex, Text, Toggle } from "@/common/components/atoms";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";
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
}: IProps): JSX.Element | null {
  const { colors, space, radii, breakpoints } = useTheme();
  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

  if (isMobile === undefined) return null;

  return (
    <Flex
      m={[0, space.xxxxs]}
      px={space.xxs}
      py={space.xxxs}
      bg={colors.primaryDark}
      borderRadius={[0, radii.xxxxs]}
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex gridGap={space.xxxxs} alignItems="center">
        <Text
          mr={[0, space.xxxs]}
          fontSize="1.4rem"
          color={colors.textPlaceholder}
        >
          {isMobile ? "Streaming" : "Streaming here"}
        </Text>
        {(() => {
          if (isMobile) {
            const firstHost = multistream.host_detail_list[0];
            const hostLength = multistream.host_detail_list.length;
            return (
              <Flex
                pr={space.xxxxs}
                bg={colors.primaryBackground}
                border={`1px solid ${colors.primaryLight}`}
                borderRadius={24}
                alignItems="center"
              >
                <Avatar
                  image={firstHost.photo}
                  size={28}
                  border={`1px solid ${colors.accent}`}
                />

                {hostLength > 1 && (
                  <Text ml={space.xxxxxs} fontSize="1.4rem" fontWeight="600">
                    +{hostLength - 1}
                  </Text>
                )}
              </Flex>
            );
          }

          return multistream.host_detail_list.map(({ pk, photo }) => (
            <Avatar
              image={photo}
              key={pk}
              size={28}
              border={`1px solid ${colors.accent}`}
            />
          ));
        })()}
      </Flex>

      <Flex alignItems="center" gridGap={space.xxxxs}>
        <Toggle value={active} onChange={onChange} />
        <Text>Multistream Mode</Text>
      </Flex>
    </Flex>
  );
}
