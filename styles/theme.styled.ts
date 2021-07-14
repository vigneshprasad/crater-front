import { css, DefaultTheme } from "styled-components";

const withInterFont = ({
  fontSize,
  fontWeight,
  color,
}: {
  fontSize: string;
  fontWeight: string;
  color?: string;
}) => css`
  font-size: ${fontSize};
  font-family: "Inter";
  font-weight: ${fontWeight};
  ${color && `color: ${color}`}
`;

const withPoppinsFont = ({
  fontSize,
  fontWeight,
  color,
}: {
  fontSize: string;
  fontWeight: string;
  color?: string;
}) => css`
  font-size: ${fontSize};
  font-family: "Poppins";
  font-weight: ${fontWeight};
  ${color && `color: ${color}`}
`;

export const darkTheme: DefaultTheme = {
  margins: {
    sm: "8px",
    med: "16px",
    lg: "24px",
    xl: "32px",
  },
  pallete: {
    primary: "#355DFF",
    dark: "#1B1D21",
    secondaryDark: "#1F2128",
    textPrimary: "#FFFFFF",
    textSecondary: "#E4E4E4",
    darkCard: "#242731",
    textTertiary: "#808191",
  },
  textThemes: {
    display1: css`
      ${withPoppinsFont({
        fontSize: "9.6rem",
        fontWeight: "700",
      })}
      color: ${(props) => props.theme.pallete.textPrimary};
    `,
    display2: css`
      ${withPoppinsFont({
        fontSize: "7.2rem",
        fontWeight: "700",
      })}
      color: ${(props) => props.theme.pallete.textPrimary};
    `,
    display3: css`
      ${withPoppinsFont({
        fontSize: "6.4rem",
        fontWeight: "700",
      })}
      color: ${(props) => props.theme.pallete.textPrimary};
    `,
    headline1: css`
      ${withPoppinsFont({
        fontSize: "5.6rem",
        fontWeight: "700",
      })}
      color: ${(props) => props.theme.pallete.textPrimary};
    `,
    headline2: css`
      ${withPoppinsFont({
        fontSize: "4.8rem",
        fontWeight: "700",
      })}
      color: ${(props) => props.theme.pallete.textPrimary};
    `,
    headline3: css`
      ${withPoppinsFont({
        fontSize: "4.0rem",
        fontWeight: "600",
      })}
      color: ${(props) => props.theme.pallete.textPrimary};
    `,
    headline4: css`
      ${withPoppinsFont({
        fontSize: "3.2rem",
        fontWeight: "500",
      })}
      color: ${(props) => props.theme.pallete.textPrimary};
    `,
    headline5: css`
      ${withPoppinsFont({
        fontSize: "2.4rem",
        fontWeight: "500",
      })}
      color: ${(props) => props.theme.pallete.textPrimary};
    `,
    headline6: css`
      ${withPoppinsFont({
        fontSize: "1.8rem",
        fontWeight: "500",
      })}
      color: ${(props) => props.theme.pallete.textPrimary};
    `,
    menu: css`
      ${withInterFont({
        fontSize: "1.4rem",
        fontWeight: "700",
      })}
      color: ${(props) => props.theme.pallete.textPrimary};
    `,
    title: css`
      ${withInterFont({
        fontSize: "1.6rem",
        fontWeight: "700",
      })}
      color: ${(props) => props.theme.pallete.textPrimary};
    `,
    caption: css`
      ${withInterFont({
        fontSize: "1.3rem",
        fontWeight: "500",
      })}
      color: ${(props) => props.theme.pallete.textPrimary};
    `,
    captionSmall: css`
      ${withInterFont({
        fontSize: "1.2rem",
        fontWeight: "500",
      })}
      color: ${(props) => props.theme.pallete.textPrimary};
    `,
    body: css`
      ${withInterFont({
        fontSize: "1.4rem",
        fontWeight: "400",
      })}
      color: ${(props) => props.theme.pallete.textPrimary};
    `,
    bodySmall: css`
      ${withInterFont({
        fontSize: "1.3rem",
        fontWeight: "400",
      })}
      color: ${(props) => props.theme.pallete.textPrimary};
    `,
    button: css`
      ${withInterFont({
        fontSize: "1.4rem",
        fontWeight: "800",
      })}
      color: ${(props) => props.theme.pallete.textPrimary};
    `,
    buttonSmall: css`
      ${withInterFont({
        fontSize: "1.3rem",
        fontWeight: "400",
      })}
      color: ${(props) => props.theme.pallete.textPrimary};
    `,
  },
};

export const lightTheme: DefaultTheme = darkTheme;
