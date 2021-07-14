import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    margins: {
      sm: string | number;
      med: string | number;
      lg: string | number;
      xl: string | number;
    };
    pallete: {
      primary: string;
      dark: string;
      secondaryDark: string;
      darkCard: string;
      textPrimary: string;
      textSecondary: string;
      textTertiary: string;
    };
    textThemes: {
      display1: FlattenInterpolation;
      display2: FlattenInterpolation;
      display3: FlattenInterpolation;
      headline1: FlattenInterpolation;
      headline2: FlattenInterpolation;
      headline3: FlattenInterpolation;
      headline4: FlattenInterpolation;
      headline5: FlattenInterpolation;
      headline6: FlattenInterpolation;
      menu: FlattenInterpolation;
      title: FlattenInterpolation;
      caption: FlattenInterpolation;
      captionSmall: FlattenInterpolation;
      body: FlattenInterpolation;
      bodySmall: FlattenInterpolation;
      button: FlattenInterpolation;
      buttonSmall: FlattenInterpolation;
    };
  }
}
