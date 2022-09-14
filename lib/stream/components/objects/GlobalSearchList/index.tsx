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
import useGlobalSearch from "@/common/context/GlobalSearchContext";

import SearchStreamCard from "../SearchStreamCard";

export default function GlobalSearchList(): JSX.Element {
  const { space, colors } = useTheme();
  const { upcomingStreams, pastStreams, streamCategories } = useGlobalSearch();

  const loading =
    upcomingStreams === undefined ||
    pastStreams === undefined ||
    streamCategories === undefined;

  return (
    <Box>
      {(() => {
        if (loading) {
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

        if (
          upcomingStreams.length === 0 &&
          pastStreams.length === 0 &&
          streamCategories.length === 0
        ) {
          return (
            <Text textStyle="captionLarge" textAlign="center">
              There are no results that match your search.
            </Text>
          );
        }

        return (
          <>
            {streamCategories.map((category) => (
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

            {upcomingStreams.map((upcomingStream) => (
              <SearchStreamCard
                stream={upcomingStream}
                link={PageRoutes.session(upcomingStream.id)}
                key={upcomingStream.id}
              />
            ))}

            {pastStreams.map((pastStream) => (
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
