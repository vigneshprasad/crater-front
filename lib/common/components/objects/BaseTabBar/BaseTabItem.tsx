import { useTheme } from "styled-components";

import { Text, GridProps, Grid } from "../../atoms";

export interface BaseTabItemProps extends GridProps {
  label: string;
  suffixElement?: JSX.Element;
}

export function BaseTabItem({
  label,
  suffixElement,
  ...rest
}: BaseTabItemProps): JSX.Element {
  const { space } = useTheme();
  return (
    <Grid gridTemplateColumns="1fr max-content" alignItems="center" {...rest}>
      <Text px={space.xxxs} textStyle="menu">
        {label}
      </Text>
      {suffixElement}
    </Grid>
  );
}
