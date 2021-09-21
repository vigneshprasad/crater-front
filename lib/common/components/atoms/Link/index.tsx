import { AnchorHTMLAttributes, PropsWithChildren } from "react";

import NextLink, { LinkProps as NextLinkProps } from "next/link";

import { Box, BoxProps } from "../System/Box";

export type LinkProps = PropsWithChildren<NextLinkProps> & {
  boxProps?: BoxProps & AnchorHTMLAttributes<HTMLAnchorElement>;
};

export function Link({
  children,
  boxProps,
  passHref = true,
  ...rest
}: LinkProps): JSX.Element {
  return (
    <NextLink passHref={passHref} {...rest}>
      <Box as="a" {...boxProps}>
        {children}
      </Box>
    </NextLink>
  );
}
