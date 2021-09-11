import { theme } from "@/common/theme";

import { Grid, Text, GridProps } from "../../atoms";
import { Icon } from "../../atoms/Icon";

export type ILogoProps = GridProps & {
  withText?: boolean;
};

export function Logo({
  withText = false,
  onClick,
  ...rest
}: ILogoProps): JSX.Element {
  const { space } = theme;
  return (
    <Grid
      gridTemplateColumns={["32px max-content"]}
      alignItems="center"
      gridGap={space.xxxs}
      cursor={onClick ? "pointer" : "auto"}
      onClick={onClick}
      {...rest}
    >
      <Icon size={32} icon="Logo" />
      {withText && (
        <Text ml={[space.xxxs]} textStyle="logo" m="auto auto">
          Crater.Club
        </Text>
      )}
    </Grid>
  );
}
