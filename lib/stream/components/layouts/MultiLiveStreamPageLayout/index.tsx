import { RefCallback } from "react";
import { useTheme } from "styled-components";

import { Box, Grid } from "@/common/components/atoms";
import BaseLayout from "@/common/components/layouts/BaseLayout/v2";
import { AsideNav } from "@/common/components/objects/AsideNav/v2";
import StyledHeadingDivider from "@/common/components/objects/StyledHeadingDivider";

import BANNER from "../../objects/Banner";

interface IProps {
  playerContainerRef?: RefCallback<HTMLDivElement>;
  children: {
    controlBar?: React.ReactNode | null;
    streamPlayer: React.ReactNode;
    streamDetail: React.ReactNode;
    shareSection: React.ReactNode;
    upcomingStreams: React.ReactNode;
    pastStreams: React.ReactNode;
    panel: React.ReactNode;
  };
}

export default function MultiLiveStreamPageLayout({
  children,
  playerContainerRef,
}: IProps): JSX.Element {
  const { colors, space } = useTheme();

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

        <Grid ref={playerContainerRef} gridArea="player">
          {children.streamPlayer}
        </Grid>

        <Grid gridArea="panel" display="grid" position="relative">
          {children.panel}
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
