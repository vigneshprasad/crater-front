import { AnimateSharedLayout } from "framer-motion";
import { useMemo, useState } from "react";
import { useTheme } from "styled-components";

import { Grid, AnimatedBox, Box } from "@/common/components/atoms";
import { IconButton } from "@/common/components/atoms/v2/IconButton";
import { Webinar } from "@/community/types/community";

import { StreamSlide } from "./StreamSlide";

export interface IStreamSliderProps {
  liveStreams: Webinar[];
}

export function StreamSlider({ liveStreams }: IStreamSliderProps): JSX.Element {
  const { space, zIndices } = useTheme();
  const [activeSlide, setActiveSlide] = useState(
    // liveStreams.length > 2 ? 1 : 0
    0
  );

  const onPrevClick = (): void => {
    setActiveSlide((state) => {
      if (state === 0) {
        return liveStreams.length - 1;
      }
      return state - 1;
    });
  };

  const onNextClick = (): void => {
    setActiveSlide((state) => {
      if (state === liveStreams.length - 1) {
        return 0;
      }
      return state + 1;
    });
  };

  const slideState = useMemo(() => {
    return liveStreams.map((_, index) => {
      if (liveStreams.length == 1) {
        return "main";
      }
      if (liveStreams.length == 2) {
        if (index == activeSlide) {
          return "main";
        } else {
          return "next";
        }
      }
      if (
        index ==
          (activeSlide % liveStreams.length) + (liveStreams.length - 1) ||
        index == (activeSlide % liveStreams.length) - 1
      )
        return "previous";
      if (
        index == (activeSlide % liveStreams.length) + 1 ||
        (activeSlide == liveStreams.length - 1 && index == 0)
      )
        return "next";
      if (index == activeSlide % liveStreams.length) return "main";
      return "hidden";
    });
  }, [liveStreams, activeSlide]);

  return (
    <Grid
      gridTemplateColumns={["1fr", "min-content 1fr min-content"]}
      alignItems="center"
    >
      <IconButton
        display={["none", "block"]}
        zIndex={zIndices.sliderControls}
        variant="flat"
        icon="ChevronLeft"
        onClick={onPrevClick}
      />

      <AnimateSharedLayout>
        <AnimatedBox
          display={["grid", "block"]}
          gridAutoFlow={["column", "none"]}
          gridAutoColumns={["minmax(280px, 1fr)", "none"]}
          position="relative"
          minHeight={298}
          overflowX={["auto", "hidden"]}
          py={[space.xs, 0]}
          gridGap={[space.xs, 0]}
          placeItems={["start", "auto"]}
        >
          {liveStreams.map((stream, index) => (
            <StreamSlide
              initial="main"
              animate={slideState[index]}
              key={stream.id}
              stream={stream}
            />
          ))}
        </AnimatedBox>
      </AnimateSharedLayout>

      <IconButton
        display={["none", "block"]}
        zIndex={zIndices.sliderControls}
        variant="flat"
        icon="ChevronRight"
        onClick={onNextClick}
      />
    </Grid>
  );
}
