import { useMemo, useState } from "react";

import { Grid, Box } from "@/common/components/atoms";
import IconButton from "@/common/components/atoms/IconButton";
import { Webinar } from "@/creators/types/community";

import { StreamSlide } from "./StreamSlide";

export interface IStreamSliderProps {
  liveStreams: Webinar[];
}

export function StreamSlider({ liveStreams }: IStreamSliderProps): JSX.Element {
  const [activeSlide, setActiveSlide] = useState(
    liveStreams.length > 1 ? 1 : 0
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
    <Grid gridTemplateColumns="72px 1fr 72px" alignItems="center">
      <IconButton
        variant="roundSmall"
        icon="ChevronLeft"
        onClick={onPrevClick}
      />
      <Box position="relative" minHeight={350}>
        {liveStreams.map((stream, index) => (
          <StreamSlide
            initial="main"
            animate={slideState[index]}
            key={stream.id}
            stream={stream}
          />
        ))}
      </Box>
      <IconButton
        variant="roundSmall"
        icon="ChevronRight"
        onClick={onNextClick}
      />
    </Grid>
  );
}
