import NextLink, { LinkProps } from "next/link";

type Props = LinkProps;

const Link: React.FC<Props> = ({ children, ...rest }) => {
  return <NextLink {...rest}>{children}</NextLink>;
};

export default Link;
