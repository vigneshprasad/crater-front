import { useTheme } from "styled-components";

import { Box, Grid } from "@/common/components/atoms";
import BaseLayout from "@/common/components/layouts/BaseLayout/v2";
import { AsideNav } from "@/common/components/objects/AsideNav/v2";

interface IProps {
  videoPlayer: React.ReactNode;
  aboutSection: React.ReactNode;
  forumSection: React.ReactNode;
  streamsPanel: React.ReactNode;
}

export default function PastStreamPageLayout({
  videoPlayer,
  aboutSection,
  forumSection,
  streamsPanel,
}: IProps): JSX.Element {
  const { space } = useTheme();

  return (
    <BaseLayout aside={<AsideNav />} overflowY="auto">
      <Grid
        p={[0, `${space.xxs}px ${space.xs}px ${space.xxs}px ${space.xxs}px`]}
        gridTemplateColumns={["minmax(0, 1fr)", "2.5fr minmax(0, 1fr)"]}
        gridTemplateRows="min-content"
        gridTemplateAreas={[
          `
              "video"
              "about"
              "streams"
            `,
          `
              "video streams"
              "about streams"
              "pageContent streams"
            `,
        ]}
        gridGap={[0, space.xxs]}
      >
        <Box gridArea="video">
          <Box position="relative" pt="56.25%">
            {videoPlayer}
          </Box>
        </Box>

        <Box gridArea="streams" pt={space.xxxxs}>
          {streamsPanel}
        </Box>

        <Box gridArea="about">{aboutSection}</Box>

        <Box gridArea="pageContent" display={["none", "grid"]}>
          {forumSection}
        </Box>
      </Grid>
    </BaseLayout>
  );
}
