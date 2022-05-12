import { useTheme } from "styled-components";

import { Box, Grid, Shimmer, Flex } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import StreamCard from "@/community/components/objects/StreamCard";
import { Webinar } from "@/community/types/community";

interface IProps {
  upcoming?: Webinar[];
}

export default function UpcomingStreamsList({ upcoming }: IProps): JSX.Element {
  const { space, radii, colors } = useTheme();
  return (
    <Box>
      <Grid
        px={space.xxs}
        gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr))"
        gridGap={space.xs}
        borderRadius={radii.xxxs}
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

          return upcoming.map((stream) => {
            return <StreamCard key={stream.id} stream={stream} />;
          });
        })()}
      </Grid>
      <Flex
        mx={space.xxs}
        gridGap={space.xxs}
        py={space.xxs}
        alignItems="center"
      >
        <Flex flex="1" h={1} bg={colors.black[0]} />
        <Button label="Show More" />
        <Flex flex="1" h={1} bg={colors.black[0]} />
      </Flex>
    </Box>
  );
}
