import { useTheme } from "styled-components";

import { Box, BoxProps } from "../System/Box";

export type CardProps = BoxProps & {
  footer?: React.ReactNode;
};

export function Card({ children, footer, ...rest }: CardProps): JSX.Element {
  const { space, colors, radii } = useTheme();
  return (
    <Box borderRadius={radii.xxs} bg={colors.black[3]} {...rest}>
      <Box px={[space.xs, space.xs]} py={space.xs}>
        {children}
      </Box>
      {footer}
    </Box>
  );
}
