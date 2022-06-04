import { AnimatePresence } from "framer-motion";
import { PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "styled-components";

import { AnimatedBox, AnimatedBoxProps } from "../Animated";
import { Box } from "../System/Box";
import { Flex } from "../System/Flex";
import { Text } from "../System/Text";
import { IconButton } from "../v2";

type IProps = AnimatedBoxProps &
  PropsWithChildren<{
    visible: boolean;
    onClose: () => void;
    heading?: string;
    rootBoxProps?: AnimatedBoxProps;
  }>;

export function BottomSheet({
  visible,
  children,
  onClose,
  heading,
  rootBoxProps,
  ...rest
}: IProps): JSX.Element | null {
  const [showSheet, setShowSheet] = useState(visible ?? false);
  const [node, setNode] = useState<HTMLElement | undefined>();
  const { space, colors, zIndices, radii } = useTheme();

  useEffect(() => {
    const element = document.getElementById("bottom-sheet-root");
    if (element != null) {
      setNode(element);
    }
  }, []);

  useEffect(() => {
    setShowSheet(visible);
  }, [visible]);

  if (!node) return null;

  return createPortal(
    <AnimatePresence>
      {showSheet && (
        <AnimatedBox
          onClick={onClose}
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
            px={space.xxxs}
            borderRadius={`${radii.s}px ${radii.s}px 0 0`}
            w="100%"
            bottom={0}
            bg={colors.primaryLight}
            position="absolute"
            zIndex={zIndices.modal}
            overflow="hidden"
            borderTopRightRadius={radii.xxs}
            borderTopLeftRadius={radii.xxs}
            maxHeight="80vh"
            initial={{
              y: "50%",
            }}
            animate={{
              y: "0%",
            }}
            exit={{
              y: "100%",
            }}
            transition={{ duration: 0.2 }}
            {...rest}
          >
            <Box
              py={space.xxxs}
              position="sticky"
              top={0}
              bg={colors.primaryLight}
              zIndex={zIndices.modalHeader}
            >
              <Box h={2} bg={colors.black[0]} w={28} m="0 auto" />
              <Flex justifyContent="space-between" alignItems="center">
                <Text>{heading}</Text>
                <IconButton icon="Close" onClick={onClose} />
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
