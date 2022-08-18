import { ServerStyleSheet } from "styled-components";

import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

export default class AppDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <link rel="stylesheet" href="https://use.typekit.net/vga3pew.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="modal-root" />
          <div id="bottom-sheet-root" />
          <div id="notification-stack-root" />
        </body>
      </Html>
    );
  }
}
