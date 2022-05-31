import { Html, Head, Main, NextScript, } from "next/document";
  
const Document = () => {
      return (
        <Html lang="en" class="notranslate" translate="no">
          <Head>
          <meta name="google" content="notranslate" />
            <link rel="preload" href="/fonts/JameelNooriNastaleeqRegular.ttf" as="font" type="font/ttf" crossOrigin="" />
            <link rel="preconnect" href="https://fonts.googleapis.com" as="font" crossOrigin="" />
            <link rel="preconnect" href="https://fonts.gstatic.com"  />
            <link href="https://fonts.googleapis.com/css2?family=Alata&family=Lexend+Deca:wght@100;200;300;400&family=Roboto+Condensed:wght@700&display=swap" rel="stylesheet"></link>

          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      );
  }
export default Document;