import {
  AnimatedBox,
  AnimatedBoxProps,
  Shimmer,
} from "@/common/components/atoms";

export function SliderShimmer({ ...props }: AnimatedBoxProps): JSX.Element {
  const WIDTH = 540;
  const HEIGHT = WIDTH * (9 / 16);
  const variants = {
    next: {
      display: "block",
      top: "50%",
      right: "50%",
      x: "85%",
      y: "-50%",
      scale: 0.8,
      zIndex: 10,
      opacity: 0.6,
      boxShadow: "none",
    },
    prev: {
      display: "block",
      top: "50%",
      right: "50%",
      x: "15%",
      y: "-50%",
      scale: 0.8,
      zIndex: 10,
      opacity: 0.6,
      boxShadow: "none",
    },
    active: {
      opacity: 1,
      display: "block",
      top: "50%",
      right: "50%",
      x: "50%",
      y: "-50%",
      scale: 1.0,
      zIndex: 50,
      boxShadow: "0px 0px 16px 0px #000000",
    },
  };
  return (
    <AnimatedBox
      position="absolute"
      variants={variants}
      borderRadius={4}
      overflow="hidden"
      w={WIDTH + 180}
      h={HEIGHT}
      {...props}
    >
      <Shimmer w="100%" h="100%" />
    </AnimatedBox>
  );
}
