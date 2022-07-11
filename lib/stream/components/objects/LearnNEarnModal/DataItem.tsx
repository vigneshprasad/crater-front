import Lottie from "react-lottie";
import styled, { useTheme } from "styled-components";

import {
  Flex,
  Box,
  Text,
  BoxProps,
  Span,
  Grid,
} from "@/common/components/atoms";
import Animations, {
  ILottieAnimations,
} from "@/common/components/atoms/Animations";

interface IProps {
  label: string;
  rotation: number;
  value?: number;
  animation: ILottieAnimations;
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
  value,
  animation,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();
  return (
    <Flex alignItems="center" gridGap={space.xxxxs}>
      <Diagonal rotation={rotation} />
      <Box w={20} bg={colors.accent} h={1} />
      <Grid
        flex={1}
        borderRadius={radii.xxxxs}
        gridTemplateColumns="max-content 1fr"
        px={space.xxs}
        py={space.xxxs}
        bg={colors.primaryLight}
        gridGap={space.xxs}
        alignItems="center"
      >
        <Lottie
          width={24}
          height={24}
          options={{
            animationData: Animations[animation],
          }}
        />
        <Text>
          {label}
          {"  "}
          <Span>{value ?? "--"}</Span>
        </Text>
      </Grid>
    </Flex>
  );
}
