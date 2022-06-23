import { useTheme } from "styled-components";

import { Box, Grid } from "@/common/components/atoms";
import BaseLayout from "@/common/components/layouts/BaseLayout/v2";
import { AsideNav } from "@/common/components/objects/AsideNav/v2";

interface IProps {
  videoPlayer: React.ReactNode;
  aboutSection: React.ReactNode;
  forumSection: React.ReactNode;
}

export default function PastStreamPageLayout({
  videoPlayer,
  aboutSection,
  forumSection,
}: IProps): JSX.Element {
  const { space } = useTheme();

  return (
    <BaseLayout aside={<AsideNav />} overflowY="auto">
      <Grid
        p={[0, `${space.xxs}px ${space.xs}px ${space.xxs}px ${space.xxs}px`]}
        gridTemplateColumns={["1fr 1fr", "3fr 1fr"]}
        gridTemplateRows="min-content"
        gridTemplateAreas={`
          "video streams"
          "about streams"
          "pageContent streams"
        `}
        gridGap={[0, space.xxs]}
      >
        <Box gridArea="video">
          <Box position="relative" pt="56.25%">
            {videoPlayer}
          </Box>
        </Box>

        <Box gridArea="streams">STREAMS</Box>

        <Box gridArea="about">{aboutSection}</Box>

        <Box gridArea="pageContent">{forumSection}</Box>
      </Grid>
    </BaseLayout>
  );
}
