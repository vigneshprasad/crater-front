import { useState, useCallback } from "react";
import styled from "styled-components";

import { Box, Grid } from "@/common/components/atoms";
import { IconButton } from "@/common/components/atoms/v2";
import { Webinar } from "@/community/types/community";

import { SliderShimmer } from "./SliderShimmer";
import { StreamSlide } from "./StreamSlide";

interface IProps {
  streams?: Webinar[];
}

const HEIGHT = 540 * (9 / 16) + 120;

const GradientBackDrop = styled(Box)`
  background: linear-gradient(
    104.66deg,
    rgba(136, 46, 232, 0.6) 21.6%,
    rgba(89, 174, 211, 0.6) 81.04%
  );
  filter: blur(40px);
  transform: translate(50%, -50%);
`;

export function StreamSlider({ streams }: IProps): JSX.Element {
  const [activeItem, setActiveItem] = useState(0);

  const getVariant = useCallback(
    (index: number) => {
      if (streams) {
        if (activeItem === 0) {
          if (index === streams.length - 1) return "prev";
        }

        if (activeItem === streams.length - 1) {
          if (index === 0) return "next";
        }
      }

      if (index === activeItem) return "active";
      if (index === activeItem - 1) return "prev";
      if (index === activeItem - 2) return "prevHidden";
      if (index === activeItem + 1) return "next";
      if (index === activeItem + 2) return "nextHidden";
      return "hidden";
    },
    [activeItem, streams]
  );

  return (
    <Grid
      gridTemplateAreas={`"prev slider next"`}
      gridTemplateColumns="72px 1fr 72px"
      h={HEIGHT}
    >
      <Grid gridArea="prev">
        <IconButton
          m="auto auto"
          icon="ChevronLeft"
          onClick={() => {
            if (streams) {
              if (activeItem === 0) {
                return setActiveItem(streams.length - 1);
              }
              const prev = activeItem - 1;
              setActiveItem(prev);
            }
          }}
        />
      </Grid>
      <Box gridArea="slider" position="relative">
        {(() => {
          if (!streams)
            return (
              <>
                <SliderShimmer initial="prev" />
                <SliderShimmer initial="active" />
                <SliderShimmer initial="next" />
              </>
            );

          return streams.map((stream, index) => {
            return (
              <StreamSlide
                initial="hidden"
                animate={getVariant(index)}
                stream={stream}
                key={stream.id}
              />
            );
          });
        })()}
        <GradientBackDrop
          position="absolute"
          right="50%"
          bottom={-20}
          borderRadius="50%"
          w={540}
          h={25}
        />
      </Box>

      <Grid gridArea="next">
        <IconButton
          m="auto auto"
          icon="ChevronRight"
          onClick={() => {
            if (streams) {
              if (activeItem === streams.length - 1) {
                return setActiveItem(0);
              }
              const next = activeItem + 1;
              setActiveItem(next);
            }
          }}
        />
      </Grid>
    </Grid>
  );
}
