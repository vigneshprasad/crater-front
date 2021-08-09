import { Scroll, ScrollProps } from "../../atoms";

type Props = ScrollProps;

const BaseLayout: React.FC<Props> = ({ children, ...rest }) => {
  return <Scroll {...rest}>{children}</Scroll>;
};

export default BaseLayout;
