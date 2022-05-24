import { useTheme } from "styled-components";

import useAuth from "@/auth/context/AuthContext";
import { Box, Grid } from "@/common/components/atoms";
import BaseLayout from "@/common/components/layouts/BaseLayout";
import AsideNav from "@/common/components/objects/AsideNav";
import StyledHeadingDivider from "@/common/components/objects/StyledHeadingDivider";
import { ChatColorModeProvider } from "@/stream/providers/ChatColorModeProvider";

import BANNER from "../../objects/Banner";
import LiveStreamPanel from "../../objects/LiveStreamPanel";
import StreamViewerCount from "../../objects/StreamViewerCount";
import UpcomingStreamsWidget from "../../objects/UpcomingStreamsWidget";

interface IProps {
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
}: IProps): JSX.Element {
  const { space } = useTheme();
  const { profile } = useAuth();
  return (
    <BaseLayout aside={<AsideNav />} overflowY={["hidden", "auto"]}>
      {modal}
      <Grid
        minHeight="100%"
        gridTemplateColumns={["1fr", "3fr 1fr"]}
        gridTemplateRows={["max-content max-content 1fr ", "max-content"]}
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
        <Grid gridArea="stream">
          <Box pt="56.25%" position="relative">
            {videoPlayer}
            <UpcomingStreamsWidget />
            {(() => {
              if (!profile) return null;

              const isAdmin = profile.groups.filter(
                (group) => group.name === "livestream_chat_admin"
              )[0];

              if (isAdmin) {
                return <StreamViewerCount />;
              }
              return null;
            })()}
          </Box>
        </Grid>
        <Grid gridArea="panel">
          <ChatColorModeProvider>
            <LiveStreamPanel />
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
          <StyledHeadingDivider label="Explore Streams" />
          {upcomingsStreams}

          <Box h={space.s} />

          <BANNER.StartStreaming />

          {pastStreams}

          <Box h={space.l} />
        </Box>
      </Grid>
    </BaseLayout>
  );
}
