import { useTheme } from "styled-components";

import { Box, BoxProps } from "../System";

export default function GlassBox({ children, ...rest }: BoxProps): JSX.Element {
  const { radii } = useTheme();

  return (
    <Box
      bg="rgba(0, 0, 0, 0.36)"
      style={{ backdropFilter: "blur(12px)" }}
      borderRadius={radii.xxs}
      {...rest}
    >
      {children}
    </Box>
  );
}
