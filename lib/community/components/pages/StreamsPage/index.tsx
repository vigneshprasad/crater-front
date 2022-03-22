import { useCallback } from "react";
import styled, { useTheme } from "styled-components";

import dynamic from "next/dynamic";

import {
  Box,
  Flex,
  Grid,
  Image,
  Link,
  Shimmer,
  Text,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import Spinner from "@/common/components/atoms/Spiner";
import Footer from "@/common/components/objects/Footer";
import { PageRoutes } from "@/common/constants/route.constants";
import { useLiveStreams } from "@/community/context/LiveStreamsContext";
import useSeries from "@/community/context/SeriesListContext";
import PastStreamListHome from "@/stream/components/objects/PastStreamListHome";
import {
  PastStreamContext,
  PastStreamProvider,
} from "@/stream/context/PastStreamContext";
import useStreamCategories from "@/stream/context/StreamCategoryContext";
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
  const { space, colors, radii } = useTheme();
  const { series: seriesList, loading: seriesLoading } = useSeries();
  const { streamCategories, loading: streamCategoryLoading } =
    useStreamCategories();

  const showMoreUpcomingStreams = useCallback(() => {
    setUpcomingStreamsPage((page) => page + 1);
  }, [setUpcomingStreamsPage]);

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
        pt={space.xxxs}
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
        gridTemplateColumns={[
          "1fr 1fr",
          "repeat(auto-fit, minmax(200px, 1fr))",
        ]}
        gridGap={space.xxs}
      >
        {streamCategoryLoading
          ? Array(5)
              .fill("")
              .map((_, index) => (
                <Shimmer
                  w="100%"
                  h={40}
                  borderRadius={radii.xxxs}
                  key={index}
                />
              ))
          : streamCategories?.map((category) => {
              return (
                <Link
                  href={PageRoutes.pastStreams(category.pk)}
                  key={category.pk}
                >
                  {category.photo ? (
                    <Button
                      variant="filter-button"
                      text={category.name}
                      textProps={{ m: 0, textAlign: "start" }}
                      position="relative"
                      suffixElement={
                        <Image
                          src={category.photo}
                          alt={category.name}
                          boxProps={{
                            display: "inline-flex",
                            justifyContent: "right",
                            width: "100%",
                            height: "70px",
                            position: "absolute",
                          }}
                        />
                      }
                    />
                  ) : (
                    <Button
                      variant="filter-button"
                      text={category.name}
                      textProps={{ m: 0, textAlign: "start" }}
                    />
                  )}
                </Link>
              );
            })}
      </Grid>

      {!streamCategoryLoading &&
        streamCategories?.map((category, index) => {
          return (
            <Box key={category.pk}>
              <PastStreamProvider categoryFilter={category.pk}>
                <PastStreamContext.Consumer>
                  {(pastStreamsData) => {
                    return (
                      <Box px={[space.xxs, space.s]}>
                        <Flex
                          py={space.xxs}
                          flexDirection="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Text textStyle="headline6" color={colors.slate}>
                            {category.name}
                          </Text>
                          <Link
                            href={PageRoutes.pastStreams(category.pk)}
                            boxProps={{ mx: space.xxs }}
                          >
                            <Text textStyle="button" color={colors.accent}>
                              View more
                            </Text>
                          </Link>
                        </Flex>

                        <PastStreamListHome {...pastStreamsData} />

                        {index !== streamCategories.length - 1 && (
                          <Box pt={space.xxxs} flexGrow={1}>
                            <hr color={colors.black[4]} />
                          </Box>
                        )}
                      </Box>
                    );
                  }}
                </PastStreamContext.Consumer>
              </PastStreamProvider>
            </Box>
          );
        })}

      <Footer />
    </>
  );
}
