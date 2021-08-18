import NextLink, { LinkProps as NextLinkProps } from "next/link";

export type LinkProps = NextLinkProps;

export const Link: React.FC<LinkProps> = ({ children, ...rest }) => {
  return (
    <NextLink {...rest}>
      <a>{children}</a>
    </NextLink>
  );
};
