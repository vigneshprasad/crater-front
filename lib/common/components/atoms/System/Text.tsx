import { HTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { variant, TypographyProps } from "styled-system";

import { theme } from "@/common/theme";

import { Box, BoxProps } from "./Box";

const { fonts } = theme;

const variants = {
  headline3: {
    fontFamily: fonts.heading,
    fontSize: ["4rem"],
    fontWeight: "500",
  },
  headline5: {
    fontFamily: fonts.heading,
    fontSize: ["2.4rem"],
    fontWeight: "500",
  },
  menu: {
    fontFamily: fonts.body,
    fontSize: ["1.4rem"],
    fontWeight: "600",
  },
  body: {
    fontFamily: fonts.body,
    fontSize: ["1.3rem"],
    fontWeight: "400",
  },
  bodyLarge: {
    fontFamily: fonts.body,
    fontSize: ["1.3rem"],
    fontWeight: "400",
  },
  buttonLarge: {
    fontFamily: fonts.body,
    fontSize: ["1.3rem"],
    fontWeight: "400",
  },
};

export type TextVariants = keyof typeof variants;

export type TextProps = BoxProps &
  TypographyProps &
  HTMLAttributes<HTMLParagraphElement> &
  HTMLAttributes<HTMLLabelElement> & {
    as?:
      | "p"
      | "small"
      | "strong"
      | "em"
      | "span"
      | "h1"
      | "h2"
      | "h3"
      | "h4"
      | "h5"
      | "h6"
      | "label";
    target?: string;
    singleLine?: boolean;
    textStyle?: TextVariants;
  };

export const Text = styled(Box)<TextProps>`
  ${variant({
    prop: "textStyle",
    variants,
  })}

  ${({ singleLine }) =>
    singleLine &&
    css`
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `}
`;

Text.defaultProps = {
  as: "p",
  textStyle: "bodyLarge",
  singleLine: false,
};
