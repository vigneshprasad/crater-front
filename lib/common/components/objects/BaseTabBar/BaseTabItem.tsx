import { useTheme } from "styled-components";

import { Text, TextProps } from "../../atoms";

export interface BaseTabItemProps extends TextProps {
  label: string;
}

export function BaseTabItem({ label, ...rest }: BaseTabItemProps): JSX.Element {
  const { space } = useTheme();
  return (
    <Text px={space.xxxs} textStyle="menu" {...rest}>
      {label}
    </Text>
  );
}
