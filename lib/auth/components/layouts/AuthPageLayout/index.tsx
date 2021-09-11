import { PropsWithChildren } from "react";

import { Box, Grid } from "@/common/components/atoms";
import { Logo } from "@/common/components/objects/Logo";
import { theme } from "@/common/theme";

export default function AuthPageLayout({
  children,
}: PropsWithChildren<unknown>): JSX.Element {
  const { space } = theme;
  return (
    <Grid
      gridTemplateColumns={["1fr 2fr"]}
      gridTemplateRows={["minmax(100vh, 1fr)"]}
    >
      <Box bg="#6C5DD3" px={[space.s]} py={[space.s]}>
        <Logo withText />
      </Box>
      {children}
    </Grid>
  );
}
