import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled, { useTheme } from "styled-components";

import IconButton from "../IconButton";
import { Box } from "../System/Box";
import { GridProps } from "../System/Grid";

export type IModalProps = GridProps & {
  visible?: boolean;
  onClose?: () => void;
  maxWidth?: number;
  maxHeight?: number;
  iconButtonProps?: GridProps;
};

const Overlay = styled(Box)`
  display: grid;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndices.overlay};
`;

export function Modal({
  children,
  onClose,
  visible = false,
  maxWidth = 720,
  maxHeight = 640,
  iconButtonProps,
  ...rest
}: IModalProps): JSX.Element | null {
  const [showModal, setShowModal] = useState(visible);
  const { colors, radii, zIndices } = useTheme();
  const [node, setNode] = useState<HTMLElement | undefined>();

  useEffect(() => {
    const element = document.getElementById("modal-root");
    if (element != null) {
      setNode(element);
    }
  }, []);

  useEffect(() => {
    // const escHandler = (e: React.KeyboardEvent): void => {
    //   if (e.keyCode === 27) {
    //     onClose && onClose();
    //   }
    // };
    setShowModal(visible);

    // if (visible) {
    //   document.addEventListener("keypress", escHandler);
    // }

    // return () => {
    //   document.removeEventListener("keypress", escHandler);
    // };
  }, [visible, onClose]);

  if (!node) return null;

  return createPortal(
    <AnimatePresence exitBeforeEnter>
      {showModal && (
        <Overlay bg={colors.modalOverlay} onClick={onClose}>
          <Box
            maxWidth={["calc(100% - 32px)", maxWidth]}
            onClick={(e) => e.stopPropagation()}
            position="absolute"
            top="50%"
            right="50%"
            transform="translate(50%, -50%)"
            zIndex={zIndices.modal}
            bg={colors.black[6]}
            w="100%"
            h="100%"
            maxHeight={["calc(100vh - 72px)", maxHeight]}
            borderRadius={radii.s}
            overflowY="auto"
          >
            <Box w="100%" overflowY="auto" maxHeight="100%" h="100%" {...rest}>
              {children}
              {onClose && (
                <IconButton
                  zIndex={20}
                  variant="roundSmall"
                  right={16}
                  top={16}
                  position="absolute"
                  icon="Close"
                  onClick={onClose}
                  {...iconButtonProps}
                />
              )}
            </Box>
          </Box>
        </Overlay>
      )}
    </AnimatePresence>,
    node
  );
}
