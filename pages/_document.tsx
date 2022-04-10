import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheets } from '@material-ui/styles'
import { GA_TRACKING_ID } from '../utils/gtag';

export default class CustomDocument extends Document {

    static async getInitialProps(ctx: any) {
       
        const sheets = new ServerStyleSheets()
        const originalRenderPage = ctx.renderPage
        ctx.renderPage = () =>
            originalRenderPage({
            enhanceApp: (App: any) => (props: any) => sheets.collect(<App {...props} />)
        })

        const initialProps = await Document.getInitialProps(ctx)

        return {
            ...initialProps,
            styles: [
                <React.Fragment key="styles">
                  {initialProps.styles}
                  {sheets.getStyleElement()}
                </React.Fragment>
              ]
        }
    }

    render() {
        return (
          <Html>
            <Head>
               {/* Global Site Tag (gtag.js) - Google Analytics */}
               <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}/>
                <script
                  dangerouslySetInnerHTML={{
                    __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${GA_TRACKING_ID}', {
                        page_path: window.location.pathname,
                      });
                      `,
                  }}
                />
            </Head>
            <body>
              <Main />
              <NextScript />
            </body>
          </Html>
        )
      }
}
