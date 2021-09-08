import { theme } from "lib/common/theme";
import { Provider } from "next-auth/client";
import { ThemeProvider } from "styled-components";

import type { AppProps } from "next/app";

import GlobalStyle from "../lib/common/styles/global.styled";

const App: React.FC<AppProps> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => (
  <Provider session={session}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  </Provider>
);

export default App;
