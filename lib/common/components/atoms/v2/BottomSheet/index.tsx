import { forwardRef, MouseEvent, useRef } from "react";
import { mergeRefs } from "react-merge-refs";
import styled, { useTheme } from "styled-components";

import { Icon } from "../../Icon";
import {
  Dialog,
  BoxProps,
  Box,
  DialogProps,
  Text,
  Flex,
  Grid,
} from "../../System";

type IProps = BoxProps & {
  heading?: string;
  dialogProps?: DialogProps;
};

const StyledDialog = styled(Dialog)<DialogProps>`
  padding: 0;
  margin: 0;
  width: 100vw;
  max-width: 100vw;
  overflow: hidden;
  border: none;

  &[open] > ${Box} {
    animation: show 300ms ease-in normal;
  }

  @keyframes show {
    from {
      opacity: 0;
      transform: translateY(100%);
    }

    to {
      opacity: 1;
      transform: translateY(0%);
    }
  }
`;

export const BottomSheet = forwardRef<HTMLDialogElement, IProps>(
  ({ children, dialogProps, heading, ...rest }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const { space, colors } = useTheme();

    function closeDialog(): void {
      if (dialogRef.current) {
        dialogRef.current?.close();
      }
    }
    const handleDialogClick = (event: MouseEvent<HTMLDialogElement>): void => {
      console.log(event.currentTarget.nodeName);
      if (dialogRef.current) {
        if (event.currentTarget.nodeName === "DIALOG") {
          closeDialog();
        }
      }
    };

    return (
      <StyledDialog
        {...dialogProps}
        ref={mergeRefs([dialogRef, ref])}
        onClick={handleDialogClick}
      >
        <Box
          {...rest}
          position="fixed"
          bottom={0}
          left={0}
          right={0}
          borderTopLeftRadius={16}
          borderTopRightRadius={16}
          onClick={(event) => event.stopPropagation()}
        >
          <Box h="-webkit-fill-available" position="relative">
            <Grid
              gridTemplateRows="max-content 1fr"
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
            >
              <Flex
                px={space.xxs}
                py={space.xxxs}
                alignItems="center"
                justifyContent="space-between"
              >
                <Text
                  color={colors.textSecondaryLight}
                  fontSize="1.4rem"
                  fontWeight="600"
                  textTransform="uppercase"
                >
                  {heading}
                </Text>

                <Icon
                  icon="Close"
                  onClick={() => {
                    closeDialog();
                  }}
                />
              </Flex>
              <Grid>{children}</Grid>
            </Grid>
          </Box>
        </Box>
      </StyledDialog>
    );
  }
);

BottomSheet.displayName = "BottomSheet";
