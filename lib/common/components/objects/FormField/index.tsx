import { PropsWithChildren } from "react";
import { useTheme } from "styled-components";

import { Box, Grid, GridProps, Span, Text, TextProps } from "../../atoms";

type IProps = PropsWithChildren<{
  label: string | React.ReactNode;
  subtext?: string;
  border?: boolean;
  required?: boolean;
  labelProps?: TextProps;
  subTextProps?: TextProps;
}> &
  Omit<GridProps, "border">;

export default function FormField({
  label,
  subtext,
  children,
  labelProps,
  subTextProps,
  border = true,
  required = false,
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
            return (
              <>
                <Text textStyle="menu" {...labelProps}>
                  {label}
                  {required ? (
                    <Span
                      color={colors.accent}
                      mx={space.xxxxxs}
                      fontSize="1.4rem"
                    >
                      *
                    </Span>
                  ) : undefined}
                </Text>
              </>
            );
          return label;
        })()}

        {subtext && (
          <Text
            color={colors.textTertiary}
            mt={space.xxxxxs}
            textStyle="small"
            {...subTextProps}
          >
            {subtext}
          </Text>
        )}
      </Box>

      {children}
    </Grid>
  );
}
