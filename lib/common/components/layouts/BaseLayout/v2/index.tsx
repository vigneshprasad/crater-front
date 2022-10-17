import { forwardRef, useEffect, useMemo } from "react";

import { Grid, Box, BoxProps } from "@/common/components/atoms";
import AppNavbar from "@/common/components/objects/AppNavBar/v2";
import Banner from "@/common/components/objects/Banner";

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
          "banner"
          "content"
        `,
          `
          "navbar navbar"
          "banner banner"
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
        return ["minmax(0, 1fr)", "max-content minmax(0, 1fr)"];
      }

      return ["minmax(0, 1fr)"];
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
          gridTemplateRows={["max-content max-content 1fr"]}
          overflow="hidden"
        >
          <AppNavbar />
          {aside && <Box gridArea="aside">{aside}</Box>}
          <Banner
            content="Become A Streamer: Find Out How! ⚡️📺"
            link="https://calendly.com/craterclub/become-a-streamer-find-out-how?month=2022-09"
          />
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
