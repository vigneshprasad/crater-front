import { useTheme } from "styled-components";

import { Box, Grid, Text } from "@/common/components/atoms";
import { PageRoutes } from "@/common/constants/route.constants";
import StreamCard from "@/community/components/objects/StreamCard";
import { useUpcomingStreams } from "@/community/context/UpcomingStreamsContext";
import PastStreamCard from "@/stream/components/objects/PastStreamCard";
import usePastStreams from "@/stream/context/PastStreamContext";

export default function CreatorStreamsTab(): JSX.Element {
  const { upcoming } = useUpcomingStreams();

  const { space } = useTheme();
  const { streams: pastStreams } = usePastStreams();

  if (!upcoming) {
    return <Box>Loading</Box>;
  }

  return (
    <Box px={space.xs} py={space.xs}>
      {upcoming && upcoming.length > 0 && (
        <>
          <Text textStyle="label" mx={space.xxs}>
            Upcoming Streams:
          </Text>
          <Grid
            py={space.xxs}
            gridTemplateColumns={["repeat(auto-fill, minmax(280px, 1fr))"]}
            gridGap={space.xxs}
          >
            {upcoming.map((stream) => (
              <StreamCard
                link={PageRoutes.streamVideo(stream.id)}
                stream={stream}
                key={stream.id}
              />
            ))}
          </Grid>
        </>
      )}

      <Text textStyle="label" mx={space.xxs}>
        Past Streams:
      </Text>
      <Grid
        py={space.xxs}
        gridTemplateColumns={["repeat(auto-fill, minmax(280px, 1fr))"]}
        gridGap={space.xxs}
      >
        {pastStreams?.map((stream) => (
          <PastStreamCard
            key={stream.id}
            title={stream.topic_detail.name}
            href={PageRoutes.streamVideo(stream.id)}
            image={stream.topic_detail.image}
            hostImage={stream.speakers_detail_list[0]?.photo}
            hostName={stream.speakers_detail_list[0]?.name}
            time={stream.start}
          />
        ))}
      </Grid>
    </Box>
  );
}
