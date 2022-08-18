import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";

import { AnimatedBox, Box, Flex } from "@/common/components/atoms";
import { Button, ButtonProps, IconButton } from "@/common/components/atoms/v2";

interface IProps {
  headingElement: JSX.Element;
  contentElement: JSX.Element;
  buttonLabel?: string;
  onClickButton: () => Promise<void>;
  buttonProps?: ButtonProps;
}

const ProgressBar = styled(Box)`
  transition: all 30s ease-in-out;
`;

export default function ChatNotification({
  headingElement,
  contentElement,
  buttonLabel = "Click here",
  onClickButton,
  buttonProps,
}: IProps): JSX.Element {
  const [visible, setVisible] = useState(true);
  const { colors, space, radii } = useTheme();
  const [width, setWidth] = useState("0%");

  useEffect(() => {
    setWidth("100%");
    setTimeout(() => {
      setVisible(false);
    }, 30000);
  }, [setWidth]);

  return (
    <AnimatePresence>
      {visible && (
        <AnimatedBox
          initial={{
            display: "block",
            top: 24,
            opacity: 0,
            y: "-100%",
          }}
          animate={{
            display: "block",
            top: -12,
            opacity: 1,
            y: "-100%",
          }}
          exit={{
            top: 24,
            opacity: 0,
            y: "-100%",
            transitionEnd: {
              display: "none",
            },
          }}
          zIndex={50}
          p={space.xxxs}
          bg={colors.primaryLight}
          position="absolute"
          right={space.xxxs}
          left={space.xxxs}
          border={`1px solid ${colors.secondaryLight}`}
          borderRadius={radii.xxxxs}
        >
          <Flex mb={space.xxxs} alignItems="center">
            <Box flex="1">{headingElement}</Box>
            <IconButton
              icon="Close"
              type="button"
              onClick={() => {
                setVisible(false);
              }}
              buttonStyle="round"
            />
          </Flex>
          <Box mb={space.xxxs}>{contentElement}</Box>
          <Button
            w="100%"
            label={buttonLabel}
            onClick={() => {
              onClickButton && onClickButton();
              setVisible(false);
            }}
            {...buttonProps}
          />
          <Box
            my={space.xs}
            h={6}
            bg={colors.secondaryLight}
            borderRadius={radii.xs}
          >
            <ProgressBar
              borderRadius={radii.xs}
              h={6}
              bg={colors.accentLight}
              w={width}
            />
          </Box>
        </AnimatedBox>
      )}
    </AnimatePresence>
  );
}
