import { ThemeProvider } from "styled-components";

import type { AppProps } from "next/app";

import { darkTheme } from "@styles/theme.styled";

import GlobalStyle from "../styles/global.styled";

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <ThemeProvider theme={darkTheme}>
    <GlobalStyle />
    <Component {...pageProps} />
  </ThemeProvider>
);

export default App;
