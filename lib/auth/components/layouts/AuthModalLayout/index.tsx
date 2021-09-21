import { PropsWithChildren } from "react";
import { useTheme } from "styled-components";

import { Grid, Text } from "@/common/components/atoms";

type IProps = PropsWithChildren<unknown>;

export default function AuthModalLayout({ children }: IProps): JSX.Element {
  const { space, colors } = useTheme();
  return (
    <Grid
      position="absolute"
      top={0}
      bottom={0}
      right={0}
      left={0}
      gridTemplateColumns="1fr 1fr"
      gridGap={space.xs}
    >
      {children}

      <Grid px={space.xs} py={space.s} bg={colors.black[4]} alignItems="center">
        <Text textStyle="headline6" maxWidth="90%">
          Join live streams, network with like minds & get exclusive access to
          mentors & creators.
        </Text>
      </Grid>
    </Grid>
  );
}
