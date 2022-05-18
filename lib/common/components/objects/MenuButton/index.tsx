import { useAnimation } from "framer-motion";
import { useState } from "react";
import { useTheme } from "styled-components";

import { IconOptions } from "@/common/theme";

import { Box, AnimatedBox } from "../../atoms";
import { IconButton } from "../../atoms/v2";

interface IProps {
  icon: IconOptions;
  items: React.ReactNode[];
}

export default function MenuButton({ icon, items }: IProps): JSX.Element {
  const controls = useAnimation();
  const [opened, setOpened] = useState<boolean>(false);
  const { colors, radii } = useTheme();
  return (
    <Box position="relative">
      <IconButton
        type="button"
        iconProps={{ color: colors.iconColor }}
        icon={icon}
        onClick={() => {
          const updated = !opened;
          setOpened(updated);
          controls.start(updated ? "opened" : "closed");
        }}
      />
      {opened && (
        <Box
          position="fixed"
          top={0}
          right={0}
          left={0}
          bottom={0}
          bg="transparent"
          onClick={() => {
            setOpened(false);
            controls.start("closed");
          }}
        />
      )}

      <AnimatedBox
        initial={opened ? "opened" : "closed"}
        animate={controls}
        bg={colors.primaryBackground}
        position="absolute"
        top={0}
        right={0}
        transform="translate(0, -100%)"
        borderRadius={radii.xxxs}
        variants={{
          opened: {
            display: "block",
            width: "max-content",
            height: "auto",
          },
          closed: {
            width: 0,
            height: 0,
            transition: {
              when: "afterChildren",
            },
            transitionEnd: {
              display: "none",
            },
          },
        }}
      >
        {items}
      </AnimatedBox>
    </Box>
  );
}
