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
  const opacityLeft = useMotionValue(0.3);
  const opacityRight = useMotionValue(1);

  useEffect(() => {
    function updateOpacity(): void {
      const position = scrollXProgress.get();

      if (position === 0) {
        opacityLeft.set(0.3);
        opacityRight.set(1);
        return;
      }

      if (position > 0 && position < 0.9) {
        opacityLeft.set(1);
        opacityRight.set(1);
        return;
      }

      if (position >= 0.9) {
        opacityLeft.set(1);
        opacityRight.set(0.3);
        return;
      }
    }

    // Disable right scroll button if grid is not scrollable
    if (ref.current) {
      const { width } = ref.current.getBoundingClientRect();
      const scrollWidth = ref.current.scrollWidth;
      if (scrollWidth - width === 0) {
        opacityRight.set(0.3);
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
    const scrollLeft = ref.current.scrollLeft;

    ref.current.scroll(scrollLeft + width, 0);
  }, [ref]);

  const onClickScrollStart = useCallback((): void => {
    if (!ref.current) return;
    const { width } = ref.current.getBoundingClientRect();
    const scrollLeft = ref.current.scrollLeft;

    ref.current.scroll(scrollLeft - width, 0);
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
              opacity: opacityLeft,
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
              opacity: opacityRight,
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
