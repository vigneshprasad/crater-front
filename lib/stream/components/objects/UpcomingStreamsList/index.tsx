import { useState } from "react";
import { useTheme } from "styled-components";

import { Box, Grid, Shimmer, Flex } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import StreamCard from "@/community/components/objects/StreamCard";
import useUpcomingStreams from "@/stream/context/UpcomingStreamsContext";

export default function UpcomingStreamsList(): JSX.Element {
  const [initialClick, setInitialClick] = useState(true);
  const { space, radii, colors } = useTheme();
  const { upcoming, nextPage, setUpcomingStreamsPage, isValidating } =
    useUpcomingStreams();
  return (
    <Box>
      <Grid
        px={space.xxs}
        gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr))"
        gridGap={space.xs}
        borderRadius={radii.xxxs}
        mb={space.xs}
      >
        {(() => {
          if (!upcoming) {
            return Array(4)
              .fill("")
              .map((_, index) => (
                <Flex key={index} flexDirection="column" gridGap={space.xs}>
                  <Shimmer h={172} />
                  <Shimmer h={18} w="60%" />
                </Flex>
              ));
          }

          return (
            <>
              {upcoming.map((stream) => {
                return <StreamCard key={stream.id} stream={stream} />;
              })}
              {isValidating &&
                Array(4)
                  .fill("")
                  .map((_, index) => (
                    <Flex key={index} flexDirection="column" gridGap={space.xs}>
                      <Shimmer h={172} />
                      <Shimmer h={18} w="60%" />
                    </Flex>
                  ))}
            </>
          );
        })()}
      </Grid>
      {nextPage && (
        <Flex mx={space.xxs} gridGap={space.xxs} alignItems="center">
          <Flex flex="1" h={1} bg={colors.black[0]} />
          <Button
            label="Show More"
            onClick={() => {
              if (initialClick) {
                setUpcomingStreamsPage((page) => page + 1);
                setInitialClick(false);
                return;
              }

              setUpcomingStreamsPage((page) => page + 2);
            }}
          />
          <Flex flex="1" h={1} bg={colors.black[0]} />
        </Flex>
      )}
    </Box>
  );
}
