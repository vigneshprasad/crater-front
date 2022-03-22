import { useCallback } from "react";
import { useTheme } from "styled-components";

import {
  Text,
  Box,
  Grid,
  Link,
  Flex,
  Shimmer,
  Span,
  Image,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import { PageRoutes } from "@/common/constants/route.constants";
import StreamCard from "@/community/components/objects/StreamCard";
import { StreamCategory } from "@/creators/types/stream";
import {
  PastStreamContext,
  PastStreamProvider,
} from "@/stream/context/PastStreamContext";
import useStreamCategories from "@/stream/context/StreamCategoryContext";
import useUpcomingStreams from "@/stream/context/UpcomingStreamsContext";

import PastStreamListHome from "../../objects/PastStreamListHome";

interface IProps {
  streamCategory: StreamCategory;
}

export default function PastStreamsPage({
  streamCategory,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();
  const {
    upcoming,
    loading: upcomingLoading,
    setUpcomingStreamsPage,
    nextPage: upcomingStreamsNextPage,
  } = useUpcomingStreams();

  const { streamCategories, loading: streamCategoryLoading } =
    useStreamCategories();

  const showMoreUpcomingStreams = useCallback(() => {
    setUpcomingStreamsPage((page) => page + 1);
  }, [setUpcomingStreamsPage]);

  return (
    <Box px={[space.xs, space.s]} pb={space.s}>
      <Text textStyle="headline5" color={colors.slate}>
        {streamCategory.tagline
          ? streamCategory.tagline
          : `Explore streams on ${streamCategory.name.toLocaleLowerCase()}`}
      </Text>

      <Grid
        py={space.xs}
        gridTemplateColumns={[
          "1fr 1fr",
          "repeat(auto-fit, minmax(220px, 1fr))",
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
                      variant={
                        category.pk === streamCategory.pk
                          ? "filter-button-selected"
                          : "filter-button"
                      }
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
                            height: "65px",
                            position: "absolute",
                          }}
                        />
                      }
                    />
                  ) : (
                    <Button
                      variant={
                        category.pk === streamCategory.pk
                          ? "filter-button-selected"
                          : "filter-button"
                      }
                      text={category.name}
                      textProps={{ m: 0, textAlign: "start" }}
                    />
                  )}
                </Link>
              );
            })}
      </Grid>

      {upcomingLoading ? (
        <Shimmer w={200} h={30} mb={space.xs} />
      ) : (
        upcoming &&
        upcoming.length > 0 && (
          <Box py={space.xxs}>
            <Text textStyle="headlineBold">
              Going <Span color={colors.accent}>live</Span> soon
            </Text>
          </Box>
        )
      )}

      <Grid
        gridTemplateColumns={["1fr", "repeat(auto-fill, minmax(280px, 1fr))"]}
        gridGap={space.s}
      >
        {upcomingLoading
          ? Array(4)
              .fill("")
              .map((_, index) => (
                <Shimmer
                  w="100%"
                  h={180}
                  borderRadius={radii.xxs}
                  key={index}
                  mb={space.xs}
                />
              ))
          : upcoming?.map((stream) => (
              <StreamCard stream={stream} key={stream.id} />
            ))}
      </Grid>

      {upcoming && upcoming.length > 0 ? (
        <Flex
          pt={space.xxxs}
          mb={space.xxxs}
          flexDirection="row"
          alignItems="center"
        >
          <Box flexGrow={1}>
            <hr color={colors.black[4]} />
          </Box>

          {upcomingStreamsNextPage && (
            <Button
              mx={space.s}
              flexGrow={0}
              variant="round"
              text="Show more"
              onClick={showMoreUpcomingStreams}
            />
          )}

          <Box flexGrow={1}>
            <hr color={colors.black[4]} />
          </Box>
        </Flex>
      ) : null}

      <Box>
        <PastStreamProvider categoryFilter={streamCategory.pk}>
          <PastStreamContext.Consumer>
            {(pastStreamsData) => (
              <>
                {pastStreamsData.loading ? (
                  <Shimmer w={200} h={30} mb={space.xs} />
                ) : (
                  pastStreamsData.streams &&
                  pastStreamsData.streams?.length > 0 && (
                    <Text pb={space.xs} textStyle="headlineBold">
                      <Span color={colors.accent}>Past</Span> Streams
                    </Text>
                  )
                )}
                <PastStreamListHome {...pastStreamsData} />
              </>
            )}
          </PastStreamContext.Consumer>
        </PastStreamProvider>
      </Box>
    </Box>
  );
}
