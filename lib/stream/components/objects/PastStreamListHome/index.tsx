import { useTheme } from "styled-components";

import { Grid, Shimmer } from "@/common/components/atoms";
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
              <Shimmer w="100%" h={180} borderRadius={radii.xxs} key={index} />
            ))
        : pastStreams.map((stream) => (
            <PastStreamCard key={stream.id} stream={stream} />
          ))}
    </Grid>
  );
}
