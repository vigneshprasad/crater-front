import { useTheme } from "styled-components";

import { Box, Grid } from "@/common/components/atoms";

interface IProps {
  header: React.ReactNode;
  tabs: React.ReactNode;
  featured: React.ReactNode;
  explore: React.ReactNode;
  topSellers: React.ReactNode;
  liveStreams: React.ReactNode;
  staticSection: React.ReactNode;
}

export default function StorePageLayout({
  header,
  tabs,
  featured,
  explore,
  topSellers,
  liveStreams,
  staticSection,
}: IProps): JSX.Element {
  const { space } = useTheme();

  return (
    <Grid
      gridAutoFlow="row"
      gridTemplateColumns="minmax(0, 1fr)"
      gridTemplateAreas={`
            "header"
            "tabs"
            "featured"
            "explore"
            "top-sellers"
            "live-streams"
            "static-section"
          `}
      gridGap={space.s}
    >
      <Box gridArea="header" px={space.m}>
        {header}
      </Box>
      <Box gridArea="tabs" pt={space.s} px={space.m}>
        {tabs}
      </Box>
      <Box gridArea="featured" px={space.m}>
        {featured}
      </Box>
      <Box gridArea="explore" px={space.m}>
        {explore}
      </Box>
      <Box gridArea="top-sellers">{topSellers}</Box>
      <Box gridArea="live-streams">{liveStreams}</Box>
      <Box gridArea="static-section" px={space.m}>
        {staticSection}
      </Box>
    </Grid>
  );
}
