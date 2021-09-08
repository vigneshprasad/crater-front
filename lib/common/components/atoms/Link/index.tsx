import { PropsWithChildren } from "react";

import NextLink, { LinkProps as NextLinkProps } from "next/link";

export type LinkProps = PropsWithChildren<NextLinkProps>;

export function Link({ children, ...rest }: LinkProps): JSX.Element {
  return (
    <NextLink {...rest}>
      <a>{children}</a>
    </NextLink>
  );
}
