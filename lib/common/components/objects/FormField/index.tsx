import { PropsWithChildren } from "react";
import { useTheme } from "styled-components";

import { Box, Grid, Text } from "../../atoms";

type IProps = PropsWithChildren<{
  label: string;
  subtext?: string;
  border?: boolean;
}>;

export default function FormField({
  label,
  subtext,
  children,
  border = true,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();
  return (
    <Grid
      borderBottom={border ? "1px solid rgba(228,228,228,0.1)" : "none"}
      py={space.xs}
      gridTemplateColumns="1fr 3fr"
      alignItems="start"
    >
      <Box>
        <Text textStyle="menu">{label}</Text>
        {subtext && (
          <Text color={colors.slate} textStyle="body">
            {subtext}
          </Text>
        )}
      </Box>

      {children}
    </Grid>
  );
}
