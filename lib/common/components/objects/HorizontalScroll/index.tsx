import { useRef, useCallback } from "react";
import styled, { useTheme } from "styled-components";

import { Grid, GridProps, Icon, Box, BoxProps } from "../../atoms";

type IProps = GridProps & {
  containerProps?: BoxProps;
};

const Container = styled(Grid)`
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
`;

const ActionContainer = styled(Grid)`
  &:hover > .icon {
    transform: scale(1.2);
  }
`;

export default function HorizontalScroll({
  children,
  containerProps,
  ...rest
}: IProps): JSX.Element {
  const { space, colors } = useTheme();
  const gridRef = useRef<HTMLDivElement>(null);

  const onClickScroll = useCallback((): void => {
    if (!gridRef.current) return;

    console.log("lol");

    const { width } = gridRef.current.getBoundingClientRect();

    console.log(gridRef.current.getBoundingClientRect());

    gridRef.current.scroll(width, 0);
  }, [gridRef]);

  return (
    <Box position="relative" {...containerProps}>
      <Container ref={gridRef} py={space.xxxs} overflowX="auto" {...rest}>
        {children}
        <Box w={96} />
      </Container>
      <ActionContainer
        zIndex={20}
        cursor="pointer"
        position="absolute"
        right={0}
        top={0}
        bottom={0}
        w={56}
        background={`linear-gradient(to left, ${colors.primaryBackground}, rgba(1, 1, 1, 0.2))`}
        onClick={onClickScroll}
      >
        <Icon className="icon" m="auto auto" icon="ChevronRight" />
      </ActionContainer>
    </Box>
  );
}
