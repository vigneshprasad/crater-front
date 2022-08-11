import { useMemo } from "react";
import styled from "styled-components";
import { variant } from "styled-system";

import { Icon, IconProps } from "../../Icon";
import { Button, ButtonProps } from "../Button";

type Variants = "flat" | "flat-icon" | "flat-accent" | "round-large" | "round";

interface IProps extends ButtonProps {
  icon: IconProps["icon"];
  iconProps?: Omit<IconProps, "icon">;
  buttonStyle?: Variants;
}

const ButtonContainer = styled(Button)<ButtonProps>`
  ${variant({
    prop: "buttonStyle",
    variants: {
      "flat-icon": {
        px: 0,
        py: 0,
        bg: "transparent",
        color: "#9191AA",
        ":hover": {
          color: "accentLight",
          bg: "transparent",
        },
      },
      flat: {
        w: 28,
        h: 28,
        px: "0.2em",
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        bg: "transparent",
        ":hover": {
          bg: "rgba(255, 255, 255, 0.2)",
        },
      },
      "flat-accent": {
        w: 28,
        h: 28,
        px: "0.2em",
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        ":hover": {
          bg: "accentHover",
        },
      },
      "round-large": {
        w: 40,
        h: 40,
        borderRadius: "50%",
        alignItems: "center",
        justifyContent: "center",
        bg: "primaryLight",
        ":hover": {
          bg: "black.0",
        },
      },
      round: {
        width: 36,
        height: 36,
        px: 0,
        py: 0,
        borderRadius: "50%",
        alignItems: "center",
        justifyContent: "center",
        bg: "transparent",
        ":hover": {
          bg: "primaryBackground",
        },
        ":disabled": {
          bg: "transparent",
          cursor: "not-allowed",
        },
      },
    },
  })}
`;

export function IconButton({ icon, iconProps, ...rest }: IProps): JSX.Element {
  const restIconProps = useMemo(() => {
    if (rest.buttonStyle === "flat" || rest.buttonStyle === "flat-accent") {
      return {
        size: 20,
        iconProps,
        ...iconProps,
      };
    }

    return {
      ...iconProps,
    };
  }, [rest, iconProps]);

  return (
    <ButtonContainer display="flex" variant="iconButton" {...rest}>
      <Icon color="inherit" icon={icon} {...restIconProps} />
    </ButtonContainer>
  );
}

IconButton.defaultProps = {
  buttonStyle: "flat",
  type: "button",
};
