import { useTheme } from "styled-components";

import { Box, Grid, Text } from "@/common/components/atoms";
import { useLiveStreams } from "@/community/context/LiveStreamsContext";
import { useUpcomingStreams } from "@/community/context/UpcomingStreamsContext";

import StreamCard from "../../objects/StreamCard";
import { StreamSlider } from "../../objects/StreamSlider";

export default function StreamsPage(): JSX.Element {
  const { liveStreams, loading } = useLiveStreams();
  const { upcoming } = useUpcomingStreams();
  const { space } = useTheme();

  if (loading || !liveStreams || !upcoming) return <Box>Loading...</Box>;

  return (
    <>
      <Box px={space.xs} py={space.s}>
        <StreamSlider liveStreams={liveStreams} />
      </Box>

      <Box p={space.s}>
        <Text textStyle="headline6">Upcoming Streams</Text>
      </Box>

      <Grid px={space.s} gridTemplateColumns="repeat(4, 1fr)" gridGap={space.s}>
        {upcoming.map((stream) => (
          <StreamCard stream={stream} key={stream.id} />
        ))}
      </Grid>
    </>
  );
}
