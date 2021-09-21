import { PropsWithChildren } from "react";
import { useTheme } from "styled-components";

import { Grid, Text } from "@/common/components/atoms";

type IProps = PropsWithChildren<unknown>;

export default function AuthModalLayout({ children }: IProps): JSX.Element {
  const { space, colors } = useTheme();
  return (
    <Grid gridTemplateColumns="1fr 1fr" gridGap={space.xs}>
      {children}

      <Grid
        px={space.xs}
        py={space.s}
        bg={colors.accent}
        gridAutoFlow="row"
        gridAutoRows="max-content"
        gridRowGap={[space.xxs]}
      >
        <Text textStyle="headline4" maxWidth="90%">
          Rebuilding social-professional networks
        </Text>

        <Grid gridAutoFlow="row" gridRowGap={[space.xs]}>
          <Text textStyle="title">For us</Text>
          <Text>
            1. Join a club <br />
            2. Expore live content <br />
            3. Network with the community <br />
            4. Trade social tokens for exclusive access
          </Text>
        </Grid>

        <Grid gridAutoFlow="row" gridRowGap={[space.xs]}>
          <Text textStyle="title">Creators & mentors</Text>
          <Text>
            1. Join a club <br />
            2. Expore live content <br />
            3. Network with the community <br />
            4. Trade social tokens for exclusive access
          </Text>
        </Grid>
      </Grid>
    </Grid>
  );
}
