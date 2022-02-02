import { useCallback, useRef } from "react";
import styled, { useTheme } from "styled-components";

import dynamic from "next/dynamic";

import { Box, Grid, Text } from "@/common/components/atoms";
import Spinner from "@/common/components/atoms/Spiner";
import { PageRoutes } from "@/common/constants/route.constants";
import { useLiveStreams } from "@/community/context/LiveStreamsContext";
import useSeries from "@/community/context/SeriesListContext";
import { useUpcomingStreams } from "@/community/context/UpcomingStreamsContext";
import PastStreamCard from "@/stream/components/objects/PastStreamCard";
import usePastStreams from "@/stream/context/PastStreamContext";

import SeriesList from "../../objects/SeriesList";
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
  const { space, colors } = useTheme();
  const _observer = useRef<IntersectionObserver>();
  const { series: seriesList, loading: seriesLoading } = useSeries();

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

  if (
    liveStreamsLoading ||
    !liveStreams ||
    !upcoming ||
    !past ||
    seriesLoading ||
    !seriesList
  )
    return <Spinner />;

  return (
    <>
      <Box px={[space.xxs, space.xs]} py={[space.xxs, space.s]}>
        <StreamSlider liveStreams={liveStreams} />
      </Box>

      {seriesList.length > 0 ? (
        <>
          <Box px={[space.xxs, space.s]} py={space.xxs}>
            <Text textStyle="headlineBold">
              <Span>Series</Span> by our creators
            </Text>
          </Box>

          <SeriesList seriesList={seriesList} />

          <Box p="1rem 4rem">
            <hr color={colors.black[4]} />
          </Box>
        </>
      ) : null}

      <Box px={[space.xxs, space.s]} py={space.xxs}>
        <Text textStyle="headlineBold">
          Going <Span>live</Span> soon
        </Text>
      </Box>

      <Grid
        px={space.s}
        gridTemplateColumns={["1fr", "repeat(auto-fill, minmax(280px, 1fr))"]}
        gridGap={space.s}
      >
        {upcoming.map((stream) => (
          <StreamCard stream={stream} key={stream.id} />
        ))}
      </Grid>

      <Box p="1rem 4rem">
        <hr color={colors.black[4]} />
      </Box>

      <Box px={[space.xxs, space.s]} py={space.xxs}>
        <Text textStyle="headlineBold">
          <Span>Previous</Span> streams you may like
        </Text>
      </Box>

      <Grid
        px={space.s}
        gridTemplateColumns={["1fr", "repeat(auto-fill, minmax(280px, 1fr))"]}
        gridGap={space.s}
      >
        {past?.map((stream, index) => (
          <PastStreamCard
            key={stream.id}
            title={stream.topic_detail.name}
            href={PageRoutes.streamVideo(stream.id)}
            image={stream.topic_detail.image}
            hostImage={stream.host_detail?.photo}
            hostName={stream.host_detail?.name}
            time={stream.start}
            ref={index == past.length - 1 ? ref : null}
          />
        ))}
      </Grid>
    </>
  );
}
