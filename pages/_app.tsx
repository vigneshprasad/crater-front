import { darkTheme } from "lib/common/styles/theme.styled";
import { Provider } from "next-auth/client";
import { ThemeProvider } from "styled-components";

import type { AppProps } from "next/app";

import GlobalStyle from "../lib/common/styles/global.styled";

const App: React.FC<AppProps> = ({ Component, pageProps }) => (
  <Provider session={pageProps.session}>
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  </Provider>
);

export default App;
