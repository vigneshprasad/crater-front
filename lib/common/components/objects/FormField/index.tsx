import { PropsWithChildren } from "react";
import { useTheme } from "styled-components";

import { Box, Grid, GridProps, Text } from "../../atoms";

type IProps = PropsWithChildren<{
  label: string | React.ReactNode;
  subtext?: string;
  border?: boolean;
}> &
  Omit<GridProps, "border">;

export default function FormField({
  label,
  subtext,
  children,
  border = true,
  ...rest
}: IProps): JSX.Element {
  const { space, colors } = useTheme();
  return (
    <Grid
      borderBottom={border ? "1px solid rgba(228,228,228,0.1)" : "none"}
      py={space.xxs}
      gridTemplateColumns="max-content 1fr"
      alignItems="start"
      {...rest}
    >
      <Box>
        {(() => {
          if (typeof label === "string")
            return <Text textStyle="menu">{label}</Text>;
          return label;
        })()}

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
