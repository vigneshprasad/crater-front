import { useEffect, useMemo } from "react";

import { Grid, Box, BoxProps } from "@/common/components/atoms";
import AppNavbar from "@/common/components/objects/AppNavBar/v2";

type IBaseLayoutProps = BoxProps & {
  aside?: React.ReactNode;
};

export default function BaseLayout({
  aside,
  children,
  ...rest
}: IBaseLayoutProps): JSX.Element {
  const gridTemplateAreas = useMemo(() => {
    if (aside) {
      return [
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
      return ["max-content 1fr"];
    }

    return ["1fr"];
  }, [aside]);

  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
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
        <Box gridArea="content" {...rest} as="main">
          {children}
        </Box>
      </Grid>
    </Grid>
  );
}
