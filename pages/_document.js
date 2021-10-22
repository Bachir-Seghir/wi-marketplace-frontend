import Document, { Html, Head, NextScript, Main } from 'next/document';

export class MyDocument extends Document {
  render() {
    return (
      <Html>
        <body>
          <Head>
            <meta charSet='utf-8' />
            <link
              rel='shortcut icon'
              href='../public/amazon-icon-rounded.ico'
              type='image/x-icon'
            />
            <link
              rel='stylesheet'
              href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
            />
            <link
              rel='stylesheet'
              href='https://fonts.googleapis.com/icon?family=Material+Icons'
            />
          </Head>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
