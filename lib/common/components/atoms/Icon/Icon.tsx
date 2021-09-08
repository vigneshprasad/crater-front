import * as CSS from "csstype";
import styled from "styled-components";

import { IconOptions, icons } from "@/common/theme";

import { Box, BoxProps } from "../System";

export type IconProps = Omit<BoxProps, "width" | "height"> & {
  icon: IconOptions;
  color?: CSS.Property.Color;
  size?: number | number[];
};

const StyledIconWrapper = styled(Box)<BoxProps & { rotate?: number }>`
  transition: transform 0.2s ease-in-out;
  ${(props) => props.rotate && `transform: rotate(${props.rotate}deg);`};
  display: flex;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
`;

export function Icon({ icon, color, size, ...rest }: IconProps): JSX.Element {
  const IconComponent = icons[icon];
  return (
    <StyledIconWrapper
      width={size || 24}
      height={size || 24}
      color={color}
      {...rest}
    >
      <IconComponent
        role="presentation"
        aria-hidden="true"
        focusable="false"
        style={{
          fill: "currentcolor",
        }}
        width="100%"
        height="100%"
      />
    </StyledIconWrapper>
  );
}
