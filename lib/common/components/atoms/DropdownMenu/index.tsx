import { Box } from "..";

interface IProps {
  button: React.ReactNode;
}

export default function DropdownMenu({ button }: IProps): JSX.Element {
  return <Box>{button}</Box>;
}
