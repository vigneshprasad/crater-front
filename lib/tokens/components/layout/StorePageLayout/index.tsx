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
            "static-section"
          `}
      gridGap={[space.xs, space.s]}
    >
      <Box gridArea="header" px={[space.xs, space.l]}>
        {header}
      </Box>
      <Box gridArea="tabs" pt={[space.xs, space.s]} px={[space.xs, space.l]}>
        {tabs}
      </Box>
      <Box gridArea="featured" px={[space.xs, space.l]}>
        {featured}
      </Box>
      <Box gridArea="explore" px={[space.xs, space.l]}>
        {explore}
      </Box>
      <Box gridArea="top-sellers">{topSellers}</Box>
      {/* {liveStreams && <Box gridArea="live-streams">{liveStreams}</Box>} */}
      <Box gridArea="static-section" pt={[space.xs, 0]} px={[0, space.l]}>
        {staticSection}
      </Box>
    </Grid>
  );
}
