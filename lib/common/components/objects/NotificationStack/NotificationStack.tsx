import { Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { variant } from "styled-system";

import { AnimatedBox, Box } from "../../atoms";
import useNotificationStackState from "./context";

const variants: Variants = {
  centered: {
    top: 24,
    width: "max-content",
    right: "50%",
    minWidth: 340,
    transform: "translateX(50%)",
  },
};

const Container = styled(AnimatedBox)`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-gap: 16px;

  border-radius: 4px;
  ${variant({
    prop: "type",
    variants,
  })}
`;

export function NotificationStack(): JSX.Element | null {
  const [node, setNode] = useState<HTMLElement | undefined>();
  const { notifications } = useNotificationStackState();

  useEffect(() => {
    const element = document.getElementById("notification-stack-root");
    if (element != null) {
      setNode(element);
    }
  }, []);

  if (!node) return null;
  return createPortal(
    <Box
      position="fixed"
      zIndex={1000}
      top={0}
      right={0}
      left={0}
      bottom={0}
      pointerEvents="none"
    >
      <Box position="relative" h="100%" w="100%">
        <Container layout pointerEvents="all" type="centered">
          {notifications?.map((notification) => {
            return notification;
          })}
        </Container>
      </Box>
    </Box>,
    node
  );
}
