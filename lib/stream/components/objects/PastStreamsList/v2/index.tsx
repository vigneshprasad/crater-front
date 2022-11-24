import { forwardRef, useRef, useEffect, useState, useCallback } from "react";
import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import { Grid, Flex, Shimmer, Box } from "@/common/components/atoms";
import LazyLoadButton from "@/common/components/objects/LazyLoadButton";
import { PageRoutes } from "@/common/constants/route.constants";
import usePastStreams from "@/stream/context/PastStreamContext";

import PastStreamCard, { CardPosition } from "../../PastStreamCard/v2";

const ITEM_WIDTH = 280;

const PastStreamsList = forwardRef<HTMLDivElement>((_, ref) => {
  const { streams, nextPage, categorySlug, setPastStreamsPage } =
    usePastStreams();
  const { space } = useTheme();
  const router = useRouter();
  const [numColumns, setNumColumn] = useState(0);
  const [initialClick, setInitialClick] = useState(true);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      const { width } = gridRef.current.getBoundingClientRect();
      setNumColumn(Math.floor(width / ITEM_WIDTH));
    }
  }, [gridRef]);

  const cardPosition = useCallback(
    (index: number) => {
      if (numColumns === 0) {
        return CardPosition.center;
      }

      const count = index + 1;

      if (count % numColumns === 1) {
        return CardPosition.left;
      }

      if (count % numColumns === 0) {
        return CardPosition.right;
      }

      return CardPosition.center;
    },
    [numColumns]
  );

  const onClick = useCallback((): void => {
    if (categorySlug) {
      router.push(PageRoutes.category(categorySlug));
    }

    if (initialClick) {
      setPastStreamsPage((page) => page + 1);
      setInitialClick(false);
      return;
    }

    setPastStreamsPage((page) => page + 2);
  }, [categorySlug, initialClick, router, setPastStreamsPage]);

  return (
    <Box pt={space.xxxxs} pb={space.xs} ref={ref}>
      <Grid
        ref={gridRef}
        gridTemplateColumns={`repeat(auto-fill, minmax(${ITEM_WIDTH}px, 1fr))`}
        gridGap={space.xs}
        mb={space.xs}
      >
        {(() => {
          if (!streams) {
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
              {streams.map((stream, index) => (
                <PastStreamCard
                  cardPosition={cardPosition(index)}
                  key={stream.id}
                  stream={stream}
                />
              ))}
            </>
          );
        })()}
      </Grid>

      {nextPage && (
        <Flex py={space.xs} gridGap={space.xxxs} alignItems="center">
          <Flex
            flex="1"
            h={1}
            background="linear-gradient(-90deg, rgba(255, 255, 255, 0.24) 6.23%, rgba(255, 255, 255, 0) 74.19%)"
          />
          <LazyLoadButton
            label={categorySlug ? "View All" : "Show More"}
            iconTransform={categorySlug ? "rotate(-90deg)" : undefined}
            onClick={onClick}
          />
          <Flex
            flex="1"
            h={1}
            background="linear-gradient(90deg, rgba(255, 255, 255, 0.24) 6.23%, rgba(255, 255, 255, 0) 74.19%)"
          />
        </Flex>
      )}
    </Box>
  );
});

PastStreamsList.displayName = "PastStreamsList";

export default PastStreamsList;
