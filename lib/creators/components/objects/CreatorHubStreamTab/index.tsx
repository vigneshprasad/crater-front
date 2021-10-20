import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import { Text, Grid, Box } from "@/common/components/atoms";
import Spinner from "@/common/components/atoms/Spiner";
import { PageRoutes } from "@/common/constants/route.constants";
import StreamCard from "@/community/components/objects/StreamCard";
import { StreamSlider } from "@/community/components/objects/StreamSlider";
import { useUpcomingStreams } from "@/community/context/UpcomingStreamsContext";
import { Webinar } from "@/community/types/community";
import usePastStreams from "@/stream/context/PastStreamContext";

import ScheduleStreamForm from "../../forms/ScheduleStreamForm";

export default function CreatorHubStreamTab(): JSX.Element {
  const {
    loading: loadingUpcomingStream,
    upcoming,
    mutateUpcomingStreams,
  } = useUpcomingStreams();
  const router = useRouter();
  const { streams: past } = usePastStreams();
  const { space } = useTheme();

  const handleFormSubmit = (stream: Webinar): void => {
    mutateUpcomingStreams();
    router.push(PageRoutes.session(stream.id));
  };

  if (loadingUpcomingStream || !upcoming) {
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
              <StreamSlider liveStreams={upcoming} />
            </Box>
          </Box>
        );
      })()}

      <Box>
        <Text textStyle="title">Schedule New Stream</Text>
        <ScheduleStreamForm onSubmitComplete={handleFormSubmit} />
      </Box>

      {past && past.length > 0 && (
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
