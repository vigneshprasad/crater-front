import { AnimateSharedLayout } from "framer-motion";
import { useMemo, useState } from "react";
import { useTheme } from "styled-components";

import { Grid, AnimatedBox } from "@/common/components/atoms";
import IconButton from "@/common/components/atoms/IconButton";
import { Webinar } from "@/creators/types/community";

import { StreamSlide } from "./StreamSlide";

export interface IStreamSliderProps {
  liveStreams: Webinar[];
}

export function StreamSlider({ liveStreams }: IStreamSliderProps): JSX.Element {
  const { space } = useTheme();
  const [activeSlide, setActiveSlide] = useState(
    // liveStreams.length > 2 ? 1 : 0
    0
  );

  const onPrevClick = (): void => {
    setActiveSlide((state) => {
      if (state === 0) {
        return state;
      }
      return state - 1;
    });
  };

  const onNextClick = (): void => {
    setActiveSlide((state) => {
      if (state === liveStreams.length - 1) {
        return state;
      }
      return state + 1;
    });
  };

  const slideState = useMemo(() => {
    return liveStreams.map((_, index) => {
      if (index === activeSlide - 1) return "previous";
      if (index === activeSlide + 1) return "next";
      if (index === activeSlide) return "main";
      return "hidden";
    });
  }, [liveStreams, activeSlide]);

  return (
    <Grid gridTemplateColumns={["1fr", "72px 1fr 72px"]} alignItems="center">
      <IconButton
        display={["none", "block"]}
        zIndex={10}
        variant="roundSmall"
        icon="ChevronLeft"
        onClick={onPrevClick}
      />

      <AnimateSharedLayout>
        <AnimatedBox
          display={["grid", "block"]}
          gridAutoFlow={["column", "none"]}
          gridAutoColumns={["minmax(280px, 1fr)", "none"]}
          position="relative"
          minHeight={350}
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
        zIndex={10}
        variant="roundSmall"
        icon="ChevronRight"
        onClick={onNextClick}
      />
    </Grid>
  );
}
