import styled, { useTheme } from "styled-components";

import { Box, Grid, Text } from "@/common/components/atoms";
import { useLiveStreams } from "@/community/context/LiveStreamsContext";
import { useUpcomingStreams } from "@/community/context/UpcomingStreamsContext";

import StreamCard from "../../objects/StreamCard";
import { StreamSlider } from "../../objects/StreamSlider";

const Span = styled.span`
  color: ${({ theme }) => theme.colors.accent};
`;

export default function StreamsPage(): JSX.Element {
  const { liveStreams, loading } = useLiveStreams();
  const { upcoming } = useUpcomingStreams();
  const { space } = useTheme();

  if (loading || !liveStreams || !upcoming) return <Box>Loading...</Box>;

  return (
    <>
      <Box px={[space.xxs, space.xs]} py={[space.xxs, space.s]}>
        <StreamSlider liveStreams={liveStreams} />
      </Box>

      <Box px={space.s} py={space.xs}>
        <Text textStyle="headlineBold">
          Going <Span>live</Span> soon
        </Text>
      </Box>

      <Grid px={space.s} gridTemplateColumns="repeat(4, 1fr)" gridGap={space.s}>
        {upcoming.map((stream) => (
          <StreamCard stream={stream} key={stream.id} />
        ))}
      </Grid>
    </>
  );
}
