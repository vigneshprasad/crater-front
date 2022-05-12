import STATIC_IMAGES from "public/images";
import { useTheme } from "styled-components";

import { Box, Grid, Image } from "@/common/components/atoms";
import BaseLayout from "@/common/components/layouts/BaseLayout";
import AsideNav from "@/common/components/objects/AsideNav";
import StyledHeadingDivider from "@/common/components/objects/StyledHeadingDivider";

import LiveStreamPanel from "../../objects/LiveStreamPanel";

interface IProps {
  videoPlayer: React.ReactNode;
  streamDetail: React.ReactNode;
  modal?: React.ReactNode;
  shareSection: React.ReactNode;
  upcomingsStreams: React.ReactNode;
}

export default function LiveStreamPageLayout({
  videoPlayer,
  streamDetail,
  modal,
  shareSection,
  upcomingsStreams,
}: IProps): JSX.Element {
  const { space } = useTheme();
  return (
    <BaseLayout aside={<AsideNav />} overflowY="auto">
      {modal}
      <Grid
        gridTemplateColumns={["1fr", "3fr 1fr"]}
        gridTemplateRows="max-content"
        gridTemplateAreas={`
          "stream panel"
          "about share"
          "pageContent pageContent"
        `}
      >
        <Grid gridArea="stream">
          <Box pt="56.25%" position="relative">
            {videoPlayer}
          </Box>
        </Grid>
        <Grid gridArea="panel">
          <LiveStreamPanel />
        </Grid>
        <Grid gridArea="about" p={space.xxs}>
          {streamDetail}
        </Grid>
        <Grid gridArea="share" py={space.xxs} pr={space.xxs}>
          {shareSection}
        </Grid>

        <Box gridArea="pageContent">
          <Box>
            <Image
              src={STATIC_IMAGES.ImageAppBannerStream}
              alt="Get the crater app."
            />
          </Box>
          <StyledHeadingDivider label="Explore Streams" />
          {upcomingsStreams}
        </Box>
      </Grid>
    </BaseLayout>
  );
}
