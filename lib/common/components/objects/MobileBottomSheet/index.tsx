import { useTheme } from "styled-components";

import useMediaQuery from "@/common/hooks/ui/useMediaQuery";

import { BottomSheet, Box, BoxProps } from "../../atoms";

type IProps = BoxProps & {
  visible: boolean;
  onClose: () => void;
  heading?: string;
  children?: React.ReactNode | undefined;
  overlayColor?: string;
};

export default function MobileBottomSheet({
  visible,
  onClose,
  heading,
  children,
  overlayColor,
  ...rest
}: IProps): JSX.Element | null {
  const { breakpoints } = useTheme();
  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

  if (isMobile === undefined) return null;

  if (isMobile) {
    return (
      <BottomSheet
        withIndicator={false}
        visible={visible}
        onClose={onClose}
        heading={heading}
        overlayColor={overlayColor}
        minHeight="55vh"
        maxHeight="55vh"
        px={0}
      >
        <Box {...rest}>{children}</Box>
      </BottomSheet>
    );
  }

  return <Box {...rest}>{children}</Box>;
}
