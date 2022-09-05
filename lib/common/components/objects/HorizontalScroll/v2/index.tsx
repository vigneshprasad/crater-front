import { useElementScroll, useMotionValue } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import styled, { useTheme } from "styled-components";

import {
  AnimatedBox,
  Box,
  Flex,
  Grid,
  GridProps,
  Icon,
  Text,
  TextProps,
} from "@/common/components/atoms";

type IProps = GridProps & {
  title?: string;
  titleProps?: TextProps;
};

const Container = styled(Grid)`
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default function HorizontalScroll({
  title,
  titleProps,
  children,
  ...rest
}: IProps): JSX.Element {
  const { space, colors } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useElementScroll(ref);
  const opacityLeft = useMotionValue(1);
  const opacityRight = useMotionValue(0.3);

  useEffect(() => {
    function updateOpacity(): void {
      const position = scrollXProgress.get();
      if (position === 0) {
        opacityLeft.set(1);
        opacityRight.set(0.3);
        return;
      }

      if (position > 0 && position < 0.9) {
        opacityLeft.set(1);
        opacityRight.set(1);
        return;
      }

      if (position >= 0.9) {
        opacityLeft.set(0.3);
        opacityRight.set(1);
        return;
      }
    }

    const unsubsribeScrollProgress = scrollXProgress.onChange(updateOpacity);
    return () => {
      unsubsribeScrollProgress();
    };
  }, [scrollXProgress, opacityLeft, opacityRight]);

  const onClickScrollEnd = useCallback((): void => {
    if (!ref.current) return;
    const { width } = ref.current.getBoundingClientRect();
    ref.current.scroll(width, 0);
  }, [ref]);

  const onClickScrollStart = useCallback((): void => {
    if (!ref.current) return;
    ref.current.scroll(0, 0);
  }, [ref]);

  return (
    <Box>
      <Flex
        px={space.m}
        justifyContent="space-between"
        alignItems="center"
        {...titleProps}
      >
        {title && (
          <Text textStyle="headline5" fontWeight={600}>
            {title}
          </Text>
        )}
        <Flex gridGap={24}>
          <AnimatedBox
            w={40}
            h={40}
            backgroundColor={colors.primaryBackground}
            cursor="pointer"
            borderRadius="50%"
            border={`1px solid ${colors.textPrimary}`}
            display="flex"
            justifyContent="center"
            alignItems="center"
            whileHover={{
              backgroundColor: colors.primaryLight,
            }}
            style={{
              opacity: opacityRight,
            }}
            onClick={onClickScrollStart}
          >
            <Icon icon="ChevronLeft" />
          </AnimatedBox>

          <AnimatedBox
            w={40}
            h={40}
            backgroundColor={colors.primaryBackground}
            cursor="pointer"
            borderRadius="50%"
            border={`1px solid ${colors.textPrimary}`}
            display="flex"
            justifyContent="center"
            alignItems="center"
            whileHover={{
              backgroundColor: colors.primaryLight,
            }}
            style={{
              opacity: opacityLeft,
            }}
            onClick={onClickScrollEnd}
          >
            <Icon className="icon" icon="ChevronRight" />
          </AnimatedBox>
        </Flex>
      </Flex>
      <Container ref={ref} py={space.xxs} overflowX="scroll" {...rest}>
        {children}
      </Container>
      <Box w={96} />
    </Box>
  );
}
