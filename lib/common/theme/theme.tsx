import { DefaultTheme } from "styled-components";

import * as iconComponents from "@/common/components/atoms/Icon/icons";

import colors from "./colors";

const fontSizes = {
  xxxxs: 4,
  xxxs: 12,
  xxs: 16,
  xs: 20,
  s: 32,
  m: 40,
  l: 60,
  xl: 80,
  xxl: 100,
};

const space = {
  xxxxxs: 4,
  xxxxs: 8,
  xxxs: 12,
  xxs: 16,
  xs: 20,
  s: 44,
  m: 60,
  l: 80,
  xl: 100,
  xxl: 120,
  containerWidth: 1280,
};

const borders = {
  main: "rgba(228, 228, 228, 0.1)",
  input: "#1C1C1E",
  primary: "#1C1C1E",
};

const fonts = {
  heading: "owners-xwide, sans-serif",
  body: "Inter, sans-serif",
};

const radii = {
  xxxxs: 4,
  xxxs: 6,
  xxs: 8,
  xs: 12,
  s: 16,
  m: 24,
};

const zIndices = {
  dropdownContainer: 10,
  dropdownSheet: 4,
  modal: 1000,
  modalHeader: 1001,
  overlay: 990,
  navHeader: 100,
  sliderControls: 5,
  asideNav: 950,
  mobileAsideNav: 1200,
  searchBar: 1000,
};

export const icons = iconComponents;

export const gradients = {
  primary: "linear-gradient(60deg, #4A00E0, #8E2DE2)",
  blue: "linear-gradient(60deg, #0E509D, #116BAD)",
};

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
  gradients: typeof gradients;
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
  gradients,
  zIndices,
};
