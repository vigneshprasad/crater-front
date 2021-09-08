import { PropsWithChildren } from "react";

import { Grid } from "@/common/components/atoms";

export default function AudioRoomLayout({
  children,
}: PropsWithChildren<unknown>): JSX.Element {
  return (
    <Grid h="100vh" gridTemplateRows="min-content 1fr" overflow="hidden">
      {children}
    </Grid>
  );
}
