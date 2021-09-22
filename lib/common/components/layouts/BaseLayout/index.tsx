import { ReactNode, useMemo } from "react";

import dynamic from "next/dynamic";

import { BoxProps, Box, Grid } from "../../atoms";

const AppNavBar = dynamic(() => import("../../objects/AppNavBar"));

export type ScrollVariants = "base" | "grid";

type Props = BoxProps & {
  aside?: ReactNode;
};

export default function BaseLayout({
  children,
  aside,
  ...rest
}: Props): JSX.Element {
  const content = useMemo(() => {
    if (aside) {
      return (
        <Grid
          gridTemplateColumns="min-content 1fr"
          gridTemplateRows="calc(100vh - 56px)"
        >
          {aside}
          <Box {...rest}>{children}</Box>
        </Grid>
      );
    }

    return <Box {...rest}>{children}</Box>;
  }, [aside, children, rest]);

  return (
    <Grid
      as="main"
      gridTemplateColumns="100vw"
      gridTemplateRows="100vh"
      overflow="hidden"
    >
      <Grid gridTemplateRows="56px 1fr">
        <AppNavBar />
        {content}
      </Grid>
    </Grid>
  );
}
