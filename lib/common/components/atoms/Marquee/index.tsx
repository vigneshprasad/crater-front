import { useTheme } from "styled-components";

import { AnimatedBox } from "../Animated";
import { Box } from "../System/Box";

const marqueeVariants = {
  animate: {
    x: ["100%", "-100%"],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 15,
        ease: "linear",
      },
    },
  },
};

export type IMarqueeProps = {
  children?: React.ReactNode | React.ReactNode[];
};

export function Marquee({ children }: IMarqueeProps): JSX.Element {
  const { space, colors } = useTheme();
  return (
    <Box
      bg={colors.black[6]}
      py={space.xxxs}
      position="relative"
      overflowX="hidden"
    >
      <AnimatedBox variants={marqueeVariants} animate="animate">
        {children}
      </AnimatedBox>
    </Box>
  );
}
