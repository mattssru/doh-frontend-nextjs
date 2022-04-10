import React, { Fragment } from "react";
import NextApp from "next/app";
import Router from "next/router";
// import NProgress from "nprogress";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import configureStore from "stores/store";
import withRedux from "next-redux-wrapper";
import Head from "next/head";
import theme from "theme";
import { Authen } from "components";
import "../styles/style.css";
import "../styles/fonts/font.css";
// import "nprogress/nprogress.css";
import { Provider } from "react-redux";
import * as gtag from "../utils/gtag";

// Router.events.on("routeChangeStart", () => NProgress.start());
// Router.events.on("routeChangeComplete", () => NProgress.done());
// Router.events.on("routeChangeError", () => NProgress.done());

const handleRouteChange = (url: URL) => {
  gtag.pageview(url)
}

class App extends NextApp {
  static getInitialProps = async ({ Component, ctx }: any) => {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  };
  componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }


    
    //When the component is mounted, subscribe to router changes
    //and log those page views
    Router.events.on('routeChangeComplete', handleRouteChange)
  }

  componentWillUnmount(){
    Router.events.off("routeChangeComplete", handleRouteChange);
  }

  render = () => {
    const { Component, pageProps, store }: any = this.props;
    const persistor = persistStore(store);
    const Guard = Component.Guard || Fragment;
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <ThemeProvider theme={theme}>
            <Head>
              <meta charSet="utf-8" />
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
              />
              <meta name="theme-color" content={theme.palette.primary.main} />
              <link
                rel="icon"
                type="image/png"
                sizes="96x96"
                href="/favicon-96x96.png"
              ></link>
              <title>ก้าวท้าใจ</title>
            </Head>
            <CssBaseline />
            <Authen>
              <Guard>
                <Component {...pageProps} />
              </Guard>
            </Authen>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    );
  };
}
export default withRedux(configureStore)(App);
