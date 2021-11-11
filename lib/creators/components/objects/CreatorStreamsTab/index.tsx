import { useState } from "react";
import { useTheme } from "styled-components";

import { Box, Grid, Text } from "@/common/components/atoms";
import { PageRoutes } from "@/common/constants/route.constants";
import useAnalytics from "@/common/utils/analytics/AnalyticsContext";
import useCreatorStreams from "@/creators/context/CreatorStreamsContext";
import PastStreamCard from "@/stream/components/objects/PastStreamCard";
import usePastStreams from "@/stream/context/PastStreamContext";

import ConnectModal from "../ConnectModal";

export default function CreatorStreamsTab(): JSX.Element {
  const [showConnect, setShowConnect] = useState(false);
  const { loading: loadingLiveStream, liveStreams } = useCreatorStreams();
  const { space } = useTheme();
  const { track } = useAnalytics();
  const { streams: pastStreams } = usePastStreams();

  if (!liveStreams) {
    return <Box>Loading</Box>;
  }

  console.log(pastStreams);

  return (
    <Box px={space.xs} py={space.xs}>
      <ConnectModal
        visible={showConnect}
        onClose={() => setShowConnect(false)}
      />
      <Text>Past Streams:</Text>

      <Grid
        gridTemplateColumns={["repeat(auto-fill, minmax(280px, 1fr))"]}
        gridGap={space.xxs}
      >
        {pastStreams?.map((stream) => (
          <PastStreamCard
            key={stream.id}
            title={stream.topic_detail.name}
            href={PageRoutes.streamVideo(stream.id)}
            image={stream.topic_detail.image}
          />
        ))}
      </Grid>

      {/* <Box px={[space.xs, space.s]} py={[space.xs, space.l]}>
        {(() => {
          if (loadingLiveStream) {
            return <Box>Loading</Box>;
          }
          if (!liveStreams.length) {
            return null;
          }
          return <StreamSlider liveStreams={liveStreams} />;
        })()}
      </Box>

      <Box px={[space.xs, space.s]} py={[space.xs, space.s]}>
        <Text textStyle="title">Community Members</Text>
      </Box>

      {(() => {
        if (loadingNetwork) {
          return <Box>Loading</Box>;
        }
        if (!members.length) {
          return null;
        }
        return (
          <Grid
            overflowX={["auto", "hidden"]}
            px={[space.xxs, space.s]}
            gridTemplateColumns={["none", "repeat(auto-fit, 140px)"]}
            gridAutoFlow={["column", "dense"]}
            gridTemplateRows={["none", "auto"]}
            gridGap={space.xs}
          >
            {members.map((member) => (
              <MemberItem
                key={member.id}
                name={member.profile_detail.name}
                image={member.profile_detail.photo}
                tagLine={member.profile_detail.tag_list[0]?.name}
                onClick={() => {
                  track(AnalyticsEvents.connect_with_clicked);
                  setShowConnect(true);
                }}
              />
            ))}
          </Grid>
        );
      })()} */}
    </Box>
  );
}
