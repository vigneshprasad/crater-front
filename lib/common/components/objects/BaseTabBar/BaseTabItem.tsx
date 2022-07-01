import { useTheme } from "styled-components";

import { Text, GridProps, Grid, TextProps } from "../../atoms";

export interface BaseTabItemProps extends GridProps {
  label: string;
  suffixElement?: JSX.Element;
  textProps?: TextProps;
}

export function BaseTabItem({
  label,
  suffixElement,
  textProps,
  ...rest
}: BaseTabItemProps): JSX.Element {
  const { space } = useTheme();
  return (
    <Grid
      px={space.xxxxs}
      gridTemplateColumns="1fr max-content"
      alignItems="center"
      {...rest}
    >
      <Text px={space.xxxxs} textStyle="menu" {...textProps}>
        {label}
      </Text>
      {suffixElement}
    </Grid>
  );
}
