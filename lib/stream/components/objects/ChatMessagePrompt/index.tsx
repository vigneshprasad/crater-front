import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";

import { AnimatedBox, Text, Box, Flex } from "@/common/components/atoms";
import { IconButton } from "@/common/components/atoms/v2";

interface IProps {
  message: string;
  onClick?: (text: string) => void;
}

const ProgressBox = styled(Box)`
  transition: all 15s ease-in-out;
`;

export default function ChatMessagePrompt({
  message,
  onClick,
}: IProps): JSX.Element {
  const [visible, setVisible] = useState(true);
  const { colors, space, radii } = useTheme();
  const [width, setWidth] = useState("0%");

  useEffect(() => {
    setWidth("100%");
    setTimeout(() => {
      setVisible(false);
    }, 15000);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <AnimatedBox
          onClick={() => {
            if (onClick) {
              onClick(message);
              setVisible(false);
            }
          }}
          position="absolute"
          top={0}
          right={0}
          left={0}
          bg={colors.inputDefaultBg}
          initial={{
            top: -24,
            y: "-100%",
          }}
          animate={{
            top: 0,
            y: "-100%",
          }}
          borderRadius={radii.xxxxs}
        >
          <Box position="relative">
            <ProgressBox
              zIndex={-1}
              position="absolute"
              top={0}
              right={0}
              left={0}
              bottom={0}
              bg={colors.accent}
              w={width}
            />
            <Box p={space.xxxxs}>
              <Flex>
                <Text flex="1" textStyle="caption">
                  COMPLETE THE MESSAGE:
                </Text>
                <IconButton
                  buttonStyle="flat-icon"
                  icon="Close"
                  onClick={(e) => {
                    e.stopPropagation();
                    setVisible(false);
                  }}
                />
              </Flex>

              <Text>{message}...</Text>
            </Box>
          </Box>
        </AnimatedBox>
      )}
    </AnimatePresence>
  );
}
