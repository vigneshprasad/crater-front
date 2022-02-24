import { forwardRef, ReactNode, useMemo } from "react";
import styled, { useTheme } from "styled-components";

import dynamic from "next/dynamic";

import useAsideNavState from "@/common/hooks/ui/useAsideNavState";

import { BoxProps, Box, Grid, AnimatedBox } from "../../atoms";

const AppNavBar = dynamic(() => import("../../objects/AppNavBar"));

export type ScrollVariants = "base" | "grid";

type Props = BoxProps & {
  aside?: ReactNode;
};

const Overlay = styled(AnimatedBox)`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndices.overlay};
`;

const BaseLayout = forwardRef<HTMLDivElement, Props>(
  ({ children, aside, ...rest }, ref) => {
    const { colors } = useTheme();
    const { toggleNavBar, animate } = useAsideNavState();

    const content = useMemo(() => {
      if (aside) {
        return (
          <Grid
            gridTemplateColumns="min-content 1fr"
            gridTemplateRows="calc(100vh - 56px)"
          >
            {aside}
            <Box position="relative" {...rest} ref={ref}>
              <Overlay
                initial="hidden"
                animate={animate}
                onClick={() => toggleNavBar()}
                variants={{
                  hidden: {
                    background: "transparent",
                    transitionEnd: {
                      display: "none",
                    },
                  },
                  collapse: {
                    background: colors.black[2],
                    transitionEnd: {
                      display: "none",
                    },
                  },
                  expanded: {
                    background: colors.drawerOverlay,
                    display: "block",
                  },
                }}
              />
              {children}
            </Box>
          </Grid>
        );
      }

      return (
        <Box position="relative" {...rest} ref={ref}>
          {children}
        </Box>
      );
    }, [aside, children, rest, toggleNavBar, animate, colors, ref]);

    return (
      <Grid
        as="main"
        gridTemplateColumns="100vw"
        gridTemplateRows="max-content 1fr"
        overflow="hidden"
      >
        <Grid gridTemplateRows="56px 1fr">
          <AppNavBar />
          {content}
        </Grid>
      </Grid>
    );
  }
);

BaseLayout.displayName = "BaseLayout";

BaseLayout.defaultProps = {
  aside: undefined,
};

export default BaseLayout;
