import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function document() {
    return (
        <Html>
            <Head>

                {/* <script type="text/javascript" src='./js/hs-ui.bundle.js'></script> */}
            </Head>
            <body>
                <Main />
                <NextScript />

            </body>
        </Html>
    )
}