import { useTheme } from "styled-components";

import { Box, Grid } from "@/common/components/atoms";
import BaseLayout from "@/common/components/layouts/BaseLayout/v2";
import { AsideNav } from "@/common/components/objects/AsideNav/v2";
import StyledHeadingDivider from "@/common/components/objects/StyledHeadingDivider";
import { Webinar } from "@/community/types/community";
import { ChatColorModeProvider } from "@/stream/providers/ChatColorModeProvider";
import StreamChatProvider from "@/stream/providers/StreamChatProvider";

import BANNER from "../../objects/Banner";
import LiveStreamPanel from "../../objects/LiveStreamPanel";

interface IProps {
  stream: Webinar;
  streamId: number;
  children: {
    controlBar?: React.ReactNode | null;
    streamPlayer: React.ReactNode;
    streamDetail: React.ReactNode;
    shareSection: React.ReactNode;
    upcomingStreams: React.ReactNode;
    pastStreams: React.ReactNode;
  };
}

export default function MultiLiveStreamPageLayout({
  streamId,
  children,
}: IProps): JSX.Element {
  const { colors, space } = useTheme();
  return (
    <BaseLayout aside={<AsideNav />} overflowY="auto">
      <Grid
        gridTemplateColumns="1fr 360px"
        gridTemplateAreas={`
            "multi-stream-bar multi-stream-bar"
            "player panel"
            "about share"
            "content content"
          `}
      >
        <Box
          gridArea="multi-stream-bar"
          borderBottom={`1px solid ${colors.primaryLight}`}
        >
          {children.controlBar}
        </Box>

        <Grid gridArea="player">{children.streamPlayer}</Grid>
        <Grid gridArea="panel">
          <StreamChatProvider id={streamId.toString()}>
            <ChatColorModeProvider>
              <LiveStreamPanel streamId={streamId} />
            </ChatColorModeProvider>
          </StreamChatProvider>
        </Grid>

        <Grid gridArea="about" p={[0, space.xxs]}>
          {children.streamDetail}
        </Grid>

        <Grid
          display={["none", "grid"]}
          gridArea="share"
          py={space.xxs}
          pr={space.xxs}
        >
          {children.shareSection}
        </Grid>

        <Grid gridArea="content">
          <BANNER.DownloadApp />
          <StyledHeadingDivider label="Explore Streams" my={36} />
          {children.upcomingStreams}
          <Box h={space.s} />

          <BANNER.StartStreaming />

          <StyledHeadingDivider label="Previously Streamed" my={36} />

          {children.pastStreams}

          <Box h={space.l} />
        </Grid>
      </Grid>
    </BaseLayout>
  );
}
