import { useTheme } from "styled-components";

import { Text, Grid, Box } from "@/common/components/atoms";
import Spinner from "@/common/components/atoms/Spiner";
import StreamCard from "@/community/components/objects/StreamCard";
import { StreamSlider } from "@/community/components/objects/StreamSlider";
import { useUpcomingStreams } from "@/community/context/UpcomingStreamsContext";
import useCreatorStreams from "@/creators/context/CreatorStreamsContext";

import ScheduleStreamForm from "../../forms/ScheduleStreamForm";

export default function CreatorHubStreamTab() {
  const { loading: loadingLiveStream, liveStreams } = useCreatorStreams();
  const { loading: loadingUpcomingStream, upcoming } = useUpcomingStreams();
  const { space } = useTheme();

  if (loadingLiveStream || !liveStreams || loadingUpcomingStream || !upcoming) {
    return <Spinner />;
  }

  return (
    <Grid gridAutoFlow="row" m={space.s}>
      <Box>
        <Text textStyle="headline6">Upcoming</Text>
        <Box px={[space.xs, space.s]} py={[space.xs, space.s]}>
          {(() => {
            if (loadingLiveStream) {
              return <Spinner />;
            }
            if (!liveStreams.length) {
              return null;
            }
            return <StreamSlider liveStreams={liveStreams} />;
          })()}
        </Box>
      </Box>

      <Box>
        <Text textStyle="headline6">Schedule New Stream</Text>
        <Box px={[space.xs, space.s]} py={[space.xs, space.s]}>
          <ScheduleStreamForm />
        </Box>
      </Box>

      <Box>
        <Text textStyle="headline6">Past Streams</Text>
        <Grid
          p={space.s}
          gridTemplateColumns={["1fr", "repeat(4, 1fr)"]}
          gridGap={space.s}
        >
          {upcoming.map((stream) => (
            <StreamCard stream={stream} key={stream.id} />
          ))}
        </Grid>
      </Box>
    </Grid>
  );
}
