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
  containerWidth: 1280,
};

const borders = {
  main: "rgba(228, 228, 228, 0.1)",
};

const fonts = {
  heading: "Roobert, sans-serif",
  body: "Roobert, sans-serif",
};

const radii = {
  xxxs: 4,
  xxs: 8,
  xs: 12,
  s: 16,
  m: 24,
};

const zIndices = {
  dropdownContainer: 10,
  dropdownSheet: 4,
  modal: 1000,
  overlay: 900,
  navHeader: 100,
  sliderControls: 5,
  asideNav: 950,
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
  zIndices: typeof zIndices;
}

export const theme: DefaultTheme = {
  breakpoints: ["600px", "768px", "889px", "1200px"],
  fontSizes,
  space,
  borders,
  fonts,
  colors,
  radii,
  outline: `5px auto #52bcdf`,
  zIndices,
};
