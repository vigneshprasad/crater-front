import { useCallback, useRef } from "react";
import { useTheme } from "styled-components";

import { Grid, Shimmer, Text } from "@/common/components/atoms";
import { PageRoutes } from "@/common/constants/route.constants";
import { Webinar } from "@/community/types/community";
import { IPastStreamState } from "@/stream/context/PastStreamContext";

import PastStreamCard from "../PastStreamCard";

export default function PastStreamListHome({
  streams: pastStreams,
  loading,
  setPastStreamsPage,
}: IPastStreamState): JSX.Element {
  const { space } = useTheme();

  const _observer = useRef<IntersectionObserver>();

  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (_observer.current) _observer.current.disconnect();
      _observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPastStreamsPage((page) => page + 1);
        }
      });

      if (node != null) _observer.current.observe(node);
    },
    [_observer, loading, setPastStreamsPage]
  );

  return (
    <Grid
      px={space.s}
      gridTemplateColumns={["1fr", "repeat(auto-fill, minmax(280px, 1fr))"]}
      gridGap={space.s}
    >
      {(() => {
        if (loading) return <Shimmer w="100%" h="100%" />;

        if (pastStreams?.length === 0)
          return <Text>No streams in this category.</Text>;

        return pastStreams?.map((stream: Webinar, index: number) => (
          <PastStreamCard
            key={stream.id}
            title={stream.topic_detail.name}
            href={PageRoutes.streamVideo(stream.id)}
            image={stream.topic_detail.image}
            hostImage={stream.host_detail?.photo}
            hostName={stream.host_detail?.name}
            time={stream.start}
            hostSlug={stream.host_detail?.creator_detail?.slug}
            ref={index == pastStreams.length - 1 ? ref : null}
          />
        ));
      })()}
    </Grid>
  );
}
