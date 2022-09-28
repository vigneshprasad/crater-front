import { useTheme } from "styled-components";

import { Box, Grid } from "@/common/components/atoms";
import BaseLayout from "@/common/components/layouts/BaseLayout/v2";
import { AsideNav } from "@/common/components/objects/AsideNav/v2";
import { WebinarProvider } from "@/community/context/WebinarContext";
import { Webinar } from "@/community/types/community";
import { ChatColorModeProvider } from "@/stream/providers/ChatColorModeProvider";
import StreamChatProvider from "@/stream/providers/StreamChatProvider";

import LiveStreamPanel from "../../objects/LiveStreamPanel";

interface IProps {
  stream: Webinar;
  streamId: number;
  children: {
    controlBar?: React.ReactNode | null;
    streamPlayer: React.ReactNode;
  };
}

export default function MultiLiveStreamPageLayout({
  stream,
  streamId,
  children,
}: IProps): JSX.Element {
  const { colors } = useTheme();
  return (
    <WebinarProvider id={streamId.toString()} initial={stream}>
      <BaseLayout aside={<AsideNav />} overflowY="auto">
        <Grid
          gridTemplateColumns="1fr 360px"
          gridTemplateAreas={`
            "multi-stream-bar multi-stream-bar"
            "player panel"
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
        </Grid>
      </BaseLayout>
    </WebinarProvider>
  );
}
