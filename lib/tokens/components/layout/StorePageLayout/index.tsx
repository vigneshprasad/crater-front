import { useTheme } from "styled-components";

import { Box, Grid } from "@/common/components/atoms";

interface IProps {
  header: React.ReactNode;
  tabs: React.ReactNode;
  featured: React.ReactNode;
  explore: React.ReactNode;
  topSellers: React.ReactNode;
  liveStreams?: React.ReactNode;
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
      <Box gridArea="header" px={space.l}>
        {header}
      </Box>
      <Box gridArea="tabs" pt={space.s} px={space.l}>
        {tabs}
      </Box>
      <Box gridArea="featured" px={space.l}>
        {featured}
      </Box>
      <Box gridArea="explore" px={space.l}>
        {explore}
      </Box>
      <Box gridArea="top-sellers">{topSellers}</Box>
      {liveStreams && <Box gridArea="live-streams">{liveStreams}</Box>}
      <Box gridArea="static-section" px={space.l}>
        {staticSection}
      </Box>
    </Grid>
  );
}
