import { useTheme } from "styled-components";

import { Box, Flex, Text, Spinner } from "@/common/components/atoms";
import { PageRoutes } from "@/common/constants/route.constants";
import useUpcomingStreamsSearchList from "@/stream/context/UpcomingStreamsSearchContext";

import SearchStreamCard from "../SearchStreamCard";

export default function UpcomingStreamsSearchList(): JSX.Element {
  const { space, colors } = useTheme();
  const { streams, isValidating } = useUpcomingStreamsSearchList();

  return (
    <Box>
      {(() => {
        if (isValidating && !streams) {
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

        if (streams?.length === 0) {
          return (
            <Text textStyle="captionLarge" textAlign="center">
              There are no results that match your search.
            </Text>
          );
        }

        return streams?.map((stream) => (
          <SearchStreamCard
            stream={stream}
            link={PageRoutes.session(stream.id)}
            key={stream.id}
          />
        ));
      })()}
    </Box>
  );
}
