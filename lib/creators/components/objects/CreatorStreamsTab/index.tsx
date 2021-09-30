import { useState } from "react";
import { useTheme } from "styled-components";

import { Box, Grid, Text } from "@/common/components/atoms";
import { StreamSlider } from "@/community/components/objects/StreamSlider";
import useNetworkList from "@/community/context/NetworkListContext";
import useCreatorStreams from "@/creators/context/CreatorStreamsContext";

import ConnectModal from "../ConnectModal";
import { MemberItem } from "../MembersList";

export default function CreatorStreamsTab(): JSX.Element {
  const [showConnect, setShowConnect] = useState(false);
  const { loading: loadingLiveStream, liveStreams } = useCreatorStreams();
  const { space } = useTheme();
  const { loading: loadingNetwork, members } = useNetworkList();

  if (!liveStreams || !members) {
    return <Box>Loading</Box>;
  }

  return (
    <>
      <ConnectModal
        visible={showConnect}
        onClose={() => setShowConnect(false)}
      />
      <Box px={[space.xs, space.s]} py={[space.xs, space.l]}>
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
            {[...members, ...members].map((member) => (
              <MemberItem
                key={member.pk}
                name={member.name}
                image={member.photo}
                tagLine={member.tag_list?.[0]?.name}
                onClick={() => setShowConnect(true)}
              />
            ))}
          </Grid>
        );
      })()}
    </>
  );
}
