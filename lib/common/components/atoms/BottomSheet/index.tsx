import { AnimatePresence } from "framer-motion";
import { PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "styled-components";

import { AnimatedBox, AnimatedBoxProps } from "..";

type IProps = AnimatedBoxProps &
  PropsWithChildren<{
    visible: boolean;
    onClose: () => void;
  }>;

export default function BottomSheet({
  visible,
  children,
  onClose,
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
        >
          <AnimatedBox
            m="0 auto"
            px={space.xs}
            py={space.s}
            borderRadius={`${radii.s}px ${radii.s}px 0 0`}
            w="100%"
            bottom={0}
            maxWidth={720}
            minHeight={340}
            bg={colors.black[5]}
            position="absolute"
            zIndex={zIndices.modal}
            overflow="hidden"
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
            {children}
          </AnimatedBox>
        </AnimatedBox>
      )}
    </AnimatePresence>,
    node
  );
}
