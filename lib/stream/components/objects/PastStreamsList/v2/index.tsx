import { forwardRef } from "react";
import { useTheme } from "styled-components";

import { Grid, Flex, Shimmer } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import StyledHeadingDivider from "@/common/components/objects/StyledHeadingDivider";
import usePastStreams from "@/stream/context/PastStreamContext";

import PastStreamCard from "../../PastStreamCard/v2";

const PastStreamsList = forwardRef<HTMLDivElement>((_, ref) => {
  const { streams, nextPage, setPastStreamsPage } = usePastStreams();
  const { space, colors } = useTheme();

  return (
    <>
      <StyledHeadingDivider label="Previously Streamed" />
      <Grid
        mx={space.xxs}
        ref={ref}
        gridTemplateColumns="repeat(auto-fill, minmax(280px, 1fr))"
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
              {streams.map((stream) => (
                <PastStreamCard key={stream.id} stream={stream} />
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
    </>
  );
});

PastStreamsList.displayName = "PastStreamsList";

export default PastStreamsList;
