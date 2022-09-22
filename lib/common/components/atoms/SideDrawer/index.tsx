import { AnimatePresence } from "framer-motion";
import { PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "styled-components";

import useMediaQuery from "@/common/hooks/ui/useMediaQuery";

import { AnimatedBox, AnimatedBoxProps } from "../Animated";
import { Box, BoxProps } from "../System/Box";
import { Flex } from "../System/Flex";
import { Text } from "../System/Text";
import { IconButton } from "../v2";

type IProps = AnimatedBoxProps &
  PropsWithChildren<{
    visible: boolean;
    onClose: () => void;
    heading?: string;
    rootBoxProps?: AnimatedBoxProps;
    boxProps?: BoxProps;
  }>;

export function SideDrawer({
  visible,
  children,
  onClose,
  heading,
  rootBoxProps,
  boxProps,
  ...rest
}: IProps): JSX.Element | null {
  const [showSheet, setShowSheet] = useState(visible ?? false);
  const [node, setNode] = useState<HTMLElement | undefined>();
  const { space, colors, zIndices, breakpoints } = useTheme();

  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

  useEffect(() => {
    const element = document.getElementById("side-drawer-root");
    if (element != null) {
      setNode(element);
    }
  }, []);

  useEffect(() => {
    setShowSheet(visible);
  }, [visible]);

  if (!node) return null;

  if (isMobile === undefined) return null;

  return createPortal(
    <AnimatePresence>
      {showSheet && (
        <AnimatedBox
          display="grid"
          position="absolute"
          top={0}
          bottom={0}
          right={0}
          left={0}
          bg={colors.modalOverlay}
          zIndex={zIndices.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { when: "beforeChildren" } }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 1, transition: { when: "afterChildren" } }}
          {...rootBoxProps}
        >
          <AnimatedBox
            onClick={(e: React.ChangeEvent<HTMLInputElement>) =>
              e.stopPropagation()
            }
            px={space.xs}
            py={space.xxs}
            w={["100%", "40%"]}
            h="100%"
            right={0}
            bg={colors.primaryBackground}
            position="absolute"
            zIndex={zIndices.modal}
            overflow="hidden"
            borderLeft={`1px solid ${colors.primaryLight}`}
            boxShadow="-4px 0px 12px #000000"
            initial={{
              x: isMobile ? "0%" : "100%",
            }}
            animate={{
              x: "0%",
            }}
            exit={{
              x: "100%",
            }}
            transition={{ duration: 0.2 }}
            {...rest}
          >
            <Box
              py={space.xxxs}
              position="sticky"
              top={0}
              zIndex={zIndices.modalHeader}
              borderBottom={`1px solid ${colors.secondaryLight}`}
              {...boxProps}
            >
              <Flex justifyContent="space-between" alignItems="center">
                <Text>{heading}</Text>
                <IconButton
                  buttonStyle="round"
                  icon="Close"
                  iconProps={{ size: 28 }}
                  onClick={onClose}
                />
              </Flex>
            </Box>

            <Box>{children}</Box>
          </AnimatedBox>
        </AnimatedBox>
      )}
    </AnimatePresence>,
    node
  );
}
