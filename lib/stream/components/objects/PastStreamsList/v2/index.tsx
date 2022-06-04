import { forwardRef, useRef, useEffect, useState, useCallback } from "react";
import { useTheme } from "styled-components";

import { Grid, Flex, Shimmer, Box } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import usePastStreams from "@/stream/context/PastStreamContext";

import PastStreamCard, { CardPosition } from "../../PastStreamCard/v2";

const ITEM_WIDTH = 280;

const PastStreamsList = forwardRef<HTMLDivElement>((_, ref) => {
  const { streams, nextPage, setPastStreamsPage } = usePastStreams();
  const { space, colors } = useTheme();
  const [numColumns, setNumColumn] = useState(0);
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

  return (
    <Box ref={ref}>
      <Grid
        mx={space.xxs}
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
        <Flex mx={space.xxs} gridGap={space.xxs} alignItems="center">
          <Flex flex="1" h={1} bg={colors.black[0]} />
          <Button
            variant="dark-flat"
            label="Show More"
            onClick={() => {
              setPastStreamsPage((page) => page + 1);
            }}
          />
          <Flex flex="1" h={1} bg={colors.black[0]} />
        </Flex>
      )}
    </Box>
  );
});

PastStreamsList.displayName = "PastStreamsList";

export default PastStreamsList;
