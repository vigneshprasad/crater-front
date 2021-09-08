import { createPortal } from "react-dom";
import { useTheme } from "styled-components";

import { Icon } from "../Icon";
import { Box } from "../System/Box";
import { Flex } from "../System/Flex";
import { Text } from "../System/Text";

export interface IModalProps {
  onClose: () => void;
}

export const Modal: React.FC<IModalProps> = ({ children, onClose }) => {
  const { colors, radii, space } = useTheme();
  return createPortal(
    <Box
      position="absolute"
      top={0}
      right={0}
      left={0}
      bottom={0}
      bg={colors.modalOverlay}
      onClick={onClose}
    >
      <Box
        px={space.s}
        py={space.s}
        borderRadius={radii.s}
        minWidth={["60vw"]}
        minHeight={["60vh"]}
        bg={colors.black[1]}
        position="absolute"
        top="50%"
        right="50%"
        transform="translate(50%,-50%)"
      >
        <Flex>
          <Text flex="1">Header</Text>
          <Icon icon="Close" onClick={onClose} />
        </Flex>
        {children}
      </Box>
    </Box>,
    document.querySelector("body")
  );
};
