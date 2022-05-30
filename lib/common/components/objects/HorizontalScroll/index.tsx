import { useRef, useCallback } from "react";
import styled, { useTheme } from "styled-components";
import { colorStyle } from "styled-system";

import { Grid, GridProps, Icon, Box } from "../../atoms";

type IProps = GridProps;

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
    <Box position="relative">
      <Container ref={gridRef} py={space.xxxs} overflowX="auto" {...rest}>
        {children}
        <Box w={96} />
      </Container>
      <ActionContainer
        cursor="pointer"
        position="absolute"
        right={0}
        top={12}
        bottom={12}
        w={56}
        background={`linear-gradient(to left, ${colors.primaryBackground}, rgba(1, 1, 1, 0.2))`}
        onClick={onClickScroll}
      >
        <Icon className="icon" m="auto auto" icon="ChevronRight" />
      </ActionContainer>
    </Box>
  );
}
