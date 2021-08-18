import { HTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { variant, TypographyProps, typography } from "styled-system";

import { theme } from "@/common/theme";

import { Box, BoxProps } from "./Box";

const { fonts, colors } = theme;

const variants = {
  headline3: {
    fontFamily: fonts.heading,
    fontSize: ["4rem"],
    fontWeight: "500",
    lineHeight: ["5.2rem"],
  },
  headline5: {
    fontFamily: fonts.body,
    fontSize: ["2.4rem"],
    fontVariationSettings: `'wght' 500`,
    lineHeight: ["2.6rem"],
  },
  headline6: {
    fontFamily: fonts.body,
    fontSize: ["1.8rem"],
    fontVariationSettings: `'wght' 500`,
  },
  logo: {
    fontFamily: fonts.heading,
    fontSize: ["2.4rem"],
    fontWeight: "500",
  },
  menu: {
    fontFamily: fonts.body,
    fontSize: ["1.4rem"],
    fontVariationSettings: `'wght' 600`,
  },
  title: {
    fontFamily: fonts.body,
    fontSize: ["1.6rem"],
    fontVariationSettings: `'wght' 600`,
    lineHeight: ["1.8rem"],
  },
  body: {
    fontFamily: fonts.body,
    fontSize: ["1.3rem"],
    fontVariationSettings: `'wght' 400`,
  },
  bodyLarge: {
    fontFamily: fonts.body,
    fontSize: ["1.3rem"],
    fontVariationSettings: `'wght' 400`,
  },
  button: {
    fontFamily: fonts.body,
    fontSize: ["1.3rem"],
    fontVariationSettings: `'wght' 600`,
  },
  buttonLarge: {
    fontFamily: fonts.body,
    fontSize: ["1.4rem"],
    fontVariationSettings: `'wght' 400`,
  },
  error: {
    fontFamily: fonts.body,
    fontSize: ["1.3rem"],
    fontVariationSettings: `'wght' 500`,
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
  ${typography}
`;

Text.defaultProps = {
  as: "p",
  textStyle: "bodyLarge",
  singleLine: false,
  color: colors.white[0],
};
