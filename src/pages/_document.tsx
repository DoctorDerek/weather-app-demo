//eslint-disable-next-line
import Document, { Head, Html, Main, NextScript } from "next/document"

// ignore "next/document should not be imported outside of pages/_document.js" See https://nextjs.org/docs/messages/no-document-import-in-page.eslint(@next/next/no-document-import-in-page)

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="w-full h-full">
        <Head>
          <meta charSet="utf-8" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon-io/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-io/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-io/favicon-16x16.png"
          />
          <meta name="theme-color" content="#FFFFFF" />
          <link rel="manifest" href="/favicon-io/site.webmanifest" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700&display=optional"
          />
          <noscript>You need to enable JavaScript to run this app.</noscript>
        </Head>

        <body className="w-full h-full subpixel-antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
