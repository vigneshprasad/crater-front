import * as CSS from "csstype";
import styled, { useTheme } from "styled-components";

import { IconOptions, icons } from "@/common/theme";

import { Box, BoxProps } from "../System";

export type IconProps = Omit<BoxProps, "width" | "height"> & {
  icon: IconOptions;
  color?: CSS.Property.Color;
  size?: number | number[];
  fill?: boolean;
};

const StyledIconWrapper = styled(Box)<BoxProps & { rotate?: number }>`
  transition: transform 0.2s ease-in-out;
  ${(props) => props.rotate && `transform: rotate(${props.rotate}deg);`};
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
`;

export function Icon({
  icon,
  color,
  size,
  fill,
  ...rest
}: IconProps): JSX.Element {
  const { colors } = useTheme();
  const IconComponent = icons[icon];
  return (
    <StyledIconWrapper
      width={size || 24}
      height={size || 24}
      color={color ?? colors.iconColor}
      {...rest}
    >
      <IconComponent
        role="presentation"
        aria-hidden="true"
        focusable="false"
        style={{
          fill: fill ? "currentcolor" : undefined,
        }}
        width="100%"
        height="100%"
      />
    </StyledIconWrapper>
  );
}
