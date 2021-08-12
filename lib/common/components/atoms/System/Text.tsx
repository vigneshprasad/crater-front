import { HTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { variant, TypographyProps } from "styled-system";

import { theme } from "@/common/theme";

import { Box, BoxProps } from "./Box";

const { fonts, colors } = theme;

const variants = {
  headline3: {
    fontFamily: fonts.heading,
    fontSize: ["4rem"],
    fontWeight: "500",
    lineHeight: ["5.2rem"],
    color: colors.white[0],
  },
  headline5: {
    fontFamily: fonts.heading,
    fontSize: ["2.4rem"],
    fontWeight: "500",
    color: colors.white[0],
  },
  headline6: {
    fontFamily: fonts.heading,
    fontSize: ["1.8rem"],
    fontWeight: "500",
    color: colors.white[0],
  },
  logo: {
    fontFamily: fonts.heading,
    fontSize: ["2.4rem"],
    fontWeight: "500",
    color: colors.white[0],
  },
  menu: {
    fontFamily: fonts.body,
    fontSize: ["1.4rem"],
    fontVariationSettings: `'wght' 600`,
    color: colors.white[0],
  },
  body: {
    fontFamily: fonts.body,
    fontSize: ["1.3rem"],
    fontVariationSettings: `'wght' 400`,
    color: colors.white[0],
  },
  bodyLarge: {
    fontFamily: fonts.body,
    fontSize: ["1.3rem"],
    fontVariationSettings: `'wght' 700`,
    color: colors.white[0],
  },
  button: {
    fontFamily: fonts.body,
    fontSize: ["1.3rem"],
    color: colors.white[0],
    fontVariationSettings: `'wght' 600`,
  },
  buttonLarge: {
    fontFamily: fonts.body,
    fontSize: ["1.4rem"],
    fontVariationSettings: `'wght' 400`,
    color: colors.white[0],
  },
  error: {
    fontFamily: fonts.body,
    fontSize: ["1.3rem"],
    fontVariationSettings: `'wght' 500`,
    color: colors.error,
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
