import { useTheme } from "styled-components";

import { Box, Grid } from "@/common/components/atoms";
import BaseLayout from "@/common/components/layouts/BaseLayout";
import AsideNav from "@/common/components/objects/AsideNav";
import StyledHeadingDivider from "@/common/components/objects/StyledHeadingDivider";

interface IProps {
  streamImage: React.ReactNode;
  streamMain: React.ReactNode;
  streamDetail: React.ReactNode;
  shareSection: React.ReactNode;
  upcomingStreams: React.ReactNode;
  questionPanel: React.ReactNode;
}

export default function RsvpPageLayout({
  streamImage,
  streamMain,
  streamDetail,
  shareSection,
  upcomingStreams,
  questionPanel,
}: IProps): JSX.Element {
  const { space } = useTheme();

  return (
    <BaseLayout aside={<AsideNav />} overflowY={["hidden", "auto"]}>
      <Grid
        padding={`${space.xxs}px ${space.xs}px ${space.xxs}px ${space.xxs}px`}
        minHeight="100%"
        maxWidth="100%"
        gridTemplateColumns={["1fr", "3fr 1fr"]}
        gridTemplateRows="min-content"
        gridTemplateAreas={`
          "stream panel"
          "about share"
          "pageContent pageContent"
        `}
        gridGap={space.xxs}
      >
        <Grid gridArea="stream" gridTemplateRows="1fr min-content">
          <Box pt="56.25%" position="relative">
            {streamImage}
          </Box>
          {streamMain}
        </Grid>

        <Grid gridArea="panel">{questionPanel}</Grid>

        <Grid gridArea="about">{streamDetail}</Grid>

        <Grid display={["none", "grid"]} gridArea="share">
          {shareSection}
        </Grid>

        <Box display={["none", "grid"]} gridArea="pageContent">
          <StyledHeadingDivider label="Upcoming Streams" />
          {upcomingStreams}
        </Box>
      </Grid>
    </BaseLayout>
  );
}
