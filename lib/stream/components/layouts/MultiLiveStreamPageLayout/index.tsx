import { useTheme } from "styled-components";

import { Box, Grid, Link, Flex, Span, Icon } from "@/common/components/atoms";
import BaseLayout from "@/common/components/layouts/BaseLayout/v2";
import { AsideNav } from "@/common/components/objects/AsideNav/v2";
import MobileBottomSheet from "@/common/components/objects/MobileBottomSheet";
import StyledHeadingDivider from "@/common/components/objects/StyledHeadingDivider";
import { PageRoutes } from "@/common/constants/route.constants";
import { Webinar } from "@/community/types/community";
import { ChatColorModeProvider } from "@/stream/providers/ChatColorModeProvider";
import StreamChatProvider from "@/stream/providers/StreamChatProvider";

import BANNER from "../../objects/Banner";
import LiveStreamPanel, { TabKeys } from "../../objects/LiveStreamPanel";
import LiveStreamPanelTabItem from "../../objects/LiveStreamPanelTabItem";

interface IProps {
  visibleMobileChatPanel: boolean;
  onCloseMobileChatPabel: () => void;
  stream: Webinar;
  streamId: number;
  multiStreamMode: boolean;
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
  onCloseMobileChatPabel,
  visibleMobileChatPanel,
  streamId,
  children,
  multiStreamMode,
}: IProps): JSX.Element {
  const { colors, space } = useTheme();

  const TABS = (id: string | number): Record<TabKeys, JSX.Element> => ({
    chat: (
      <Link
        href={
          multiStreamMode
            ? PageRoutes.multistream(id, "chat")
            : PageRoutes.stream(id, "chat")
        }
        shallow
      >
        <LiveStreamPanelTabItem icon="Chat" label="Chat" />
      </Link>
    ),
    store: (
      <Link
        href={
          multiStreamMode
            ? PageRoutes.multistream(id, "store")
            : PageRoutes.stream(id, "store")
        }
        shallow
      >
        <LiveStreamPanelTabItem
          icon="Store"
          label={
            <Flex alignItems="center">
              Store
              <Span m={4}>
                <Icon color="#F2B25C" icon="New" size={14} />
              </Span>
            </Flex>
          }
        />
      </Link>
    ),
    leaderboard: (
      <Link
        href={
          multiStreamMode
            ? PageRoutes.multistream(id, "leaderboard")
            : PageRoutes.stream(id, "leaderboard")
        }
        shallow
      >
        <LiveStreamPanelTabItem icon="Leaderboard" label="Leaderboard" />
      </Link>
    ),
  });

  return (
    <BaseLayout aside={<AsideNav />} overflowY="auto">
      <Grid
        gridAutoRows={["max-content", "auto"]}
        gridTemplateColumns={["1fr", "1fr 360px"]}
        gridTemplateAreas={[
          `
            "multi-stream-bar"
            "player"
            "about"
            "share"
            "content"
          `,
          `
            "multi-stream-bar multi-stream-bar"
            "player panel"
            "about share"
            "content content"
          `,
        ]}
      >
        <Box
          gridArea="multi-stream-bar"
          borderBottom={`1px solid ${colors.primaryLight}`}
        >
          {children.controlBar}
        </Box>

        <Grid gridArea="player">{children.streamPlayer}</Grid>
        <MobileBottomSheet
          heading="LIVE CHAT"
          onClose={onCloseMobileChatPabel}
          visible={visibleMobileChatPanel}
          gridArea="panel"
          display="grid"
          position="relative"
          overlayColor="transparent"
          h={["100%", "auto"]}
        >
          <StreamChatProvider id={streamId.toString()}>
            <ChatColorModeProvider>
              <LiveStreamPanel tabs={TABS} streamId={streamId} />
            </ChatColorModeProvider>
          </StreamChatProvider>
        </MobileBottomSheet>

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
          <BANNER.DownloadApp display={["none", "block"]} />
          <StyledHeadingDivider label="Explore Streams" my={36} />
          {children.upcomingStreams}
          <Box h={space.s} />

          <BANNER.StartStreaming display={["none", "block"]} />

          <StyledHeadingDivider label="Previously Streamed" my={36} />

          {children.pastStreams}

          <Box h={space.l} />
        </Grid>
      </Grid>
    </BaseLayout>
  );
}
