import styled, { useTheme } from "styled-components";

import {
  Flex,
  Box,
  Icon,
  Text,
  BoxProps,
  Span,
} from "@/common/components/atoms";
import { IconOptions } from "@/common/theme";

interface IProps {
  label: string;
  icon: IconOptions;
  rotation: number;
  value?: number;
}

const Diagonal = styled(Box)<BoxProps & { rotation: number }>`
  position: absolute;
  border-bottom: 1px solid ${({ theme }) => theme.colors.accent};
  width: 5%;
  transform: translateY(1px) translateX(1px)
    ${({ rotation }) => `rotate(${rotation}deg)`};
  transform-origin: top left;
`;

export default function DataItem({
  label,
  rotation,
  icon,
  value,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();
  return (
    <Flex alignItems="center" gridGap={space.xxxxs}>
      <Diagonal rotation={rotation} />
      <Box w={20} bg={colors.accent} h={1} />
      <Flex
        flex={1}
        borderRadius={radii.xxxxs}
        px={space.xxs}
        py={space.xxxs}
        bg={colors.primaryLight}
        gridGap={space.xxs}
      >
        <Icon icon={icon} />
        <Text>
          {label}
          {"  "}
          <Span>{value ?? "--"}</Span>
        </Text>
      </Flex>
    </Flex>
  );
}
