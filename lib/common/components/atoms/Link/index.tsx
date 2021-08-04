import NextLink, { LinkProps } from "next/link";

type Props = LinkProps;

const Link: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <NextLink {...rest}>
      <a>{children}</a>
    </NextLink>
  );
};

export default Link;
