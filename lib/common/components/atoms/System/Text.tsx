import * as CSS from "csstype";
import styled, { css, DefaultTheme } from "styled-components";
import {
  variant,
  TypographyProps,
  typography,
  style,
  ResponsiveValue,
} from "styled-system";

import { theme } from "@/common/theme";

import { Box, BoxProps } from "./Box";

const { fonts } = theme;

const variants = {
  headline3Bold: {
    fontFamily: fonts.heading,
    fontSize: ["3.2rem", "4rem"],
    fontWeight: "700",
    lineHeight: ["5.2rem"],
  },
  headline1: {
    fontFamily: fonts.body,
    fontSize: "4.2rem",
    fontWeight: "200",
    lineHeight: ["5.6rem"],
  },
  headline2: {
    fontFamily: fonts.body,
    fontSize: "3.4rem",
    fontWeight: "200",
    lineHeight: ["4.8rem"],
  },
  headline3: {
    fontFamily: fonts.heading,
    fontSize: ["3.2rem", "4rem"],
    fontWeight: "500",
    lineHeight: ["5.2rem"],
  },
  headline4: {
    fontFamily: fonts.heading,
    fontSize: ["3.2rem"],
    fontWeight: "600",
    lineHeight: ["4rem"],
  },
  headline5: {
    fontFamily: fonts.body,
    fontSize: ["1.8rem", "2.4rem"],
    fontWeight: "500",
    lineHeight: ["3.6rem"],
  },
  headline6: {
    fontFamily: fonts.body,
    fontSize: ["1.8rem"],
    fontWeight: "600",
    lineHeight: ["2.8rem"],
  },
  headlineBold: {
    fontFamily: fonts.body,
    fontSize: ["1.8rem"],
    fontWeight: "700",
  },
  logo: {
    fontFamily: fonts.heading,
    fontSize: ["2.2rem"],
    fontWeight: "500",
  },
  menu: {
    fontFamily: fonts.body,
    fontSize: ["1.4rem"],
    fontWeight: "600",
  },
  title: {
    fontFamily: fonts.body,
    fontSize: ["1.6rem"],
    fontWeight: "500",
    lineHeight: ["2.2rem"],
  },
  caption: {
    fontFamily: fonts.body,
    fontSize: ["1.2rem"],
    fontWeight: "500",
    lineHeight: ["2.2rem"],
  },
  captionLarge: {
    fontFamily: fonts.body,
    fontSize: ["1.4rem"],
    fontWeight: "500",
    lineHeight: ["1.8rem"],
  },
  body: {
    fontFamily: fonts.body,
    fontSize: ["1.4rem"],
    fontWeight: "400",
    lineHeight: ["2.0rem"],
  },
  bodyLarge: {
    fontFamily: fonts.body,
    fontSize: ["1.5rem"],
    fontWeight: "500",
    lineHeight: ["2.4rem"],
  },
  button: {
    fontFamily: fonts.body,
    fontSize: ["1.4rem"],
    fontWeight: "500",
  },
  buttonLarge: {
    fontFamily: fonts.body,
    fontSize: ["1.5rem"],
    fontWeight: "600",
  },
  error: {
    fontFamily: fonts.body,
    fontSize: ["1.3rem"],
    fontWeight: "500",
  },
  placeholder: {
    fontFamily: fonts.body,
    fontSize: ["1.1rem"],
    fontWeight: "700",
    textTransform: "uppercase",
  },
  termsConditions: {
    fontFamily: fonts.body,
    lineHeight: ["1.2rem"],
    fontSize: ["1rem"],
  },
  label: {
    fontFamily: fonts.body,
    lineHeight: ["2.2rem"],
    fontSize: ["1.4rem"],
    fontWeight: "600",
  },
  small: {
    fontFamily: fonts.body,
    lineHeight: ["1.8rem"],
    fontSize: ["1rem"],
  },
  dropdownItem: {
    fontFamily: fonts.body,
    lineHeight: ["1.8rem"],
    fontSize: ["1.3rem"],
    fontWeight: "600",
  },
  breadCrumb: {
    fontFamily: fonts.body,
    lineHeight: ["2.2rem"],
    fontSize: ["1.8rem"],
    fontWeight: "400",
  },
  tableHeader: {
    fontFamily: fonts.body,
    lineHeight: ["2.0rem"],
    fontSize: ["1.4rem"],
    fontWeight: "600",
  },
  tableBody: {
    fontFamily: fonts.body,
    lineHeight: ["2.0rem"],
    fontSize: ["1.6rem"],
    fontWeight: "400",
  },
  categoryFilter: {
    fontFamily: fonts.body,
    fontSize: ["1.5rem", "2rem"],
    fontWeight: "600",
  },
  chatText: {
    fontFamily: fonts.body,
    fontSize: ["1.3rem", "1.4rem"],
    fontWeight: "500",
    lineHeight: ["2.4rem"],
  },
  tabLabel: {
    fontFamily: fonts.body,
    fontSize: ["1.3rem"],
    fontWeight: "600",
  },
  cardHeader: {
    fontFamily: fonts.body,
    fontSize: ["1.2rem"],
    fontWeight: "600",
    lineHeight: ["2.2rem"],
    textTransform: "uppercase",
  },
  mainHeading: {
    fontFamily: fonts.heading,
    fontSize: "2.4rem",
    fontWeight: "500",
    lineHeight: "3.3rem",
    background:
      "linear-gradient(90.47deg, #d5bbff 17.58%, #9db3ff 60.39%, #0d849e 85.38%)",
    backgroundClip: "text",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    textFillColor: "transparent",
    textShadow: "0px 0px 28px rgba(136, 46, 232, 0.8)",
  },
  navbarLabel: {
    fontFamily: fonts.body,
    fontSize: ["1rem"],
    fontWeight: "600",
    lineHeight: ["1.3rem"],
  },
  segmentedTabTitle: {
    fontFamily: fonts.body,
    fontSize: ["1.2rem"],
    fontWeight: "600",
    lineHeight: ["1.7rem"],
  },
  inputLabel: {
    fontFamily: fonts.body,
    fontSize: ["1rem"],
    fontWeight: "600",
    lineHeight: ["1.2rem"],
    textTransform: "uppercase",
  },
  notificationTitle: {
    fontFamily: fonts.body,
    fontSize: ["1.4rem"],
    fontWeight: "500",
    lineHeight: ["2.1rem"],
  },
  notificationDesc: {
    fontFamily: fonts.body,
    fontSize: ["1.2rem"],
    fontWeight: "500",
    lineHeight: ["1.8rem"],
  },
  gradientHeading: {
    fontFamily: fonts.heading,
    fontSize: ["2.0rem", "3.6rem"],
    fontWeight: "500",
    lineHeight: ["3.0rem", "5.4rem"],
    letterSpacing: "0.03em",
    background: "linear-gradient(65.32deg, #F1616A, #9146FF, #9DB3FF, #0D849E)",
    backgroundClip: "text",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
    textFillColor: "transparent",
  },
  formLabel: {
    fontFamily: fonts.body,
    fontSize: "2.0rem",
    fontWeight: "600",
    lineHeight: "2.4rem",
  },
};

export type TextVariants = keyof typeof variants;

export type TextProps = BoxProps &
  TypographyProps &
  React.HTMLAttributes<HTMLParagraphElement> &
  React.HTMLAttributes<HTMLLabelElement> & {
    as?:
      | "div"
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
      | "span"
      | "label";
    target?: string;
    singleLine?: boolean;
    maxLines?: number;
    textStyle?: TextVariants;
    textOverflow?: ResponsiveValue<CSS.Property.TextOverflow, DefaultTheme>;
    whiteSpace?: ResponsiveValue<CSS.Property.WhiteSpace, DefaultTheme>;
  };

const textOverflow = style({
  prop: "textOverflow",
  cssProperty: "text-overflow",
});

const whiteSpace = style({
  prop: "whiteSpace",
  cssProperty: "white-space",
});

export const Text = styled(Box)<TextProps>`
  font-smooth: antialiased;
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
    ${({ maxLines }) =>
    maxLines &&
    css`
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: ${maxLines};
      -webkit-box-orient: vertical;
    `}
    ${whiteSpace} 
    ${textOverflow} 
    ${typography}
`;

Text.defaultProps = {
  as: "p",
  textStyle: "bodyLarge",
  singleLine: false,
  color: "textPrimary",
};
