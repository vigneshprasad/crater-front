import { useTheme } from "styled-components";

import { Box, Grid, Text } from "@/common/components/atoms";
import { StreamSlider } from "@/community/components/objects/StreamSlider";
import useNetworkList from "@/community/context/NetworkListContext";
import useCreatorStreams from "@/creators/context/CreatorStreamsContext";

import { MemberItem } from "../MembersList";

export default function CreatorStreamsTab(): JSX.Element {
  const { loading: loadingLiveStream, liveStreams } = useCreatorStreams();
  const { space } = useTheme();
  const { loading: loadingNetwork, members } = useNetworkList();

  if (!liveStreams || !members) {
    return <Box>Loading</Box>;
  }

  return (
    <>
      <Box px={space.s} py={space.l}>
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

      <Box px={space.m} py={space.s}>
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
          <Grid px={space.s} gridTemplateColumns="repeat(6, 1fr)">
            {members.map((member) => (
              <MemberItem
                key={member.pk}
                name={member.name}
                image={member.photo}
                tagLine={member.tag_list?.[0].name}
              />
            ))}
          </Grid>
        );
      })()}
    </>
  );
}
