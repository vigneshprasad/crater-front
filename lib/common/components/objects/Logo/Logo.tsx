import { theme } from "@/common/theme";

import { Grid, Text } from "../../atoms";
import { Icon } from "../../atoms/Icon";

export type ILogoProps = {
  withText?: boolean;
};

export const Logo = ({ withText = false }: ILogoProps) => {
  const { space } = theme;
  return (
    <Grid gridTemplateColumns={["48px max-content"]}>
      <Icon size={48} icon="Logo" />
      {withText && (
        <Text ml={[space.xxxs]} textStyle="logo" m="auto auto">
          Crater.Club
        </Text>
      )}
    </Grid>
  );
};
