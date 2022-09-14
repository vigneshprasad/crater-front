import { useMemo } from "react";
import { useTheme } from "styled-components";

import {
  Box,
  Flex,
  Text,
  Spinner,
  Link,
  Span,
} from "@/common/components/atoms";
import { PageRoutes } from "@/common/constants/route.constants";
import { StreamListItem } from "@/community/types/community";
import { CreatorListItem } from "@/creators/types/creator";
import { StreamCategory } from "@/creators/types/stream";
import usePastStreamsSearchList from "@/stream/context/PastStreamsSearchContext";
import useStreamCategorySearchList from "@/stream/context/StreamCategorySearchContext";
import useUpcomingStreamsSearchList from "@/stream/context/UpcomingStreamsSearchContext";

import SearchStreamCard from "../SearchStreamCard";

export default function GlobalSearchList(): JSX.Element {
  const { space, colors } = useTheme();
  const { streams: upcoming, isValidating: upcomingIsValidating } =
    useUpcomingStreamsSearchList();
  const { streams: past, isValidating: pastIsValidating } =
    usePastStreamsSearchList();
  const { categories, isValidating: categoriesIsValidating } =
    useStreamCategorySearchList();

  const searchResults = useMemo<
    | {
        upcomingStreams?: StreamListItem[];
        pastStreams?: StreamListItem[];
        creators?: CreatorListItem[];
        categories?: StreamCategory[];
      }
    | undefined
    | null
  >(() => {
    if (
      !upcoming &&
      upcomingIsValidating &&
      !past &&
      pastIsValidating &&
      !categories &&
      categoriesIsValidating
    ) {
      return undefined;
    }

    const upcomingList = upcoming?.slice(0, 3);
    const pastList = past?.slice(0, 3);
    const categoriesList = categories?.slice(0, 3);

    if (
      upcomingList?.length === 0 &&
      pastList?.length === 0 &&
      categoriesList?.length === 0
    ) {
      return null;
    }

    return {
      upcomingStreams: upcoming?.slice(0, 3),
      pastStreams: past?.slice(0, 3),
      categories: categories?.slice(0, 3),
    };
  }, [
    categories,
    categoriesIsValidating,
    past,
    pastIsValidating,
    upcoming,
    upcomingIsValidating,
  ]);

  return (
    <Box>
      {(() => {
        if (searchResults === undefined) {
          return (
            <Flex
              flexDirection="column"
              gridGap={space.xxxs}
              alignItems="center"
            >
              <Spinner size={24} strokeColor={colors.textPrimary} />
              <Text textStyle="captionLarge">Searching...</Text>
            </Flex>
          );
        }

        if (searchResults === null) {
          return (
            <Text textStyle="captionLarge" textAlign="center">
              There are no results that match your search.
            </Text>
          );
        }

        return (
          <>
            {searchResults.categories?.map((category) => (
              <Link href={PageRoutes.category(category.slug)} key={category.pk}>
                <Box
                  mb={10}
                  pb={10}
                  borderBottom={`1px solid ${colors.primaryLight}`}
                >
                  <Text textStyle="captionLarge">
                    {category.name} <Span fontWeight={400}>(Category)</Span>
                  </Text>
                </Box>
              </Link>
            ))}

            {searchResults.upcomingStreams?.map((upcomingStream) => (
              <SearchStreamCard
                stream={upcomingStream}
                link={PageRoutes.session(upcomingStream.id)}
                key={upcomingStream.id}
              />
            ))}

            {searchResults.pastStreams?.map((pastStream) => (
              <SearchStreamCard
                stream={pastStream}
                link={PageRoutes.streamVideo(pastStream.id)}
                key={pastStream.id}
              />
            ))}
          </>
        );
      })()}
    </Box>
  );
}
