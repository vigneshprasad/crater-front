import { useTheme } from "styled-components";

import { Box, Grid, Text } from "@/common/components/atoms";
import { PageRoutes } from "@/common/constants/route.constants";
import StreamCard from "@/community/components/objects/StreamCard";
import PastStreamsList from "@/stream/components/objects/PastStreamsList/v2";
import useUpcomingStreams from "@/stream/context/UpcomingStreamsContext";

export default function CreatorStreamsTab(): JSX.Element {
  const { upcoming } = useUpcomingStreams();

  const { space } = useTheme();

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
            gridTemplateColumns={[
              "1fr",
              "repeat(auto-fill, minmax(280px, 1fr))",
            ]}
            gridGap={space.xxs}
          >
            {upcoming.map((stream) => (
              <StreamCard
                link={PageRoutes.session(stream.id)}
                stream={stream}
                hostSlug={stream.host_detail?.slug}
                key={stream.id}
              />
            ))}
          </Grid>
        </>
      )}

      <Text textStyle="label" mx={space.xxs}>
        Past Streams:
      </Text>
      <PastStreamsList />
    </Box>
  );
}
