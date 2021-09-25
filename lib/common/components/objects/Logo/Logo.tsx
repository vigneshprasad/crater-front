import LOGO from "public/images/logo.png";

import Image from "next/image";

import { theme } from "@/common/theme";

import { Box, Grid, Text, GridProps } from "../../atoms";

export type ILogoProps = GridProps & {
  withText?: boolean;
};

export function Logo({
  withText = false,
  onClick,
  ...rest
}: ILogoProps): JSX.Element {
  const { space, colors } = theme;
  return (
    <Grid
      gridTemplateColumns={["32px max-content"]}
      alignItems="center"
      gridGap={[space.xxxs, space.xxs]}
      cursor={onClick ? "pointer" : "auto"}
      onClick={onClick}
      {...rest}
    >
      <Image src={LOGO} alt="Crater" />
      {withText && (
        <Grid
          gridAutoFlow="column"
          alignItems="center"
          gridGap={[space.xxxs, space.xxs]}
        >
          <Text textStyle="logo">Crater</Text>
          <Box w={1} h="40%" bg={colors.slate} />
          <Text
            display={["none", "block"]}
            color={colors.slate}
            textStyle="caption"
          >
            Formerly WorkNetwork
          </Text>
        </Grid>
      )}
    </Grid>
  );
}
