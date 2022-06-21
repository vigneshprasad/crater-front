import { forwardRef, useEffect, useMemo } from "react";

import { Grid, Box, BoxProps } from "@/common/components/atoms";
import AppNavbar from "@/common/components/objects/AppNavBar/v2";

type IBaseLayoutProps = BoxProps & {
  aside?: React.ReactNode;
};

const BaseLayout = forwardRef<HTMLDivElement, IBaseLayoutProps>(
  ({ aside, children, ...rest }, ref) => {
    const gridTemplateAreas = useMemo(() => {
      if (aside) {
        return [
          `
          "navbar"
          "content"
        `,
          `
          "navbar navbar"
          "aside content"
        `,
        ];
      }

      return [
        `
        "navbar"
        "content"
      `,
      ];
    }, [aside]);

    const gridTemplateColumns = useMemo(() => {
      if (aside) {
        return ["1fr", "max-content 1fr"];
      }

      return ["1fr"];
    }, [aside]);

    useEffect(() => {
      if (typeof window === "undefined") return;

      function onResize(): void {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      }

      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
      };
    }, []);

    return (
      <Grid>
        <Grid
          gridTemplateAreas={gridTemplateAreas}
          h="calc(var(--vh, 1vh) * 100)"
          gridTemplateColumns={gridTemplateColumns}
          gridTemplateRows={["max-content 1fr"]}
          overflow="hidden"
        >
          <AppNavbar />
          {aside && <Box gridArea="aside">{aside}</Box>}
          <Box gridArea="content" {...rest} ref={ref} as="main">
            {children}
          </Box>
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
