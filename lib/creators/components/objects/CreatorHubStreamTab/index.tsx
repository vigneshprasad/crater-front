import { useTheme } from "styled-components";

import { Text, Grid, Box } from "@/common/components/atoms";
import Spinner from "@/common/components/atoms/Spiner";
import StreamCard from "@/community/components/objects/StreamCard";
import { StreamSlider } from "@/community/components/objects/StreamSlider";
import { useUpcomingStreams } from "@/community/context/UpcomingStreamsContext";
import useCreatorStreams from "@/creators/context/CreatorStreamsContext";
import usePastStreams from "@/stream/context/PastStreamContext";

import ScheduleStreamForm from "../../forms/ScheduleStreamForm";

export default function CreatorHubStreamTab(): JSX.Element {
  const { loading: loadingLiveStream, liveStreams } = useCreatorStreams();
  const { loading: loadingUpcomingStream, upcoming } = useUpcomingStreams();
  const { streams: past } = usePastStreams();
  const { space } = useTheme();

  if (loadingLiveStream || !liveStreams || loadingUpcomingStream || !upcoming) {
    return <Spinner />;
  }

  return (
    <Grid gridAutoFlow="row" px={[space.xs, space.s]} py={space.xs}>
      {(() => {
        if (!upcoming.length) {
          return null;
        }

        return (
          <Box>
            <Text textStyle="title">Upcoming</Text>
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
        );
      })()}

      <Box>
        <Text textStyle="title">Schedule New Stream</Text>
        <ScheduleStreamForm />
      </Box>

      {past && past.length && (
        <Box>
          <Text textStyle="title">Past Streams</Text>
          <Grid
            py={space.xs}
            gridTemplateColumns={[
              "1fr",
              "repeat(auto-fill, minmax(240px, 1fr))",
            ]}
            gridGap={space.s}
          >
            {past.map((stream) => (
              <StreamCard stream={stream} key={stream.id} />
            ))}
          </Grid>
        </Box>
      )}
    </Grid>
  );
}
