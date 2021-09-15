import { useTheme } from "styled-components";

import Image from "next/image";

import { Avatar, Box, Grid, Link, Text } from "@/common/components/atoms";
import { useLiveStreams } from "@/community/context/LiveStreamsContext";
import { useUpcomingStreams } from "@/community/context/UpcomingStreamsContext";

import { StreamSlider } from "../../objects/StreamSlider";

export default function StreamsPage(): JSX.Element {
  const { liveStreams, loading } = useLiveStreams();
  const { upcoming } = useUpcomingStreams();
  const { space, radii, colors } = useTheme();

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
          <Link key={stream.id} href={`/session/${stream.id}`}>
            <Grid gridGap={space.xs}>
              <Box
                h={180}
                position="relative"
                borderRadius={radii.xxs}
                overflow="hidden"
              >
                {stream.topic_detail?.image && (
                  <Image
                    objectFit="cover"
                    layout="fill"
                    src={stream.topic_detail?.image}
                    alt={stream.topic_detail.name}
                  />
                )}
              </Box>
              <Grid
                gridTemplateColumns="min-content 1fr"
                gridGap={space.xxs}
                alignItems="center"
              >
                <Avatar
                  size={56}
                  alt={stream.host_detail?.name || ""}
                  image={stream.host_detail?.photo}
                />
                <Box>
                  <Text>{stream.topic_detail?.name}</Text>
                  <Text color={colors.slate} textStyle="caption">
                    {stream.host_detail?.name}
                  </Text>
                </Box>
              </Grid>
            </Grid>
          </Link>
        ))}
      </Grid>
    </>
  );
}
