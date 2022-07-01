import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled, { useTheme } from "styled-components";

import { AnimatedBox, AnimatedBoxProps } from "../../Animated";
import { IconButton } from "../IconButton";

const Overlay = styled(AnimatedBox)`
  display: grid;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndices.overlay};
`;

export type ModalProps = AnimatedBoxProps & {
  visible?: boolean;
  onClose?: () => void;
};

export function Modal({
  visible = false,
  children,
  onClose,
  ...rest
}: ModalProps): JSX.Element | null {
  const [showModal, setShowModal] = useState(visible);
  const [node, setNode] = useState<HTMLElement | undefined>();
  const { colors } = useTheme();

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
        <Overlay
          onClick={onClose}
          bg={colors.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            display: "grid",
          }}
          exit={{
            opacity: 0,
            transitionEnd: {
              display: "none",
            },
          }}
        >
          <AnimatedBox
            position="relative"
            onClick={(e) => e.stopPropagation()}
            m="auto auto"
            bg={colors.primaryDark}
            {...rest}
          >
            {children}
            {onClose && (
              <IconButton
                buttonStyle="round"
                position="absolute"
                top={8}
                right={8}
                icon="Close"
                onClick={onClose}
              />
            )}
          </AnimatedBox>
        </Overlay>
      )}
    </AnimatePresence>,
    node
  );
}
