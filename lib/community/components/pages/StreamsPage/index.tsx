import { useCallback, useEffect, useRef, useState } from "react";
import { Stream } from "stream";
import styled, { useTheme } from "styled-components";
import useSWR from "swr";

import dynamic from "next/dynamic";

import { Box, Flex, Grid, Shimmer, Text } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import Spinner from "@/common/components/atoms/Spiner";
import Footer from "@/common/components/objects/Footer";
import { PageRoutes } from "@/common/constants/route.constants";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { useLiveStreams } from "@/community/context/LiveStreamsContext";
import useSeries from "@/community/context/SeriesListContext";
import { Webinar } from "@/community/types/community";
import { StreamCategory } from "@/creators/types/stream";
import PastStreamCard from "@/stream/components/objects/PastStreamCard";
import {
  PastStreamContext,
  PastStreamProvider,
} from "@/stream/context/PastStreamContext";
import useUpcomingStreams from "@/stream/context/UpcomingStreamsContext";

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
  const {
    upcoming,
    setUpcomingStreamsPage,
    nextPage: upcomingStreamsNextPage,
  } = useUpcomingStreams();

  // const {
  //   streams: past,
  //   loading: pastStreamsLoading,
  //   setPastStreamsPage,
  // } = usePastStreams();
  const { space, colors } = useTheme();
  // const _observer = useRef<IntersectionObserver>();
  const { series: seriesList, loading: seriesLoading } = useSeries();
  const { data: homePageCategories } = useSWR<StreamCategory[]>(
    API_URL_CONSTANTS.stream.getHomePageCategories
  );
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<
    number | undefined
  >(undefined);

  // const ref = useCallback(
  //   (node: HTMLDivElement | null) => {
  //     if (pastStreamsLoading) return;
  //     if (_observer.current) _observer.current.disconnect();
  //     _observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting) {
  //         setPastStreamsPage((page) => page + 1);
  //       }
  //     });

  //     if (node != null) _observer.current.observe(node);
  //   },
  //   [_observer, pastStreamsLoading, setPastStreamsPage]
  // );

  const showMoreUpcomingStreams = useCallback(() => {
    setUpcomingStreamsPage((page) => page + 1);
  }, [setUpcomingStreamsPage]);

  // useEffect(() => {
  //   if (
  //     activeCategoryFilter === undefined &&
  //     homePageCategories &&
  //     homePageCategories?.length > 0
  //   ) {
  //     console.log("useEffect");
  //     setActiveCategoryFilter(homePageCategories[0].pk);
  //   }
  // }, [activeCategoryFilter, homePageCategories]);

  if (
    liveStreamsLoading ||
    !liveStreams ||
    !upcoming ||
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
        {upcoming?.map((stream) => (
          <StreamCard stream={stream} key={stream.id} />
        ))}
      </Grid>

      <Flex
        pt={space.s}
        px="4rem"
        mb={space.xxxs}
        flexDirection="row"
        alignItems="center"
      >
        <Box flexGrow={1}>
          <hr color={colors.black[4]} />
        </Box>

        {upcomingStreamsNextPage ? (
          <Button
            mx={space.s}
            flexGrow={0}
            variant="round"
            text="Show more"
            onClick={showMoreUpcomingStreams}
          />
        ) : null}

        <Box flexGrow={1}>
          <hr color={colors.black[4]} />
        </Box>
      </Flex>

      <Box px={[space.xxs, space.s]} py={space.xxs}>
        <Text textStyle="headlineBold">
          <Span>Previous</Span> streams you may like
        </Text>
      </Box>

      <Grid
        px={space.s}
        pb={space.s}
        gridTemplateColumns={[
          "1fr 1fr",
          "repeat(auto-fill, minmax(120px, 1fr))",
        ]}
        gridGap={space.s}
      >
        {homePageCategories && homePageCategories.length > 0
          ? homePageCategories.map((category) => {
              return (
                <Button
                  variant="full-width"
                  text={category.name}
                  key={category.pk}
                  onClick={() => setActiveCategoryFilter(category.pk)}
                  disabled={activeCategoryFilter === category.pk}
                />
              );
            })
          : null}
      </Grid>

      <Grid
        px={space.s}
        gridTemplateColumns={["1fr", "repeat(auto-fill, minmax(280px, 1fr))"]}
        gridGap={space.s}
      >
        <PastStreamProvider categoryFilter={activeCategoryFilter}>
          <PastStreamContext.Consumer>
            {({ streams: past, loading }) => {
              if (loading) return <Shimmer w="100%" h="100%" />;

              if (past?.length === 0)
                return <Text>No streams in this category.</Text>;

              return past?.map((stream: Webinar, index: number) => (
                <PastStreamCard
                  key={stream.id}
                  title={stream.topic_detail.name}
                  href={PageRoutes.streamVideo(stream.id)}
                  image={stream.topic_detail.image}
                  hostImage={stream.host_detail?.photo}
                  hostName={stream.host_detail?.name}
                  time={stream.start}
                  hostSlug={stream.host_detail?.creator_detail?.slug}
                  // ref={index == past.length - 1 ? ref : null}
                />
              ));
            }}
          </PastStreamContext.Consumer>
        </PastStreamProvider>
      </Grid>
      <Footer />
    </>
  );
}
