import { DefaultTheme } from "styled-components";

import * as iconComponents from "@/common/components/atoms/Icon/icons";

import colors from "./colors";

const fontSizes = {
  xxxxs: 4,
  xxxs: 12,
  xxs: 16,
  xs: 20,
  s: 30,
  m: 40,
  l: 60,
  xl: 80,
  xxl: 100,
};

const space = {
  xxxs: 8,
  xxs: 16,
  xs: 24,
  s: 40,
  m: 60,
  l: 80,
  xl: 100,
  xxl: 120,
};

const borders = {
  main: "rgba(228, 228, 228, 0.1)",
};

const fonts = {
  heading: "Poppins, sans-serif",
  body: "Inter",
};

const radii = {
  xxs: 8,
  xs: 12,
  s: 16,
  m: 24,
};

export const icons = iconComponents;

export type IconOptions = keyof typeof icons;

export interface CustomTheme {
  breakpoints: string[];
  fontSizes: typeof fontSizes;
  borders: typeof borders;
  space: typeof space;
  fonts: typeof fonts;
  colors: typeof colors;
  radii: typeof radii;
  outline?: string;
}

export const theme: DefaultTheme = {
  breakpoints: ["40em", "52em", "64em", "80em"],
  fontSizes,
  space,
  borders,
  fonts,
  colors,
  radii,
  outline: `5px auto #52bcdf`,
};
