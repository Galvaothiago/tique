import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link rel="shortcut icon" href="/clover.png" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" /> 
                    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&family=Ubuntu:ital,wght@0,300;0,400;0,700;1,300&display=swap" rel="stylesheet" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}