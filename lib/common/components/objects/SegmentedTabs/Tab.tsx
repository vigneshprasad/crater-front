import styled, { useTheme } from "styled-components";
import { variant } from "styled-system";

import { Flex, Text } from "../../atoms";

const variants = {
  initial: {
    borderRadius: "4px 0 0 4px",
  },
  middle: {
    borderRadius: "0",
  },
  end: {
    borderRadius: "0 4px 4px 0",
  },
};

type Variants = keyof typeof variants;

interface IProps {
  label: string;
  variant: Variants;
  active: boolean;
  onClick?: () => void;
}

const Container = styled(Flex)`
  ${variant({
    prop: "variant",
    variants,
  })}
`;

export default function Tab({
  label,
  variant,
  active,
  onClick,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();
  return (
    <Container
      cursor="pointer"
      flex="1"
      alignItems="center"
      justifyContent="center"
      variant={variant}
      px={space.xxxs}
      py={space.xxxxs}
      border={`1px solid ${active ? colors.accent : colors.secondaryLight}`}
      bg={active ? colors.accent : "transparent"}
      onClick={onClick}
    >
      <Text textStyle="segmentedTabTitle">{label}</Text>
    </Container>
  );
}
