import * as CSS from "csstype";
import { Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { useTheme } from "styled-components";

import { AnimatedBox } from "../Animated";

interface IProps {
  onChange?: (value: boolean) => void;
  activeColor?: CSS.Property.Color;
  inactiveColor?: CSS.Property.Color;
  children?: React.ReactNode | React.ReactNode[];
  value?: boolean;
}

export function Toggle({
  onChange,
  activeColor,
  inactiveColor,
  children,
  value,
}: IProps): JSX.Element {
  const [active, setActive] = useState<boolean>(value ?? true);
  const { colors } = useTheme();
  const containerVariants: Variants = {
    active: {
      background: activeColor ?? colors.accent,
    },
    inactive: {
      background: inactiveColor ?? colors.primaryBackground,
    },
  };

  useEffect(() => {
    if (value !== undefined) {
      setActive(value);
    }
  }, [value]);

  const indicatorVariants: Variants = {
    active: {
      left: "1px",
      right: "auto",
    },
    inactive: {
      left: "auto",
      right: "1px",
    },
  };

  return (
    <AnimatedBox
      layout
      initial={active ? "active" : "inactive"}
      onClick={() => {
        const updated = !active;
        setActive(updated);
        onChange && onChange(updated);
      }}
      position="relative"
      animate={active ? "active" : "inactive"}
      variants={containerVariants}
      h={20}
      borderRadius={16}
      w={36}
      cursor="pointer"
    >
      <AnimatedBox
        display="grid"
        variants={indicatorVariants}
        position="absolute"
        top="50%"
        transform="translate(0, -50%)"
        h={18}
        w={18}
        borderRadius="50%"
        bg={colors.white[0]}
      >
        {children}
      </AnimatedBox>
    </AnimatedBox>
  );
}
