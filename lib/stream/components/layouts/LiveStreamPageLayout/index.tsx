import { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import { Box, Grid } from "@/common/components/atoms";
import BaseLayout from "@/common/components/layouts/BaseLayout/v2";
import { AsideNav } from "@/common/components/objects/AsideNav/v2";
import StyledHeadingDivider from "@/common/components/objects/StyledHeadingDivider";
import { useWebinar } from "@/community/context/WebinarContext";
import { ChatColorModeProvider } from "@/stream/providers/ChatColorModeProvider";

import BANNER from "../../objects/Banner";
import LiveStreamPanel from "../../objects/LiveStreamPanel";
import SimilarStreamsOverlay from "../../objects/SimilarStreamsOverlay";

interface IProps {
  streamId: number;
  videoPlayer: React.ReactNode;
  streamDetail: React.ReactNode;
  modal?: React.ReactNode;
  shareSection: React.ReactNode;
  upcomingsStreams: React.ReactNode;
  pastStreams: React.ReactNode;
}

export default function LiveStreamPageLayout({
  videoPlayer,
  streamDetail,
  modal,
  shareSection,
  upcomingsStreams,
  pastStreams,
  streamId,
}: IProps): JSX.Element {
  const { space, borders } = useTheme();
  const { user } = useAuth();
  const { webinar } = useWebinar();

  return (
    <BaseLayout aside={<AsideNav />} overflowY={["hidden", "auto"]}>
      {modal}
      <Grid
        minHeight="100%"
        gridTemplateColumns={["1fr", "3fr 1fr"]}
        gridTemplateRows={["max-content max-content 1fr ", "min-content"]}
        gridTemplateAreas={[
          `
            "stream"
            "about"
            "panel"
          `,
          `
            "stream panel"
            "about share"
            "pageContent pageContent"
          `,
        ]}
      >
        <Grid
          gridArea="stream"
          borderRight={["none", `1px solid ${borders.primary}`]}
        >
          <Box pt="56.25%" position="relative">
            {videoPlayer}
            {user?.pk !== webinar?.host && <SimilarStreamsOverlay />}
          </Box>
        </Grid>
        <Grid gridArea="panel">
          <ChatColorModeProvider>
            <LiveStreamPanel streamId={streamId} />
          </ChatColorModeProvider>
        </Grid>
        <Grid gridArea="about" p={[0, space.xxs]}>
          {streamDetail}
        </Grid>
        <Grid
          display={["none", "grid"]}
          gridArea="share"
          py={space.xxs}
          pr={space.xxs}
        >
          {shareSection}
        </Grid>

        <Box display={["none", "grid"]} gridArea="pageContent">
          <BANNER.DownloadApp />
          <StyledHeadingDivider label="Explore Streams" my={36} />
          {upcomingsStreams}

          <Box h={space.s} />

          <BANNER.StartStreaming />

          <StyledHeadingDivider label="Previously Streamed" my={36} />

          {pastStreams}

          <Box h={space.l} />
        </Box>
      </Grid>
    </BaseLayout>
  );
}
