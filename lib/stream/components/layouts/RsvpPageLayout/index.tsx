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
    <BaseLayout aside={<AsideNav />} overflowY="auto">
      <Grid
        p={[0, `${space.xxs}px ${space.xs}px ${space.xxs}px ${space.xxs}px`]}
        gridTemplateColumns={["1fr 1fr", "3fr 1fr"]}
        gridTemplateRows="min-content"
        gridTemplateAreas={[
          `
            "stream stream"
            "panel share"
            "about about"
          `,
          `
            "stream panel"
            "about share"
            "pageContent pageContent"
          `,
        ]}
        gridGap={[0, space.xxs]}
      >
        <Grid gridArea="stream" gridTemplateRows="1fr min-content">
          <Box pt="56.25%" position="relative">
            {streamImage}
          </Box>
          {streamMain}
        </Grid>

        <Grid gridArea="panel">{questionPanel}</Grid>

        <Grid gridArea="about">{streamDetail}</Grid>

        <Grid gridArea="share">{shareSection}</Grid>

        <Box gridArea="pageContent" display={["none", "grid"]}>
          <StyledHeadingDivider label="Upcoming Streams" />
          {upcomingStreams}
        </Box>
      </Grid>
    </BaseLayout>
  );
}
