import { useElementScroll, useMotionValue } from "framer-motion";
import { useRef, useCallback, useEffect } from "react";
import styled, { useTheme } from "styled-components";

import useMediaQuery from "@/common/hooks/ui/useMediaQuery";

import { Grid, GridProps, Icon, Box, BoxProps, AnimatedBox } from "../../atoms";

type IProps = GridProps & {
  containerProps?: BoxProps;
  actionContainerProps?: GridProps;
};

const Container = styled(Grid)`
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ActionContainer = styled(AnimatedBox)`
  display: grid;
  &:hover > .icon {
    transform: scale(1.2);
  }
`;

export default function HorizontalScroll({
  children,
  containerProps,
  actionContainerProps,
  ...rest
}: IProps): JSX.Element {
  const { space, colors, breakpoints } = useTheme();
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useElementScroll(gridRef);
  const opacityLeft = useMotionValue(0);
  const opacityRight = useMotionValue(1);

  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

  useEffect(() => {
    if (isMobile) {
      opacityLeft.set(0);
      opacityRight.set(0);
      return;
    }

    function updateOpacity(): void {
      const position = scrollXProgress.get();

      if (position === 0 && !isMobile) {
        opacityLeft.set(0);
        opacityRight.set(1);
        return;
      }

      if (position > 0 && position < 0.9 && !isMobile) {
        opacityLeft.set(1);
        opacityRight.set(1);
        return;
      }

      if (position >= 0.9 && !isMobile) {
        opacityLeft.set(1);
        opacityRight.set(0);
        return;
      }
    }

    // Disable right scroll button if grid is not scrollable
    if (gridRef.current) {
      const { width } = gridRef.current.getBoundingClientRect();
      const scrollWidth = gridRef.current.scrollWidth;
      if (scrollWidth - width === 0) {
        opacityLeft.set(0);
        return;
      }
    }

    const unsubsribeScrollProgress = scrollXProgress.onChange(updateOpacity);
    return () => {
      unsubsribeScrollProgress();
    };
  }, [scrollXProgress, opacityLeft, opacityRight, isMobile]);

  const onClickScrollEnd = useCallback((): void => {
    if (!gridRef.current) return;
    const { width } = gridRef.current.getBoundingClientRect();
    const scrollLeft = gridRef.current.scrollLeft;

    gridRef.current.scroll(scrollLeft + width, 0);
  }, [gridRef]);

  const onClickScrollStart = useCallback((): void => {
    if (!gridRef.current) return;
    const { width } = gridRef.current.getBoundingClientRect();
    const scrollLeft = gridRef.current.scrollLeft;

    gridRef.current.scroll(scrollLeft - width, 0);
  }, [gridRef]);

  return (
    <Box position="relative" {...containerProps}>
      <Container ref={gridRef} py={space.xxxs} overflowX="scroll" {...rest}>
        {children}
        <Box w={96} />
      </Container>
      {!isMobile && (
        <>
          <ActionContainer
            zIndex={20}
            cursor="pointer"
            position="absolute"
            right={0}
            top={0}
            bottom={0}
            w={56}
            background={`linear-gradient(to left, ${colors.primaryBackground}, rgba(1, 1, 1, 0.2))`}
            onClick={onClickScrollEnd}
            style={{
              opacity: opacityRight,
            }}
            {...actionContainerProps}
          >
            <Icon className="icon" m="auto auto" icon="ChevronRight" />
          </ActionContainer>
          <ActionContainer
            zIndex={20}
            cursor="pointer"
            position="absolute"
            left={0}
            top={0}
            bottom={0}
            w={56}
            background={`linear-gradient(to right, ${colors.primaryBackground}, rgba(1, 1, 1, 0.2))`}
            onClick={onClickScrollStart}
            style={{
              opacity: opacityLeft,
            }}
            {...actionContainerProps}
          >
            <Icon className="icon" m="auto auto" icon="ChevronLeft" />
          </ActionContainer>
        </>
      )}
    </Box>
  );
}
