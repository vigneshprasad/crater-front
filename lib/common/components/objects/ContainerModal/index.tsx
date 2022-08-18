import { AnimatePresence } from "framer-motion";
import styled, { useTheme } from "styled-components";

import { AnimatedBox, Box, Text, Flex, Icon } from "../../atoms";

interface IProps {
  heading?: string;
  visible: boolean;
  children?: React.ReactNode | undefined;
  onClose: () => void;
}

const Overlay = styled(AnimatedBox)`
  height: 100%;
  width: 100%;
  background: ${({ theme }) => theme.colors.overlay};
  z-index: 10000;
`;

export default function ContainerModal({
  onClose,
  heading,
  visible,
  children,
}: IProps): JSX.Element {
  const { colors, space } = useTheme();

  return (
    <AnimatePresence>
      {visible && (
        <Overlay
          overflow="hidden"
          onClick={() => {
            onClose();
          }}
          position={["fixed", "absolute"]}
          top={0}
          right={0}
          bottom={0}
          left={0}
          initial={{
            display: "block",
            opacity: 0,
          }}
          animate={{
            display: "block",
            opacity: 1,
            transition: {
              when: "beforeChildren",
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              when: "afterChildren",
            },
            transitionEnd: {
              display: "none",
            },
          }}
        >
          <AnimatedBox
            initial={{
              opacity: 0,
              bottom: -250,
            }}
            animate={{
              opacity: 1,
              bottom: 0,
            }}
            exit={{ opacity: 0, bottom: -250 }}
            position="absolute"
            right={0}
            left={0}
            bg={colors.primaryDark}
            borderRadius="4px 4px 0 0"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <Flex py={4} h={12} alignItems="center" justifyContent="center">
              <Box w={40} h={4} borderRadius={24} bg={colors.secondaryLight} />
            </Flex>
            <Flex
              py={space.xxxxxs}
              px={space.xxxs}
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                {heading && (
                  <Text
                    fontSize="1.4rem"
                    fontWeight="600"
                    color={colors.textTertiary}
                  >
                    {heading}
                  </Text>
                )}
              </Box>
              <Icon
                icon="Close"
                cursor="pointer"
                color={colors.textTertiary}
                onClick={onClose}
              />
            </Flex>

            <Box overflowY="auto">{children}</Box>
          </AnimatedBox>
        </Overlay>
      )}
    </AnimatePresence>
  );
}
