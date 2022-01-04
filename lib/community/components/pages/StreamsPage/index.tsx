import { useCallback, useRef } from "react";
import styled, { useTheme } from "styled-components";

import dynamic from "next/dynamic";

import { Box, Grid, Text } from "@/common/components/atoms";
import Spinner from "@/common/components/atoms/Spiner";
import { PageRoutes } from "@/common/constants/route.constants";
import { useLiveStreams } from "@/community/context/LiveStreamsContext";
import { useUpcomingStreams } from "@/community/context/UpcomingStreamsContext";
import usePastStreams from "@/stream/context/PastStreamContext";

import StreamCard from "../../objects/StreamCard";
import { IStreamSliderProps } from "../../objects/StreamSlider";

const StreamSlider = dynamic<IStreamSliderProps>(() =>
  import("../../objects/StreamSlider").then(({ StreamSlider }) => StreamSlider)
);

const Span = styled.span`
  color: ${({ theme }) => theme.colors.accent};
`;

export default function StreamsPage(): JSX.Element {
  const { liveStreams, loading: liveStreamsLoading } = useLiveStreams();
  const { upcoming } = useUpcomingStreams();
  const {
    streams: past,
    loading: pastStreamsLoading,
    setPastStreamsPage,
  } = usePastStreams();
  const { space } = useTheme();
  const _observer = useRef<IntersectionObserver>();

  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      if (pastStreamsLoading) return;
      if (_observer.current) _observer.current.disconnect();
      _observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPastStreamsPage((page) => page + 1);
        }
      });

      if (node != null) _observer.current.observe(node);
    },
    [_observer, pastStreamsLoading, setPastStreamsPage]
  );

  if (liveStreamsLoading || !liveStreams || !upcoming || !past)
    return <Spinner />;

  return (
    <>
      <Box px={[space.xxs, space.xs]} py={[space.xxs, space.s]}>
        <StreamSlider liveStreams={liveStreams} />
      </Box>

      <Box px={[space.xxs, space.s]} py={space.xs}>
        <Text textStyle="headlineBold">
          Going <Span>live</Span> soon
        </Text>
      </Box>

      <Grid
        px={space.s}
        gridTemplateColumns={["1fr", "repeat(4, 1fr)"]}
        gridGap={space.s}
      >
        {upcoming.map((stream) => (
          <StreamCard stream={stream} key={stream.id} />
        ))}
      </Grid>

      <Box px={[space.xxs, space.s]} py={space.xs}>
        <Text textStyle="headlineBold">Past Streams</Text>
      </Box>

      <Grid
        px={space.s}
        gridTemplateColumns={["1fr", "repeat(4, 1fr)"]}
        gridGap={space.s}
      >
        {past?.map((stream, index) => (
          <StreamCard
            link={PageRoutes.streamVideo(stream.id)}
            stream={stream}
            key={stream.id}
            ref={index == past.length - 1 ? ref : null}
          />
        ))}
      </Grid>
    </>
  );
}
