import { theme } from "@/common/theme";

import { Grid, GridProps, Icon } from "../../atoms";

export type ILogoProps = GridProps & {
  withText?: boolean;
};

export function Logo({ onClick, ...rest }: ILogoProps): JSX.Element {
  const { space } = theme;
  return (
    <Grid
      gridTemplateColumns={["max-content"]}
      alignItems="center"
      gridGap={[space.xxxs, space.xxs]}
      cursor={onClick ? "pointer" : "auto"}
      onClick={onClick}
      {...rest}
    >
      <Icon icon="Logo" h={32} w={124} />
    </Grid>
  );
}
