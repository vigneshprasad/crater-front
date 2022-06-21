import { useCallback, useRef } from "react";
import { useTheme } from "styled-components";

import Image from "next/image";

import { Grid, Link, Text, Box, Spinner } from "@/common/components/atoms";
import { PageRoutes } from "@/common/constants/route.constants";
import usePastStreams from "@/stream/context/PastStreamContext";

interface IProps {
  displayedPastStreamId: number;
}

export default function PastStreamsList({
  displayedPastStreamId,
}: IProps): JSX.Element {
  const { colors, space, radii } = useTheme();
  const {
    streams: past,
    loading: pastStreamsLoading,
    setPastStreamsPage,
  } = usePastStreams();

  const _observer = useRef<IntersectionObserver>();

  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      if (pastStreamsLoading) return;
      if (_observer.current) _observer.current.disconnect();
      _observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPastStreamsPage((page) => page + 1);
        }
      });

      if (node != null) _observer.current.observe(node);
    },
    [_observer, pastStreamsLoading, setPastStreamsPage]
  );

  return (
    <>
      <Text px={space.xxs} mb={space.xxs} textStyle="title">
        Similar Streams
      </Text>
      <Grid
        gridAutoFlow="row"
        gridAutoRows="min-content"
        gridGap={space.xxs}
        py={space.xxs}
        px={space.xxs}
        borderRadius={radii.xxs}
        h="50vh"
        overflowY="auto"
        bg={colors.black[1]}
      >
        {(() => {
          if (pastStreamsLoading || !past) {
            return <Spinner m="auto auto" />;
          }

          return past.map((stream, index) => {
            if (stream.id !== displayedPastStreamId) {
              return (
                <Link
                  key={stream.id}
                  href={PageRoutes.streamVideo(stream.id)}
                  boxProps={{ target: "_blank" }}
                >
                  <Grid
                    gridTemplateColumns="max-content 1fr"
                    gridGap={space.xxs}
                    ref={index == past.length - 1 ? ref : null}
                  >
                    <Box
                      position="relative"
                      h={72}
                      w={120}
                      borderRadius={radii.xxs}
                      overflow="hidden"
                    >
                      {stream.topic_detail?.image && (
                        <Image
                          layout="fill"
                          objectFit="cover"
                          src={stream.topic_detail?.image}
                          alt={stream.topic_detail?.name}
                        />
                      )}
                    </Box>

                    <Text maxLines={2}>{stream.topic_detail?.name}</Text>
                  </Grid>
                </Link>
              );
            }
          });
        })()}
      </Grid>
    </>
  );
}
