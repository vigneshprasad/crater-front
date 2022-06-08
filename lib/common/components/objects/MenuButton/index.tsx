import { useAnimation } from "framer-motion";
import { useMemo, useState } from "react";
import { useTheme } from "styled-components";

import { IconOptions } from "@/common/theme";

import { Box, Flex, AnimatedBox } from "../../atoms";
import { IconButton } from "../../atoms/v2";

interface IProps {
  icon?: IconOptions;
  items: React.ReactNode[];
  children?: React.ReactNode | React.ReactNode[];
  position?: "top" | "bottom-left" | "bottom-right";
}

export default function MenuButton({
  icon,
  items,
  children,
  position = "top",
}: IProps): JSX.Element {
  const controls = useAnimation();
  const [opened, setOpened] = useState<boolean>(false);
  const { colors, radii, borders, space } = useTheme();

  const positionProps = useMemo(() => {
    if (position === "top") {
      return {
        top: 0,
        right: 0,
        transform: "translate(0, -100%)",
      };
    }

    if (position === "bottom-left") {
      return {
        bottom: 0,
        left: 0,
        transform: "translate(0, 100%)",
      };
    }

    if (position === "bottom-right") {
      return {
        bottom: 0,
        right: 0,
        transform: "translate(0, 100%)",
      };
    }
  }, [position]);
  return (
    <Flex position="relative" alignItems="center" justifyContent="center">
      {children && (
        <Flex
          cursor="pointer"
          onClick={async () => {
            const updated = !opened;
            setOpened(updated);
            if (updated) {
              await controls.start("expanded");
              await controls.start("opened");
              return;
            }
            await controls.start("closed");
          }}
        >
          {children}
        </Flex>
      )}
      {icon && (
        <IconButton
          type="button"
          iconProps={{ color: colors.iconColor }}
          icon={icon}
          onClick={async () => {
            const updated = !opened;
            setOpened(updated);
            if (updated) {
              await controls.start("expanded");
              await controls.start("opened");
              return;
            }
            await controls.start("closed");
          }}
        />
      )}

      {opened && (
        <Box
          position="fixed"
          zIndex={80}
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
        zIndex={200}
        py={space.xxxxs}
        initial={opened ? "opened" : "closed"}
        animate={controls}
        minWidth={144}
        bg={colors.primaryBackground}
        position="absolute"
        {...positionProps}
        border={`1px solid ${borders.primary}`}
        borderRadius={radii.xxxs}
        variants={{
          opened: {
            display: "block",
            width: "max-content",
            height: "auto",
            boxShadow: "0px 4px 32px 0px #000000",
          },
          expanded: {
            width: "max-content",
            height: "auto",
            transition: {
              duration: 0,
            },
            display: "none",
          },
          closed: {
            width: 0,
            height: 0,
            transition: {
              when: "afterChildren",
              duration: 0.2,
            },
            transitionEnd: {
              display: "none",
            },
          },
        }}
      >
        {items}
      </AnimatedBox>
    </Flex>
  );
}
