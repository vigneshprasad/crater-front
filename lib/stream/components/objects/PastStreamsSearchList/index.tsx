import { useTheme } from "styled-components";

import { Box, Flex, Text, Spinner } from "@/common/components/atoms";
import { PageRoutes } from "@/common/constants/route.constants";
import useGlobalSearch from "@/common/context/GlobalSearchContext";

import SearchStreamCard from "../SearchStreamCard";

export default function PastStreamsSearchList(): JSX.Element {
  const { space, colors } = useTheme();
  const { pastStreams } = useGlobalSearch();

  return (
    <Box>
      {(() => {
        if (pastStreams === undefined) {
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

        if (pastStreams.length === 0) {
          return (
            <Text textStyle="captionLarge" textAlign="center">
              There are no results that match your search.
            </Text>
          );
        }

        return pastStreams.map((stream) => (
          <SearchStreamCard
            stream={stream}
            link={PageRoutes.streamVideo(stream.id)}
            key={stream.id}
          />
        ));
      })()}
    </Box>
  );
}
