import { forwardRef } from "react";
import { useTheme } from "styled-components";

import useMediaQuery from "@/common/hooks/ui/useMediaQuery";

import { Box, BoxProps } from "../../atoms";
import { BottomSheet } from "../../atoms/v2";

type IProps = BoxProps & {
  visible: boolean;
  heading?: string;
  children?: React.ReactNode | undefined;
};

const MobileBottomSheet = forwardRef<HTMLDialogElement, IProps>(
  ({ heading, children, ...rest }, ref) => {
    const { breakpoints } = useTheme();
    const { matches: isMobile } = useMediaQuery(
      `(max-width: ${breakpoints[0]})`
    );

    if (isMobile) {
      return (
        <BottomSheet
          heading={heading}
          ref={ref}
          h="50vh"
          dialogProps={{ backdropColor: "transparent" }}
          {...rest}
        >
          {children}
        </BottomSheet>
      );
    }

    return (
      <Box {...rest} h="100%">
        {children}
      </Box>
    );
  }
);

MobileBottomSheet.displayName = "MobileBottomSheet";

export default MobileBottomSheet;
