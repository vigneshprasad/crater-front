import STATIC_IMAGES from "public/images";
import { PropsWithChildren } from "react";
import styled, { useTheme } from "styled-components";

import Image from "next/image";

import { Box, Grid } from "@/common/components/atoms";

const StyledGrid = styled(Grid)`
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default function LandingPageLayout({
  children,
}: PropsWithChildren<unknown>): JSX.Element {
  const { space } = useTheme();

  return (
    <StyledGrid
      h="calc(var(--vh, 1vh) * 100)"
      gridTemplateColumns={["minmax(0, 1fr)", "1.5fr 1fr"]}
      gridTemplateRows={["max-content 1fr", "1fr"]}
      gridGap={[space.xxxs, space.s]}
      overflowX="hidden"
      overflowY={["auto", "hidden"]}
    >
      <Box pt="56.25%" position="relative">
        <Image
          src={STATIC_IMAGES.ImageLandingPage}
          alt="Landing Img"
          layout="fill"
        />
      </Box>
      {children}
    </StyledGrid>
  );
}
