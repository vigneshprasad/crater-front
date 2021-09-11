import { theme } from "@/common/theme";

import { Grid, GridProps, Text } from "../../atoms";
import { Icon } from "../../atoms/Icon";

export type ILogoProps = GridProps & {
  withText?: boolean;
};

export function Logo({ withText = false, ...rest }: ILogoProps): JSX.Element {
  const { space } = theme;
  return (
    <Grid gridTemplateColumns={["48px max-content"]} {...rest}>
      <Icon size={48} icon="Logo" />
      {withText && (
        <Text ml={[space.xxxs]} textStyle="logo" m="auto auto">
          Crater.Club
        </Text>
      )}
    </Grid>
  );
}
