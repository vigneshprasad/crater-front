import STATIC_IMAGES from "public/images";
import { PropsWithChildren } from "react";
import { useTheme } from "styled-components";

import Image from "next/image";

import { Box, Grid } from "@/common/components/atoms";

export default function LandingPageLayout({
  children,
}: PropsWithChildren<unknown>): JSX.Element {
  const { space } = useTheme();

  return (
    <Grid
      h="calc(var(--vh, 1vh) * 100)"
      gridTemplateColumns={["minmax(0, 1fr)", "1.8fr 1fr"]}
      gridTemplateRows={["max-content 1fr", "1fr"]}
      gridGap={space.s}
      overflow="hidden"
    >
      <Box position="relative">
        <Image
          src={STATIC_IMAGES.ImageLandingPage}
          alt="Landing Img"
          layout="fill"
          objectFit="cover"
        />
      </Box>
      {children}
    </Grid>
  );
}
