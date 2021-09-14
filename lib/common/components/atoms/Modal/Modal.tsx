import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled, { useTheme } from "styled-components";

import IconButton from "../IconButton";
import { Box, BoxProps } from "../System/Box";

export type IModalProps = BoxProps & {
  visible?: boolean;
  onClose: () => void;
};

const Overlay = styled(Box)`
  display: grid;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

export function Modal({
  children,
  onClose,
  visible = false,
  ...rest
}: IModalProps): JSX.Element | null {
  const [showModal, setShowModal] = useState(visible);
  const { colors, radii, space } = useTheme();
  const [node, setNode] = useState<HTMLElement | undefined>();

  useEffect(() => {
    const element = document.getElementById("modal-root");
    if (element != null) {
      setNode(element);
    }
  }, []);

  useEffect(() => {
    setShowModal(visible);
  }, [visible]);

  if (!node) return null;

  return createPortal(
    <AnimatePresence exitBeforeEnter>
      {showModal && (
        <Overlay bg={colors.modalOverlay} onClick={onClose}>
          <Box
            m="auto auto"
            p={space.xs}
            borderRadius={radii.s}
            minHeight={340}
            w="100%"
            maxWidth={720}
            bg={colors.black[1]}
            position="relative"
            {...rest}
          >
            <IconButton
              variant="roundSmall"
              right={16}
              top={16}
              position="absolute"
              icon="Close"
              onClick={onClose}
            />
            {children}
          </Box>
        </Overlay>
      )}
    </AnimatePresence>,
    node
  );
}
