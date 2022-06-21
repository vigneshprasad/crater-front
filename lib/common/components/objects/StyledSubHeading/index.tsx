import { useTheme } from "styled-components";

import { Flex, Text } from "../../atoms";

interface IProps {
  label: string | React.ReactNode;
}

export default function StyledSubHeading({ label }: IProps): JSX.Element {
  const { fonts, space } = useTheme();
  return (
    <Flex borderBottom="1px solid #EDEDED" py={space.xxxxs}>
      <Text fontFamily={fonts.heading}>{label}</Text>
    </Flex>
  );
}
