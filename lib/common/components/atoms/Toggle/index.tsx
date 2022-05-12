import { Variants, useAnimation } from "framer-motion";
import { useState } from "react";
import { useTheme } from "styled-components";

import { AnimatedBox } from "../Animated";

export function Toggle(): JSX.Element {
  const [active, setActive] = useState<boolean>(true);
  const controls = useAnimation();
  const { colors } = useTheme();
  const containerVariants: Variants = {
    active: {
      background: colors.accent,
    },
    inactive: {
      background: colors.primaryBackground,
    },
  };

  const indicatorVariants: Variants = {
    active: {
      left: "2px",
      right: "auto",
    },
    inactive: {
      left: "auto",
      right: "2px",
    },
  };

  return (
    <AnimatedBox
      layout
      initial={active ? "active" : "inactive"}
      onClick={() => {
        const updated = !active;
        setActive(updated);
        console.log(updated);
        controls.start(updated ? "active" : "inactive");
      }}
      position="relative"
      animate={controls}
      variants={containerVariants}
      h={20}
      borderRadius={16}
      w={36}
    >
      <AnimatedBox
        animate={controls}
        variants={indicatorVariants}
        position="absolute"
        top="50%"
        transform="translate(0, -50%)"
        h={18}
        w={18}
        borderRadius="50%"
        bg={colors.white[0]}
      />
    </AnimatedBox>
  );
}
