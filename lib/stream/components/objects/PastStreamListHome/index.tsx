import { useTheme } from "styled-components";

import { Flex, Grid, Shimmer } from "@/common/components/atoms";
import { Webinar } from "@/community/types/community";

import PastStreamCard from "../PastStreamCard/v2";

interface IProps {
  streams?: Webinar[];
  loading: boolean;
}

export default function PastStreamListHome({
  streams: pastStreams,
  loading,
}: IProps): JSX.Element {
  const { space, radii } = useTheme();

  return (
    <Grid
      mx={space.xxs}
      gridTemplateColumns={["1fr", "repeat(auto-fill, minmax(280px, 1fr))"]}
      gridGap={space.s}
    >
      {!pastStreams || loading
        ? Array(4)
            .fill("")
            .map((_, index) => (
              <Flex key={index} flexDirection="column" gridGap={space.xs}>
                <Shimmer
                  w="100%"
                  h={172}
                  borderRadius={radii.xxs}
                  key={index}
                />
                <Shimmer h={18} w="60%" />
              </Flex>
            ))
        : pastStreams.map((stream) => (
            <PastStreamCard key={stream.id} stream={stream} />
          ))}
    </Grid>
  );
}
